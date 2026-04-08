import "./AboutUs.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import aboutMainImg from "/aboutUsImgMain4.png";
import aboutUsTeam from "/aboutUsTeam.jpeg";


const AboutUs = () => {
    useFadeInOnScroll(); 

    return (
        <div className="about-hero-container">
            <div className="about-hero-content fade-in">
                <div className="about-hero-text">
                    <p className="about-hero-kicker">About PAIR</p>
                    <h1 className="about-hero-title">
                        Where Collaborative Minds Advance
                        <span className="about-hero-title-highlight"> Psychology + AI</span>
                    </h1>
                    <p className="about-hero-description">
                        PAIR is a university-affiliated initiative that brings together psychology,
                        artificial intelligence, and rigorous inquiry to build a collaborative research culture
                        where ideas, methods, and people grow together.
                    </p>
                    <div className="about-hero-chips" aria-label="About PAIR focus areas">
                        <span className="about-chip">Interdisciplinary</span>
                        <span className="about-chip">Research Community</span>
                    </div>
                </div>

                <div className="about-hero-visual" aria-hidden="true">
                    <div className="about-visual-glow"></div>
                    <div className="about-main-visual">
                        <img src={aboutUsTeam} alt="About PAIR" className="about-hero-image about-img-main" />
                    </div>
                    <div className="about-stats-card">
                        <p className="about-stats-badge">COMMUNITY</p>
                        <p className="about-stats-value">15+</p>
                        <p className="about-stats-label">Active Research Collaborations</p>
                    </div>
                    <div className="about-team-card">
                        <img src={aboutUsTeam} alt="PAIR research community" className="about-team-image" />
                        <p className="about-team-label">Collaborative Team</p>
                    </div>
                    <p className="about-micro-label">Interdisciplinary Network</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
