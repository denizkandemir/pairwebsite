import "./AboutUsTeamSection.scss";
import React from "react";
import aboutUsTeam from "/pairTeamImg2.jpeg";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const AboutUsTeamSection = () => {

    const pairTeamTexts = [
        {
            id: 1,
            text: "PAIR is not here to follow familiar paths. In our aim to forever revolutionize the science of psychology, we have continously broken the mold, pushing the limits of what a student organization can achieve. Join us, as we outline our journey from the very beginnings to where we are now."
        },

        {
            id: 2,
            text: "So far, we have hosted multiple lectures and a one-day conference attended by over 150 participants, bringing together the leading experts within the fields of AI and psychology. At the same time, we have several ongoing research projects, with many more planned on the way. Beyond studies alone, we have conducted mutliple independent literature reviews, recommended useful AI tools to our faculty-wide newsletter network and reached thousands on social media through our commitment to staying entertaining, yet informative. Our website is our newest accomplishment and reflects our continuned dedication to expanding our reach and establising our place within the constantly evolving field of research."

        },

        // {
        //     id: 3,
        //     text: "As one of the major scientific disciplines, psychology carries an obligation to keep pace with the major technological advancements of the world. Yet, how should the machine be incorporated into the study of the human mind? With the massive expansion of artificial intelligence, answering this question has become all the more crucial. Practitioners, clients and companies alike are confronted with the need to understand how new technologies can shape our behavior, emotions and thinking, and how the human mind, in turn, can better shape AI."
        // }

    ];

    useFadeInOnScroll();

    return (

        <div className="about-us-team-container">
            <div className="about-team-atmosphere-layer" aria-hidden="true">
                <span className="team-atmo-orbit orbit-1"></span>
                <span className="team-atmo-orbit orbit-2"></span>
                <span className="team-atmo-curve curve-1"></span>
                <span className="team-atmo-curve curve-2"></span>
                <span className="team-atmo-path path-1"></span>
                <span className="team-atmo-path path-2"></span>
                <span className="team-atmo-dots dots-1"></span>
                <span className="team-atmo-dots dots-2"></span>
                <span className="team-atmo-node node-1"></span>
                <span className="team-atmo-node node-2"></span>
            </div>
            <div className="about-us-team-content-container">
                <div className="about-us-team-img-container fade-in">
                    <img src={aboutUsTeam} alt="PAIR Research Lab team" className="about-us-team-img" loading="lazy" decoding="async" />
                </div>
                <div className="about-us-team-texts-container">
                    {
                        pairTeamTexts.map((text) => (
                            <p key={text.id} className="about-us-team-text fade-in">{text.text}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AboutUsTeamSection;