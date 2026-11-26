import "./MindMorph.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLYPHS, buildCode } from "./mindShapes";
import { LEVEL_LEAF, LEVEL_TIP, TREE_ROOT, buildTree } from "./mindTree";
import { buildSphere } from "./mindSphere";
import { ARM_INNER, ARM_OUTER, ARM_PITCH, ARM_START, FIELD_COUNT, buildGalaxy, buildGalaxyField } from "./mindGalaxy";

// Döngü: beyin → PAIR yazısı → dünya → kavram formu → beyin.
// Kavram formunun seçenekleri: "galaxy" (kavram galaksisi), "sphere" (kavram küresi), "tree" (karar ağacı).
// Diğer formların kodu duruyor; geçmek için bu değeri değiştirmek yeterli.
const MIDDLE_FORM = "galaxy";
// Kavram formu (küre veya galaksi): küme seçimi, etiketler ve çizgiler ortak çalışır
const IS_SPHERE = MIDDLE_FORM === "sphere" || MIDDLE_FORM === "galaxy";
const IS_GALAXY = MIDDLE_FORM === "galaxy";

const ICE = new THREE.Color("#eaf6ff");
const LAVENDER = new THREE.Color("#c3b5ff");
const CYAN = new THREE.Color("#7fdcff");

// Karar sinyallerinin renkleri: insan kararı (sıcak beyaz), model tahmini (buz mavisi), hover darbesi
const SIGNAL_HUMAN = new THREE.Color("#fff1dc");
const SIGNAL_MODEL = new THREE.Color("#8fd8ff");
const SIGNAL_HOVER = new THREE.Color("#dcecff");

// Döngü süreleri (saniye). Aşamalar: 0 beyin, 1 PAIR yazısı, 2 dünya, 3 kavram formu
const STAGES = 4;
const HOLDS = [6.0, 6.0, 6.0, 6.0]; // her şekil ekranda 6 saniye durur
const TRANSITION = 2.4;
const STAGE_START = HOLDS.map((_, i) => HOLDS.slice(0, i).reduce((a, h) => a + h + TRANSITION, 0));
const CYCLE = HOLDS.reduce((a, h) => a + h + TRANSITION, 0);
const CONCEPT_STAGE = 3;
const INTRO_DELAY = 0.3;
const INTRO_DURATION = 2.2;

// Her aşama kendi açısından görünür: beyin yandan, PAIR yazısı hafif çapraz, dünya önden, ağaç üç çeyrek
const STAGE_RY = [-1.15, 0.32, 0, IS_SPHERE ? 0 : 0.32];
// İmleç parallax'ı ve kendiliğinden salınım (ağaçta ve galakside çok hafif)
const STAGE_PARALLAX = [0.3, 0.3, 0.3, IS_SPHERE ? 0.1 : 0.08];
const STAGE_SWAY = [0.1, 0.1, 0.1, IS_SPHERE ? 0 : 0.05];

// AI kavram küresi etkileşimi
const SPHERE_SPIN = IS_GALAXY ? 0.07 : 0.14; // kendi ekseni etrafında dönüş hızı (radyan / saniye)
const GALAXY_DEMO_DELAY = 0.8; // galaksi oluştuktan sonra "attention" kümesinin aydınlanması için bekleme
const GALAXY_BRIGHTNESS = 1.7; // galaksi yıldızlarının genel parlaklığı
const GALAXY_SCALE = 1.0; // galaksinin boyutu (sahneye sığan boyuta göre çarpan)
const GALAXY_MARGIN = 0.06; // galaksi ile sahne kenarı arasındaki pay
const GALAXY_RAY_SPEED = 0.12; // kollar boyunca akan ışınların hızı
const GALAXY_GLOW = 0.55; // ışıklı disk katmanının (bulge, bar, kol parıltısı) gücü
const GALAXY_HALO = 0.26; // galaksinin etrafındaki mor halonun gücü
const GALAXY_FIELD_BRIGHTNESS = 1.0; // ek yıldız katmanının parlaklığı
const DISK_SIZE = 2 * (ARM_OUTER + 0.4); // ışıklı disk düzleminin boyutu
// Diskteki buz mavisi halenin görünür biçimde bittiği yarıçap (diskGlowFragment: hale 1.2 ± 0.35)
const GALAXY_GLOW_REACH = 1.55;
const GALAXY_MIN_SCALE = 0.3; // çok dar ekranlarda galaksinin inebileceği en küçük ölçek
const GALAXY_MAX_SCALE = 1.6;

// Kod düşmesi animasyonu: yazı soldan sağa, rastgele kod karakterlerinden harflere dönüşür
const DECODE_CHARS = "01{}<>/=+*#;()[]";
const DECODE_TIME = 0.7;
const decodeText = (text, t) => {
    const resolved = Math.floor(Math.min(1, t / DECODE_TIME) * text.length);
    return text
        .split("")
        .map((ch, i) => (i < resolved || ch === " " ? ch : DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)]))
        .join("");
};
const DEMO_DURATION = 2.8; // küre oluşunca "attention" kümesinin kendiliğinden gösterilme süresi
const PICK_PADDING = 26; // kümenin seçim alanına eklenen pay (piksel)
const TAP_HOLD = 4.0; // dokunmatikte bir dokunuşun seçimi açık tuttuğu süre (saniye)

// Kürenin JS tarafındaki dönüşü shader'daki rotY ile aynıdır
const rotYInto = (out, v, a) => {
    const c = Math.cos(a);
    const sn = Math.sin(a);
    return out.set(c * v[0] + sn * v[2], v[1], -sn * v[0] + c * v[2]);
};

// Galaksinin dış kenar halkası (ölçek 1'de, eğik diskte). Galaksi kendi diskinde döndüğü için
// halka dönüşün her anında aynıdır; imleç parallax'ının döndürdüğü hâller de eklenir
const galaxyRim = (tilt, radius) => {
    const rim = [];
    const ry = STAGE_PARALLAX[CONCEPT_STAGE];
    for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const p = new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)).applyMatrix3(tilt);
        for (const angle of [-ry, 0, ry]) rim.push(rotYInto(new THREE.Vector3(), [p.x, p.y, p.z], angle));
    }
    return rim;
};

// Kenar halkasının tamamı, perspektifle birlikte görünür alana sığacak en büyük ölçek.
// Kameraya yakın kenar daha büyük göründüğü için her nokta kameradan z=0 düzlemine izdüşürülür
const fitGalaxyScale = (rim, view, cam, margin) => {
    const fits = (s) =>
        rim.every((p) => {
            const k = cam.z / (cam.z - p.z * s);
            const x = cam.x + (p.x * s - cam.x) * k;
            const y = cam.y + (p.y * s - cam.y) * k;
            return x > view.left + margin && x < view.right - margin && y > view.bottom + margin && y < view.top - 0.25 - margin;
        });
    if (fits(GALAXY_MAX_SCALE)) return GALAXY_MAX_SCALE;
    let lo = GALAXY_MIN_SCALE;
    let hi = GALAXY_MAX_SCALE;
    for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        if (fits(mid)) lo = mid;
        else hi = mid;
    }
    return lo;
};

// Morton sırası: uzayda yakın noktalar sırada da yakın düşer. Beyin ve küre noktalarını
// bu sırayla eşleştirmek, geçişte noktaların kısa mesafeler kat etmesini sağlar.
const mortonOrder = (arr, n) => {
    const box = new THREE.Box3().setFromArray(arr);
    const size = box.getSize(new THREE.Vector3());
    const spread = (v) => {
        v = (v * 0x00010001) & 0xff0000ff;
        v = (v * 0x00000101) & 0x0f00f00f;
        v = (v * 0x00000011) & 0xc30c30c3;
        return (v * 0x00000005) & 0x49249249;
    };
    const q = (v, min, sz) => Math.min(1023, Math.max(0, Math.floor(((v - min) / (sz || 1)) * 1023)));
    const keys = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        const x = q(arr[i * 3], box.min.x, size.x);
        const y = q(arr[i * 3 + 1], box.min.y, size.y);
        const z = q(arr[i * 3 + 2], box.min.z, size.z);
        keys[i] = (spread(x) | (spread(y) << 1) | (spread(z) << 2)) >>> 0;
    }
    return Array.from({ length: n }, (_, i) => i).sort((a, b) => keys[a] - keys[b]);
};

// Karar sinyalleri
const SIGNAL_SPEED = 0.75; // sahne birimi / saniye
const SIGNAL_FADE = 1.7; // uca vardıktan sonra ışığın sönmesi için geçen mesafe
const SIGNAL_PAUSE = 0.5; // iki karar arasında bekleme (saniye)
const MODEL_LAG = 0.3; // model sinyali insan sinyalinin biraz arkasından gelir
const HOVER_RADIUS = 56; // imlecin ana dala yakın sayılacağı mesafe (piksel)
const TOUCH_INTERVAL = 4.5; // dokunmatik cihazlarda kendiliğinden darbe aralığı (saniye)

// Dünyanın eksen eğikliği ve dönüşü (Varşova önden geçecek şekilde)
const GLOBE_TILT = 0.35;
const GLOBE_START = -0.9;
const GLOBE_SPEED = 0.12;

// Beyin modeli dünya ile aynı boyutta görünsün diye ortalanıp büyütülür
const BRAIN_SCALE = 1.28;
const fitBrain = (arr) => {
    const box = new THREE.Box3().setFromArray(arr);
    const center = box.getCenter(new THREE.Vector3());
    for (let i = 0; i < arr.length; i += 3) {
        arr[i] = (arr[i] - center.x) * BRAIN_SCALE;
        arr[i + 1] = (arr[i + 1] - center.y) * BRAIN_SCALE;
        arr[i + 2] = (arr[i + 2] - center.z) * BRAIN_SCALE;
    }
    return { center, arr };
};

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uMorph;
    uniform float uIntro;
    uniform float uSize;
    uniform float uPixelRatio;
    uniform float uScanY;
    uniform float uGlobeAngle;
    uniform float uGlobeTilt;

    // Karar ağacı
    uniform vec3 uTreeRoot;
    uniform float uTreeScale;
    uniform float uTreeMaxDist;
    uniform float uMobile;
    uniform float uPathA[6];
    uniform float uPathB[6];
    uniform float uPathC[6];
    uniform vec3 uHeads;
    uniform vec3 uSignalA;
    uniform vec3 uSignalB;
    uniform vec3 uSignalC;

    // AI kavram küresi
    const float MIDDLE_SPHERE = ${IS_SPHERE ? "1.0" : "0.0"};
    const float GALAXY = ${IS_GALAXY ? "1.0" : "0.0"};
    uniform float uSphereAngle;
    uniform mat3 uConceptTilt;
    uniform float uConceptScale;
    uniform vec3 uConceptOffset;
    uniform float uGalaxyBrightness;
    uniform float uRaySpeed;
    const float ARM_START = ${ARM_START.toFixed(4)};
    const float ARM_PITCH = ${ARM_PITCH.toFixed(4)};
    const float ARM_INNER = ${ARM_INNER.toFixed(4)};
    const float ARM_OUTER = ${ARM_OUTER.toFixed(4)};
    uniform float uSelected;
    uniform float uSelAmt;

    attribute vec3 aGlobe;
    attribute vec3 aGlobeNormal;
    attribute vec3 aTree;
    attribute vec3 aTreeNormal;
    attribute vec4 aTreeInfo; // dal id, kökten uzaklık, dal başlangıcı, seviye (${LEVEL_TIP} uç ışığı, ${LEVEL_LEAF} yaprak)
    attribute vec3 aCode;
    attribute vec3 aCodeNormal;
    attribute vec3 aSphere;
    attribute vec3 aSphereInfo; // küme (-1 toz), etiket noktası (0/1), renk
    // WebGL'in attribute sınırı (16) aşılmasın diye dört tekil değer tek vec4'te taşınır:
    // dünya rota konumu, rota tohumu, PAIR kod karakteri, PAIR damlası
    attribute vec4 aMisc;
    #define aEdgeT aMisc.x
    #define aEdgeSeed aMisc.y
    #define aGlyph aMisc.z
    #define aDrip aMisc.w
    attribute float aRandom;

    varying float vAlpha;
    varying float vScan;
    varying float vHeight;
    varying float vRim;
    varying float vGlyph;
    varying float vGlyphMix;
    varying float vPulse;
    varying vec3 vPulseColor;

    // Ateşleme renkleri: camgöbeği, lavanta, pembe-mor
    vec3 palette(float k) {
        if (k < 0.34) return vec3(0.45, 0.85, 1.0);
        if (k < 0.67) return vec3(0.68, 0.58, 1.0);
        return vec3(0.92, 0.55, 0.95);
    }

    float hash(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    }

    float easeInOut(float t) {
        return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    }

    vec3 rotY(vec3 v, float a) {
        float c = cos(a), s = sin(a);
        return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
    }

    vec3 rotX(vec3 v, float a) {
        float c = cos(a), s = sin(a);
        return vec3(v.x, c * v.y - s * v.z, s * v.y + c * v.z);
    }

    // Beyin noktalarının küçük bir kısmı kod karakteri olarak aşağı damlar
    float brainDrip() {
        return aRandom < 0.09 ? fract(uTime * 0.22 + aRandom * 37.0) : -1.0;
    }

    // Kavram formu: kendi ekseninde döner, eğilir, sahne alanına göre ölçeklenip yerleşir.
    // grow ve swirl beyinden galaksiye geçişte noktaların sarmal yolunu çizer
    vec3 conceptPos(float grow, float swirl) {
        vec3 local = aSphere * grow;
        return uConceptOffset + uConceptScale * (uConceptTilt * rotY(local, uSphereAngle + swirl));
    }

    // PAIR yazısı: damlayan parçalar harfin alt kenarından aşağı düşer ve yeniden başlar
    vec3 codePosition() {
        float fall = aDrip > 0.0 ? fract(uTime * aDrip + aRandom) : 0.0;
        return aCode - vec3(0.0, fall * 1.25, 0.0);
    }

    // 0: beyin, 1: PAIR yazısı, 2: dünya, 3: kavram formu (galaksi / küre / ağaç)
    vec3 shapePosition(float s) {
        if (s < 0.5) {
            float fall = brainDrip();
            return fall < 0.0 ? position : position - vec3(0.0, fall * 1.3, 0.0);
        }
        if (s < 1.5) return codePosition();
        if (s < 2.5) return rotX(rotY(aGlobe, uGlobeAngle), uGlobeTilt);
        if (MIDDLE_SPHERE > 0.5) return conceptPos(1.0, 0.0);
        return uTreeRoot + (aTree - uTreeRoot) * uTreeScale;
    }

    vec3 shapeNormal(float s) {
        if (s < 0.5) return normal;
        if (s < 1.5) return aCodeNormal;
        if (s < 2.5) return rotX(rotY(aGlobeNormal, uGlobeAngle), uGlobeTilt);
        if (MIDDLE_SPHERE < 0.5) return aTreeNormal;
        vec3 conceptNormal = GALAXY > 0.5 ? vec3(0.0, 1.0, 0.0) : normalize(aSphere + 0.0001);
        return uConceptTilt * rotY(conceptNormal, uSphereAngle);
    }

    // Bir şeklin o anki ağırlığı (0..1)
    float shapeWeight(float k, float stage, float next, float t) {
        return (abs(stage - k) < 0.5 ? 1.0 - t : 0.0) + (abs(next - k) < 0.5 ? t : 0.0);
    }

    // Sinyal: parlak baş, arkasında izlenen yolu gösteren sönük iz, çataldan geçerken kısa parlama
    float decisionSignal(float onPath, float head, float dist, float branchStart, float level) {
        if (onPath < 0.5 || head < 0.0) return 0.0;
        float d = head - dist;
        float glow = d >= 0.0 ? exp(-d * 8.0) : smoothstep(-0.035, 0.0, d);
        float trail = d >= 0.0 ? 0.3 * exp(-d * 1.2) : 0.0;
        float fork = 0.0;
        if (level > 0.5 && level < 5.5 && dist - branchStart < 0.06 && head >= branchStart) {
            fork = 0.9 * exp(-(head - branchStart) * 3.5);
        }
        return glow + trail + fork;
    }

    void main() {
        float m = mod(uMorph, 4.0);
        float stage = floor(m);
        float f = m - stage;
        float next = mod(stage + 1.0, 4.0);
        // Dünyadan kavram formuna geçiş
        bool intoConcept = next > 2.5;

        float t;
        if (intoConcept && MIDDLE_SPHERE > 0.5) {
            // Dünya → galaksi / küre: noktalar önce gevşer, sonra kısa yollarla kümelerde toplanır
            t = easeInOut(clamp((f - 0.15 - aRandom * 0.3) / 0.55, 0.0, 1.0));
        } else if (intoConcept) {
            // Dünya → ağaç: önce gövde, sonra ana dallar, en son ince uçlar yerine oturur
            float grow = clamp(aTreeInfo.y / uTreeMaxDist, 0.0, 1.0);
            t = easeInOut(clamp((f - grow * 0.5 - aRandom * 0.08) / 0.42, 0.0, 1.0));
        } else {
            // Diğer geçişlerde her nokta biraz farklı zamanda yola çıkar
            t = easeInOut(clamp((f - aRandom * 0.35) / 0.65, 0.0, 1.0));
        }

        vec3 p = mix(shapePosition(stage), shapePosition(next), t);
        vec3 n = normalize(mix(shapeNormal(stage), shapeNormal(next), t) + 0.0001);

        // Her şeklin o anki ağırlığı (0..1)
        float wBrain = shapeWeight(0.0, stage, next, t);
        float wCode = shapeWeight(1.0, stage, next, t);
        float wGlobe = shapeWeight(2.0, stage, next, t);
        // wTree: kavram formunun (galaksi / küre / ağaç) ağırlığı
        float wTree = shapeWeight(3.0, stage, next, t);

        // Geçiş sırasında noktalar hafifçe dışarı savrulur (büyürken daha az)
        p += normalize(p + 0.0001) * sin(t * 3.14159) * 0.28 * aRandom * (intoConcept ? 0.35 : 1.0);

        // Dünya → galaksi: noktalar iki kolun kavisleri boyunca dönerek dışarı açılır ve yerleşir
        if (intoConcept && GALAXY > 0.5) {
            p = mix(shapePosition(stage), conceptPos(mix(0.3, 1.0, t), (1.0 - t) * 2.2), t);
        }

        // Gevşeme: dünya noktaları yola çıkmadan önce hafifçe dağılır
        if (intoConcept && MIDDLE_SPHERE > 0.5) {
            vec3 loose = normalize(vec3(sin(aRandom * 91.0), cos(aRandom * 57.0), sin(aRandom * 23.0) + 0.001));
            p += loose * 0.06 * sin(min(f / 0.3, 1.0) * 3.14159) * (1.0 - t);
        }

        // Durağan haldeyken çok hafif titreşim
        p.x += sin(uTime * 0.8 + aRandom * 40.0) * 0.004;
        p.y += cos(uTime * 0.7 + aRandom * 30.0) * 0.004;

        // Açılış: dağınık noktalar toplanarak beyni oluşturur
        vec3 scatter = normalize(vec3(sin(aRandom * 91.0), cos(aRandom * 47.0), sin(aRandom * 13.0) + 0.001)) * (2.5 + aRandom * 2.0);
        float intro = easeInOut(clamp((uIntro - aRandom * 0.3) / 0.7, 0.0, 1.0));
        p = mix(scatter, p, intro);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;

        float level = aTreeInfo.w;
        float isTip = 1.0 - step(0.5, abs(level - ${LEVEL_TIP}.0));
        float isLeaf = 1.0 - step(0.5, abs(level - ${LEVEL_LEAF}.0));
        float bFall = brainDrip();
        bool isBrainDrip = bFall >= 0.0;
        float size = uSize * (0.6 + aRandom * 0.8);
        size *= mix(1.0, isBrainDrip ? 2.4 : 1.2, wBrain);
        // PAIR yazısı: kod karakterleri iri, kenar noktaları orta, yan duvarlar küçük
        bool isGlyph = aGlyph >= 0.0;
        size *= mix(1.0, isGlyph ? 2.6 : (aGlyph < -1.5 ? 0.85 : 0.6), wCode);
        // Ağaçta gövde noktaları iri, uçlara doğru incelir; uç ışıkları belirgin
        float treeSize = isTip > 0.5 ? 1.45 : (isLeaf > 0.5 ? 1.3 : 1.3 - level * 0.1);

        // Küre: öndeki noktalar küçük ve net, arkadakiler daha yumuşak; etiket noktaları belirgin
        float cluster = aSphereInfo.x;
        float isDust = step(cluster, -0.5);
        float isNode = aSphereInfo.y;
        float isSel = (1.0 - isDust) * (1.0 - step(0.5, abs(cluster - uSelected)));
        float near = smoothstep(-4.5, -3.0, mv.z);
        float sphereSize = isDust > 0.5 ? 0.7 : mix(1.2, 0.72, near) * (1.0 + isNode * isSel * uSelAmt * 0.9) * (1.0 + isSel * uSelAmt * 0.15);

        float galaxyRay = 0.0;
        vec3 galaxyRayColor = vec3(0.0);
        // Galaksi: yıldızlar farklı boyut ve parlaklıkta; öndekiler keskin, uzaktakiler küçük ve loş
        float gColor = aSphereInfo.z;
        float gStar = fract(aRandom * 7.13);
        float isCore = 1.0 - step(0.5, abs(gColor - 3.0));
        float isGDust = 1.0 - step(0.5, abs(gColor - 4.0));
        if (GALAXY > 0.5) {
            sphereSize = mix(0.65, 1.25, near) * (0.75 + 1.1 * pow(gStar, 5.0)) * (1.0 - 0.35 * isGDust) * (1.0 - 0.2 * isCore);
            sphereSize *= 1.0 + isNode * isSel * uSelAmt * 1.3;
        }

        size *= mix(1.0, mix(treeSize, sphereSize, MIDDLE_SPHERE), wTree);
        gl_PointSize = size * uPixelRatio / -mv.z;

        vec3 nv = normalize(normalMatrix * n);
        float rim = pow(1.0 - abs(nv.z), 1.6);
        float key = pow(max(dot(nv, normalize(vec3(-0.55, 0.45, 0.7))), 0.0), 3.0);
        float depth = mix(0.3, 1.0, smoothstep(-4.8, -2.9, mv.z));

        // Beyin: kenar parlaması, yönlü ışık ve parlayıp sönen nöron ateşlemeleri
        float fire = sin(dot(position, vec3(7.1, 5.3, 6.7)) + uTime * 1.3) * sin(dot(position, vec3(-4.2, 8.1, 3.3)) - uTime * 0.9);
        fire = pow(max(fire, 0.0), 4.0);
        float brainAlpha = 0.12 + 0.55 * rim + 0.8 * key + fire * 1.0;
        if (isBrainDrip) brainAlpha = 1.3 * (1.0 - bFall);

        // PAIR: ön yüzde kod karakterleri, ön kenar parlak, arka kenar sönük, damlalar düştükçe söner
        float isCDrip = step(0.001, aDrip);
        float cFall = isCDrip * fract(uTime * aDrip + aRandom);
        float isFrontEdge = step(abs(aGlyph + 2.0), 0.1);
        float isBackEdge = step(abs(aGlyph + 3.0), 0.1);
        float codeFace = isGlyph ? 0.85 : 0.14 + 0.5 * rim;
        codeFace = mix(codeFace, 1.6, isFrontEdge);
        codeFace = mix(codeFace, 0.55, isBackEdge);
        float codeAlpha = mix(codeFace, 0.9 * (1.0 - cFall), isCDrip);

        // Ağaç: dünyadaki gibi sol üstten vuran ışık; aydınlık taraf parlak, gölge taraf loş (hacim)
        float treeSun = smoothstep(-0.3, 0.85, dot(nv, normalize(vec3(-0.45, 0.4, 0.8))));
        float treeAlpha = 0.45 + 1.05 * treeSun + 0.6 * rim;
        treeAlpha = mix(treeAlpha, 0.8 + 0.25 * sin(uTime * 1.7 + aRandom * 40.0), isTip);
        float leafShimmer = 0.8 + 0.2 * sin(uTime * 1.3 + aRandom * 50.0);
        treeAlpha = mix(treeAlpha, (0.5 + 1.0 * treeSun + 0.4 * rim) * leafShimmer, isLeaf);

        // Karar sinyalleri: nokta etkin yolun üzerindeyse ışık onun üzerinden geçer
        float branchId = aTreeInfo.x;
        float inA = 0.0;
        float inB = 0.0;
        float inC = 0.0;
        for (int i = 0; i < 6; i++) {
            if (abs(uPathA[i] - branchId) < 0.5) inA = 1.0;
            if (abs(uPathB[i] - branchId) < 0.5) inB = 1.0;
            if (abs(uPathC[i] - branchId) < 0.5) inC = 1.0;
        }
        float sigA = decisionSignal(inA, uHeads.x, aTreeInfo.y, aTreeInfo.z, level);
        float sigB = decisionSignal(inB, uHeads.y, aTreeInfo.y, aTreeInfo.z, level);
        float sigC = decisionSignal(inC, uHeads.z, aTreeInfo.y, aTreeInfo.z, level);
        float signal = min(sigA + sigB + sigC, 1.6) * (1.0 - MIDDLE_SPHERE);
        treeAlpha += signal * 0.85;
        gl_PointSize *= 1.0 + signal * 0.4 * wTree;

        // Mobilde ince dalların bir kısmı gizlenir; gövde ve ana çatallar korunur
        treeAlpha *= 1.0 - uMobile * step(2.5, level) * (1.0 - isTip) * step(isLeaf > 0.5 ? 0.35 : 0.45, aRandom);
        // Mobilde ağaç küçüldüğü için gövde ve ana dal noktaları üst üste biner; beyaza patlamasın
        treeAlpha *= 1.0 - uMobile * 0.45 * (1.0 - step(1.5, level));

        // Küre: seçili küme turkuaza doğru aydınlanır, diğerleri hafifçe söner
        float sphereAlpha = isDust > 0.5 ? 0.1 + 0.14 * near : 0.3 + 0.95 * near + isNode * isSel * uSelAmt * 0.9;
        sphereAlpha *= mix(1.0 - 0.55 * uSelAmt * (1.0 - isDust * 0.6), 1.0 + 0.9 * uSelAmt, isSel);
        // Mobilde nokta sayısı azalır; etiket noktaları ve kümeler arası boşluklar korunur
        sphereAlpha *= 1.0 - uMobile * step(0.62, aRandom) * (1.0 - isNode);
        if (GALAXY > 0.5) {
            float galaxyAlpha = (0.32 + 0.9 * pow(gStar, 3.0)) * mix(0.4, 1.15, near);
            galaxyAlpha = mix(galaxyAlpha, 0.16 + 0.1 * near, isGDust);
            galaxyAlpha = mix(galaxyAlpha, 0.5, isCore);
            // Kavram toplulukları kendi renklerinde biraz daha parlak
            galaxyAlpha *= 1.0 + 0.15 * (1.0 - isDust);

            // Kollar boyunca akan ışınlar: noktanın hangi ana kolun üzerinde olduğu spiral denkleminden bulunur,
            // her kolda iki ışın merkezden dışarı doğru akar
            float gr = length(aSphere.xz);
            float gth = atan(aSphere.z, aSphere.x);
            float armPhase = gth - log(max(gr, ARM_INNER) / ARM_INNER) / ARM_PITCH - ARM_START;
            float wrapped = mod(armPhase + 1.5708, 3.14159) - 1.5708;
            float armId = mod(floor((armPhase + 1.5708) / 3.14159), 2.0);
            float onArm = smoothstep(0.32, 0.04, abs(wrapped)) * step(ARM_INNER, gr) * (1.0 - isCore) * (1.0 - isGDust);
            float span = ARM_OUTER - ARM_INNER + 0.3;
            float h1 = ARM_INNER + fract(uTime * uRaySpeed + armId * 0.37) * span - gr;
            float h2 = ARM_INNER + fract(uTime * uRaySpeed + armId * 0.37 + 0.5) * span - gr;
            float c1 = h1 >= 0.0 ? exp(-h1 * 9.0) : smoothstep(-0.03, 0.0, h1);
            float c2 = h2 >= 0.0 ? exp(-h2 * 9.0) : smoothstep(-0.03, 0.0, h2);
            // Topluluklarda ışın zayıflar; üst üste binip beyaza patlamasın
            galaxyRay = onArm * max(c1, c2) * 0.8 * (1.0 - 0.7 * (1.0 - isDust));
            // Işınlar buz mavisi ve beyaza yakın; menekşe tonu hafifçe kalır
            galaxyRayColor = mix(palette(fract(armId * 0.5 + 0.15 + step(0.0, h2) * step(h1, 0.0) * 0.33)), vec3(0.85, 0.94, 1.0), 0.5);
            galaxyAlpha += galaxyRay * 0.9;
            // Seçili topluluk hafifçe aydınlanır (beyaza patlamadan), diğerleri söner; üç yıldız belirginleşir
            galaxyAlpha *= mix(1.0 - 0.45 * uSelAmt, 1.0 + 0.55 * uSelAmt, isSel);
            galaxyAlpha += isNode * isSel * uSelAmt * 1.2;
            // Mobilde önce yıldız tozu, sonra kollardaki yoğunluk azalır; topluluklar ve çekirdek korunur
            galaxyAlpha *= 1.0 - uMobile * (isGDust * step(0.35, aRandom) + (1.0 - isGDust) * (1.0 - isCore) * step(cluster, -0.5) * step(0.75, aRandom));
            sphereAlpha = galaxyAlpha * uGalaxyBrightness;
        }
        float midAlpha = mix(treeAlpha, sphereAlpha, MIDDLE_SPHERE);

        // Dünya: kıtalar belirgin, okyanus sönük, veri yollarında sinyaller akar
        float isRoute = step(0.0, aEdgeT);
        float isOcean = step(aEdgeT, -1.5);
        // Her rotada iki kuyruklu yıldız: parlak baş, arkada sönerek uzayan kuyruk
        float head1 = fract(uTime * 0.28 + aEdgeSeed) - aEdgeT;
        float head2 = fract(uTime * 0.28 + aEdgeSeed + 0.5) - aEdgeT;
        float comet1 = head1 >= 0.0 ? exp(-head1 * 11.0) : smoothstep(-0.02, 0.0, head1);
        float comet2 = head2 >= 0.0 ? exp(-head2 * 11.0) : smoothstep(-0.02, 0.0, head2);
        float pulse = isRoute * max(comet1, comet2) * 0.55;

        // Sol üstten vuran ışık: aydınlık yüz parlak, karanlık yüz sönük (hacim hissi)
        float sun = smoothstep(-0.3, 0.85, dot(nv, normalize(vec3(-0.45, 0.4, 0.8))));
        float twinkle = 0.85 + 0.15 * sin(uTime * 2.3 + aRandom * 60.0);
        float landAlpha = (0.3 + 0.95 * sun + 0.55 * rim) * twinkle;
        float oceanAlpha = 0.04 + 0.08 * sun;
        // Şehir kümeleri (yüzeyin biraz üstündeki noktalar) üst üste binip fazla parlamasın
        float isHub = (1.0 - isRoute) * (1.0 - isOcean) * step(0.002, abs(length(aGlobe) - 0.9));
        landAlpha *= mix(1.0, 0.45, isHub);
        float globeAlpha = mix(mix(landAlpha, oceanAlpha, isOcean), 0.1, isRoute) + pulse * 0.75;

        // Kuyruklu yıldızın başındaki noktalar büyür
        gl_PointSize *= 1.0 + pulse * wGlobe * 0.45;

        vAlpha = (brainAlpha * wBrain + codeAlpha * wCode + midAlpha * wTree + globeAlpha * wGlobe) * depth * intro;
        vRim = rim * (wBrain + wGlobe + (isGlyph ? 0.0 : wCode) + wTree * mix(0.6, 0.15, MIDDLE_SPHERE)) + isLeaf * wTree * 0.4 * (1.0 - MIDDLE_SPHERE);
        float brainFire = fire * wBrain * (isBrainDrip ? 0.0 : 1.0);
        float treeSignal = signal * wTree;
        // Küre renkleri: koyu mavi, lavanta, buz mavisi; seçili küme turkuaz
        vec3 sphereBase = aSphereInfo.z < 0.5 ? vec3(0.4, 0.55, 1.0) : (aSphereInfo.z < 1.5 ? vec3(0.72, 0.62, 1.0) : vec3(0.82, 0.93, 1.0));
        // Galaksi renkleri: buz mavisi, soluk menekşe, turkuaz vurgu, sıcak beyaz çekirdek, mavi toz
        if (GALAXY > 0.5) {
            sphereBase = gColor < 0.5 ? vec3(0.45, 0.72, 1.0)
                : gColor < 1.5 ? vec3(0.68, 0.66, 1.0)
                : gColor < 2.5 ? vec3(0.25, 0.95, 0.9)
                : gColor < 3.5 ? vec3(1.0, 0.88, 0.7)
                : vec3(0.42, 0.52, 1.0);
        }
        vec3 sphereColor = mix(sphereBase, vec3(0.3, 1.0, 0.9), isSel * uSelAmt * (GALAXY > 0.5 ? 0.8 : 1.0));
        float sphereTint = wTree * MIDDLE_SPHERE * 0.9;
        float rayTint = galaxyRay * wTree * GALAXY;
        vPulse = pulse * wGlobe + brainFire + treeSignal + sphereTint + rayTint;
        vec3 fireColor = palette(hash(floor(position * 3.0)));
        vec3 routeColor = palette(aEdgeSeed);
        vec3 signalColor = (uSignalA * sigA + uSignalB * sigB + uSignalC * sigC) / max(sigA + sigB + sigC, 0.0001);
        vPulseColor = (fireColor * brainFire + routeColor * pulse * wGlobe + signalColor * treeSignal + sphereColor * sphereTint + galaxyRayColor * rayTint) / max(vPulse, 0.0001);
        vScan = 1.0 - smoothstep(0.0, 0.12, abs(p.y - uScanY));
        vHeight = p.y;

        // PAIR yazısındaki kod karakterleri zamanla değişir; beyinden damlayanlar da karakter olarak çizilir
        vGlyph = isGlyph ? mod(aGlyph + floor(uTime * 0.8 + aRandom * 7.0), 16.0) : -1.0;
        vGlyphMix = isGlyph ? wCode : 0.0;
        if (isBrainDrip && wBrain > 0.0) {
            vGlyph = mod(floor(aRandom * 997.0 + uTime * 0.8), 16.0);
            vGlyphMix = wBrain;
        }
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorRim;
    uniform sampler2D uAtlas;

    varying float vAlpha;
    varying float vScan;
    varying float vHeight;
    varying float vRim;
    varying float vGlyph;
    varying float vGlyphMix;
    varying float vPulse;
    varying vec3 vPulseColor;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        float glow = pow(smoothstep(0.5, 0.0, d), 1.6);

        // Kod karakteri olarak çizilen noktalar atlas'tan okunur
        float glyph = 0.0;
        if (vGlyph >= 0.0) {
            float g = floor(vGlyph + 0.5);
            vec2 cell = vec2(mod(g, 4.0), floor(g / 4.0));
            vec2 uv = vec2((gl_PointCoord.x + cell.x) / 4.0, 1.0 - (gl_PointCoord.y + cell.y) / 4.0);
            glyph = texture2D(uAtlas, uv).a;
        }
        float shape = mix(glow, glyph, vGlyphMix);

        vec3 color = mix(uColorB, uColorA, smoothstep(-1.0, 0.6, vHeight));
        color = mix(color, uColorRim, max(vRim * 0.65, vGlyphMix * 0.55));
        color = mix(color, vPulseColor, clamp(vPulse, 0.0, 1.0) * 0.85);
        color += vScan * vec3(0.6, 0.85, 1.0) + vPulse * vPulseColor * 0.35;

        gl_FragColor = vec4(color, shape * vAlpha * (0.55 + vScan));
    }
`;

// Dünyanın etrafındaki atmosfer parlaması (kenarlarda yoğun)
const atmosphereVertex = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
    }
`;

const atmosphereFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uColor2;
    uniform float uOpacity;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        float fresnel = pow(1.0 - abs(dot(vNormal, vView)), 3.0);
        vec3 color = mix(uColor2, uColor, smoothstep(-0.6, 0.6, vNormal.y));
        gl_FragColor = vec4(color, fresnel * uOpacity);
    }
`;

// Dünyanın dışına taşan yumuşak hale (arka yüzden çizilir, kenardan dışarı söner)
const haloFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uColor2;
    uniform float uOpacity;
    varying vec3 vNormal;
    void main() {
        float intensity = pow(clamp(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.0);
        vec3 color = mix(uColor2, uColor, smoothstep(-0.6, 0.6, vNormal.y));
        gl_FragColor = vec4(color, intensity * uOpacity);
    }
`;

// Tacın arkasında yumuşak, renk geçişli bir hale (dünyadaki atmosferin karşılığı)
const canopyGlowVertex = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const canopyGlowFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uColor2;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
        float d = length((vUv - 0.5) * vec2(1.0, 1.15)) * 2.0;
        float glow = pow(clamp(1.0 - d, 0.0, 1.0), 2.2);
        vec3 color = mix(uColor2, uColor, vUv.y);
        gl_FragColor = vec4(color, glow * uOpacity);
    }
`;

// Galaksinin arkasındaki koyu gece laciverti fon: kenarlara doğru şeffaflaşır, tuval sınırı görünmez
const backdropFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
        float d = length((vUv - 0.5) * 2.0);
        float a = pow(clamp(1.0 - d, 0.0, 1.0), 2.2);
        gl_FragColor = vec4(uColor, a * uOpacity);
    }
`;

// Galaksi çekirdeğindeki küçük, sıcak beyaz ışık
const coreGlowFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
        float d = length((vUv - 0.5) * 2.0);
        float a = pow(clamp(1.0 - d, 0.0, 1.0), 3.0);
        gl_FragColor = vec4(uColor, a * uOpacity);
    }
`;

// Galaksinin yoğunluk katmanı: yalnızca galakside görünen ek yıldızlar
const fieldVertex = /* glsl */ `
    attribute vec3 aColor;
    attribute float aSize;
    uniform float uOpacity;
    uniform float uPixelRatio;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float near = smoothstep(-4.8, -2.8, mv.z);
        gl_PointSize = aSize * 14.0 * uPixelRatio * mix(0.7, 1.15, near) / -mv.z;
        vColor = aColor;
        vAlpha = uOpacity * mix(0.35, 0.95, near) * (0.55 + 0.25 * aSize);
    }
`;

const fieldFragment = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float glow = pow(smoothstep(0.5, 0.0, d), 1.8);
        gl_FragColor = vec4(vColor, glow * vAlpha);
    }
`;

// Işıklı disk: Samanyolu'ndaki gibi sarı bulge ve bar, kollar boyunca sürekli parıltı, etrafta mor hale.
// Disk düzleminde çizilir; galaksiyle birlikte eğilir ve döner
const diskGlowFragment = /* glsl */ `
    uniform float uOpacity;
    varying vec2 vUv;
    const float SIZE = ${DISK_SIZE.toFixed(4)};
    const float ARM_START = ${ARM_START.toFixed(4)};
    const float ARM_PITCH = ${ARM_PITCH.toFixed(4)};
    const float ARM_INNER = ${ARM_INNER.toFixed(4)};
    const float HALO = ${GALAXY_HALO.toFixed(4)};

    float armGlow(float phase, float r) {
        float w = mod(phase + 1.5708, 3.14159) - 1.5708;
        float sigma = 0.14 + 0.1 * r;
        return exp(-w * w / (2.0 * sigma * sigma));
    }

    void main() {
        vec2 q = (vUv - 0.5) * SIZE;
        float x = q.x;
        float z = -q.y;
        float r = length(q);
        float th = atan(z, x);
        float ph = th - log(max(r, ARM_INNER) / ARM_INNER) / ARM_PITCH - ARM_START;

        float major = armGlow(ph, r) * smoothstep(0.2, 0.4, r) * exp(-max(r - 0.3, 0.0) / 0.6);
        float minor = armGlow(ph - 1.5708, r) * smoothstep(0.4, 0.6, r) * exp(-max(r - 0.4, 0.0) / 0.6);
        vec2 bd = vec2(cos(ARM_START), sin(ARM_START));
        float along = dot(vec2(x, z), bd);
        float across = dot(vec2(x, z), vec2(-bd.y, bd.x));
        float bar = exp(-along * along / (2.0 * 0.21 * 0.21) - across * across / (2.0 * 0.065 * 0.065));
        float bulge = exp(-r * r / (2.0 * 0.13 * 0.13));
        float disk = exp(-r / 0.45) * 0.3;
        float halo = exp(-pow((r - 1.2) / 0.35, 2.0)) * 0.9 + exp(-r / 1.1) * 0.25;

        vec3 armColor = mix(vec3(0.5, 0.68, 1.0), vec3(0.66, 0.68, 1.0), smoothstep(0.4, 1.2, r));
        vec3 color = armColor * (major * 0.55 + minor * 0.22 + disk)
            + vec3(1.0, 0.82, 0.52) * (bulge * 1.3 + bar * 0.75)
            // Hale: beyaza yakın buz mavisi (galaksinin kendi menekşe tonlarına dokunmaz)
            + vec3(0.68, 0.84, 1.0) * halo * HALO;
        float edge = smoothstep(SIZE * 0.5, SIZE * 0.4, r);
        gl_FragColor = vec4(color, edge * uOpacity);
    }
`;

// Döngüdeki konumu verir: stage 0 beyin→PAIR, 1 PAIR→dünya, 2 dünya→kavram formu, 3 kavram formu→beyin
const getMorph = (elapsed) => {
    const cycleTime = elapsed % CYCLE;
    let stage = 0;
    while (stage < STAGES - 1 && cycleTime >= STAGE_START[stage + 1]) stage++;
    const local = cycleTime - STAGE_START[stage];
    const f = local < HOLDS[stage] ? 0 : (local - HOLDS[stage]) / TRANSITION;
    return { stage, f, cycleTime };
};

// Kod karakterleri için 4x4'lük doku atlası
const createGlyphAtlas = () => {
    const cell = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = cell * 4;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${cell * 0.72}px "JetBrains Mono", Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    GLYPHS.forEach((char, i) => {
        ctx.fillText(char, (i % 4) * cell + cell / 2, Math.floor(i / 4) * cell + cell / 2);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
};

// Beyin ve dünya nokta verilerini okur
const useMindData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            fetch("/mind/brain.bin").then((res) => res.arrayBuffer()),
            fetch("/mind/globe.bin").then((res) => res.arrayBuffer()),
        ]).then(([brainBuffer, globeBuffer]) => {
            if (cancelled) return;

            // brain.bin: [nokta sayısı, çizgi sayısı] + konumlar + normaller + çizgiler
            const [count, brainLineCount] = new Uint32Array(brainBuffer, 0, 2);
            const floats = new Float32Array(brainBuffer, 8);
            const shapeLength = count * 3;

            const [, globeLineCount] = new Uint32Array(globeBuffer, 0, 2);
            const g = new Float32Array(globeBuffer, 8);
            const globe = {
                positions: g.slice(0, count * 3),
                normals: g.slice(count * 3, count * 6),
                edgeT: g.slice(count * 6, count * 7),
                edgeSeed: g.slice(count * 7, count * 8),
                lines: g.slice(count * 8, count * 8 + globeLineCount * 6),
            };

            const brainPositions = floats.slice(0, shapeLength);
            const { center } = fitBrain(brainPositions);
            // Çizgiler de aynı merkez ve ölçekle taşınır
            const brainLines = floats.slice(shapeLength * 2, shapeLength * 2 + brainLineCount * 6);
            for (let i = 0; i < brainLines.length; i += 3) {
                brainLines[i] = (brainLines[i] - center.x) * BRAIN_SCALE;
                brainLines[i + 1] = (brainLines[i + 1] - center.y) * BRAIN_SCALE;
                brainLines[i + 2] = (brainLines[i + 2] - center.z) * BRAIN_SCALE;
            }

            setData({
                count,
                brain: {
                    positions: brainPositions,
                    normals: floats.slice(shapeLength, shapeLength * 2),
                    lines: brainLines,
                },
                globe,
            });
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return data;
};

// İmleç konumu: parallax için -1..1, hover için ekran pikseli
const usePointer = () => {
    const pointer = useRef({ x: 0, y: 0, clientX: -9999, clientY: -9999, tapX: -9999, tapY: -9999, tapTime: -1e9 });

    useEffect(() => {
        const handleMove = (e) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
            pointer.current.clientX = e.clientX;
            pointer.current.clientY = e.clientY;
        };

        // Dokunuş kümeyi seçer; kaydırmayı engellemez (preventDefault yok)
        const handleDown = (e) => {
            if (e.pointerType === "mouse") return;
            pointer.current.tapX = e.clientX;
            pointer.current.tapY = e.clientY;
            pointer.current.tapTime = performance.now();
        };

        window.addEventListener("pointermove", handleMove, { passive: true });
        window.addEventListener("pointerdown", handleDown, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerdown", handleDown);
        };
    }, []);

    return pointer;
};

// Bir şeklin çizgileri sadece o şekil durağanken görünür
const lineWeight = (shape, stage, f) => {
    const next = (stage + 1) % STAGES;
    let w = 0;
    if (shape === stage) w = 1 - THREE.MathUtils.smoothstep(f, 0, 0.35);
    if (shape === next) w = Math.max(w, THREE.MathUtils.smoothstep(f, 0.65, 1));
    return w;
};

const lineGeometry = (arr) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
};

// Sinyal yolunu shader'daki 6 elemanlı diziye yazar (gövde + 5 dal seviyesi, boş yerler -1)
const writePath = (target, path) => {
    for (let i = 0; i < 6; i++) target[i] = path && i < path.length ? path[i] : -1;
};

const MindPoints = ({ data, pointer, playIntro, reduceMotion, onStageChange, viewRef, labelRefs }) => {
    const group = useRef();
    const atmosphere = useRef();
    const halo = useRef();
    const canopyGlow = useRef();
    const occluder = useRef();
    const lastStageKey = useRef(null);
    const material = useRef();
    const brainLines = useRef();
    const globeLines = useRef();
    const startTime = useRef(null);
    const loopClock = useRef(0);
    const paused = useRef(false);
    const conceptLines = useRef();
    const projected = useMemo(() => new THREE.Vector3(), []);
    const projected2 = useMemo(() => new THREE.Vector3(), []);
    const tmp = useMemo(() => [0, 1, 2].map(() => new THREE.Vector3()), []);
    // Küre etkileşim durumu: dönüş açısı, seçili küme, seçimin parlaklığı (0..1), tanıtım
    const sel = useRef({ angle: 0, spin: 1, shown: -1, amt: 0, inHold: false, demoStart: 0, demoUntil: -1, interacted: false, hint: 0 });
    // Kavram formunun yerleşimi (galakside sahne alanına göre her karede hesaplanır)
    const concept = useRef({ scale: 1, offset: new THREE.Vector3(), tilt: new THREE.Matrix3() });
    // Tek sütunlu düzende galaksi ölçeği: kenar halkası bir kez kurulur, ölçek görünüm değişince yenilenir
    const galaxyFit = useRef({ view: null, rim: null, scale: 1 });
    const backdrop = useRef();
    const coreGlow = useRef();
    const galaxyFrame = useRef();
    const fieldMat = useRef();
    const diskMat = useRef();
    const frameMatrices = useMemo(() => [0, 1, 2, 3].map(() => new THREE.Matrix4()), []);
    const galaxyField = useMemo(() => {
        if (!IS_GALAXY) return null;
        const field = buildGalaxyField(FIELD_COUNT);
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(field.positions, 3));
        g.setAttribute("aColor", new THREE.BufferAttribute(field.colors, 3));
        g.setAttribute("aSize", new THREE.BufferAttribute(field.sizes, 1));
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
        g.userData.radius = field.radius;
        return g;
    }, []);

    // Etiket ve ipucu yazıları için kod düşmesi animasyonu durumu
    const decoder = useRef([0, 1, 2, 3].map(() => ({ target: "", start: 0, done: true })));
    const setText = (i, text, now) => {
        const d = decoder.current[i];
        const el = labelRefs.current[i];
        if (!el || d.target === text) return;
        d.target = text;
        d.start = now;
        d.done = false;
        // Düşme animasyonunu yeniden başlat
        el.classList.remove("is-decoding");
        void el.offsetWidth;
        el.classList.add("is-decoding");
    };
    const tickText = (now) => {
        decoder.current.forEach((d, i) => {
            const el = labelRefs.current[i];
            if (!el || d.done) return;
            const t = now - d.start;
            if (t >= DECODE_TIME) {
                el.textContent = d.target;
                d.done = true;
            } else {
                el.textContent = decodeText(d.target, t);
            }
        });
    };
    const center2 = useMemo(() => new THREE.Vector3(), []);

    // Kavram noktasının grup içindeki konumu (shader'daki conceptPos ile aynı)
    const conceptInto = (out, v, angle) => {
        const c = concept.current;
        return rotYInto(out, v, angle).applyMatrix3(c.tilt).multiplyScalar(c.scale).add(c.offset);
    };
    const isTouch = useMemo(() => window.matchMedia("(hover: none)").matches, []);

    // Sinyal durumu: A insan, B model, C hover/dokunma darbesi
    const signals = useRef({ a: null, b: null, head: -1, wait: 0, c: null, headC: -1, hover: -1, touchTimer: 2 });

    const { geometry, brainLineGeo, globeLineGeo, tree, sphere, conceptLineGeo } = useMemo(() => {
        const tree = buildTree(data.count);

        const code = buildCode(data.count);

        // Kavram formu dünyadan oluştuğu için noktaları dünya noktalarına uzayda yakın eşleştirilir
        const sphere = IS_GALAXY ? buildGalaxy(data.count) : buildSphere(data.count);
        const brainOrder = mortonOrder(data.globe.positions, data.count);
        const sphereOrder = mortonOrder(sphere.positions, data.count);
        const spherePos = new Float32Array(data.count * 3);
        const sphereInfo = new Float32Array(data.count * 3);
        for (let k = 0; k < data.count; k++) {
            const b = brainOrder[k];
            const sp = sphereOrder[k];
            spherePos.set(sphere.positions.subarray(sp * 3, sp * 3 + 3), b * 3);
            sphereInfo.set(sphere.info.subarray(sp * 3, sp * 3 + 3), b * 3);
        }
        const conceptLineGeo = new THREE.BufferGeometry();
        conceptLineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(12), 3));
        const random = new Float32Array(data.count);
        for (let i = 0; i < data.count; i++) random[i] = Math.random();

        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(data.brain.positions, 3));
        g.setAttribute("normal", new THREE.BufferAttribute(data.brain.normals, 3));
        g.setAttribute("aGlobe", new THREE.BufferAttribute(data.globe.positions, 3));
        g.setAttribute("aGlobeNormal", new THREE.BufferAttribute(data.globe.normals, 3));
        const misc = new Float32Array(data.count * 4);
        for (let i = 0; i < data.count; i++) {
            misc[i * 4] = data.globe.edgeT[i];
            misc[i * 4 + 1] = data.globe.edgeSeed[i];
            misc[i * 4 + 2] = code.glyph[i];
            misc[i * 4 + 3] = code.drip[i];
        }
        g.setAttribute("aMisc", new THREE.BufferAttribute(misc, 4));
        g.setAttribute("aTree", new THREE.BufferAttribute(tree.positions, 3));
        g.setAttribute("aTreeNormal", new THREE.BufferAttribute(tree.normals, 3));
        g.setAttribute("aTreeInfo", new THREE.BufferAttribute(tree.info, 4));
        g.setAttribute("aSphere", new THREE.BufferAttribute(spherePos, 3));
        g.setAttribute("aSphereInfo", new THREE.BufferAttribute(sphereInfo, 3));
        g.setAttribute("aCode", new THREE.BufferAttribute(code.positions, 3));
        g.setAttribute("aCodeNormal", new THREE.BufferAttribute(code.normals, 3));
        g.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
        g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);

        // Ağaç açısında dönmüş haldeki yatay sınırlar (sığdırma hesabı için)
        const c = Math.cos(STAGE_RY[CONCEPT_STAGE]);
        const sn = Math.sin(STAGE_RY[CONCEPT_STAGE]);
        tree.rootX = TREE_ROOT[0] * c + TREE_ROOT[2] * sn;
        tree.minX = Infinity;
        tree.maxX = -Infinity;
        for (let i = 0; i < data.count; i++) {
            const x = tree.positions[i * 3] * c + tree.positions[i * 3 + 2] * sn;
            tree.minX = Math.min(tree.minX, x);
            tree.maxX = Math.max(tree.maxX, x);
        }

        return {
            geometry: g,
            brainLineGeo: lineGeometry(data.brain.lines),
            globeLineGeo: lineGeometry(data.globe.lines),
            tree,
            sphere,
            conceptLineGeo,
        };
    }, [data]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMorph: { value: 0 },
            uIntro: { value: playIntro ? 0 : 1 },
            uSize: { value: 22 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uScanY: { value: 10 },
            uGlobeAngle: { value: GLOBE_START },
            uGlobeTilt: { value: GLOBE_TILT },
            uTreeRoot: { value: new THREE.Vector3(...TREE_ROOT) },
            uTreeScale: { value: 1 },
            uTreeMaxDist: { value: tree.maxDist },
            uMobile: { value: 0 },
            uPathA: { value: [-1, -1, -1, -1, -1, -1] },
            uPathB: { value: [-1, -1, -1, -1, -1, -1] },
            uPathC: { value: [-1, -1, -1, -1, -1, -1] },
            uHeads: { value: new THREE.Vector3(-1, -1, -1) },
            uSignalA: { value: SIGNAL_HUMAN },
            uSignalB: { value: SIGNAL_MODEL },
            uSignalC: { value: SIGNAL_HOVER },
            uSphereAngle: { value: 0 },
            uSelected: { value: -1 },
            uSelAmt: { value: 0 },
            uConceptTilt: { value: sphere.tilt ? new THREE.Matrix3().set(...sphere.tilt) : new THREE.Matrix3() },
            uConceptScale: { value: 1 },
            uConceptOffset: { value: new THREE.Vector3() },
            uGalaxyBrightness: { value: GALAXY_BRIGHTNESS },
            uRaySpeed: { value: GALAXY_RAY_SPEED },
            uColorA: { value: ICE },
            uColorB: { value: LAVENDER },
            uColorRim: { value: CYAN },
            uAtlas: { value: createGlyphAtlas() },
        }),
        [playIntro, tree, sphere]
    );

    // İnsan ve model için iki yol seçer: bazen aynı ana dalda ilerleyip ileride ayrılırlar,
    // bazen gövdenin tepesindeki çatalda farklı ana dallara giderler
    const pickDecision = () => {
        const leaves = tree.leaves;
        const a = leaves[Math.floor(Math.random() * leaves.length)];
        const sameMain = leaves.filter((l) => l.main === a.main && l !== a);
        const otherMain = leaves.filter((l) => l.main !== a.main);
        const pool = Math.random() < 0.55 && sameMain.length ? sameMain : otherMain;
        return { a, b: pool[Math.floor(Math.random() * pool.length)] };
    };

    const startHover = (main) => {
        const s = signals.current;
        s.c = main.leaf;
        s.headC = 0;
    };

    // İmlecin (veya son dokunuşun) üzerinde olduğu kümeyi bulur; her kümenin görünmez,
    // geniş bir seçim alanı vardır, tek tek noktaları yakalamak gerekmez
    const pickCluster = (camera, gl, angle) => {
        const p = pointer.current;
        let x = p.clientX;
        let y = p.clientY;
        if (isTouch) {
            if (performance.now() - p.tapTime > TAP_HOLD * 1000) return -1;
            x = p.tapX;
            y = p.tapY;
        }
        const rect = gl.domElement.getBoundingClientRect();
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return -1;
        group.current.updateWorldMatrix(true, false);
        let best = -1;
        let bestScore = Infinity;
        sphere.clusters.forEach((c, ci) => {
            conceptInto(projected, c.center, angle).applyMatrix4(group.current.matrixWorld);
            projected2.copy(projected);
            projected2.x += c.pickRadius * concept.current.scale;
            projected.project(camera);
            projected2.project(camera);
            const px = rect.left + (projected.x * 0.5 + 0.5) * rect.width;
            const py = rect.top + (-projected.y * 0.5 + 0.5) * rect.height;
            const radius = Math.abs(projected2.x - projected.x) * 0.5 * rect.width + PICK_PADDING;
            const d = Math.hypot(px - x, py - y);
            // Önde duran küme, arkadakiyle çakışırsa öncelik kazanır
            const score = d / radius + projected.z * 2;
            if (d < radius && score < bestScore) {
                bestScore = score;
                best = ci;
            }
        });
        return best;
    };

    useFrame(({ clock, camera, gl, size }, delta) => {
        // R3F uniforms nesnesini kopyaladığı için değerler malzemenin kendi nesnesine yazılır
        const u = material.current.uniforms;
        const now = clock.getElapsedTime();
        if (startTime.current === null) startTime.current = now;
        const elapsed = now - startTime.current;

        const intro = playIntro ? Math.min(1, Math.max(0, (elapsed - INTRO_DELAY) / INTRO_DURATION)) : 1;
        // Döngü saati: kullanıcı bir kümeyi incelerken bekler, bitince kaldığı yerden devam eder
        if (elapsed > (playIntro ? INTRO_DELAY + INTRO_DURATION : 0) && !paused.current) loopClock.current += delta;
        const loopTime = loopClock.current;
        const loop = getMorph(loopTime);
        // Hareketi azaltma tercihinde sakin, sabit bir ağaç gösterilir
        const stage = reduceMotion ? CONCEPT_STAGE : loop.stage;
        const f = reduceMotion ? 0 : loop.f;

        // Dünya, ağaç→dünya geçişi başladığından beri yavaşça döner
        const globeTime = Math.max(0, loop.cycleTime - (STAGE_START[1] + HOLDS[1]));
        const globeAngle = GLOBE_START + globeTime * GLOBE_SPEED;

        // Ağacın ölçeği: en yüksek dal görünür alanın tepesine, taç yanlara sığsın
        const view = viewRef.current;
        const fitTop = (view.top - 0.22 - TREE_ROOT[1]) / (tree.topY - TREE_ROOT[1]);
        const fitLeft = (tree.rootX - (view.left + 0.12)) / (tree.rootX - tree.minX);
        const fitRight = (view.right - 0.12 - tree.rootX) / (tree.maxX - tree.rootX);
        const treeScale = THREE.MathUtils.clamp(Math.min(fitTop, fitLeft, fitRight), 0.5, 1);

        u.uTime.value = elapsed;
        u.uIntro.value = intro;
        u.uMorph.value = stage + f;
        u.uScanY.value = f > 0 ? THREE.MathUtils.lerp(1.2, -1.2, f) : 10;
        u.uGlobeAngle.value = globeAngle;
        u.uTreeScale.value = treeScale;
        u.uMobile.value = view.mobile ? 1 : 0;

        // --- Karar sinyalleri (sadece ağaç durağanken) ---
        const s = signals.current;
        const treeHold = !IS_SPHERE && stage === CONCEPT_STAGE && f === 0 && intro >= 1 && !reduceMotion;
        if (treeHold) {
            if (s.head < 0) {
                s.wait -= delta;
                if (s.wait <= 0) {
                    const pick = pickDecision();
                    s.a = pick.a;
                    s.b = pick.b;
                    s.head = 0;
                }
            } else {
                s.head += SIGNAL_SPEED * delta;
                if (s.head - MODEL_LAG > Math.max(s.a.tipDist, s.b.tipDist) + SIGNAL_FADE) {
                    s.head = -1;
                    s.wait = SIGNAL_PAUSE;
                }
            }

            // Hover: imleç bir ana dala yaklaşınca gövdeden o dalın ucuna tek bir ışık darbesi
            if (!isTouch) {
                const rect = gl.domElement.getBoundingClientRect();
                let nearest = -1;
                let best = HOVER_RADIUS;
                group.current.updateWorldMatrix(true, false);
                tree.mains.forEach((main, mi) => {
                    for (const pt of main.hover) {
                        projected
                            .set(
                                TREE_ROOT[0] + (pt[0] - TREE_ROOT[0]) * treeScale,
                                TREE_ROOT[1] + (pt[1] - TREE_ROOT[1]) * treeScale,
                                TREE_ROOT[2] + (pt[2] - TREE_ROOT[2]) * treeScale
                            )
                            .applyMatrix4(group.current.matrixWorld)
                            .project(camera);
                        const px = rect.left + (projected.x * 0.5 + 0.5) * rect.width;
                        const py = rect.top + (-projected.y * 0.5 + 0.5) * rect.height;
                        const d = Math.hypot(px - pointer.current.clientX, py - pointer.current.clientY);
                        if (d < best) {
                            best = d;
                            nearest = mi;
                        }
                    }
                });
                // Aynı dalda durulurken darbe yeniden başlatılmaz
                if (nearest !== s.hover) {
                    s.hover = nearest;
                    if (nearest >= 0) startHover(tree.mains[nearest]);
                }
            } else {
                // Dokunmatik cihazlarda aynı darbe ara sıra kendiliğinden oynar
                s.touchTimer -= delta;
                if (s.touchTimer <= 0) {
                    s.touchTimer = TOUCH_INTERVAL + Math.random() * 2;
                    startHover(tree.mains[Math.floor(Math.random() * tree.mains.length)]);
                }
            }

            if (s.headC >= 0) {
                s.headC += SIGNAL_SPEED * 1.3 * delta;
                if (s.headC > s.c.tipDist + SIGNAL_FADE) s.headC = -1;
            }
        } else {
            s.head = -1;
            s.headC = -1;
            s.hover = -1;
            s.wait = 0.3;
        }

        writePath(u.uPathA.value, s.head >= 0 ? s.a.path : null);
        writePath(u.uPathB.value, s.head >= 0 ? s.b.path : null);
        writePath(u.uPathC.value, s.headC >= 0 ? s.c.path : null);
        u.uHeads.value.set(s.head, s.head >= 0 ? s.head - MODEL_LAG : -1, s.headC);

        // --- AI kavram küresi: dönüş, seçim, etiketler ---
        if (IS_SPHERE) {
            const st = sel.current;
            const sphereHold = stage === CONCEPT_STAGE && f === 0 && intro >= 1;

            // Galaksi, arkasındaki koyu alanın (sahnenin asıl kutusu) tam ortasında durur;
            // ölçek, merkezden her yöne kalan sahne alanına göre ayarlanır
            if (IS_GALAXY) {
                const c = concept.current;
                const b = sphere.bounds;
                if (view.extended) {
                    // Masaüstü (sahne header'a doğru uzatılmış): önceki hesap aynen korunur
                    const halfW = Math.min(-view.left, view.right) - GALAXY_MARGIN;
                    const halfH = Math.min(view.top - 0.25, -view.bottom) - GALAXY_MARGIN;
                    c.scale = THREE.MathUtils.clamp(Math.min(halfW / b.halfWidth, halfH / b.halfHeight) * GALAXY_SCALE, 0.6, 1.6);
                } else {
                    // Tek sütunlu düzen (≤ 1160px): ana parçacıklar, ek yıldız katmanı ve ışıklı hale
                    // birlikte, perspektif dahil sahneye sığar. Görünüm değişince bir kez hesaplanır
                    const fit = galaxyFit.current;
                    if (fit.view !== view) {
                        if (!fit.rim) {
                            const reach = Math.max(b.radius, galaxyField.userData.radius, GALAXY_GLOW_REACH);
                            fit.rim = galaxyRim(u.uConceptTilt.value, reach);
                        }
                        fit.view = view;
                        fit.scale = fitGalaxyScale(fit.rim, view, camera.position, GALAXY_MARGIN) * GALAXY_SCALE;
                    }
                    c.scale = fit.scale;
                }
                c.offset.set(0, 0, 0);
                c.tilt.copy(u.uConceptTilt.value);
                u.uConceptScale.value = c.scale;
                u.uConceptOffset.value.copy(c.offset);
            }
            let target = -1;
            let user = false;
            if (sphereHold) {
                // Küre ilk oluştuğunda "attention" kümesi kısa süre kendiliğinden gösterilir
                if (!st.inHold) {
                    st.inHold = true;
                    // Galakside önce genel siluet oluşur, ardından "attention" kısa süre aydınlanır
                    st.demoStart = elapsed + (IS_GALAXY ? GALAXY_DEMO_DELAY : 0);
                    st.demoUntil = st.demoStart + DEMO_DURATION;
                }
                const hit = pickCluster(camera, gl, st.angle);
                if (hit >= 0) {
                    target = hit;
                    user = true;
                    st.demoUntil = -1; // kullanıcı yönelince kontrol hemen ona geçer
                    st.interacted = true;
                } else if (elapsed >= st.demoStart && elapsed < st.demoUntil) {
                    target = 0;
                }
            } else {
                st.inHold = false;
            }
            paused.current = user;

            if (target >= 0) {
                if (target !== st.shown) {
                    st.shown = target;
                    sphere.clusters[target].words.forEach((w, i) => setText(i, w, elapsed));
                }
                st.amt = THREE.MathUtils.damp(st.amt, 1, 6, delta);
            } else {
                st.amt = THREE.MathUtils.damp(st.amt, 0, sphereHold ? 5 : 14, delta);
                if (st.amt < 0.01) st.shown = -1;
            }

            // Dönüş: seçim varken yumuşakça durur; küre oluşana kadar ilk açıda bekler
            // Galakside kullanıcı kümeleri gezerken de dönüş sürer; kürede seçimle durur
            st.spin = THREE.MathUtils.damp(st.spin, reduceMotion || (target >= 0 && !IS_GALAXY) ? 0 : 1, 3, delta);
            if (stage === CONCEPT_STAGE) st.angle += SPHERE_SPIN * st.spin * delta;
            else st.angle = 0;

            u.uSphereAngle.value = st.angle;
            u.uSelected.value = st.shown;
            u.uSelAmt.value = st.amt;

            // Etiketler ve çizgiler sadece form yerindeyken görünür, geçiş başlayınca kapanır
            const show = st.shown >= 0 && f === 0 && stage === CONCEPT_STAGE ? st.amt : 0;
            conceptLines.current.material.opacity = show * 0.85;
            if (st.shown >= 0) {
                const anchors = sphere.clusters[st.shown].anchors;
                const linePos = conceptLines.current.geometry.attributes.position;
                anchors.forEach((a, i) => conceptInto(tmp[i], a, st.angle));
                // focus → attention, focus → distraction (uçlar 3D noktalara bağlı)
                [tmp[0], tmp[1], tmp[0], tmp[2]].forEach((v, i) => linePos.setXYZ(i, v.x, v.y, v.z));
                linePos.needsUpdate = true;

                // Etiketler kümenin hemen dışındaki koyu boşluğa yerleşir: her biri, kendi
                // yıldızından küme merkezinin tersi yönünde biraz uzağa itilir
                group.current.updateWorldMatrix(true, false);
                conceptInto(center2, sphere.clusters[st.shown].center, st.angle);
                center2.applyMatrix4(group.current.matrixWorld).project(camera);
                const cx = (center2.x * 0.5 + 0.5) * size.width;
                const cy = (-center2.y * 0.5 + 0.5) * size.height;
                tmp.forEach((v, i) => {
                    const el = labelRefs.current[i];
                    if (!el) return;
                    projected.copy(v).applyMatrix4(group.current.matrixWorld).project(camera);
                    const x = (projected.x * 0.5 + 0.5) * size.width;
                    const y = (-projected.y * 0.5 + 0.5) * size.height;
                    const len = Math.hypot(x - cx, y - cy) || 1;
                    const ux = (x - cx) / len;
                    const uy = (y - cy) / len;
                    const ax = ux < -0.35 ? -100 : ux > 0.35 ? 0 : -50;
                    const ay = uy < -0.35 ? -100 : uy > 0.35 ? 0 : -50;
                    el.style.transform = `translate(${(x + ux * 16).toFixed(1)}px, ${(y + uy * 16).toFixed(1)}px) translate(${ax}%, ${ay}%)`;
                    el.style.opacity = show.toFixed(3);
                });
            } else {
                labelRefs.current.forEach((el) => el && (el.style.opacity = "0"));
            }

            // Galaksinin altındaki yazı: seçim yokken "Explore the concept clusters",
            // bir küme seçiliyken o kümenin adı (ör. "Attention cluster")
            const hintEl = labelRefs.current[3];
            if (IS_GALAXY && hintEl) {
                const hintText = st.shown >= 0 && target >= 0 ? `${sphere.clusters[st.shown].name} cluster` : "Explore the concept clusters";
                if (sphereHold) setText(3, hintText, elapsed);
                st.hint = THREE.MathUtils.damp(st.hint, sphereHold ? 0.85 : 0, 4, delta);
                const c = concept.current;
                projected.set(c.offset.x, c.offset.y - sphere.bounds.halfHeight * c.scale - 0.06, 0);
                group.current.updateWorldMatrix(true, false);
                projected.applyMatrix4(group.current.matrixWorld).project(camera);
                const hx = (projected.x * 0.5 + 0.5) * size.width;
                const hy = (-projected.y * 0.5 + 0.5) * size.height;
                hintEl.style.transform = `translate(${hx.toFixed(1)}px, ${hy.toFixed(1)}px) translate(-50%, 0)`;
                hintEl.style.opacity = st.hint.toFixed(3);
            }
            tickText(elapsed);
        }

        brainLines.current.material.opacity = lineWeight(0, stage, f) * intro * 0.16;
        globeLines.current.material.opacity = lineWeight(2, stage, f) * intro * 0.13;
        globeLines.current.rotation.set(GLOBE_TILT, globeAngle, 0);

        // Fareyi yumuşak şekilde takip eder, aşamalar arasında döner
        const g = group.current;
        const eased = f * f * (3 - 2 * f);

        // Dünyanın görünürlüğü: atmosfer parlaması ve arka yüzü gizleyen küre
        const globeWeight = stage === 2 ? 1 - eased : stage === 1 ? eased : 0;
        // Parlamalar dünya tam oluşunca belirir; geçişte arkada disk gibi görünmesinler
        const globeReady = THREE.MathUtils.smoothstep(globeWeight, 0.82, 1);
        atmosphere.current.material.uniforms.uOpacity.value = globeReady * intro * 0.85;
        halo.current.material.uniforms.uOpacity.value = globeReady * intro * 0.32;
        occluder.current.visible = globeWeight > 0.85;

        // Tac halesi ağaç oluştukça belirir, ağacın ölçeğiyle birlikte büyür
        const treeWeight = stage === CONCEPT_STAGE ? 1 - eased : stage === CONCEPT_STAGE - 1 ? eased : 0;
        const cg = canopyGlow.current;
        const cx = TREE_ROOT[0] + (tree.canopy.x - TREE_ROOT[0]) * treeScale;
        const cy = TREE_ROOT[1] + (tree.canopy.y - TREE_ROOT[1]) * treeScale;
        cg.position.set(cx, cy, tree.canopy.z * treeScale - 0.4);
        cg.scale.set(
            (tree.canopy.maxX - tree.canopy.minX) * treeScale * 1.35,
            (tree.canopy.maxY - tree.canopy.minY) * treeScale * 1.5,
            1
        );
        cg.material.uniforms.uOpacity.value = IS_SPHERE ? 0 : THREE.MathUtils.smoothstep(treeWeight, 0.6, 1) * intro * 0.32;

        // Galaksi fonu ve çekirdek ışığı galaksiyle birlikte belirir
        if (IS_GALAXY) {
            const c = concept.current;
            const galaxyWeight = THREE.MathUtils.smoothstep(treeWeight, 0.3, 1) * intro;
            // Ek yıldızlar ve ışıklı disk, galaksiyle aynı eğim, dönüş, ölçek ve merkezi kullanır
            const [mFrame, mScale, mTilt, mRot] = frameMatrices;
            mFrame
                .makeTranslation(c.offset.x, c.offset.y, c.offset.z)
                .multiply(mScale.makeScale(c.scale, c.scale, c.scale))
                .multiply(mTilt.setFromMatrix3(c.tilt))
                .multiply(mRot.makeRotationY(sel.current.angle));
            galaxyFrame.current.matrix.copy(mFrame);
            galaxyFrame.current.matrixWorldNeedsUpdate = true;
            fieldMat.current.uniforms.uOpacity.value = galaxyWeight * GALAXY_FIELD_BRIGHTNESS;
            diskMat.current.uniforms.uOpacity.value = galaxyWeight * GALAXY_GLOW;
            galaxyField.setDrawRange(0, view.mobile ? FIELD_COUNT / 2 : FIELD_COUNT);

            backdrop.current.position.set(c.offset.x, c.offset.y, -1.1);
            // Fon, merkezden tuvalin en yakın kenarına kadar uzanır ve kenara varmadan tamamen söner;
            // böylece tuvalin dikdörtgen sınırı hiçbir zaman görünmez
            const reachX = Math.min(-view.left, view.right) * 0.98;
            const reachY = Math.min(view.top, -view.bottom) * 0.98;
            backdrop.current.scale.set(reachX * 2, reachY * 2, 1);
            backdrop.current.material.uniforms.uOpacity.value = galaxyWeight * 0.5;
            coreGlow.current.position.set(c.offset.x, c.offset.y, 0.05);
            coreGlow.current.scale.setScalar(0.42 * c.scale);
            coreGlow.current.material.uniforms.uOpacity.value = galaxyWeight * 0.5;
        }

        // Balonlar sadece şekil durağanken gösterilir (-1: geçiş anı)
        const stageKey = intro < 1 || f > 0 ? -1 : stage;
        if (stageKey !== lastStageKey.current) {
            lastStageKey.current = stageKey;
            onStageChange?.(stageKey);
        }
        const nextStage = (stage + 1) % STAGES;
        const baseRy = THREE.MathUtils.lerp(STAGE_RY[stage], STAGE_RY[nextStage], eased);
        const parallax = THREE.MathUtils.lerp(STAGE_PARALLAX[stage], STAGE_PARALLAX[nextStage], eased);
        const sway = reduceMotion ? 0 : THREE.MathUtils.lerp(STAGE_SWAY[stage], STAGE_SWAY[nextStage], eased);
        const targetY = baseRy + pointer.current.x * parallax + Math.sin(elapsed * 0.25) * sway;
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * parallax * 0.5, 3, delta);
    });

    return (
        <group ref={group} rotation={[0, STAGE_RY[reduceMotion ? CONCEPT_STAGE : 0], 0]}>
            <points geometry={geometry}>
                <shaderMaterial
                    ref={material}
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            {/* Seçili kümede "focus" noktasından diğer iki kavrama uzanan ince turkuaz çizgiler */}
            <lineSegments ref={conceptLines} geometry={conceptLineGeo}>
                <lineBasicMaterial color="#5cf0e0" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
            {IS_GALAXY && (
                <>
                    <group ref={galaxyFrame} matrixAutoUpdate={false}>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
                            <planeGeometry args={[DISK_SIZE, DISK_SIZE]} />
                            <shaderMaterial
                                ref={diskMat}
                                uniforms={{ uOpacity: { value: 0 } }}
                                vertexShader={canopyGlowVertex}
                                fragmentShader={diskGlowFragment}
                                transparent
                                depthWrite={false}
                                side={THREE.DoubleSide}
                                blending={THREE.AdditiveBlending}
                            />
                        </mesh>
                        <points geometry={galaxyField}>
                            <shaderMaterial
                                ref={fieldMat}
                                uniforms={{ uOpacity: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } }}
                                vertexShader={fieldVertex}
                                fragmentShader={fieldFragment}
                                transparent
                                depthWrite={false}
                                blending={THREE.AdditiveBlending}
                            />
                        </points>
                    </group>
                    <mesh ref={backdrop} renderOrder={-3}>
                        <planeGeometry args={[1, 1]} />
                        <shaderMaterial
                            uniforms={{ uColor: { value: new THREE.Color("#020817") }, uOpacity: { value: 0 } }}
                            vertexShader={canopyGlowVertex}
                            fragmentShader={backdropFragment}
                            transparent
                            depthWrite={false}
                        />
                    </mesh>
                    <mesh ref={coreGlow}>
                        <planeGeometry args={[1, 1]} />
                        <shaderMaterial
                            uniforms={{ uColor: { value: new THREE.Color("#ffe9c8") }, uOpacity: { value: 0 } }}
                            vertexShader={canopyGlowVertex}
                            fragmentShader={coreGlowFragment}
                            transparent
                            depthWrite={false}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                </>
            )}
            <mesh ref={canopyGlow} renderOrder={-2}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    uniforms={{ uColor: { value: CYAN }, uColor2: { value: LAVENDER }, uOpacity: { value: 0 } }}
                    vertexShader={canopyGlowVertex}
                    fragmentShader={canopyGlowFragment}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            {/* Arka yarıküredeki noktaları gizleyerek dünyaya derinlik verir */}
            <mesh ref={occluder} renderOrder={-1} visible={false}>
                <sphereGeometry args={[0.885, 64, 64]} />
                <meshBasicMaterial colorWrite={false} />
            </mesh>
            <mesh ref={halo}>
                <sphereGeometry args={[1.1, 64, 64]} />
                <shaderMaterial
                    uniforms={{ uColor: { value: CYAN }, uColor2: { value: LAVENDER }, uOpacity: { value: 0 } }}
                    vertexShader={atmosphereVertex}
                    fragmentShader={haloFragment}
                    side={THREE.BackSide}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={atmosphere}>
                <sphereGeometry args={[0.97, 64, 64]} />
                <shaderMaterial
                    uniforms={{ uColor: { value: CYAN }, uColor2: { value: LAVENDER }, uOpacity: { value: 0 } }}
                    vertexShader={atmosphereVertex}
                    fragmentShader={atmosphereFragment}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <lineSegments ref={brainLines} geometry={brainLineGeo}>
                <lineBasicMaterial color={ICE} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
            <lineSegments ref={globeLines} geometry={globeLineGeo}>
                <lineBasicMaterial color={CYAN} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
};

// Kamera: şekillerin boyutu ve yeri sabit kalır, sahne yukarı uzatıldığında
// ek alan yalnızca ağacın üst dalları için kullanılır
const BASE_FOV = 38;
const CameraFit = ({ extent, viewRef }) => {
    const { camera, size } = useThree();

    useEffect(() => {
        const extraTop = extent.top;
        const baseHeight = Math.max(1, size.height - extraTop);
        const baseWidth = Math.max(1, size.width - extent.left - extent.right);
        const tanHalf = Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2));
        // Dar ekranlarda kamerayı geri çekerek yanlardan kırpılmayı önler
        const z = Math.max(3.7, 3.4 / (baseWidth / baseHeight));
        const worldPerPx = (2 * z * tanHalf) / baseHeight;
        const tanFull = (tanHalf * size.height) / baseHeight;

        camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(tanFull));
        // Ek alan tuvalin merkezini kaydırır; kamera da kayarak şekilleri eski yerinde tutar
        const camX = ((extent.right - extent.left) / 2) * worldPerPx;
        camera.position.set(camX, (extraTop / 2) * worldPerPx, z);
        camera.updateProjectionMatrix();

        viewRef.current = {
            top: camera.position.y + z * tanFull - 0.02,
            bottom: camera.position.y - z * tanFull + 0.02,
            left: camX - (size.width / 2) * worldPerPx,
            right: camX + (size.width / 2) * worldPerPx,
            mobile: baseWidth < 520,
            // Sahne masaüstünde header'a doğru uzatıldı mı (≤ 1160px'te uzatılmaz)
            extended: extent.top + extent.left + extent.right > 0,
        };
    }, [camera, size, extent, viewRef]);

    return null;
};

// Masaüstünde sahne yukarıda header'ın üst kenarına, sağda header'ın kenarına, solda
// sütunun kenarına kadar uzatılır (metne taşmaz); şekillerin boyutu ve yeri değişmez,
// ek alanı ağacın dalları kullanır
const useStageExtent = (wrapperRef) => {
    const [extent, setExtent] = useState({ top: 0, left: 0, right: 0 });

    useEffect(() => {
        const measure = () => {
            const el = wrapperRef.current;
            const container = el?.closest(".header-container");
            if (!el || !container || window.innerWidth <= 1160) {
                setExtent({ top: 0, left: 0, right: 0 });
                return;
            }
            const box = el.getBoundingClientRect();
            const header = container.getBoundingClientRect();
            const column = el.parentElement.getBoundingClientRect();
            setExtent({
                top: Math.max(0, Math.round(box.top - header.top - 16)),
                left: Math.max(0, Math.round(box.left - column.left)),
                right: Math.max(0, Math.round(header.right - box.right - 12)),
            });
        };

        measure();
        const timer = setTimeout(measure, 800);
        window.addEventListener("resize", measure);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", measure);
        };
    }, [wrapperRef]);

    return extent;
};

const MindMorph = ({ playIntro = false, onStageChange }) => {
    const data = useMindData();
    const pointer = usePointer();
    const wrapperRef = useRef(null);
    const viewRef = useRef({ top: 1.27, bottom: -1.27, left: -1.1, right: 1.1, mobile: false });
    const labelRefs = useRef([]);
    const extent = useStageExtent(wrapperRef);
    const [isVisible, setIsVisible] = useState(true);

    const reduceMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

    // Hero ekrandan çıkınca animasyonu durdur
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className="mind-morph">
            {data && (
                <div className="mind-morph__stage" style={{ top: -extent.top, left: -extent.left, right: -extent.right }}>
                    <Canvas
                        camera={{ position: [0, 0, 3.7], fov: BASE_FOV }}
                        dpr={[1, 2]}
                        gl={{ alpha: true, antialias: true }}
                        frameloop={isVisible ? "always" : "never"}
                    >
                        <CameraFit extent={extent} viewRef={viewRef} />
                        <MindPoints
                            data={data}
                            pointer={pointer}
                            playIntro={playIntro && !reduceMotion}
                            reduceMotion={reduceMotion}
                            onStageChange={onStageChange}
                            viewRef={viewRef}
                            labelRefs={labelRefs}
                        />
                    </Canvas>
                    {/* Seçili kümenin üç kavram etiketi (kameraya dönük, 3D noktalara bağlı) */}
                    {IS_SPHERE && (
                        <div className="mind-labels" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                                <span key={i} ref={(el) => (labelRefs.current[i] = el)} className={`mind-label mind-label--${i}`} />
                            ))}
                            {IS_GALAXY && (
                                <span ref={(el) => (labelRefs.current[3] = el)} className="mind-hint">
                                    Explore the concept clusters
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MindMorph;
