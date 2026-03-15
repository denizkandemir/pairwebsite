import "./AboutUs.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import aboutMainImg from "/aboutUsImgMain4.png";

const AboutUs = () => {
    useFadeInOnScroll();

    return (
        <div className="about-hero-container">
            <div className="about-hero-content fade-in">
                <div className="about-hero-text">
                    <h1 className="about-hero-title">
                        Building a Strong
                        <span className="about-hero-title-highlight"> Research Community</span>
                    </h1>
                    <p className="about-hero-description">
                        We help you collaborate, learn, and seamlessly develop
                        your academic journey with confidence
                    </p>
                </div>
                
                <div className="about-hero-image-container">
                    <div className="about-hero-image-wrapper">
                        <img src={aboutMainImg} alt="About PAIR" className="about-hero-image" />
                        <div className="image-glow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
