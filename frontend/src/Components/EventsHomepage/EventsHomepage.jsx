import "./EventsHomepage.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { Link } from "react-router-dom";
import eventBrain from "/teamPicturePair.jpeg";
import { useState, useEffect } from "react";

const EventsHomepage = () => {

    useFadeInOnScroll();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1000);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="events-homepage-container">
            <div className="events-homepage-content-container">
                <div className="events-center-container">
                    <div className="events-text-container">
                        {/* <p className="events-little-title fade-in"> PAIR Proudly Organizes </p> */}
                        <h2 className="events-title fade-in"> Join Our Events and Webinars </h2>
                        <p className="events-text fade-in">
                            Are you a student who wants to learn more about artificial intelligence? Curious about how it can affect you or how you can use it in your future professional careers? Join our lectures and conferences! It’s completely free and you’ll get to hear about the most recent academic findings from leading researchers, professors and experts!
                        </p>
                        <p className="events-text event-text-2 fade-in">
                            We cover topics such as human-AI interaction, effects of AI on our brain and how the mind can help reshape our understanding of machine learning. Together, we aim to connect and grow the academic community, in order to provide you with the latest knowledge through our special-made lectures and conferences.
                        </p>
                    </div>
                    <div className="events-button-container">
                        <Link to={"events"}>
                            <button className="event-button fade-in">
                                Our Events
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="events-img-container">
                    <img src={eventBrain} alt="" className={`event-img-collage ${isSmallScreen ? "fade-in" : "fade-in-right"}`} />
                </div>
            </div>
        </div>

    )

}

export default EventsHomepage;