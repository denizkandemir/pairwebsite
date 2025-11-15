import "./PairTimeline.scss";
import React from "react";
import { useEffect } from "react";
import contentImg1 from "/psychology.png";

const pairContent = [
    {
        id: 1,
        title: "Psychology &",
        svg: contentImg1,
        text: "The study of mind and behavior, exploring how individuals think, feel, and act in various contexts."
    },

    {
        id: 2,
        title: "Artificial Intelligence ",
        letter: "A",
        text: "The simulation of human intelligence processes by machines, especially computer systems."
    },

   

    {
        id: 3,
        title: "Research Lab",
        letter: "R",
        text: "A dedicated facility where systematic investigation and experimentation are conducted to advance knowledge in a specific field."
    }
];

const PairTimeline = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-animation");
                        observer.unobserve(entry.target); // Stop observing once the animation is triggered
                    }
                });
            },
            { threshold: 0.45 }
        );

        const elements = document.querySelectorAll(".pair-timeline-content-container");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pair-timeline-container">
            <div className="pair-timeline-content-container">
                <div className="pair-timeline-titles-container fade-in">
                    <h2 className="pair-timeline-title fade-in">We Are PAIR</h2>
                    <p className="pair-timeline-p fade-in">Combining Psychology, Artificial Intelligence, and Research Lab</p>
                </div>

                {/* Floating Orbs Design */}
                <div className="floating-orbs-container">
                    {pairContent.map((project, index) => (
                        <div key={project.id} className={`floating-orb orb-${index + 1}`}>
                            <div className="orb-glow"></div>
                            <div className="orb-content">
                                <div className="orb-icon">
                                    <img src={project.svg} className="orb-img" alt={project.title} />
                                </div>
                                <div className="orb-info">
                                    <h3 className="orb-title">{project.title}</h3>
                                    <p className="orb-description">{project.text}</p>
                                </div>
                            </div>
                            {/* Connection energy lines */}
                            {index < pairContent.length - 1 && (
                                <div className="energy-connection">
                                    <div className="energy-beam"></div>
                                    <div className="energy-particles">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className="mobile-orbs">
                    {pairContent.map((project) => (
                        <div key={project.id} className="mobile-orb">
                            <div className="mobile-orb-icon">
                                <span>{project.letter}</span>
                            </div>
                            <div className="mobile-orb-content">
                                <h4>{project.title}</h4>
                                <p>{project.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PairTimeline;