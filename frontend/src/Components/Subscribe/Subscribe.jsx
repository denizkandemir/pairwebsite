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
                   <img src={subscribeMail} alt="" className="subscribe-img" />
                </div>

                <div className="subscribe-content">
                    <h2 className="subscribe-title">{title}</h2>
                    <p className="subscribe-text">Psychology & AI research updates delivered monthly.</p>

                    <form className="subscribe-form">
                        <input type="email" placeholder="Enter your email..." />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                
                <div className={`subscribe-img-container ${isSmallScreen ? "fade-in" : "fade-in-right"}`}>
                   <img src={subscribePlane} alt="" className="subscribe-img plane-img" />
                </div>
            </div>
      
        </div>

    )
}

export default Subscribe;