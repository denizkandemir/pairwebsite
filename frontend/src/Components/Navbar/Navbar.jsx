import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import schoolLogo from "/pairSchoolLogo.png";
import pairLogo from "/pairLogo.png";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-content-container">
                <div className="logo-container">
                    <img src={schoolLogo} alt="" className="logo-img" />
                    <img src={pairLogo} alt="" className="logo-img" />
                </div>
                <div className="navbar-center-container">
                    <Link className="navbar-link" to="/">Blog</Link>
                    <Link className="navbar-link" to="/about">About Us</Link>
                    <Link className="navbar-link"  to="/contact">Contact</Link>
                </div>
                <div className="navbar-right-container">
                    <a href="" className="svg-link">
                       Insta
                    </a>
                    <a href="" className="svg-link">
                       Face
                    </a>
                    <a href="" className="svg-link">
                       LinkedIn
                    </a>

                </div>
            </div>
        </div >
    )
}

export default Navbar;  