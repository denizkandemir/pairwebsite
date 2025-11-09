import "./Header.scss";
import React from "react";
import Navbar from "../Navbar/Navbar";
import headerImg from "/pairHeader1.png";

const Header = () => {

    return(
        <div className="header-container">
            <Navbar />
           <div className="header-content-container">
                 <div className="header-texts-container">
                    <h1 className="header-title"> The ForeFront Of Modern Research </h1>
                    <p className="header-text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, nesciunt! Fugit totam, laboriosam obcaecati, cum fugiat, vel quidem delectus consequuntur ipsam alias suscipit optio. Iure consequuntur tempore molestias id deserunt. </p>
                    <button className="header-button"> Read Our Researches </button>
                 </div>
                <img src={headerImg} alt="" className="header-img" />
           </div>
        </div>
    )
};

export default Header;