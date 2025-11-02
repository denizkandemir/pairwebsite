import "/Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-content-container">
                <div className="logo-container">
                    <img src="" alt="" className="logo-img" />
                </div>
                <div className="navbar-center-container">
                    <Link className="navbar-link" to="/">Blog</Link>
                    <Link className="navbar-link" to="/about">About Us</Link>
                    <Link className="navbar-link"  to="/contact">Contact</Link>
                </div>
                <div className="navbar-right-container">

                </div>
            </div>
        </div >
    )
}

export default Navbar;  