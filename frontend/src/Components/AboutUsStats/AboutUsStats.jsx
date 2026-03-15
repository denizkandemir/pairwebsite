import "./AboutUsStats.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import sideImg1 from "/aboutUsImgSide1.png";
import sideImg2 from "/aboutUsImgSide2.png";
import sideImg3 from "/aboutUsImgSide3.png";
import sideImg4 from "/aboutUsImgSide4.png";

const AboutUsStats = () => {
    useFadeInOnScroll();

    const stats = [
        {
            number: "500+",
            label: "Active Members",
            icon: "👥"
        },
        {
            number: "100+",
            label: "Research Projects",
            icon: "📊"
        },
        {
            number: "50+",
            label: "Events Organized",
            icon: "🎯"
        },
        {
            number: "20+",
            label: "Partner Universities",
            icon: "🤝"
        }
    ];

    const images = [sideImg1, sideImg2, sideImg3, sideImg4];

    return (
        <div className="about-stats-container">
            <div className="about-stats-content fade-in">
                <div className="about-stats-header">
                    <h2 className="about-stats-title">Our Impact in Numbers</h2>
                    <p className="about-stats-subtitle">
                        Empowering the research community through collaboration and innovation
                    </p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div className="stat-card" key={index}>
                            <div className="stat-icon">{stat.icon}</div>
                            <h3 className="stat-number">{stat.number}</h3>
                            <p className="stat-label">{stat.label}</p>
                            <div className="stat-glow"></div>
                        </div>
                    ))}
                </div>

                <div className="about-images-grid">
                    {images.map((img, index) => (
                        <div className="about-image-card" key={index}>
                            <img src={img} alt={`About PAIR ${index + 1}`} className="about-image" />
                            <div className="image-overlay"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsStats;
