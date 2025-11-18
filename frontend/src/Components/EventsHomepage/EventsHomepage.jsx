import "./EventsHomepage.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { Link } from "react-router-dom";
import eventImg1 from "/eventsImage1.png";
import eventImg2 from "/eventsImage2.png";
import eventImg3 from "/eventsImage3.png";
import eventImg4 from "/eventsImage4.png";
import eventImg5 from "/eventsImage5.png";
import eventImg6 from "/eventsImage6.png";

const EventsHomepage = () => {

    useFadeInOnScroll();

    return (
        <div className="events-homepage-container">
            <div className="events-homepage-content-container">
                <div className="events-img-container">
                    <img src={eventImg1} alt="" className="event-img" />
                    <img src={eventImg3} alt="" className="event-img" />
                    <img src={eventImg2} alt="" className="event-img" />
                </div>

                <div className="events-center-container">
                    <div className="events-text-container">
                        <p className="events-little-title"> PAIR Proudly Organizes </p>
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
                    <img src={eventImg5} alt="" className="event-img" />
                    <img src={eventImg4} alt="" className="event-img" />
                    <img src={eventImg6} alt="" className="event-img" />
                </div>
            </div>
        </div>

    )

}

export default EventsHomepage;