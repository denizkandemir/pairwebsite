import './Newsletter.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from "/aiBannerImg2.png";
import Banner from '../Banner/Banner';
import { newsletterArticles } from '../../objects/NewsletterArticles';
import { allEvents } from '../../objects/Events';
import useFadeInOnScroll from '../../hooks/FadeInAnimation/FadeInAnimation';

const Newsletter = () => {

    const [showAllArticles, setShowAllArticles] = useState(false);

    const newsletterDescription = "Learn more about how AI can affect you in the future through our very own research articles. We tailor them specifically for students to cover relevant topics about their developing psychological, academic or therapeutic careers. On top of that, we recommend the latest elite models that make your academic and professional life easier.";
    const newsletterSecondaryDescription = "AI no longer needs to be anxiety-inducing. By reading our articles, you will acquire enough knowledge and skills in very little time to handle the future with a renewed sense of confidence in yourself.";

    useFadeInOnScroll('.fade-in');

    const featuredArticle = newsletterArticles.find(article => article.isFeatured);
    const favoriteArticles = newsletterArticles.filter(article => !article.isFeatured).slice(0, 4);
    const allArticlesList = newsletterArticles;
    const visibleArticlesLimit = 5;
    const canCollapseArticles = allArticlesList.length > visibleArticlesLimit;
    const displayedArticles = showAllArticles || !canCollapseArticles
      ? allArticlesList
      : allArticlesList.slice(0, visibleArticlesLimit);
    
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
            badgeText="PAIR Updates"
            title="Scientific Excellence, Entirely for Students"
            titleHighlight="Entirely for Students"
            titleClass="newsletter-banner-title"
            imageSrc={bannerImg}
            imageAlt="PAIR newsletter and research updates"
            description={newsletterDescription}
            secondaryDescription={newsletterSecondaryDescription}
            chips={["Psychology", "Artificial Intelligence", "Monthly Updates"]}
            floatingLabels={["Monthly", "AI + Psychology", "Insights", ]}
            detailVariant="newsletter"
            imgClass={"banner-img"} 
          />

          <div className="newsletter-content-container">
            <div className="newsletter-content-wrapper">
              {/* Featured Article Section */}
              <div className="newsletter-featured-section fade-in">
                {featuredArticle && (
                  <Link to={`/newsletter/${featuredArticle.id}`} className="featured-article">
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
                    <span className="featured-link">Read full article</span>
                  </Link>
                )}
              </div>

              {/* Sidebar - All Time Favourites */}
              <aside className="newsletter-sidebar fade-in">
                <h3 className="sidebar-title">ALL TIME FAVOURITES</h3>
                <div className="favorite-articles-list">
                  {favoriteArticles.map((article) => (
                    <Link key={article.id} to={`/newsletter/${article.id}`} className="favorite-article">
                      <div className="favorite-meta">
                        <span className="favorite-category">[{article.category}]</span>
                        <span className="favorite-separator">—</span>
                        <span className="favorite-readtime">{article.readTime}</span>
                      </div>
                      <h4 className="favorite-title">{article.title}</h4>
                      <p className="favorite-date">{article.date}</p>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>

            {/* Articles Section with Load More */}
            <section className="articles-section fade-in">
              <h2 className="articles-section-title">Latest Articles</h2>
              <div className={`articles-grid-container ${canCollapseArticles && !showAllArticles ? 'has-fade' : ''}`}>
                <div className="articles-grid">
                  {displayedArticles.map((article) => (
                    <Link key={article.id} to={`/newsletter/${article.id}`} className="article-card">
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
                    </Link>
                  ))}
                </div>
                {canCollapseArticles && !showAllArticles && (
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
              {canCollapseArticles && showAllArticles && (
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
                      <p className="must-read-description">
                         {event.texts[0].text}  
                      </p>
                      <Link to={`/events/${event.id}`} className="must-read-link">View Details</Link>
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