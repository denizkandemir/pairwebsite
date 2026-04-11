import "./AboutUs.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const AboutUs = () => {
    useFadeInOnScroll(); 

    return (
        <div className="about-hero-container">
            <div className="about-hero-atmosphere" aria-hidden="true">
                <span className="about-energy-particle p1"></span>
                <span className="about-energy-particle p2"></span>
                <span className="about-energy-particle p3"></span>
                <span className="about-energy-particle p4"></span>
                <span className="about-energy-particle p5"></span>
                <span className="about-energy-particle p6"></span>
                <span className="about-energy-particle p7"></span>
                <span className="about-energy-particle p8"></span>
            </div>
            <div className="about-hero-content fade-in">
                <div className="about-hero-text">
                    <p className="about-hero-kicker">About PAIR</p>
                    <h1 className="about-hero-title">
                        <span className="about-hero-title-highlight"> PAIR : </span>
                         Revolutinizing Psychology                
                    </h1>
                    <p className="about-hero-description">
                      Combining the realms of human cognition and technology is no simple task. At PAIR, we believe meeting that challenge requires a revolutionary kind of research culture: one that is both intellectually serious and genuinely enjoyable. We explore how mind and machine shape one another, transforming difficult research and complex findings into clear, goal-driven insight through innovative and creative means.
                    </p>
                </div>
                <div className="banner-line" aria-hidden="true"></div>
            </div>
        </div>
    );
};

export default AboutUs;
