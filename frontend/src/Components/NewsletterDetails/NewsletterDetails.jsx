import "./NewsletterDetails.scss";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { newsletterArticles } from "../../objects/NewsletterArticles";
import pairLogo from "/pairLogo.png";
import speakerImg from "/speaker.png";

const NewsletterDetails = () => {

    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [fadeReady, setFadeReady] = useState(false);

    useEffect(() => {
        setFadeReady(false);
        if (id) {
            const foundArticle = newsletterArticles.find(a => a.id === parseInt(id));
            if (foundArticle) {
                setArticle(foundArticle);
                setLoadingArticle(false);
                
                // Get related articles (same category, different id)
                const related = newsletterArticles
                    .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
                    .slice(0, 3);
                setRelatedArticles(related);
                
                // Allow DOM to update before triggering fade-in
                setTimeout(() => {
                    setFadeReady(true);
                }, 100);
            }
        }
    }, [id]);

    useFadeInOnScroll('.fade-in', fadeReady);

    const handleDownloadPDF = () => {
        // PDF download functionality
        alert(`Downloading ${article.title} as PDF...`);
        // In production, this would trigger actual PDF download
    };

    if (loadingArticle || !article) {
        return (
            <div className="article-details-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading article...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="article-details-container">
            {/* Hero Section with Article Image */}
            <div className="article-hero-section fade-in">
                <div className="article-hero-overlay"></div>
                <div className="article-hero-image-container">
                    <img src={article.image} alt={article.title} className="article-hero-img" />
                </div>
                <div className="article-hero-badge">
                    <span className="badge-label">{article.category}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="article-content-wrapper">
                <div className="article-content-grid">
                    {/* Left Column - Article Details */}
                    <div className="article-main-content fade-in">
                        <div className="article-breadcrumb">
                            <Link to="/newsletter">Newsletter</Link>
                            <span className="breadcrumb-separator">›</span>
                            <span>{article.title}</span>
                        </div>

                        <h1 className="article-main-title">{article.title}</h1>

                        <div className="article-meta-info">
                            <div className="meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>{article.date}</span>
                            </div>
                            <div className="meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{article.readTime}</span>
                            </div>
                        </div>

                        <div className="article-authors-section">
                            <h3>Published By</h3>
                            <div className="authors-list">
                                {article.authors && article.authors.map((author, index) => (
                                    <div key={index} className="author-card">
                                        <div className="author-compact">
                                            <img src={speakerImg} alt={author.name} />
                                            <div className="author-info">
                                                <h4>{author.name}</h4>
                                                <p>{author.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="article-description-section">
                            <h2>Full Article</h2>
                            <div className="article-description">
                                <p>{article.description}</p>
                                {/* You can add more paragraphs or content here */}
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>

                        <div className="article-highlights-section">
                            <h2>Key Takeaways</h2>
                            <div className="highlights-grid">
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <div>
                                        <h4>Research-Based</h4>
                                        <p>Grounded in empirical evidence</p>
                                    </div>
                                </div>
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    </svg>
                                    <div>
                                        <h4>Interdisciplinary</h4>
                                        <p>Psychology meets technology</p>
                                    </div>
                                </div>
                                <div className="highlight-card">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                    </svg>
                                    <div>
                                        <h4>Comprehensive</h4>
                                        <p>Deep dive into the topic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - CTA Card */}
                    <div className="article-sidebar fade-in">
                        <div className="article-cta-card">
                            <div className="cta-header">
                                <div className="cta-logo">
                                    <img src={pairLogo} alt="PAIR Logo" />
                                </div>
                            </div>
                            
                            <div className="cta-content">
                                <div className="cta-category-info">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                    <div>
                                        <p className="category-label">{article.category}</p>
                                    </div>
                                </div>

                                <button className="download-button" onClick={handleDownloadPDF}>
                                    <span>Download PDF</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                </button>

                                <div className="cta-divider"></div>

                                <div className="cta-info-list">
                                    <div className="info-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <div className="info-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        <span>{article.authors?.length || 0} Authors</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Articles Section */}
                {newsletterArticles.length > 0 && (
                    <div className="related-articles-section fade-in">
                        <h2>Other Articles You May Like</h2>
                        <div className="related-articles-grid">
                            {newsletterArticles.slice(0, 3).map((relatedArticle) => (
                                <Link 
                                    key={relatedArticle.id} 
                                    to={`/newsletter/${relatedArticle.id}`}
                                    className="related-article-card"
                                >
                                    <div className="related-article-image">
                                        <img src={relatedArticle.image} alt={relatedArticle.title} />
                                        <div className="related-article-category">{relatedArticle.category}</div>
                                    </div>
                                    <div className="related-article-content">
                                        <h3>{relatedArticle.title}</h3>
                                        <div className="related-article-meta">
                                            <span>{relatedArticle.date}</span>
                                            <span>•</span>
                                            <span>{relatedArticle.readTime}</span>
                                        </div>
                                        <p className="related-article-readmore">
                                            Read Article
                                        </p>
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

export default NewsletterDetails;
