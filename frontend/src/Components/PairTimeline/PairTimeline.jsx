import "./PairTimeline.scss";
import React from "react";
import { useEffect } from "react";
import contentImg1 from "/brain2.png";
import contentImg2 from "/ai4.png";
import contentImg3 from "/research.png";

const pairContent = [
    {
        id: 1,
        title: "Psychology &",
        svg: contentImg1,
        className: "psychology-orb-img",
        text: "The study of mind and behavior, exploring how individuals think, feel, and act in various contexts."
    },

    {
        id: 2,
        title: "Artificial Intelligence ",
        className: "ai-orb-img",
        svg: contentImg2,
        text: "The simulation of human intelligence processes by machines, especially computer systems."
    },

   

    {
        id: 3,
        title: "Research Lab",
        className: "research-orb-img",
        svg: contentImg3,
        text: "A dedicated facility for systematic investigation and experimentation to advance knowledge."
    }
];

const PairTimeline = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-animation");
                        observer.unobserve(entry.target); 
                    }
                });
            },
            { threshold: 0.12 }
        );          

        const elements = document.querySelectorAll(".pair-timeline-content-container");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pair-timeline-container">
            <div className="pair-timeline-content-container">
                <div className="pair-timeline-titles-container ">
                    <h2 className="pair-timeline-title ">We Are PAIR</h2>
                    <p className="pair-timeline-p ">Combining Psychology, Artificial Intelligence, and Research Lab</p>
                </div>

                <div className="floating-orbs-container">
                    {pairContent.map((content, index) => (
                        <div key={content.id} className={`floating-orb orb-${index + 1} `}>
                            <div className="orb-glow"></div>
                            <div className="orb-content">
                                <div className="orb-icon">
                                    <img src={content.svg} className={`orb-img ${content.className}`} alt={content.title} />
                                </div>
                                <div className="orb-info">
                                    <h3 className="orb-title">{content.title}</h3>
                                    <p className="orb-description">{content.text}</p>
                                </div>
                            </div>
                            {index < pairContent.length - 1 && (
                                <div className="energy-connection">
                                    <div className={"energy-beam"}></div>
                                    <div className={ content.id === 2 ?  "energy-particles ai-particles" : "energy-particles"}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PairTimeline;