import "./WhoAreWe.scss";
import React from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";    
import cardImg1 from "/info.png";
import cardImg2 from "/target2.png";
import cardImg3 from "/handshake.png";

const whoCardsData = [

    {
        title: "Who We Are",
        image: cardImg1,
        description: "PAIR is a student-led initiative exploring the meeting point of psychology and artificial intelligence through research, discussion, and innovation."
    },
    


    {
        title: "Our Community",
        image: cardImg3,
        description: "We bring together curious students, researchers, and creators who share a passion for understanding mind, behavior, and emerging technology."
    },

        {
        title: "Our Mission",
        image: cardImg2,
        description: "Our mission is to make complex ideas clear, engaging, and meaningful while expanding knowledge at the intersection of psychology and AI."
    },
];


const WhoAreWe = () => {

    useFadeInOnScroll();

    return(
        <div className="who-container">
            <div className="who-atmosphere-layer" aria-hidden="true">
                <span className="who-atmo-orbit who-orbit-left"></span>
                <span className="who-atmo-orbit who-orbit-right"></span>
                <span className="who-atmo-curve who-curve-left"></span>
                <span className="who-atmo-curve who-curve-right"></span>
                <span className="who-atmo-dots who-dots-left"></span>
                <span className="who-atmo-dots who-dots-right"></span>
            </div>
            <div className="who-content-container fade-in">
                {whoCardsData.map((card, index) => (
                    <div className="who-card" key={index}>
                        <div className="who-card-img-container">
                            <img src={card.image} alt={card.title} className="who-card-img" loading="lazy" decoding="async" />
                        </div>
                        <h2 className="who-card-title">{card.title}</h2>
                        <p className="who-card-description">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhoAreWe;