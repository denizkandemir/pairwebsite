import "./EventDetails.scss";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import Slide from "../Slide/Slide";
import { allEvents } from "../../objects/Events";
import pairLogo from "/pairLogo.png";

const EventDetails = ({ }) => {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [fadeReady, setFadeReady] = useState(false);
    const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(null);

    useEffect(() => {
        setFadeReady(false);
        if (id) {
            const foundEvent = allEvents.find(e => e.id === parseInt(id));
            if (foundEvent) {
                setEvent(foundEvent);
                setLoadingEvent(false);

                // Get related events (same type, different id)
                const related = allEvents
                    .filter(e => e.type === foundEvent.type && e.id !== foundEvent.id)
                    .slice(0, 3);
                setRelatedEvents(related);
                setActiveSpeakerIndex(null);

                // Allow DOM to update before triggering fade-in
                setTimeout(() => {
                    setFadeReady(true);
                }, 100);
            }
        }
    }, [id]);

    useFadeInOnScroll('.fade-in', fadeReady);

    if (loadingEvent || !event) {
        return (
            <div className="event-details-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading event details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="event-details-container">
            {/* Hero Section with Image Slider */}
            <div className="event-hero-section fade-in">
                <div className="event-hero-overlay"></div>
                <Slide
                    SlideImgs={event.imgs}
                    id={event.id}
                    container={"event-hero-slide-container"}
                    imgClass={"event-hero-img"}
                    openSlide={() => { }}
                />
                <div className="event-hero-badge">
                    <span className="badge-label">{event.type}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="event-content-wrapper">
                <div className="event-content-grid">
                    {/* Left Column - Event Details */}
                    <div className="event-main-content fade-in">
                        <div className="event-breadcrumb">
                            <Link to="/events">Events</Link>
                            <span className="breadcrumb-separator">›</span>
                            <span>{event.title}</span>
                        </div>

                        <h1 className="event-main-title">{event.title}</h1>

                        <div className="event-meta-info">
                            <div className="meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>{event.date}</span>
                            </div>
                            <div className="meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>{event.location}</span>
                            </div>
                        </div>

                        <div className="event-speaker-section">
                            <h3>Speakers</h3>
                            <div className="speaker-grid" role="list">
                                {event.speakers &&
                                    event.speakers.map((speaker, index) => (
                                            <button
                                                key={speaker.id || index}
                                                type="button"
                                                role="listitem"
                                                className={`speaker-grid-card ${activeSpeakerIndex === index ? "is-active" : ""} ${activeSpeakerIndex !== null && activeSpeakerIndex !== index ? "is-suppressed" : ""}`}
                                                onClick={() => setActiveSpeakerIndex((prev) => (prev === index ? null : index))}
                                                aria-expanded={activeSpeakerIndex === index}
                                            >
                                                <div className="speaker-grid-card__compact">
                                                    <div className="speaker-grid-card__avatar-wrap">
                                                        <img src={speaker.img} alt={speaker.name} />
                                                    </div>
                                                    <div className="speaker-grid-card__info">
                                                        <h4>{speaker.name}</h4>
                                                     
                                                    </div>
                                                    {
                                                        activeSpeakerIndex === index ? (
                                                            <span className="speaker-grid-card__cue" aria-hidden="true">
                                                                →
                                                            </span>  ) : ( <span className="speaker-grid-card__cue" aria-hidden="true">
                                                         ↗
                                                    </span>)
                                                    }
                                                   
                                                </div>

                                                <div
                                                    className={`speaker-grid-card__expandable ${activeSpeakerIndex === index ? "is-open" : ""}`}
                                                    aria-hidden={activeSpeakerIndex !== index}
                                                >
                                                       <p className="speaker-grid-card__university"> {speaker.title}</p>
                                                    <div className="speaker-grid-card__divider"></div>
                                                    <p className="speaker-grid-card__university">{speaker.university}</p>
                                                    <div className="speaker-grid-card__bio">
                                                        <h5>Biography</h5>
                                                        <p>
                                                            {speaker.bio}
                                                        </p>
                                                    </div>
                                                    <div className="speaker-grid-card__interests">
                                                        <h5>Research Interests</h5>
                                                        <ul>
                                                            {speaker.interests.map((interest, idx) => (
                                                                <li key={idx}>{interest}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                            </div>
                        </div>

                        <div className="event-description-section">
                            <h2>Overview</h2>
                            <div className="event-description">
                                {event.texts && event.texts.map((text, index) => (
                                    <p key={index}>{text.text || text}</p>
                                ))}
                            </div>
                        </div>

                        <div className="event-highlights-section">
                            <h2>Good to Know</h2>
                            <div className="highlights-grid">
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <div>
                                        <h4>Start Time</h4>
                                        <p>{event.startTime}</p>
                                    </div>
                                </div>
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <div>
                                        <h4>Location</h4>
                                        <p>{event.location}</p>
                                    </div>
                                </div>
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <div>
                                        <h4>Audience</h4>
                                        <p>{event.audience || "All Levels"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - CTA Card */}
                    <div className="event-sidebar fade-in">
                        <div className="event-sidebar-sticky">
                            <div className="event-cta-card">
                                <div className="cta-header">
                                    <div className="cta-logo">
                                        <img src={pairLogo} alt="PAIR Logo" />
                                    </div>
                                </div>

                                <div className="cta-content">
                                    <div className="cta-price">
                                        <span className="price-label">Free</span>
                                    </div>

                                    <div className="cta-date-info">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <div>
                                            <p className="date-label">{event.date}</p>
                                        </div>
                                    </div>

                                    <button className="reserve-button">
                                       
                                       <a className="link" href=" https://pair-conference.pl/register.html">
                                          <span>Reserve a Spot</span>
                                        </a> 
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>

                                    <div className="cta-divider"></div>

                                    <div className="cta-info-list">
                                        <div className="info-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            <span>{event.startTime}</span>
                                        </div>
                                        <div className="info-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="event-map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d706.1256625987585!2d20.98593909497691!3d52.212312004853516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb87ffd85def%3A0x1b3838cd631aba26!2sFaculty%20of%20Psychology%2C%20University%20of%20Warsaw!5e0!3m2!1str!2spl!4v1775878868094!5m2!1str!2spl"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Faculty of Psychology, University of Warsaw Map"
                            />
                        </div>

                    </div>
                </div>

                {/* Related Events Section */}
                {relatedEvents.length > 0 && (
                    <div className="related-events-section fade-in">
                        <h2>Other Events You May Like</h2>
                        <div className="related-events-grid">
                            {relatedEvents.map((relatedEvent) => (
                                <Link
                                    key={relatedEvent.id}
                                    to={`/events/${relatedEvent.id}`}
                                    className="related-event-card"
                                >
                                    <div className="related-event-image">
                                        <img src={relatedEvent.imgs[0].url} alt={relatedEvent.title} />
                                        <div className="related-event-type">{relatedEvent.type}</div>
                                    </div>
                                    <div className="related-event-content">
                                        <h3>{relatedEvent.title}</h3>
                                        <div className="related-event-meta">
                                            <span>{relatedEvent.date}</span>
                                            <span>•</span>
                                            <span>{relatedEvent.location}</span>
                                        </div>
                                        <p className="related-event-price">Free</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventDetails;