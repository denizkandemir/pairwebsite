import "./EventDetails.scss";
import React from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useState, useEffect } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import Slide from "../Slide/Slide";
import { pastEvents } from "../../objects/PastEvents";

const EventDetails = ({  }) => {

    const { routeId } = useParams();

    const [event, setEvent] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [screenSize, setScreenSize] = useState({ width: window?.innerWidth || 1920 });
    const [fadeInReady, setFadeInReady] = useState(false);
    const eventSlideRef = useRef(null);

    useEffect(() => {

    },[]);

     useEffect(() => {
        if (!loadingEvent) {
            setFadeInReady(true);
        }
    }, [loadingEvent]);


    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (eventSlideRef.current && !eventSlideRef.current.contains(event.target)) {
                closeEventSlide();
            }
        };

        if (isEventSlideOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEventSlideOpen]);

    useFadeInOnScroll('.fade-in, .fade-in-left, .fade-in-right', !loadingEvent);

    const openEventSlide = () => {
        if (screenSize.width > 1200 || screenSize.width < 600) {
            setEventSlideOpen(true);
        }
        else {
            closeEventSlide();
        }
    };

    const closeEventSlide = () => {
        setEventSlideOpen(false)
    };

    return (
        <div className="event-details-container">
            <div className="event-details-content-container">
                <div key={event.id} className="event-wrapper">
                    <div className="event-titles-container">
                        <h5 className={`event-little-title fade-in`} > Etkinliklerimiz </h5>
                        <h3 className={`event-title fade-in`}> {event.title} </h3>
                    </div>
                    <div className="slide-dark-title-container ">
                        <div className={isEventSlideOpen ? "slide-title-svg-container-open" : "d-none"}>
                            <div className="fcl-logo-texts-container">
                                <img src={fclLogo} className="fcl-logo" alt="" />
                                <div className="fcl-texts-container">
                                    <p className="fcl-text"> Future <br /> Classroom Lab </p>
                                    <p className="fcl-bottom-text"> By European Schoolnet </p>
                                </div>
                            </div>
                            <h3 className="learning-slide-title">
                                {event.title}
                            </h3>
                            <Xmark fill={"white"} width={30} height={30} />
                        </div>
                        <div
                            className={
                                isEventSlideOpen
                                    ? "event-slide-container-replace-open"
                                    : "event-slide-container-replace-close "
                            }
                        >
                            <Slide containerRef={eventSlideRef} openSlide={openEventSlide} SlideImgs={event.imgs} id={event._id} key={event._id} isSlideOpen={isEventSlideOpen} container={"event-slide-content-container fade-in"} imgClass={"event-img"} />
                        </div>
                        <div
                            className={
                                isEventSlideOpen
                                    ? "event-slide-container-open"
                                    : "event-slide-container "
                            }
                        >
                            <Slide containerRef={eventSlideRef} openSlide={openEventSlide} SlideImgs={event.imgs} id={event._id} key={event._id} isSlideOpen={isEventSlideOpen} container={"event-slide-content-container fade-in"} imgClass={"event-img"} />
                        </div>
                    </div>
                    <div className={`event-text-container  fade-in  fade-in`}>
                        {
                            event.texts.map((text, index) => (
                                <p key={index} className={`event-p fade-in  fade-in`} > {text} </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;