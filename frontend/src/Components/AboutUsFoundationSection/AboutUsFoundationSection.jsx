import "./AboutUsFoundationSection.scss";
import logo from "/pairLogo.png";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import aboutUsFoundationImg from "/juliaPair.jpeg";
import modalePicture2 from "/aboutUsModulePicture2.jpg";

const AboutUsFoundationSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPrimingOpen, setIsPrimingOpen] = useState(false);
    const moduleRef = useRef(null);
    const openTimerRef = useRef(null);
    const scrollTimerRef = useRef(null);

    const pairFoundationTexts = [
        {
            id: 1,
            text: "As one of the major scientific disciplines, psychology carries an obligation to keep pace with the major technological advancements of the world. Yet, how should the machine be incorporated into the study of the human mind? With the massive expansion of artificial intelligence, answering this question has become all the more crucial. Practitioners, clients and companies alike are confronted with the need to understand how new technologies can shape our behavior, emotions and thinking, and how the human mind, in turn, can better shape AI."
        },
        {
            id: 2,
            text: "This highly important goal led our founder, Julia Wójciak, down a revolutionary path of entrepreneurship. As one of the best students in her class, Julia had ambitions that reached far beyond academic achievement alone. Driven by her forward-thinking mindset, she wanted not only to succeed within psychology, but to leave a lasting impact on its future as a whole. In pursuing that vision, she realized a critital gap: the worlds of psychology and artifical intelligence were developing largely in isolation from each other."
        }
    ];

    const pairFoundationCountiniousTexts = [
        {
            id: 1,
            text:"At the same time, Julia did not want to simply do boring research that would help only the most specialized of experts. Instead, she brought together a team of talented, hardworking and forward-thinking students who shared her vision, and founded PAIR: the Psychology and Artifical Intelligence Research Laboratory. Together, we aim to combat the lack of understanding between psychology and artificial intelligence by building a community of talented experts, conducting new exploratory research and translating these highly complex findings into content that is fun, informative and engaging."
        },
        {
            id: 2,
            text:"PAIR is committed to pushing the limits of what a student organization is capable of. In the years to come, we aim to build more collaborations, work with leading AI companies and develop a strong network of experts that can offer the latest knowledge, fresh opportunities and unique value to our ever-growing audience. Our ultimate goal is to combine psychological insight with rigourous scientific method in order to shape the future of psychology for practitioners, organizations, and the people whose lives they help improve.",
        }
    ];

    const foundationPanelId = "our-foundation-panel";

const splitIntoSentenceChunks = (text, sentencesPerChunk = 2) => {
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()) || [text];

    const chunks = [];
    for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
        chunks.push(sentences.slice(i, i + sentencesPerChunk).join(' '));
    }

    return chunks;
};

    const moduleShellVariants = {
        collapsed: {
            scale: 1,
            transition: {
                duration: 0.46,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        expanded: {
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const expanderVariants = {
        collapsed: {
            opacity: 0,
            maxHeight: 0,
            clipPath: "inset(0 0 100% 0 round 22px)",
            transition: {
                duration: 0.72,
                ease: [0.4, 0, 0.2, 1],
                when: "afterChildren"
            }
        },
        expanded: {
            opacity: 1,
            maxHeight: 5200,
            clipPath: "inset(0 0 0% 0 round 22px)",
            transition: {
                duration: 1.05,
                ease: [0.22, 1, 0.36, 1],
                when: "beforeChildren",
                delayChildren: 0.2
            }
        }
    };

    const contentFlowVariants = {
        collapsed: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        },
        expanded: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.04
            }
        }
    };

    const textGroupVariants = {
        collapsed: {
            opacity: 0,
            y: -14,
            filter: "blur(4px)",
            transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] }
        },
        expanded: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.07
            }
        }
    };

    const textChunkVariants = {
        collapsed: {
            opacity: 0,
            y: -12,
            filter: "blur(3px)",
            transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] }
        },
        expanded: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const imageItemVariants = {
        collapsed: {
            opacity: 0,
            y: 20,
            scale: 0.98,
            filter: "blur(4px)",
            transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] }
        },
        expanded: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }
        }
    };

    const scrollToRef = (ref, offset = 0) => {
        if (!ref.current) {
            return;
        }

        const top = Math.max(0, ref.current.getBoundingClientRect().top + window.scrollY - offset);
        window.scrollTo({ top, behavior: "smooth" });
    };

    const handleOpen = () => {
        if (isPrimingOpen || isExpanded) {
            return;
        }

        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
        }
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }

        setIsPrimingOpen(true);

        openTimerRef.current = setTimeout(() => {
            setIsExpanded(true);
            setIsPrimingOpen(false);
        }, 170);

        scrollTimerRef.current = setTimeout(() => {
            requestAnimationFrame(() => {
                scrollToRef(moduleRef, 64);
            });
        }, 240);
    };

    const handleClose = () => {
        const shouldScrollBack =
            moduleRef.current && window.scrollY > moduleRef.current.offsetTop + 220;

        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }

        setIsExpanded(false);

        if (shouldScrollBack) {
            scrollTimerRef.current = setTimeout(() => {
                scrollToRef(moduleRef, 80);
            }, 120);
        }
    };

    useEffect(() => {
        return () => {
            if (openTimerRef.current) {
                clearTimeout(openTimerRef.current);
            }
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="about-us-foundation-container">
            <motion.section
                ref={moduleRef}
                className={`foundation-module ${isPrimingOpen ? "is-priming" : ""} ${isExpanded ? "is-expanded" : ""}`}
                variants={moduleShellVariants}
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
            >
                <span className="foundation-module-ambient" aria-hidden="true">
                    <span className="foundation-module-particle depth-lg p1"></span>
                    <span className="foundation-module-particle depth-md p2"></span>
                    <span className="foundation-module-particle depth-sm p3"></span>
                    <span className="foundation-module-particle depth-sm p4"></span>
                    <span className="foundation-module-particle depth-md p5"></span>
                    <span className="foundation-module-particle depth-sm p6 expanded-only"></span>
                    <span className="foundation-module-particle depth-lg p7 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p8 expanded-only"></span>
                    <span className="foundation-module-particle depth-md p9 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p10 expanded-only"></span>
                    <span className="foundation-module-particle depth-md p11 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p12 expanded-only"></span>
                    <span className="foundation-module-particle depth-md p13 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p14 expanded-only"></span>
                    <span className="foundation-module-particle depth-md p15 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p16 expanded-only"></span>
                    <span className="foundation-module-particle depth-lg p17 expanded-only"></span>
                    <span className="foundation-module-particle depth-sm p18 expanded-only"></span>
                </span>

                <motion.button
                    type="button"
                    className="foundation-energy-trigger"
                    aria-expanded={isExpanded}
                    aria-controls={foundationPanelId}
                    onClick={handleOpen}
                    disabled={isExpanded}
                    initial={false}
                >
                    <span className="foundation-energy-trigger__orb" aria-hidden="true"></span>
                    <span className="foundation-energy-trigger__preview" aria-hidden="true">
                        <img src={logo} alt="PAIR Research Lab preview" className="foundation-energy-trigger__preview-img" loading="lazy" decoding="async" />
                    </span>
                    <span className="foundation-energy-trigger__content">
                        <span className="foundation-energy-trigger__kicker">Foundation Module</span>
                        <h2 className="foundation-energy-trigger__title">Our Foundation</h2>
                        <span className="foundation-energy-trigger__text">Explore our story and research mission</span>
                        {!isExpanded && (
                            <span className="foundation-energy-trigger__cta">
                                <span className="foundation-energy-trigger__cta-label">Read more</span>
                                <span className="foundation-energy-trigger__chevron" aria-hidden="true">▾</span>
                            </span>
                        )}
                    </span>
                </motion.button>

                <motion.div
                    id={foundationPanelId}
                    className="foundation-module-expander"
                    aria-hidden={!isExpanded}
                    variants={expanderVariants}
                    initial={false}
                    animate={isExpanded ? "expanded" : "collapsed"}
                    style={{ transformOrigin: "top center", pointerEvents: isExpanded ? "auto" : "none" }}
                >
                    <motion.div
                        className="foundation-module-expanded-content"
                        variants={contentFlowVariants}
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                    >
                        <motion.div
                            className="about-us-foundation-content-container"
                            variants={contentFlowVariants}
                        >
                            <motion.div className="about-us-foundation-texts-container" variants={contentFlowVariants}>
                                {pairFoundationTexts.map((text) => (
                                    <motion.p key={text.id} className="about-us-foundation-text" variants={textGroupVariants}>
                                        {splitIntoSentenceChunks(text.text,4 ).map((chunk, chunkIndex) => (
                                            <motion.span
                                                key={`${text.id}-${chunkIndex}`}
                                                className="about-us-foundation-text-chunk"
                                                variants={textChunkVariants}
                                            >
                                                {chunk}
                                            </motion.span>
                                        ))}
                                    </motion.p>
                                ))}
                            </motion.div>

                            <motion.div className="about-us-foundation-img-container" variants={imageItemVariants}>
                                <img src={aboutUsFoundationImg} alt="PAIR foundation team" className="about-us-foundation-img" loading="lazy" decoding="async" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="about-us-foundation-content-container about-us-foundation-content-container--reverse about-us-foundation-content-container--single-right-image"
                            variants={contentFlowVariants}
                        >
                            <motion.div className="about-us-foundation-texts-container" variants={contentFlowVariants}>
                                {pairFoundationCountiniousTexts.map((text) => (
                                    <motion.p key={text.id} className="about-us-foundation-text" variants={textGroupVariants}>
                                        {splitIntoSentenceChunks(text.text,3).map((chunk, chunkIndex) => (
                                            <motion.span
                                                key={`continuous-${text.id}-${chunkIndex}`}
                                                className="about-us-foundation-text-chunk"
                                                variants={textChunkVariants}
                                            >
                                                {chunk}
                                            </motion.span>
                                        ))}
                                    </motion.p>
                                ))}
                            </motion.div>

                            <motion.div className="about-us-foundation-img-container " variants={imageItemVariants}>
                                <img src={modalePicture2} alt="PAIR foundation module" className="about-us-foundation-img module-img-2" loading="lazy" decoding="async" />
                            </motion.div>
                        </motion.div>

                        <motion.div className="foundation-collapse-control" variants={textGroupVariants}>
                            <button
                                type="button"
                                className="foundation-collapse-button"
                                onClick={handleClose}
                                aria-expanded={true}
                                aria-controls={foundationPanelId}
                                tabIndex={isExpanded ? 0 : -1}
                            >
                                Show less
                                <span className="foundation-collapse-button__chevron" aria-hidden="true">⌃</span>
                            </button>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default AboutUsFoundationSection;