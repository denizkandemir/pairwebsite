import "./EventsCards.scss";
import { Link } from "react-router-dom";
import pairLogo from "/pairLogo.png";
import speakerImg from "/speaker.png";
import { useState, useEffect } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { upcomingEvents } from "../../objects/UpcomingEvents";
import { pastEvents } from "../../objects/PastEvents";

const eventsCards = ({ }) => {

    useFadeInOnScroll();

    const [comingEvents, setComingEvents] = useState(upcomingEvents);
    const [isUpcoming, setIsUpcoming] = useState("upcoming");
    const [fadeClass, setFadeClass] = useState('fade-in-active');
    const [sortOption, setSortOption] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sortOptions = [
        { value: 'all', label: 'All' },
        { value: 'date', label: 'Date (Upcoming)' },
        { value: 'event', label: 'Event' },
        { value: 'webinar', label: 'Webinar' }
    ];

    const handleSort = (selectedOption) => {
        setSortOption(selectedOption);
        setIsDropdownOpen(false);
        
        const baseEvents = isUpcoming === "upcoming" ? upcomingEvents : pastEvents;

        if (selectedOption === 'date') {
            const sortedEvents = [...baseEvents].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            setComingEvents(sortedEvents);
        }
        else if (selectedOption === 'event') {
           const filteredEvents = baseEvents.filter(event => event.type === "Event");
           setComingEvents(filteredEvents);
        }
        else if (selectedOption === 'webinar') {   
            const filteredWebinars = baseEvents.filter(event => event.type === "Webinar");
            setComingEvents(filteredWebinars);
        }
        else {
            setComingEvents(baseEvents);
        }
    }

    const handleEventButtons = (status) => {
        setFadeClass('fade-out');
        setTimeout(() => {
            setIsUpcoming(status);
            if (status === "upcoming") {
                setComingEvents(upcomingEvents);
            }
            else {
                setComingEvents(pastEvents);
            }
            setFadeClass('fade-in-active');
        }, 300);
    }

    return (
        <>
            <div className="events-cards-buttons-container fade-in">
                <div className={`events-cards-buttons-wrapper ${isUpcoming === "past" ? 'past-active' : ''}`}>
                    <button className={isUpcoming === "upcoming" ? "events-cards-active-btn" : "events-cards-inactive-btn"} onClick={() => handleEventButtons("upcoming")}>Upcoming Events</button>
                    <button className={isUpcoming === "past" ? "events-cards-active-btn" : "events-cards-inactive-btn"} onClick={() => handleEventButtons("past")}>Past Events</button>
                </div>
                <div className="sort-by-container">
                    <div 
                        className="sort-by-dropdown"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="dropdown-selected">
                            Sort By : {sortOptions.find(opt => opt.value === sortOption)?.label}
                        </span>
                        <svg 
                            className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                            width="14" 
                            height="8" 
                            viewBox="0 0 14 8" 
                            fill="none"
                        >
                            <path 
                                d="M1 1L7 7L13 1" 
                                stroke="rgba(79, 195, 247, 0.8)" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {sortOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`dropdown-item ${sortOption === option.value ? 'active' : ''}`}
                                    onClick={() => handleSort(option.value)}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="events-cards-container">
                <div className={`events-cards-content-container ${fadeClass}`}>
                    {
                       comingEvents.map((events) => (
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
        </>
    )
}

export default eventsCards;