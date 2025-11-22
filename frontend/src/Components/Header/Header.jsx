import "./Header.scss";
import React from "react";
import Navbar from "../Navbar/Navbar";
import headerImg from "/pairHeader1.png";
import WhoAreWe from "../WhoAreWe/WhoAreWe";
import Blog from "../Blog/Blog";
import PairTimeline from "../PairTimeline/PairTimeline";
import Subscribe from "../Subscribe/Subscribe";
import EventsHomepage from "../EventsHomepage/EventsHomepage";

const Header = () => {

    return (
        <div className="header-navbar-container">

            <Navbar />
            <div className="header-container">
                <div className="neon-shape-1"></div>
                <div className="neon-shape-2"></div>
                <div className="header-content-container">
                    <div className="header-texts-container">
                        <h1 className="header-title"> The ForeFront Of Modern Research </h1>
                        <p className="header-text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, nesciunt! Fugit totam, laboriosam obcaecati, cum fugiat, vel quidem delectus consequuntur ipsam alias suscipit optio. Iure consequuntur tempore molestias id deserunt. </p>
                        <button className="header-button"> Read Our Researches </button>
                    </div>
                    <img src={headerImg} alt="" className="header-img" />
                </div>
            </div>
            <PairTimeline />
            <Blog />
            <WhoAreWe />
            <EventsHomepage />
            <Subscribe />
            {/* <div className="content-end"></div> */}
        </div>
    )


};

export default Header;