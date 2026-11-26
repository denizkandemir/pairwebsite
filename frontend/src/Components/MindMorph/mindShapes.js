// Kod karakterleri (GLYPHS) beyinden damlayan kodlarda kullanılır.
// buildCode: eski tasarımdaki 3 boyutlu "PAIR" yazısı. Yerini karar ağacı (mindTree.js) aldı;
// geri dönmek istenirse diye silinmedi, şu an hiçbir yerde kullanılmıyor.

export const GLYPHS = ["0", "1", "{", "}", "<", ">", "/", "=", "+", "*", "#", ";", "(", ")", "[", "]"];

const TEXT = "PAIR";
const CANVAS_W = 1024;
const CANVAS_H = 360;
const WORLD_WIDTH = 2.4; // yazının sahnedeki genişliği (kenarlardan kırpılmasın)
const Y_OFFSET = 0; // yazı, arkasındaki koyu alanın tam ortasında durur
const DEPTH = 0.22; // harflerin yarı kalınlığı
const GLYPH_STEP = 28; // ön yüzdeki kod karakterleri arası mesafe (piksel)
const DRIP_COUNT = 420;

// Her yüklemede aynı şekil çıksın diye tohumlu rastgele sayı üreteci
const makeRandom = (seed) => () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
};

// Yazıyı gizli bir canvas'a çizip harflerin içindeki pikselleri çıkarır
const textMask = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = `900 ${CANVAS_H * 0.82}px "Arial Black", "Segoe UI Black", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(TEXT, CANVAS_W / 2, CANVAS_H / 2);
    const pixels = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
    const inside = (x, y) => x >= 0 && y >= 0 && x < CANVAS_W && y < CANVAS_H && pixels[(y * CANVAS_W + x) * 4 + 3] > 128;
    return inside;
};

export const buildCode = (count) => {
    const rand = makeRandom(11);
    const inside = textMask();
    const scale = WORLD_WIDTH / CANVAS_W;
    const toWorld = (px, py) => [(px - CANVAS_W / 2) * scale, -(py - CANVAS_H / 2) * scale + Y_OFFSET];

    // Harf içi, kenar ve alt kenar pikselleri
    const fill = [];
    const edges = [];
    const bottoms = [];
    for (let y = 1; y < CANVAS_H - 1; y += 2) {
        for (let x = 1; x < CANVAS_W - 1; x += 2) {
            if (!inside(x, y)) continue;
            fill.push([x, y]);
            const l = inside(x - 3, y), r = inside(x + 3, y), u = inside(x, y - 3), d = inside(x, y + 3);
            if (!(l && r && u && d)) {
                // Kenarın dışa bakan yönü (canvas y aşağı, sahne y yukarı)
                const nx = (l ? 0 : -1) + (r ? 0 : 1);
                const ny = (u ? 0 : 1) + (d ? 0 : -1);
                const len = Math.hypot(nx, ny) || 1;
                edges.push([x, y, nx / len, ny / len]);
                if (!d) bottoms.push([x, y]);
            }
        }
    }

    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const glyph = new Float32Array(count).fill(-1);
    const drip = new Float32Array(count);
    let i = 0;
    const push = (p, n, g = -1, speed = 0) => {
        positions.set(p, i * 3);
        normals.set(n, i * 3);
        glyph[i] = g;
        drip[i] = speed;
        i++;
    };

    // 1) Ön yüz: düzenli ızgarada kod karakterleri
    for (let y = 0; y < CANVAS_H && i < count; y += GLYPH_STEP) {
        for (let x = 0; x < CANVAS_W && i < count; x += GLYPH_STEP * 0.62) {
            const px = Math.round(x), py = Math.round(y);
            if (!inside(px, py)) continue;
            const [wx, wy] = toWorld(px, py);
            push([wx, wy, DEPTH], [0, 0, 1], Math.floor(rand() * GLYPHS.length));
        }
    }

    // 2) Alt kenarlardan aşağı damlayan kod parçaları
    for (let k = 0; k < DRIP_COUNT && i < count; k++) {
        const [bx, by] = bottoms[Math.floor(rand() * bottoms.length)];
        const [wx, wy] = toWorld(bx, by);
        push([wx, wy, (rand() * 2 - 1) * DEPTH], [0, 0, 1], Math.floor(rand() * GLYPHS.length), 0.18 + rand() * 0.3);
    }

    // 3) Ön kenar çizgisi (parlak, glyph = -2) ve arka kenar çizgisi (sönük, glyph = -3)
    const outline = Math.floor((count - i) * 0.5);
    for (let k = 0; k < outline; k++) {
        const [ex, ey, nx, ny] = edges[Math.floor(rand() * edges.length)];
        const [wx, wy] = toWorld(ex, ey);
        const front = k % 3 !== 0;
        push([wx, wy, front ? DEPTH : -DEPTH], [nx, ny, 0], front ? -2 : -3);
    }

    // 4) Yan duvarlar: kalınlığı gösteren seyrek noktalar
    const sideCount = Math.floor((count - i) * 0.45);
    for (let k = 0; k < sideCount; k++) {
        const [ex, ey, nx, ny] = edges[Math.floor(rand() * edges.length)];
        const [wx, wy] = toWorld(ex, ey);
        push([wx, wy, (rand() * 2 - 1) * DEPTH], [nx, ny, 0]);
    }

    // 5) Ön ve arka yüzeyde ince nokta dokusu
    while (i < count) {
        const [fx, fy] = fill[Math.floor(rand() * fill.length)];
        const [wx, wy] = toWorld(fx, fy);
        const front = rand() < 0.6;
        push([wx, wy, front ? DEPTH : -DEPTH], [0, 0, front ? 1 : -1]);
    }

    return { positions, normals, glyph, drip };
};
