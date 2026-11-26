// Seed'li 3 boyutlu karar ağacı (Yggdrasil havasında): yayılan kökler, kalın gövde,
// sık çatallanan dallar, uçlarda ışıklı yaprak kümeleri ve sinyal yolları.
// Aynı seed her yüklemede aynı ağacı üretir.

// --- Ayarlar -------------------------------------------------------------
export const TREE_SEED = 7;
export const TREE_ROOT = [0.34, -1.05, 0]; // gövdenin doğduğu nokta (sahne koordinatı)
const TRUNK_LENGTH = 1.0; // gövde uzunluğu
const LEADER_LENGTH = 1.45; // en yükseğe uzanan ana dalın uzunluğu (ağacın yüksekliği)
const CROWN_SPREAD = 1.0; // yan ana dalların uzunluk çarpanı (taç genişliği)
const BRANCH_DENSITY = 1.2; // alt dal sayısı çarpanı (1.0 seyrek, 2.0 çok sık)
const FOLIAGE_SHARE = 0.5; // noktaların yapraklara ayrılan oranı (0 = yapraksız)
const ROOT_COUNT = 6; // tabanda yayılan kök sayısı
const TIP_DOTS = 1; // her dal ucundaki ışık noktası sayısı

// Nokta seviyeleri: 0-5 dallar (0 gövde/kök), 7 dal ucu ışığı, 8 yaprak
export const LEVEL_TIP = 7;
export const LEVEL_LEAF = 8;

// --- Vektör yardımcıları --------------------------------------------------
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const norm = (a) => scale(a, 1 / (len(a) || 1));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const makeRandom = (seed) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
};

// Teğete dik iki eksen (dal yüzeyindeki lifleri yerleştirmek için)
const frame = (d) => {
    const ref = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const n = norm(cross(d, ref));
    return [n, cross(d, n)];
};

// Yönü adım adım bükerek organik bir dal eğrisi üretir
const growCurve = (start, dir, length, opts, rand) => {
    const steps = Math.max(10, Math.round(length * 40));
    const ds = length / steps;
    const [fx, fy] = frame(norm(dir));
    const phi = rand() * Math.PI * 2;
    const bendAxis = add(scale(fx, Math.cos(phi)), scale(fy, Math.sin(phi)));
    const phase = opts.phase ?? rand() * Math.PI * 2;

    let d = norm(dir);
    let p = start;
    const pts = [{ p, d }];
    for (let i = 1; i <= steps; i++) {
        const s = i / steps;
        let k = scale(bendAxis, (opts.bend ?? 0.9) * Math.sin(s * Math.PI * 2 * (opts.waves ?? 0.6) + phase));
        if (opts.lean) k = add(k, scale(opts.lean, s * s * 2.2));
        k = add(k, [0, opts.up ?? 0.25, 0]);
        d = norm(add(d, scale(k, ds)));
        p = add(p, scale(d, ds));
        pts.push({ p, d });
    }
    return pts;
};

export const buildTree = (count) => {
    const rand = makeRandom(TREE_SEED);
    const branches = [];

    const radiusAt = (b, s) => {
        const r = b.r0 + (b.r1 - b.r0) * Math.pow(s, 0.8);
        // Gövde tabanda genişler (köklerle birleştiği yer)
        return b.flare ? r * (1 + b.flare * Math.pow(1 - s, 4)) : r;
    };

    const sampleAt = (b, s) => {
        const x = Math.min(0.9999, Math.max(0, s)) * (b.pts.length - 1);
        const i = Math.floor(x);
        const t = x - i;
        const a = b.pts[i];
        const c = b.pts[i + 1];
        return {
            p: lerp(a.p, c.p, t),
            d: norm(lerp(a.d, c.d, t)),
            r: radiusAt(b, s),
            dist: b.startDist + b.length * s,
        };
    };

    const makeBranch = (parent, sParent, dir, length, r0, r1, level, opts = {}) => {
        const from = parent ? sampleAt(parent, sParent) : { p: TREE_ROOT, dist: 0 };
        const b = {
            id: branches.length,
            parent: parent ? parent.id : -1,
            level,
            length,
            r0,
            r1,
            flare: opts.flare,
            root: !!opts.root,
            startDist: from.dist,
            pts: growCurve(from.p, dir, length, opts, rand),
            children: [],
        };
        branches.push(b);
        if (parent) parent.children.push(b.id);
        return b;
    };

    // Bir dalın teğetinden belirli açıyla sapan yeni dal yönü
    const childDir = (d, angle, upBias) => {
        const [fx, fy] = frame(d);
        const phi = rand() * Math.PI * 2;
        const perp = add(scale(fx, Math.cos(phi)), scale(fy, Math.sin(phi)));
        return norm(add(add(scale(d, Math.cos(angle)), scale(perp, Math.sin(angle))), [0, upBias, 0]));
    };

    const spawnChildren = (parent, count, lengthFactor, level, lean) => {
        for (let k = 0; k < count; k++) {
            const sParent = 0.25 + ((k + rand() * 0.8) / count) * 0.7;
            const at = sampleAt(parent, sParent);
            const length = parent.length * lengthFactor * (0.75 + rand() * 0.5);
            const dir = childDir(at.d, 0.5 + rand() * 0.55, 0.16);
            const r0 = at.r * 0.72;
            const child = makeBranch(parent, sParent, dir, length, r0, Math.max(0.003, r0 * 0.35), level, {
                bend: 1.2,
                waves: 0.5 + rand() * 0.4,
                up: 0.3,
                lean: lean && sParent > 0.5 ? lean : null,
            });
            if (level < 5 && length > 0.07) {
                const n = Math.max(1, Math.round((level <= 2 ? 2.4 : 1.6) * BRANCH_DENSITY * (0.8 + rand() * 0.4)));
                spawnChildren(child, n, 0.58, level + 1, level === 2 ? lean : null);
            }
        }
    };

    // Gövde: hafif S eğrisiyle yukarı çıkar, tabanda genişler
    const trunk = makeBranch(null, 0, [0.02, 1, -0.04], TRUNK_LENGTH, 0.15, 0.09, 0, {
        bend: 0.8,
        waves: 1.2,
        phase: 0,
        up: 0.15,
        flare: 1.0,
    });

    // Ana dallar: farklı yüksekliklerden çıkar; biri (lider) en yükseğe uzanıp tepede sola kıvrılır
    const mainSpecs = [
        { s: 0.999, dir: [-0.1, 1, 0.1], length: LEADER_LENGTH, children: 5, lean: [-0.5, 0.1, 0.05] },
        { s: 0.9, dir: [1, 0.55, -0.4], length: 1.05 * CROWN_SPREAD, children: 4 },
        { s: 0.84, dir: [-1, 0.6, 0.35], length: 1.0 * CROWN_SPREAD, children: 4, lean: [-0.3, 0.1, 0] },
        { s: 0.68, dir: [1, 0.22, 0.6], length: 0.88 * CROWN_SPREAD, children: 4 },
        { s: 0.74, dir: [-1, 0.28, -0.5], length: 0.85 * CROWN_SPREAD, children: 3 },
        { s: 0.96, dir: [0.45, 1, -0.3], length: 1.05 * CROWN_SPREAD, children: 4, lean: [0.18, 0.05, -0.1] },
    ];
    for (const spec of mainSpecs) {
        const at = sampleAt(trunk, spec.s);
        const main = makeBranch(trunk, spec.s, spec.dir, spec.length, at.r * 0.85, 0.012, 1, {
            bend: 0.8,
            waves: 0.55,
            up: 0.3,
            lean: spec.lean,
        });
        spawnChildren(main, Math.round(spec.children * BRANCH_DENSITY), 0.5, 2, spec.lean);
    }

    // Kökler: gövdenin tabanından dışa ve hafifçe aşağı yayılır (sinyal yolu değildir)
    for (let k = 0; k < ROOT_COUNT; k++) {
        const angle = (k / ROOT_COUNT) * Math.PI * 2 + rand() * 0.5;
        const out = [Math.cos(angle), -0.32 - rand() * 0.25, Math.sin(angle) * 0.8];
        const root = makeBranch(trunk, 0.04, out, 0.42 + rand() * 0.3, 0.07, 0.006, 0, {
            bend: 1.4,
            waves: 0.5,
            up: -0.35,
            root: true,
        });
        // Her kökün bir yan filizi
        const side = childDir(sampleAt(root, 0.5).d, 0.7, -0.1);
        makeBranch(root, 0.45 + rand() * 0.3, side, root.length * 0.5, 0.03, 0.004, 1, {
            bend: 1.4,
            up: -0.3,
            root: true,
        });
    }

    // --- Noktaları dağıt --------------------------------------------------
    const leaves = branches.filter((b) => !b.root && b.children.length === 0);
    const foliageCount = Math.round(count * FOLIAGE_SHARE);
    const tipCount = leaves.length * TIP_DOTS;
    const bodyCount = count - foliageCount - tipCount;
    const levelBoost = [2.6, 1.9, 1.0, 0.6, 0.45, 0.35];
    const weights = branches.map(
        (b) => b.length * (0.3 + (b.r0 + b.r1) / 2 / 0.06) * levelBoost[b.level] * (b.root ? 0.8 : 1)
    );
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const info = new Float32Array(count * 4); // dal id, kökten uzaklık, dal başlangıcı, seviye
    let i = 0;
    const push = (p, n, b, dist, level) => {
        if (i >= count) return;
        positions.set(p, i * 3);
        normals.set(n, i * 3);
        info.set([b.id, dist, b.startDist, level], i * 4);
        i++;
    };

    // Lifler: noktalar dal boyunca kıvrımı izleyen ince şeritlere dizilir
    const fillBranch = (b, n) => {
        const strands = Math.min(16, Math.max(2, Math.round(((b.r0 + b.r1) / 2) * 190)));
        const rows = Math.ceil(n / strands);
        for (let k = 0; k < n; k++) {
            const strand = k % strands;
            const s = (Math.floor(k / strands) + rand()) / rows;
            const at = sampleAt(b, s);
            const [fx, fy] = frame(at.d);
            const angle = (strand / strands) * Math.PI * 2 + s * 1.4 + (rand() - 0.5) * 0.25;
            const radial = add(scale(fx, Math.cos(angle)), scale(fy, Math.sin(angle)));
            push(add(at.p, scale(radial, at.r * (0.8 + rand() * 0.2))), radial, b, at.dist, b.level);
        }
    };

    branches.forEach((b, bi) => {
        if (bi === 0) return; // gövde en sonda kalan noktaları alır
        fillBranch(b, Math.round((bodyCount * weights[bi]) / totalWeight));
    });

    // Dal uçlarında seyrek ışık noktaları
    for (const b of leaves) {
        const tip = sampleAt(b, 1);
        for (let k = 0; k < TIP_DOTS; k++) {
            const jitter = scale(norm([rand() - 0.5, rand() - 0.5, rand() - 0.5]), 0.02 * rand());
            push(add(tip.p, jitter), tip.d, b, tip.dist, LEVEL_TIP);
        }
    }

    // Yapraklar: dal uçlarında ve ince dalların ortasında yassı, yoğun kümeler (geniş, dolgun taç)
    const clusters = [];
    for (const b of leaves) clusters.push({ b, s: 1, radius: 0.14 + rand() * 0.1 });
    for (const b of branches) if (!b.root && b.level === 3) clusters.push({ b, s: 0.55, radius: 0.12 + rand() * 0.08 });
    const perCluster = Math.floor(foliageCount / Math.max(1, clusters.length));
    for (const { b, s: at, radius } of clusters) {
        const tip = sampleAt(b, at);
        const center = add(tip.p, [0, 0.03, 0]);
        for (let k = 0; k < perCluster; k++) {
            const dir = norm([rand() - 0.5, (rand() - 0.5) * 0.55, rand() - 0.5]);
            const r = radius * Math.cbrt(rand());
            push(add(center, scale(dir, r)), dir, b, tip.dist + r * 0.5, LEVEL_LEAF);
        }
    }

    // Gövde kalan noktaları alır, böylece toplam sayı tam tutar
    fillBranch(trunk, count - i);

    // --- Sinyal yolları ve hover için ana dal verisi -----------------------
    const pathOf = (b) => {
        const path = [];
        for (let x = b; x; x = x.parent >= 0 ? branches[x.parent] : null) path.unshift(x.id);
        return path;
    };
    const leafPaths = leaves.map((b) => {
        const path = pathOf(b);
        return { path, tipDist: b.startDist + b.length, main: path[1] };
    });
    const mains = branches
        .filter((b) => b.level === 1 && !b.root)
        .map((m) => {
            const subtree = leafPaths.filter((l) => l.main === m.id);
            const hover = m.pts.filter((_, k) => k % 3 === 0).map((pt) => pt.p);
            branches
                .filter((b) => b.level === 2 && b.parent === m.id)
                .forEach((b) => b.pts.filter((_, k) => k % 4 === 0).forEach((pt) => hover.push(pt.p)));
            // Hover darbesi ana dalın en uzun yolunu izler
            const longest = subtree.reduce((a, b) => (b.tipDist > a.tipDist ? b : a), subtree[0]);
            return { id: m.id, hover, leaf: longest };
        });

    let topY = -Infinity;
    let maxDist = 0;
    for (let k = 0; k < count; k++) {
        topY = Math.max(topY, positions[k * 3 + 1]);
        maxDist = Math.max(maxDist, info[k * 4 + 1]);
    }

    const canopy = { x: 0, y: 0, z: 0, minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, n: 0 };
    for (let k = 0; k < count; k++) {
        if (info[k * 4 + 3] !== LEVEL_LEAF) continue;
        const x = positions[k * 3];
        const y = positions[k * 3 + 1];
        canopy.x += x;
        canopy.y += y;
        canopy.z += positions[k * 3 + 2];
        canopy.minX = Math.min(canopy.minX, x);
        canopy.maxX = Math.max(canopy.maxX, x);
        canopy.minY = Math.min(canopy.minY, y);
        canopy.maxY = Math.max(canopy.maxY, y);
        canopy.n++;
    }
    canopy.x /= canopy.n;
    canopy.y /= canopy.n;
    canopy.z /= canopy.n;

    return { positions, normals, info, leaves: leafPaths, mains, topY, maxDist, canopy, branchCount: branches.length };
};
