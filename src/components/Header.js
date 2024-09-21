import React from "react";
import logo from '../images/logo.png'

function Header() {
    return (
        // Hat
        <container className="hat">
            <container className="nav-elements">
                <div className="banner" >
                    <div className="logo">
                        <div className="logo-company" >
                        <img src={logo} alt="Logo"></img>
                        </div>
                    </div>
                <div className="banner-text">
                    <div className="company-name">WeatherNews</div>
                    <div className="company-description">Something New</div>
                </div>
            </div>
            <container className="nav-bar">
                <div className="menu-item home" >Home</div>
                <div className="menu-item news" >News</div>
                <div className="menu-item live-cameras" >Live cameras</div>
                <div className="menu-item photos" >Photos</div>
                <div className="menu-item contact" >Contact</div>
                </container>
            </container>    
        </container>
    )
}

export default Header