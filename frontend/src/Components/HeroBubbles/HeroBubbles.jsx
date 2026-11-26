import "./HeroBubbles.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ESLint ayarı <MotionDiv> kullanımını tanımadığı için bileşenler değişkene atanır
const MotionDiv = motion.div;
const MotionSpan = motion.span;

const CODE_CHARS = "01{}<>/=+*#;()[]";

// Her animasyon aşamasında gösterilen balonlar: [sol balon, sağ balon]
const STAGE_BUBBLES = [
    [
        { label: "Cognitive Modeling", text: "Human-AI Alignment" },
        { label: "Lab Signal", text: "Neural + Behavioral Data" },
    ],
    [
        { label: "Research Initiative", text: "Psychology × AI" },
        { label: "Open Science", text: "Code-Driven Insights" },
    ],
    [
        { label: "Global Network", text: "Warsaw ↔ World" },
        { label: "Live Data", text: "Cross-Cultural Research" },
    ],
    [
        { label: "Concept Map", text: "Ideas in Orbit" },
        { label: "Cognitive Science", text: "Mind Meets Model" },
    ],
];

const PARTICLE_COUNT = 18;
const FLY_DURATION = 0.9;
const TEXT_DELAY = 850; // ms: kodlar balona ulaştıktan sonra metin çözülmeye başlar
const DECODE_DURATION = 750; // ms

const randomChar = () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];

// Telefon genişliği: balonlar yalnızca PAIR yazısında gösterilir; diğer aşamalarda
// uçan kodlar ve metin çözme animasyonu hiç başlamaz
const SMALL_SCREEN = "(max-width: 768px)";
const SMALL_SCREEN_STAGE = 1; // PAIR yazısı
const useIsSmallScreen = () => {
    const [isSmall, setIsSmall] = useState(() => window.matchMedia(SMALL_SCREEN).matches);

    useEffect(() => {
        const query = window.matchMedia(SMALL_SCREEN);
        const onChange = (e) => setIsSmall(e.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    return isSmall;
};

// Metni soldan sağa, koddan gerçek harflere dönüşerek yazar
const useDecodedText = (text) => {
    const [display, setDisplay] = useState(() => text.replace(/\S/g, " "));

    useEffect(() => {
        let frame;
        let startTime;
        const timeout = setTimeout(() => {
            const tick = (now) => {
                if (startTime === undefined) startTime = now;
                const progress = Math.min(1, (now - startTime) / DECODE_DURATION);
                const resolved = Math.floor(progress * text.length);
                const next = text
                    .split("")
                    .map((char, i) => (i < resolved || char === " " ? char : randomChar()))
                    .join("");
                setDisplay(next);
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        }, TEXT_DELAY);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frame);
        };
    }, [text]);

    return display;
};

const Bubble = ({ side, label, text }) => {
    const ref = useRef(null);
    const [origin, setOrigin] = useState(null);
    const decoded = useDecodedText(text);

    // Şeklin merkezinin (kapsayıcının ortası) balona göre konumunu ölç
    useLayoutEffect(() => {
        const el = ref.current;
        const parent = el.offsetParent;
        if (!parent) return;
        setOrigin({
            x: parent.clientWidth / 2 - el.offsetLeft,
            y: parent.clientHeight / 2 - el.offsetTop,
            // Kodların ulaşacağı nokta: düşünce noktalarının en uç olanı
            tx: side === "left" ? el.offsetWidth + 14 : -14,
            ty: side === "left" ? el.offsetHeight + 26 : -26,
        });
    }, [side]);

    return (
        <MotionDiv
            ref={ref}
            className={`hero-bubble hero-bubble--${side}`}
            exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.35 } }}
        >
            {origin &&
                Array.from({ length: PARTICLE_COUNT }, (_, i) => (
                    <MotionSpan
                        key={i}
                        className="hero-bubble__particle"
                        initial={{
                            x: origin.x + (Math.random() - 0.5) * 120,
                            y: origin.y + (Math.random() - 0.5) * 120,
                            opacity: 0,
                        }}
                        animate={{
                            x: origin.tx + (Math.random() - 0.5) * 16,
                            y: origin.ty + (Math.random() - 0.5) * 16,
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{ duration: FLY_DURATION, delay: i * 0.025, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {randomChar()}
                    </MotionSpan>
                ))}

            <MotionDiv
                className="hero-bubble__shell"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
                <div className="hero-bubble__body">
                    <span className="hero-bubble__label">
                        <i className="hero-bubble__dot" />
                        {label}
                    </span>
                    <p className="hero-bubble__text">{decoded}</p>
                    {/* Şekle doğru küçülen düşünce noktaları */}
                    <span className="hero-bubble__trail" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                </div>
            </MotionDiv>
        </MotionDiv>
    );
};

// stage: animasyon aşaması (0 beyin, 1 PAIR, 2 dünya); -1 iken balon gösterilmez
const HeroBubbles = ({ stage }) => {
    const isSmall = useIsSmallScreen();
    // Küçük ekranda PAIR dışındaki aşamalarda balon bileşenleri hiç oluşturulmaz,
    // böylece animasyonları da dönmez
    const bubbles = isSmall && stage !== SMALL_SCREEN_STAGE ? null : STAGE_BUBBLES[stage];

    return (
        <AnimatePresence>
            {bubbles && <Bubble key={`left-${stage}`} side="left" label={bubbles[0].label} text={bubbles[0].text} />}
            {bubbles && <Bubble key={`right-${stage}`} side="right" label={bubbles[1].label} text={bubbles[1].text} />}
        </AnimatePresence>
    );
};

export default HeroBubbles;
