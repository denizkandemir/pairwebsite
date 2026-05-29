import "./Subscribe.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import subscribeMail from "/mail2.png";
import subscribePlane from "/plane3.png";
import React, { useState, useEffect } from "react";

const Subscribe = ({title}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1000);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useFadeInOnScroll();

    return (
        <div className="subscribe-container">
            <div className="subscribe-content-container">

                <div className={`subscribe-img-container ${isSmallScreen ? "fade-in" : "fade-in-left"}`}>
                   <img src={subscribeMail} alt="Email subscription illustration" className="subscribe-img" loading="lazy" decoding="async" />
                </div>

                <div className="subscribe-content">
                    <h2 className="subscribe-title">{title}</h2>
                    <p className="subscribe-text">
                        Exclusive AI offers and research highlights delivered straight to your mailbox.
                    </p>

                    <form className="subscribe-form">
                        {/* <input type="email" placeholder="Enter your email..." /> */}
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGGAzOOeoN3JWcLSNTGAv7XtFcYz3qyTC0an7miLJkImA-rA/viewform?usp=publish-editor" className="link subscribe-link" target="blank">
                         <button type="button">Subscribe</button>
                        </a>
                    </form>
                </div>

                
                <div className={`subscribe-img-container ${isSmallScreen ? "fade-in" : "fade-in-right"}`}>
                   <img src={subscribePlane} alt="Newsletter delivery illustration" className="subscribe-img plane-img" loading="lazy" decoding="async" />
                </div>
            </div>
      
        </div>

    )
}

export default Subscribe;