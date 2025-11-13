import "./WhoAreWe.scss";
import React from "react";

const whoCardsData = [

    {
        title: "Who We Are",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    
    {
        title: "Our Mission",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },

    {
        title: "Our Community",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
];


const WhoAreWe = () => {

    return(
        <div className="who-container">
            <div className="who-content-container">
                {whoCardsData.map((card, index) => (
                    <div className="who-card" key={index}>
                        <h2 className="who-card-title">{card.title}</h2>
                        <p className="who-card-description">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhoAreWe;