import "./AboutUs.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import aboutMainImg from "/aboutUsImgMain4.png";
import aboutMainImgRight from "/aboutUsImgSide3.png";

const AboutUs = () => {
    useFadeInOnScroll(); 

    const aboutImages = [
        {
            id: 2,
            img: aboutMainImg,
            imgClass: "about-img-main"
        },

        {
            id: 3,
            img: aboutMainImgRight,
            imgClass: "about-img-right"
        }
    ]

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
                        your academic journey with confidence,  We help you collaborate, learn, and seamlessly develop
                        your academic journey with confidence
                    </p>
                </div>

                <div className="about-hero-image-container">
                        <div className="about-hero-image-wrapper about-stats-wrapper" aria-label="Community statistics">
                            <div className="about-stats-card">
                                <p className="about-stats-badge">COMMUNITY</p>
                                <p className="about-stats-value">15+</p>
                                <p className="about-stats-label">Research Collaborations</p>
                            </div>
                        </div>
                        {
                            aboutImages.map((img) => (
                                <div key={img.id} className="about-hero-image-wrapper">
                                    <img src={img.img} alt="About PAIR" className={`about-hero-image ${img.imgClass}`} />
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
