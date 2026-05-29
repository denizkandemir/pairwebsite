import "./Header.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import headerImg from "/pairHeader1.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WhoAreWe from "../WhoAreWe/WhoAreWe";
import Blog from "../Blog/Blog";
import PairTimeline from "../PairTimeline/PairTimeline";
import Subscribe from "../Subscribe/Subscribe";
import EventsHomepage from "../EventsHomepage/EventsHomepage";
import Sidebar from "../Sidebar/Sidebar";


const Header = () => {

    const heroHeadlineOptions = [
        {
            text: "Psychology Meets Artificial Intelligence",
            highlight: "Artificial Intelligence",
        },
        {
            text: "Where Mind and Machine Converge",
            highlight: "Machine",
        },
        {
            text: "Exploring the Future of Human Intelligence",
            highlight: "Human Intelligence",
        },
        {
            text: "The Forefront of Modern Research",
            highlight: "Modern Research",
        },
        {
            text: "Advancing Cognitive Science Through AI",
            highlight: "Cognitive Science",
        }
    ];

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedHeadlineIndex, setSelectedHeadlineIndex] = useState(0);

    useEffect(() => {
        const headlineInterval = setInterval(() => {
            setSelectedHeadlineIndex((prevIndex) => (prevIndex + 1) % heroHeadlineOptions.length);
        }, 10000); // Change headline every 10 seconds

        return () => clearInterval(headlineInterval);
    }, []);

    const currentHeadline = heroHeadlineOptions[selectedHeadlineIndex];
    const parts = currentHeadline.text.split(currentHeadline.highlight);
    const words = currentHeadline.text.split(" ");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.03,
                staggerDirection: -1,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -20, filter: "blur(6px)" },
    };

    const root = document.querySelector("#root");

    if (isSidebarOpen) {
        root.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
    } else {
        root.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
    }

    return (
        <div className="header-navbar-container">
            <div className={isSidebarOpen ? "open-sidebar" : "close-sidebar"}>
                <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <Navbar setSidebarOpen={setSidebarOpen} />
            <div className="header-container">
                <div className="header-grid-layer"></div>
                <div className="header-ambient header-ambient-left"></div>
                <div className="header-ambient header-ambient-right"></div>
                <div className="header-atmosphere-layer" aria-hidden="true">
                    <span className="atmo-orbit orbit-left"></span>
                    <span className="atmo-orbit orbit-right"></span>
                    <span className="atmo-orbit orbit-lower"></span>
                    <span className="atmo-curve curve-left"></span>
                    <span className="atmo-curve curve-right"></span>
                    <span className="atmo-ring ring-right"></span>
                    <span className="atmo-dots dots-left-top"></span>
                    <span className="atmo-dots dots-right-edge"></span>
                    <span className="atmo-dots dots-lower-left"></span>
                    <span className="atmo-node node-left"></span>
                    <span className="atmo-node node-right"></span>
                    <span className="atmo-node node-lower"></span>
                    <span className="atmo-path path-left"></span>
                    <span className="atmo-path path-right"></span>
                </div>
                <div className="header-content-container">
                    <div className="header-texts-container">
                        <p className="header-kicker">PAIR Research Initiative</p>
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={currentHeadline.text}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="header-title"
                            >
                                {words.map((word, index) => {
                                    const isHighlight = currentHeadline.highlight.includes(word);

                                    return (
                                        <motion.span
                                            key={`${word}-${index}`}
                                            variants={wordVariants}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            style={{ display: "inline-block", marginRight: "0.25em" }}
                                            className={isHighlight ? "highlight-text" : ""}
                                        >
                                            {word}
                                        </motion.span>
                                    );
                                })}
                            </motion.h1>
                        </AnimatePresence>
                        <p className="header-text">
                           PAIR is a pioneering student organization dedicated to exploring the novel relationship between psychology and artificial intelligence. We combine rigorous scientific research with bold and innovative thinking to make complex findings clear, engaging and accessible.
                        </p>

                        {/* <div className="header-badges" aria-label="PAIR interdisciplinary focus">
                            <span className="header-badge">Psychology</span>
                            <span className="header-badge">Artificial Intelligence</span>
                            <span className="header-badge">Research Lab</span>
                        </div> */}

                        <div className="header-actions">
                            <Link className="header-button primary" to="/aboutUs">Find Out More</Link>
                            <Link className="header-button secondary" to="/events">View Events</Link>
                        </div>
                    </div>

                    <div className="header-visual-container" aria-hidden="true">
                        <div className="visual-radial-glow"></div>
                        <div className="node-map">
                            <span className="node node-1"></span>
                            <span className="node node-2"></span>
                            <span className="node node-3"></span>
                            <span className="node node-4"></span>
                            <span className="node node-5"></span>
                            <span className="connector connector-1"></span>
                            <span className="connector connector-2"></span>
                            <span className="connector connector-3"></span>
                        </div>
                        <img src={headerImg} alt="PAIR interdisciplinary research team" className="header-img" fetchPriority="high" decoding="async" />
                        <div className="floating-panel panel-left">
                            <p className="panel-label">Cognitive Modeling</p>
                            <p className="panel-value">Human-AI Alignment</p>
                        </div>
                        <div className="floating-panel panel-right">
                            <p className="panel-label">Lab Signal</p>
                            <p className="panel-value">Neural + Behavioral Data</p>
                        </div>
                        <div className="signal-wave"></div>
                    </div>
                </div>
            </div>
            <PairTimeline />
            <Blog />
            <WhoAreWe />
            <EventsHomepage />
            <Subscribe title={"Stay Ahead With One Click"} />
        </div>
    )
};

export default Header;