import "./AboutUsValues.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const AboutUsValues = () => {
    useFadeInOnScroll();

    const values = [
        {
            title: "Our Mission",
            icon: "🎯",
            description: "To foster a vibrant research community where students and academics can collaborate, share knowledge, and advance their research endeavors together.",
            color: "yellow"
        },
        {
            title: "Our Vision",
            icon: "🔭",
            description: "To become the leading platform for academic research collaboration, creating a global network of researchers pushing the boundaries of knowledge.",
            color: "blue"
        },
        {
            title: "Our Values",
            icon: "💎",
            description: "We believe in collaboration, integrity, innovation, and inclusivity. Every member contributes to building a stronger, more connected research community.",
            color: "purple"
        }
    ];

    return (
        <div className="about-values-container">
            <div className="about-values-content fade-in">
                <div className="about-values-header">
                    <h2 className="about-values-title">What Drives Us</h2>
                    <p className="about-values-subtitle">
                        The principles that guide our community
                    </p>
                </div>

                <div className="values-grid">
                    {values.map((value, index) => (
                        <div className={`value-card value-card-${value.color}`} key={index}>
                            <div className="value-icon-wrapper">
                                <span className="value-icon">{value.icon}</span>
                            </div>
                            <h3 className="value-title">{value.title}</h3>
                            <p className="value-description">{value.description}</p>
                            <div className="value-bg-glow"></div>
                        </div>
                    ))}
                </div>

                <div className="join-cta">
                    <h3 className="join-cta-title">Ready to Join Our Community?</h3>
                    <p className="join-cta-text">
                        Be part of a thriving research ecosystem where innovation meets collaboration
                    </p>
                    <button className="join-cta-button">Get Started Today</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUsValues;
