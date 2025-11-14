import "./WhoAreWe.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";    
import cardImg1 from "/info.png";
import cardImg2 from "/target2.png";
import cardImg3 from "/handshake.png";

const whoCardsData = [

    {
        title: "Who We Are",
        image: cardImg1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    


    {
        title: "Our Community",
        image: cardImg3,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },

        {
        title: "Our Mission",
        image: cardImg2,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
];


const WhoAreWe = () => {

    useFadeInOnScroll();

    return(
        <div className="who-container">
            <div className="who-content-container fade-in">
                {whoCardsData.map((card, index) => (
                    <div className="who-card" key={index}>
                        <div className="who-card-img-container">
                            <img src={card.image} alt={card.title} className="who-card-img" />
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