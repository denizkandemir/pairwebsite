import "./EventsHomepage.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { Link } from "react-router-dom";

const EventsHomepage = () => {

    useFadeInOnScroll();

    return (
        <div className="events-homepage-container">
            <div className="events-homepage-content-container">
                <div className="events-img-container">
                    <img src="" alt="" className="event-img" />
                    <img src="" alt="" className="event-img" />
                    <img src="" alt="" className="event-img" />
                </div>

                <div className="events-center-container">
                    <div className="events-text-container">
                        <h2 className="events-title"> Join Our Events and Webinars </h2>
                        <p className="events-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, illum! Vitae dolorum ducimus, cupiditate, unde numquam itaque architecto totam nemo ab temporibus officia hic molestiae soluta incidunt culpa maxime! Eum? </p>
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
                    <img src="" alt="" className="event-img" />
                    <img src="" alt="" className="event-img" />
                    <img src="" alt="" className="event-img" />
                </div>
            </div>
        </div>

    )

}

export default EventsHomepage;