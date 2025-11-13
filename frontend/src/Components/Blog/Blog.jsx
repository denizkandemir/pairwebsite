import "./Blog.scss";
import React, { use } from "react";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";

const Blog = () => {

    useFadeInOnScroll();

    return(
        <div className="blog-container">
            <div className="blog-content-container">
                <div className="blog-text-container ">
                    <h2 className="blog-title fade-in">
                        Check Out Our Latest Articles and Research Insights
                    </h2>
                    <p className="blog-description fade-in">
                        Stay tuned for in-depth analyses, expert opinions, and the latest trends in the industry.
                    </p>
                </div>
                <div className="blog-img-container fade-in-right">

                </div>
            </div>
        </div>
    )
}

export default Blog;