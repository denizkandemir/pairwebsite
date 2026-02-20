import './Newsletter.scss';
import React, { useState } from 'react';
import bannerImg from "/aiBannerImg2.png";
import Banner from '../Banner/Banner';
import { newsletterArticles } from '../../objects/NewsletterArticles';
import { allEvents } from '../../objects/Events';
import useFadeInOnScroll from '../../hooks/FadeInAnimation/FadeInAnimation';

const Newsletter = () => {

    const [showAllArticles, setShowAllArticles] = useState(false);

    const newsletterTexts = [
    {
        id: 1,
        text: "Stay connected with the latest insights at the intersection of psychology and artificial intelligence. Our newsletter brings you curated research highlights, upcoming events, and thought-provoking discussions."
    },

    {
        id: 2,
        text: "Join a growing academic community where ideas evolve into dialogue, and dialogue evolves into innovation. Subscribe to receive updates, opportunities, and exclusive content directly in your inbox."
    }
  ];

    useFadeInOnScroll('.fade-in');

    const featuredArticle = newsletterArticles.find(article => article.isHighlighted);
    const favoriteArticles = newsletterArticles.filter(article => !article.isHighlighted).slice(0, 4);
    const allArticlesList = newsletterArticles.filter(article => !article.isHighlighted);
    const displayedArticles = showAllArticles ? allArticlesList : allArticlesList.slice(0, 5);
    
    // Get events and webinars (try to get upcoming ones, fallback to all)
    const today = new Date();
    const eventsAndWebinars = allEvents
        .filter(event => {
            try {
                const eventDate = new Date(event.date);
                return eventDate >= today;
            } catch {
                return true; // Include if date parsing fails
            }
        })
        .slice(0, 10);
    
    // If not enough upcoming events, use all events
    const displayEvents = eventsAndWebinars.length >= 6 ? eventsAndWebinars : allEvents.slice(0, 10);

    return(
    
        <div className="newsletter-page">
          <Banner 
            title="Newsletter" 
            backgroundImage={bannerImg} 
            texts={newsletterTexts} 
            imgClass={"banner-img"} 
          />

          <div className="newsletter-content-container">
            <div className="newsletter-content-wrapper">
              {/* Featured Article Section */}
              <div className="newsletter-featured-section fade-in">
                {featuredArticle && (
                  <article className="featured-article">
                    <div className="featured-badge">HIGHLIGHTED ARTICLE</div>
                    <div className="featured-image-container">
                      <img src={featuredArticle.image} alt={featuredArticle.title} />
                    </div>
                    <div className="featured-meta">
                      <span className="featured-category">[{featuredArticle.category}]</span>
                      <span className="featured-separator">—</span>
                      <span className="featured-readtime">{featuredArticle.readTime}</span>
                    </div>
                    <h2 className="featured-title">{featuredArticle.title}</h2>
                    <p className="featured-description">{featuredArticle.shortDescription}</p>
                    <a href="#" className="featured-link">Read full article</a>
                  </article>
                )}
              </div>

              {/* Sidebar - All Time Favourites */}
              <aside className="newsletter-sidebar fade-in">
                <h3 className="sidebar-title">ALL TIME FAVOURITES</h3>
                <div className="favorite-articles-list">
                  {favoriteArticles.map((article) => (
                    <article key={article.id} className="favorite-article">
                      <div className="favorite-meta">
                        <span className="favorite-category">[{article.category}]</span>
                        <span className="favorite-separator">—</span>
                        <span className="favorite-readtime">{article.readTime}</span>
                      </div>
                      <h4 className="favorite-title">{article.title}</h4>
                      <p className="favorite-date">{article.date}</p>
                    </article>
                  ))}
                </div>
              </aside>
            </div>

            {/* Articles Section with Load More */}
            <section className="articles-section fade-in">
              <h2 className="articles-section-title">Latest Articles</h2>
              <div className={`articles-grid-container ${!showAllArticles ? 'has-fade' : ''}`}>
                <div className="articles-grid">
                  {displayedArticles.map((article) => (
                    <article key={article.id} className="article-card">
                      <div className="article-image">
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className="article-content">
                        <div className="article-meta">
                          <span className="article-category">[{article.category}]</span>
                          <span className="article-separator">—</span>
                          <span className="article-readtime">{article.readTime}</span>
                        </div>
                        <h3 className="article-title">{article.title}</h3>
                        <p className="article-short-description">{article.shortDescription}</p>
                        <p className="article-date">{article.date}</p>
                      </div>
                    </article>
                  ))}
                </div>
                {!showAllArticles && allArticlesList.length > 5 && (
                  <div className="articles-fade-overlay">
                    <button 
                      className="load-more-button"
                      onClick={() => setShowAllArticles(true)}
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </div>
              {showAllArticles && allArticlesList.length > 5 && (
                <div className="show-less-container">
                  <button 
                    className="show-less-button"
                    onClick={() => setShowAllArticles(false)}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </section>

            {/* Events & Webinars Section */}
            <section className="must-read-section fade-in">
              <h2 className="must-read-title">Events & Webinars</h2>
              <div className="must-read-divider">
                <div className="divider-line divider-pink"></div>
                <div className="divider-line divider-blue"></div>
              </div>
              <div className="must-read-grid">
                {displayEvents.map((event) => (
                  <article key={event.id} className="must-read-card">
                    <div className="must-read-image">
                      <img src={event.imgs[0].url} alt={event.title} />
                      <div className="event-type-badge">{event.type}</div>
                    </div>
                    <div className="must-read-content">
                      <div className="must-read-meta">
                        <span className="must-read-category">[{event.type.toUpperCase()}]</span>
                        <span className="must-read-separator">—</span>
                        <span className="must-read-readtime">{event.location}</span>
                      </div>
                      <h3 className="must-read-title-text">{event.title}</h3>
                      <p className="must-read-description">
                        {event.date} • Speaker: {event.speaker}
                      </p>
                      <a href={`/events/${event.id}`} className="must-read-link">View Details</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
    )

}

export default Newsletter;