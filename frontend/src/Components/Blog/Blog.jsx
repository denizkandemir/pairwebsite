import "./Blog.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import blogImg from "/blog3.png";
import { Link } from "react-router-dom";

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
                        Innovation Materialized
                    </h2>
                    <p className="blog-description fade-in">
At PAIR, all of our contributions depend on sharing ideas. From our very own original studies and literature reviews to lecture summaries and recommendations of AI tools, we are dedicated to expanding the knowledge at the intersection of psychology and AI.                    </p>
                    <p className="blog-description fade-in">
                   Our research will keep you in the loop with the most recent findings, practical recommendations and expert perspectives. Every article aims to strike a good balance between being educational and engaging, with the aim of sparking our readers’ curiosity. We invite you to explore with us the
                         </p>
                    
                    <Link to="/newsletter">
                    <button className="blog-button">
                        Read Our Articles
                    </button>
                    </Link  >
                </div>
            </div>
        </div>
    )
}

export default Blog;