import React, { useState } from "react";
import logo from '../images/logo.png'
// import $ from "jquery"



function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        // Hat
        <div className="hat">
            <div className="nav-elements">
                <div className="banner" >
                    <div className="logo">
                        <a href="/">
                            <div className="logo-company" >
                            <img src={logo} alt="Logo"></img>
                            </div>
                        </a>
                    </div>
                {/* <div className="banner-text">
                    <div className="company-name">WeatherNews</div>
                    <div className="company-description">Something New</div>
                </div> */}
            </div>
            <div className={`nav-bar ${menuOpen ? "active" : ""}`}>
                <div className="menu-item home" >Home</div>
                <div className="menu-item news" >News</div>
                <div className="menu-item live-cameras" >Live cameras</div>
                <div className="menu-item photos" >Photos</div>
                <div className="menu-item contact" >Contact</div>
                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                </div>
            </div>    
        </div>
    )
}

export default Header