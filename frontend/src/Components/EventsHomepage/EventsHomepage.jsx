import "./EventsHomepage.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { Link } from "react-router-dom";
import eventBrain from "/eventBrain6.png";

const EventsHomepage = () => {

    useFadeInOnScroll();


    return (
        <div className="events-homepage-container">
            <div className="events-homepage-content-container">


                <div className="events-center-container">
                    <div className="events-text-container">
                        <p className="events-little-title"> PAIR Proudly Organizes </p>
                        <h2 className="events-title"> Join Our Events and Webinars </h2>
                        <p className="events-text">
                            PAIR hosts focused events and webinars exploring the intersection of psychology and artificial intelligence. We bring together researchers and learners to discuss new findings, methods, and ideas shaping these fields.                        </p>
                        <p className="events-text event-text-2">
                            Our sessions cover topics like cognitive processes, machine learning, and human–AI interaction. Join us to gain clear insights, engage with experts, and stay connected to emerging research.
                        </p>
                    </div>
                    <div className="events-button-container">
                        <Link to={"events"}>
                            <button className="event-button">
                                Our Events
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="events-img-container">

                    <img src={eventBrain} alt="" className="event-img-collage" />
                </div>
            </div>
        </div>

    )

}

export default EventsHomepage;