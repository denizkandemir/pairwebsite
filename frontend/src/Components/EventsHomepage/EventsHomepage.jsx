import "./EventsHomepage.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { Link } from "react-router-dom";
import eventImg1 from "/eventsImage1.png";
import eventImg2 from "/eventsImage2.png";
import eventImg3 from "/eventsImage3.png";
import eventImg4 from "/eventsImg8.png";
import eventImg5 from "/eventsImg10.png";
import eventImg6 from "/eventsImage6.png";
import eventCollage from "/eventsCollage.png";

const EventsHomepage = () => {

    useFadeInOnScroll();

    const eventsImg = {
        left: [
            {
                id: 1,
                img: eventImg1,
                classname: "img-left-up"
            },
               {
                id: 2,
                img: eventImg2 ,
                classname: "img-left-center"
            },
               {
                id: 3,
                img: eventImg3,
                classname: "img-left-down"
            }
        ],

        right: [
            {
                id: 4,
                img: eventImg5,
                classname: "img-right-up"
            },
               {
                id: 5,
                img: eventImg4,
                classname: "img-right-center"
            },
            {
                id: 6,
                img: eventImg6,
                classname: "img-right-down"
            }
        ]
    };

    return (
        <div className="events-homepage-container">
            <div className="events-homepage-content-container">
                <div className="events-img-container">
                    {
                        eventsImg.left.map((img) => (
                          <img key={img.id} src={img.img} alt="" className={`event-img ${img.classname}`} />
                        ))
                    }
                    {/* <img src={eventCollage} alt="" className="event-img-collage" /> */}
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
                    {
                      eventsImg.right.map((img) => (        
                          <img key={img.id} src={img.img} alt="" className={`event-img ${img.classname}`} />
                        ))
                    }
                </div>
            </div>
        </div>

    )

}

export default EventsHomepage;