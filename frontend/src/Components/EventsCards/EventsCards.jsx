import "./eventsCards.scss";
import eventsCardImg from "/eventBrain.png";
import React, { use } from "react";
import { Link } from "react-router-dom";
import pairLogo from "/pairLogo.png";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const eventsCards = ({ }) => {

    useFadeInOnScroll();

    const getRandomDate = () => {
        const start = new Date(2024, 0, 1);
        const end = new Date(2026, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const getRandomType = () => {
        return Math.random() > 0.5 ? "Webinar" : "Event";
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const events = [
        {
            id: 1,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 2,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 3,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 4,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 5,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 6,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 7,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 8,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },

        {
            id: 9,
            imgs: [{ id: 1, url: eventsCardImg }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType()
        },
    ];

    return (
        <div className="events-cards-container">
            <div className="events-cards-content-container">
                {
                    events.map((events) => (
                        <div key={events.id} className={`events-info-card-wrapper fade-in`}>
                            <div className="events-info-img-container">
                                {
                                    events.imgs.slice(0, 1).map((img) => (
                                        <img key={img.id} src={img.url} className="events-info-info-img" alt={events.title} />
                                    ))
                                }
                            </div>
                            <div className="events-info-content-container">
                                <div className="events-info-text-container">
                                    <div className="events-type-title-container">
                                        <span className="events-info-meta">{events.type} • {events.date}</span>
                                        <p className="events-info-p"> {events.title} </p>
                                    </div>
                                    {
                                        events.texts.slice(0, 1).map((text) => (
                                            <p key={text.id} className="events-info-text"> {text.text} </p>
                                        ))
                                    }

                                </div>
                                <div className="events-info-button-container">
                                    <div className="events-info-logo-container">
                                        <div className="fcl-logo-texts-container">
                                            <img className="events-info-logo" src={pairLogo} alt="" />
                                        </div>
                                    </div>
                                    <Link
                                        className="events-info-link"
                                        to={`/events/${events.id}`}
                                    >
                                        <div className="events-cards-button-container">
                                            <div className="events-cards-buttons">
                                                <button className="events-cards-blob-btn">
                                                    View More
                                                    <span className="events-cards-blob-btn__inner">
                                                        <span className="events-cards-blob-btn__blobs">
                                                            <span className="events-cards-blob-btn__blob"></span>
                                                            <span className="events-cards-blob-btn__blob"></span>
                                                            <span className="events-cards-blob-btn__blob"></span>
                                                            <span className="events-cards-blob-btn__blob"></span>
                                                        </span>
                                                    </span>
                                                </button>
                                                <br />

                                                <svg height={0} xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                    <defs>
                                                        <filter id="goo">
                                                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                                                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default eventsCards;