import "./EventsCards.scss";
import eventsCardImg from "/eventBrain.png";
import React, { use } from "react";
import { Link } from "react-router-dom";
import pairLogo from "/pairLogo.png";
import speakerImg from "/speaker.png";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const eventsCards = ({ }) => {

    useFadeInOnScroll();

    const eventImages = [
        "/eventBrain.png",
        "/eventBrain3.png",
        "/eventBrain4.png",
        "/eventBrain5.png",
        "/eventBrain6.png",
        "/eventsImage1.png",
        "/eventsImage2.png",
        "/eventsImage3.png",
        "/eventsImage4.png",
        "/eventsImage5.png",
        "/eventsImage6.png",
        "/eventsImg8.png",
        "/eventsImg9.png",
        "/eventsImg10.png"
    ];

    const getRandomImage = () => {
        return eventImages[Math.floor(Math.random() * eventImages.length)];
    };

    const getRandomDate = () => {
        const start = new Date(2024, 0, 1);
        const end = new Date(2026, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const getRandomType = () => {
        return Math.random() > 0.5 ? "Webinar" : "Event";
    };

    const getRandomLocation = () => {
        return Math.random() > 0.5 ? "Online" : "Room 301";
    };

    const getRandomSpeaker = () => {
        const speakers = ["Dr. John Smith", "Emma Johnson", "Prof. Michael Chen", "Sarah Williams", "David Brown"];
        return speakers[Math.floor(Math.random() * speakers.length)];
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const events = [
        {
            id: 1,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 2,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 3,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 4,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 5,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 6,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 7,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 8,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 9,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
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
                                        <div className="events-info-meta-wrapper">
                                            <div className="events-info-date-type-container">
                                                <span className="events-info-meta">{events.type}</span>
                                                <span className="events-info-meta">•</span>
                                                <span className="events-info-meta">{events.date}</span>
                                            </div>
                                            <div className="events-location-container">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                <span className="events-info-meta">{events.location}</span>
                                            </div>
                                        </div>
                                        <p className="events-info-p"> {events.title} </p>
                                    </div>
                                    {
                                        events.texts.slice(0, 1).map((text) => (
                                            <p key={text.id} className="events-info-text"> {text.text} </p>
                                        ))
                                    }
                                    <div className="events-speaker-container">
                                        <img className="events-speaker-img" src={speakerImg} alt="Speaker" />
                                        <span className="events-speaker-text">{events.speaker}</span>
                                    </div>
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