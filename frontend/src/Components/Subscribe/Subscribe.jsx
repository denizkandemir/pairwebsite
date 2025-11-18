import "./Subscribe.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import subscribeMail from "/mail2.png";
import subscribePlane from "/plane3.png";
import React from "react";

const Subscribe = () => {

    useFadeInOnScroll();

    return (
        <div className="subscribe-container">
            <div className="subscribe-content-container">

                <div className="subscribe-img-container fade-in-left">
                   <img src={subscribeMail} alt="" className="subscribe-img" />
                </div>

                <div className="subscribe-content">
                    <h2 className="subscribe-title">Stay in the Loop</h2>
                    <p className="subscribe-text">Psychology & AI research updates delivered monthly.</p>

                    <form className="subscribe-form">
                        <input type="email" placeholder="Enter your email..." />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                
                <div className="subscribe-img-container fade-in-right">
                   <img src={subscribePlane} alt="" className="subscribe-img plane-img" />
                </div>

            </div>
        </div>

    )
}

export default Subscribe;