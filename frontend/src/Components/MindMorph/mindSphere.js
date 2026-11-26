// "AI kavram küresi": küresel bir hacmin içinde farklı derinliklerde duran kavram kümeleri.
// Kürenin dış hatlarını yalnızca parçacıkların dağılımı oluşturur. Aynı seed her yüklemede
// aynı küreyi üretir.

// --- Ayarlar -------------------------------------------------------------
export const SPHERE_SEED = 11;
export const SPHERE_RADIUS = 0.95; // küre boyutu (dünya 0.9)
const DUST_SHARE = 0.16; // kümeler dışında, küre hacmine dağılan sönük toz noktaları
const CLUSTER_DENSITY = 1.0; // küme çekirdeklerinin yoğunluğu (1 normal, 1.5 daha sıkı)
const NODE_DOTS = 8; // etiket noktalarındaki parlak nokta sayısı

// Renkler (shader'daki sıra): 0 koyu mavi, 1 lavanta, 2 buz mavisi
// words: [sol, sağ üst, sağ alt] etiketleri; ilk küme ilk açılışta gösterilir
export const CLUSTERS = [
    { name: "Attention", words: ["focus", "attention", "distraction"], center: [0.36, 0.14, 0.52], axes: [0.26, 0.2, 0.18], color: 2, weight: 1.25 },
    { name: "Memory", words: ["memory", "encoding", "recall"], center: [-0.44, 0.38, 0.12], axes: [0.32, 0.12, 0.15], color: 1, weight: 1.0 },
    { name: "Language", words: ["language", "meaning", "context"], center: [-0.3, -0.42, 0.34], axes: [0.22, 0.2, 0.2], color: 0, weight: 1.0 },
    { name: "Perception", words: ["perception", "stimulus", "recognition"], center: [0.46, -0.42, -0.14], axes: [0.34, 0.11, 0.13], color: 1, weight: 0.9 },
    { name: "Learning", words: ["learning", "feedback", "adaptation"], center: [0.04, 0.56, -0.44], axes: [0.24, 0.17, 0.2], color: 0, weight: 1.0 },
    { name: "Reasoning", words: ["reasoning", "inference", "decision"], center: [-0.52, -0.06, -0.44], axes: [0.18, 0.27, 0.17], color: 1, weight: 1.0 },
    { name: "Emotion", words: ["emotion", "arousal", "regulation"], center: [0.24, -0.04, -0.66], axes: [0.3, 0.15, 0.11], color: 0, weight: 0.85 },
];

const makeRandom = (seed) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
};

const len = (a) => Math.hypot(a[0], a[1], a[2]);
const norm = (a) => {
    const l = len(a) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
};

// Nokta küre yarıçapını aşarsa içeri çekilir
const clampToSphere = (p) => {
    const l = len(p);
    const max = SPHERE_RADIUS * 0.985;
    return l > max ? p.map((v) => (v / l) * max) : p;
};

// Rastgele bir eksen etrafında döndürme matrisi (kümelerin yönü düzensiz olsun diye)
const randomRotation = (rand) => {
    const axis = norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
    const angle = rand() * Math.PI;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const [x, y, z] = axis;
    const t = 1 - c;
    return [
        [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
        [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
        [t * x * z - s * y, t * y * z + s * x, t * z * z + c],
    ];
};

const rotate = (m, v) => [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
];

export const buildSphere = (count) => {
    const rand = makeRandom(SPHERE_SEED);
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const info = new Float32Array(count * 3); // küme (-1 toz), etiket noktası (0/1), renk
    let i = 0;
    const push = (p, cluster, node, color) => {
        if (i >= count) return;
        const q = clampToSphere(p);
        positions.set(q, i * 3);
        normals.set(norm(q), i * 3);
        info.set([cluster, node, color], i * 3);
        i++;
    };

    // Etiket noktaları: kümenin solunda, sağ üstünde ve sağ altında (ilk bakış açısına göre)
    const clusters = CLUSTERS.map((c) => {
        const ext = Math.max(...c.axes) * 1.05;
        const anchors = [
            [c.center[0] - ext, c.center[1] + 0.02, c.center[2] + 0.04],
            [c.center[0] + ext * 0.62, c.center[1] + ext * 0.68, c.center[2] + 0.02],
            [c.center[0] + ext * 0.62, c.center[1] - ext * 0.68, c.center[2] + 0.02],
        ].map(clampToSphere);
        return { ...c, anchors, pickRadius: ext * 1.15, rotation: randomRotation(rand) };
    });

    const dustCount = Math.round(count * DUST_SHARE);
    const nodeCount = clusters.length * 3 * NODE_DOTS;
    const clusterCount = count - dustCount - nodeCount;
    const totalWeight = clusters.reduce((a, c) => a + c.weight, 0);

    // Kümeler: dönük, düzensiz elipsoidler; çekirdek yoğun, kenarlar seyrek
    clusters.forEach((c, ci) => {
        const n = Math.round((clusterCount * c.weight) / totalWeight);
        for (let k = 0; k < n; k++) {
            const dir = norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
            const r = Math.pow(rand(), 0.75 * CLUSTER_DENSITY) * (0.55 + 0.45 * rand());
            const local = [dir[0] * c.axes[0] * r * 1.6, dir[1] * c.axes[1] * r * 1.6, dir[2] * c.axes[2] * r * 1.6];
            const wobble = 0.03 * Math.sin(local[0] * 18 + local[1] * 11);
            const p = rotate(c.rotation, local);
            push([c.center[0] + p[0], c.center[1] + p[1] + wobble, c.center[2] + p[2]], ci, 0, c.color);
        }
    });

    // Etiket noktalarında küçük parlak düğümler
    clusters.forEach((c, ci) => {
        for (const a of c.anchors) {
            for (let k = 0; k < NODE_DOTS; k++) {
                const dir = norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
                const r = 0.014 * rand();
                push([a[0] + dir[0] * r, a[1] + dir[1] * r, a[2] + dir[2] * r], ci, 1, c.color);
            }
        }
    });

    // Toz: kürenin dış katmanına yakın, sönük noktalar (siluet)
    while (i < count) {
        const dir = norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
        const r = SPHERE_RADIUS * (0.72 + 0.28 * Math.sqrt(rand()));
        push([dir[0] * r, dir[1] * r, dir[2] * r], -1, 0, 0);
    }

    return {
        positions,
        normals,
        info,
        clusters: clusters.map(({ name, words, center, anchors, pickRadius }) => ({ name, words, center, anchors, pickRadius })),
    };
};
