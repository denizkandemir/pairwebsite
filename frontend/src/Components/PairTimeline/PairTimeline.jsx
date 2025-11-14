import "./PairTimeline.scss";
import React from "react";
import { useEffect } from "react";

const pairContent = [
    {
        id: 1,
        title: "Psychology",
        letter: "P",
        text: "The study of mind and behavior, exploring how individuals think, feel, and act in various contexts."
    },

    {
        id: 2,
        title: "Artificial",
        letter: "A",
        text: "The simulation of human intelligence processes by machines, especially computer systems."
    },

    {
        id: 3,
        title: "Intelligence",
        letter: "I",
        text: "The ability to acquire and apply knowledge and skills, enabling problem-solving and adaptation to new situations."
    },

    {
        id: 4,
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
            { threshold: 0.15 }
        );

        const elements = document.querySelectorAll(".pair-timeline-content-container");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pair-timeline-container ">
            <div className="pair-timeline-content-container ">
                <div className="pair-timeline-titles-container">
                    <h2 className="pair-timeline-title">We Are PAIR</h2>
                    <p className="pair-timeline-p"> Combining Psychology, Artificial Intelligence, and Research Lab </p>
                </div>

                <div className="row margin-top timeline pair-timeline-big-screen">
                    {
                        pairContent.map((project) => (
                            <div key={project.id} className="col-one-fourth">
                                <div className="pair-timeline-details-container">
                                    <h5> {project.title} </h5>
                                    <p> {project.text} </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="row margin-top pair-timeline-little-screen">
                    <div className="timeline">
                        {
                             pairContent.map((project) => (
                                <div key={project.id} className="col-one-fourth">
                                    <div className="pair-timeline-details-container">
                                        <h5> {project.title} </h5>
                                        <p> {project.text} </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PairTimeline;