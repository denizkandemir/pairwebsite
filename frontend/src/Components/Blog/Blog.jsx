import "./Blog.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import blogImg from "/blog3.png";

const Blog = () => {

    useFadeInOnScroll();

    return (
        <div className="blog-container">
            <div className="blog-content-container">
                <div className="blog-img-container fade-in-right">
                    <img src={blogImg} alt="" className="blog-img" />
                </div>
                <div className="blog-text-container ">
                    <h2 className="blog-title fade-in">
                        From Mind to Machine: New Insights Uncovered
                    </h2>
                    <p className="blog-description fade-in">
                        At PAIR, we share clear and engaging articles that connect psychology, artificial intelligence, and modern research. Each post aims to make complex ideas understandable and spark curiosity about how the mind and technology evolve together.
                    </p>
                    <p className="blog-description fade-in">
                        Check out our blog to stay updated with fresh research insights, practical reflections, and expert perspectives. Explore how new ideas in psychology and AI shape the future of intelligent systems.                    </p>
                    <button className="blog-button"> Find Articles </button>
                </div>
            </div>
        </div>
    )
}

export default Blog;