import "/Header.scss";
import React from "react";
import Navbar from "../Navbar/Navbar";

const Header = () => {

    return(
        <div className="header-container">
            <Navbar />
           <h1>SCN PAIR</h1>
        </div>
    )
};

export default Header;