import "./Header.scss";
import React from "react";
import Navbar from "../Navbar/Navbar";
import headerImg from "/pairHeader1.png";
import { Link } from "react-router-dom";
import WhoAreWe from "../WhoAreWe/WhoAreWe";
import Blog from "../Blog/Blog";
import PairTimeline from "../PairTimeline/PairTimeline";
import Subscribe from "../Subscribe/Subscribe";
import EventsHomepage from "../EventsHomepage/EventsHomepage";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const heroHeadlineOptions = [
    "Psychology Meets Artificial Intelligence",
    "Where Mind and Machine Converge",
    "Exploring the Future of Human Intelligence"
];

const selectedHeadline = heroHeadlineOptions[1];

const Header = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
                <div className="header-content-container">
                    <div className="header-texts-container">
                        <p className="header-kicker">PAIR Research Initiative</p>
                        <h1 className="header-title">
                            {selectedHeadline.split("Machine")[0]}
                            <span className="highlight-text">Machine</span>
                            {selectedHeadline.split("Machine")[1]}
                        </h1>
                        <p className="header-text">
                            PAIR is a university-affiliated interdisciplinary lab advancing cognitive science through
                            artificial intelligence, psychological theory, and rigorous empirical research.
                        </p>

                        {/* <div className="header-badges" aria-label="PAIR interdisciplinary focus">
                            <span className="header-badge">Psychology</span>
                            <span className="header-badge">Artificial Intelligence</span>
                            <span className="header-badge">Research Lab</span>
                        </div> */}

                        <div className="header-actions">
                            <Link className="header-button primary" to="/newsletter">Explore Our Research</Link>
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
                        <img src={headerImg} alt="PAIR interdisciplinary research team" className="header-img" />
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
            <Subscribe title={"Stay in the Loop"}/>
        </div>
    )
};

export default Header;