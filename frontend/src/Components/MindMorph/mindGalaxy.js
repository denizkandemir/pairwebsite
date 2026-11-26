// "Kavram galaksisi": Samanyolu gibi çubuklu sarmal galaksi. Merkezde sıcak bir bulge ve kısa
// bir bar, barın uçlarından doğup yaklaşık bir tur sarılan iki ana kol, aralarda daha soluk iki
// yan kol ve diske yayılmış pus. Kavram grupları kollar boyunca yıldız toplulukları olarak durur. Galaksi XZ düzleminde üretilir; eğim ve yuvarlanma
// shader'da GALAXY_TILT ile uygulanır. Aynı seed her yüklemede aynı galaksiyi üretir.

import { CLUSTERS } from "./mindSphere";

// --- Ayarlar -------------------------------------------------------------
export const GALAXY_SEED = 19;
export const GALAXY_INCLINE = 0.95; // eğim (0 = yandan, 1.57 = tam karşıdan; büyüdükçe daha yuvarlak)
export const GALAXY_ROLL = 0.42; // uzun eksenin sol alttan sağ üste yatışı (radyan)
export const ARM_PITCH = 0.28; // logaritmik spiral açıklığı (küçük = daha çok sarılır, büyük = daha açık)
export const ARM_INNER = 0.3; // ana kolların bar uçlarından çıktığı yarıçap (barın yarı uzunluğu)
export const ARM_OUTER = 1.3; // kolların uzandığı en dış yarıçap (dış kollar ne kadar uzağa açılsın)
export const ARM_START = -0.7; // bar ve ön kolun açısı ("attention" ön kolda dursun diye)
const ARM_WIDTH = 0.06; // kol genişliği (dışa doğru genişler)
const MINOR_ARMS = true; // ana kolların arasındaki soluk yan kollar
const CORE_SHARE = 0.15; // bulge ve bar yıldızları
const MINOR_SHARE = 0.1; // yan kol yıldızları
const DUST_SHARE = 0.06; // diske yayılmış seyrek pus
const CLUSTER_SHARE = 0.13; // kavram toplulukları
const CLUSTER_SPREAD = 0.11; // topluluğun yarıçapı

// Renk indeksleri (shader): 0 buz mavisi, 1 soluk menekşe, 2 turkuaz vurgu, 3 sıcak beyaz çekirdek, 4 toz
const ICE = 0;
const VIOLET = 1;
const TURQUOISE = 2;
const CORE = 3;
const DUST = 4;

// Kavram gruplarının kollar üzerindeki yeri: kol (0 ön, 1 arka) ve merkezden uzaklık
const PLACEMENT = [
    { arm: 0, r: 0.62 }, // focus / attention / distraction (ön kolda, kameraya yakın)
    { arm: 1, r: 0.62 },
    { arm: 0, r: 0.98 },
    { arm: 1, r: 0.98 },
    { arm: 0, r: 1.25 },
    { arm: 1, r: 0.4 },
    { arm: 1, r: 1.25 },
];

const makeRandom = (seed) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
};

// Yaklaşık normal dağılım
const gauss = (rand) => (rand() + rand() + rand() - 1.5) / 1.5;

// Eğim ve yuvarlanma matrisi (satır sırası): T = Rz(roll) · Rx(incline)
export const galaxyTilt = () => {
    const ca = Math.cos(GALAXY_INCLINE);
    const sa = Math.sin(GALAXY_INCLINE);
    const cr = Math.cos(GALAXY_ROLL);
    const sr = Math.sin(GALAXY_ROLL);
    return [cr, -sr * ca, sr * sa, sr, cr * ca, -cr * sa, 0, sa, ca];
};

const applyTilt = (m, p) => [
    m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
    m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
    m[6] * p[0] + m[7] * p[1] + m[8] * p[2],
];

// Samanyolu gibi logaritmik spiral: merkezde yuvarlak döner, dışarıda açılır
const armAngle = (arm, r) => ARM_START + arm * Math.PI + Math.log(Math.max(r, ARM_INNER) / ARM_INNER) / ARM_PITCH;
const armPoint = (arm, r) => {
    const a = armAngle(arm, r);
    return [r * Math.cos(a), 0, r * Math.sin(a)];
};

export const buildGalaxy = (count) => {
    const rand = makeRandom(GALAXY_SEED);
    const tilt = galaxyTilt();
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const info = new Float32Array(count * 3); // topluluk (-1 yok), etiket yıldızı (0/1), renk
    let i = 0;
    const push = (p, cluster, node, color) => {
        if (i >= count) return;
        positions.set(p, i * 3);
        normals.set([0, 1, 0], i * 3);
        info.set([cluster, node, color], i * 3);
        i++;
    };

    const clusterCount = Math.round(count * CLUSTER_SHARE);
    const coreCount = Math.round(count * CORE_SHARE);
    const minorCount = MINOR_ARMS ? Math.round(count * MINOR_SHARE) : 0;
    const dustCount = Math.round(count * DUST_SHARE);
    const armCount = count - clusterCount - coreCount - minorCount - dustCount - CLUSTERS.length * 3;

    // Bir kol yıldızı: kolun ekseninden genişliğe göre sapar; iç kısımlar sıcak, dış kısımlar mavi
    const armStar = (angleOf, r, width, spread) => {
        const a = angleOf(r) + gauss(rand) * spread;
        const rr = r + gauss(rand) * width;
        const thick = (0.06 * (1.3 - r) + 0.018) * gauss(rand);
        const warm = r < 0.55 && rand() < (0.55 - r) * 1.6;
        const color = warm ? CORE : rand() < 0.08 ? TURQUOISE : rand() < 0.24 ? VIOLET : ICE;
        push([rr * Math.cos(a), thick, rr * Math.sin(a)], -1, 0, color);
    };

    // Ana kollar: barın uçlarından doğar, yaklaşık bir tur sarılır, dışarı doğru açılır ve genişler
    for (let k = 0; k < armCount; k++) {
        const arm = rand() < 0.53 ? 0 : 1;
        const r = ARM_INNER + Math.pow(rand(), 0.9) * (ARM_OUTER - ARM_INNER);
        const width = ARM_WIDTH * (1 + 1.6 * r) * (arm === 0 ? 1.15 : 0.95);
        armStar((x) => armAngle(arm, x), r, width, 0.09);
    }

    // Yan kollar: ana kolların arasında, daha ince ve soluk (dışta toz rengine yakın)
    for (let k = 0; k < minorCount; k++) {
        const arm = rand() < 0.5 ? 0.5 : 1.5;
        const r = 0.45 + Math.pow(rand(), 0.8) * (ARM_OUTER - 0.55);
        const a0 = (x) => armAngle(0, x) + arm * Math.PI;
        const a = a0(r) + gauss(rand) * 0.08;
        const rr = r + gauss(rand) * ARM_WIDTH * (0.8 + r);
        push([rr * Math.cos(a), gauss(rand) * 0.012, rr * Math.sin(a)], -1, 0, rand() < 0.5 ? DUST : VIOLET);
    }

    // Bulge ve bar: merkezde sıcak beyaz, hafif basık bir şişkinlik ve ana kolları bağlayan çubuk
    for (let k = 0; k < coreCount; k++) {
        if (k % 5 < 3) {
            const r = Math.abs(gauss(rand)) * 0.17;
            const a = rand() * Math.PI * 2;
            push([r * Math.cos(a), gauss(rand) * 0.12, r * Math.sin(a)], -1, 0, CORE);
        } else {
            const along = gauss(rand) * ARM_INNER;
            const across = gauss(rand) * 0.055;
            const c = Math.cos(ARM_START);
            const sn = Math.sin(ARM_START);
            push([along * c - across * sn, gauss(rand) * 0.035, along * sn + across * c], -1, 0, CORE);
        }
    }

    // Disk pusu: merkezden dışa doğru seyrelen soluk yıldızlar
    for (let k = 0; k < dustCount; k++) {
        const r = 0.2 + -Math.log(1 - rand() * 0.95) * 0.38;
        const a = rand() * Math.PI * 2;
        push([Math.min(r, ARM_OUTER + 0.08) * Math.cos(a), gauss(rand) * 0.03, Math.min(r, ARM_OUTER + 0.08) * Math.sin(a)], -1, 0, DUST);
    }

    // Kavram toplulukları ve her birinin üç etiket yıldızı
    const perCluster = Math.floor(clusterCount / CLUSTERS.length);
    const clusters = CLUSTERS.map((c, ci) => {
        const place = PLACEMENT[ci];
        const center = armPoint(place.arm, place.r);
        const stars = [];
        for (let k = 0; k < perCluster; k++) {
            const r = Math.abs(gauss(rand)) * CLUSTER_SPREAD;
            const a = rand() * Math.PI * 2;
            const p = [center[0] + r * Math.cos(a), gauss(rand) * 0.02, center[2] + r * Math.sin(a)];
            stars.push(p);
            const tone = [TURQUOISE, VIOLET, ICE][ci % 3];
            push(p, ci, 0, rand() < 0.6 ? tone : rand() < 0.5 ? TURQUOISE : VIOLET);
        }

        // Etiket yıldızları: ilk görünümde ekrana göre en sol, en sağ üst ve en sağ alttaki yıldızlar
        const screen = stars.map((p) => applyTilt(tilt, p));
        const pick = (score) => stars[screen.reduce((best, s, k) => (score(s) > score(screen[best]) ? k : best), 0)];
        const anchors = [pick((s) => -s[0]), pick((s) => s[0] + s[1]), pick((s) => s[0] - s[1])];
        anchors.forEach((a) => push(a, ci, 1, ICE));

        return { name: c.name, words: c.words, center, anchors, pickRadius: CLUSTER_SPREAD * 2.4 };
    });

    // Kalan noktalar toz olur, toplam sayı tam tutar
    while (i < count) {
        const r = 0.15 + Math.sqrt(rand()) * (ARM_OUTER + 0.05);
        const a = rand() * Math.PI * 2;
        push([r * Math.cos(a), gauss(rand) * 0.04, r * Math.sin(a)], -1, 0, DUST);
    }

    // Ekrandaki yarı genişlik ve yarı yükseklik (dönüş boyunca sığması için elips sınırı)
    let rMax = 0;
    for (let k = 0; k < count; k++) rMax = Math.max(rMax, Math.hypot(positions[k * 3], positions[k * 3 + 2]));
    const semiShort = rMax * Math.sin(GALAXY_INCLINE);
    const bounds = {
        halfWidth: Math.hypot(rMax * Math.cos(GALAXY_ROLL), semiShort * Math.sin(GALAXY_ROLL)),
        halfHeight: Math.hypot(rMax * Math.sin(GALAXY_ROLL), semiShort * Math.cos(GALAXY_ROLL)),
        // Disk düzlemindeki en dış yarıçap (perspektifli sığdırma bunu kullanır)
        radius: rMax,
    };

    return { positions, normals, info, clusters, tilt, bounds };
};

// --- Yoğunluk katmanı -----------------------------------------------------
// Galaksi görünümünde ana parçacıkların üstüne eklenen, yalnızca galakside görünen ek yıldızlar.
// Ana parçacık sayısı beyinle ortak olduğu için yoğunluk bu ayrı katmanla sağlanır.
export const FIELD_COUNT = 20000; // ek yıldız sayısı (mobilde yarısı çizilir)
const FIELD_PINK = 0.035; // pembe yıldız oluşum bölgelerinin oranı

export const buildGalaxyField = (count = FIELD_COUNT) => {
    const rand = makeRandom(GALAXY_SEED + 101);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const tones = {
        ice: [0.6, 0.8, 1.0],
        blue: [0.42, 0.58, 1.0],
        lavender: [0.7, 0.68, 1.0],
        pink: [0.95, 0.6, 0.85],
        warm: [1.0, 0.84, 0.58],
    };

    for (let k = 0; k < count; k++) {
        const pick = rand();
        let r;
        let a;
        if (pick < 0.68) {
            // Ana kollar: dar ve yoğun
            const arm = rand() < 0.5 ? 0 : 1;
            r = ARM_INNER + Math.pow(rand(), 0.9) * (ARM_OUTER - ARM_INNER);
            a = armAngle(arm, r) + gauss(rand) * 0.06;
            r += gauss(rand) * ARM_WIDTH * (0.7 + 1.3 * r);
        } else if (pick < 0.83) {
            // Yan kollar
            r = 0.45 + Math.pow(rand(), 0.8) * (ARM_OUTER - 0.5);
            a = armAngle(0, r) + (rand() < 0.5 ? 0.5 : 1.5) * Math.PI + gauss(rand) * 0.07;
            r += gauss(rand) * ARM_WIDTH * (0.6 + r);
        } else {
            // Disk pusu
            r = 0.15 + -Math.log(1 - rand() * 0.95) * 0.35;
            a = rand() * Math.PI * 2;
        }
        const y = gauss(rand) * (0.05 * (1.3 - Math.min(r, 1.3)) + 0.012);
        positions.set([r * Math.cos(a), y, r * Math.sin(a)], k * 3);

        const warm = r < 0.5 && rand() < (0.5 - r) * 1.8;
        const pink = !warm && pick < 0.83 && rand() < FIELD_PINK;
        const tone = warm ? tones.warm : pink ? tones.pink : rand() < 0.18 ? tones.lavender : rand() < 0.45 ? tones.blue : tones.ice;
        colors.set(tone, k * 3);
        sizes[k] = pink ? 1.2 + rand() * 0.9 : 0.5 + Math.pow(rand(), 6) * 1.6;
    }

    // Ek yıldız katmanının disk düzlemindeki en dış yarıçapı (sığdırma hesabında kullanılır)
    let radius = 0;
    for (let k = 0; k < count; k++) radius = Math.max(radius, Math.hypot(positions[k * 3], positions[k * 3 + 2]));

    return { positions, colors, sizes, radius };
};
