import "./EventDetails.scss";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import Slide from "../Slide/Slide";
import { allEvents } from "../../objects/Events";
import pairLogo from "/pairLogo.png";
import speakerImg from "/speaker.png";

const EventDetails = ({  }) => {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [fadeReady, setFadeReady] = useState(false);

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
                    openSlide={() => {}}
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
                            <h3>Speaker</h3>
                            <div className="speaker-card">
                                {/* Compact View - Default */}
                                <div className="speaker-compact">
                                    <img src={speakerImg} alt={event.speaker} />
                                    <div className="speaker-info">
                                        <h4>{event.speaker}</h4>
                                        <p>Event Speaker</p>
                                    </div>
                                </div>
                                
                                {/* Expanded View - On Hover */}
                                <div className="speaker-expanded">
                                    <div className="speaker-expanded-header">
                                        <img src={speakerImg} alt={event.speaker} />
                                    </div>
                                    <div className="speaker-expanded-content">
                                        <h3>{event.speaker}</h3>
                                        <p className="speaker-title">Associate Professor of Cognitive Science</p>
                                        <p className="speaker-university">University of Warsaw</p>
                                        
                                        <div className="speaker-divider"></div>
                                        
                                        <div className="speaker-bio">
                                            <h4>Biography</h4>
                                            <p>Dr. {event.speaker} is a leading researcher in cognitive psychology and artificial intelligence, with over 15 years of experience in the field.</p>
                                        </div>
                                        
                                        <div className="speaker-interests">
                                            <h4>Research Interests</h4>
                                            <ul>
                                                <li>Cognitive Psychology</li>
                                                <li>Machine Learning</li>
                                                <li>Human-AI Interaction</li>
                                                <li>Neural Networks</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
                                        <h4>Duration</h4>
                                        <p>1 hour</p>
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
                                        <p>All Levels</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - CTA Card */}
                    <div className="event-sidebar fade-in">
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
                                    <span>Reserve a Spot</span>
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
                                        <span>1 hour duration</span>
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