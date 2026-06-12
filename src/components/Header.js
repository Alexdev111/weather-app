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
            </div>
                <div className={`nav-bar ${menuOpen ? "active" : ""}`}>
                    <a href="/" className="menu-item home">HOME</a>
                    <a href="/news" className="menu-item news">NEWS</a> {/* Add href */}
                    <a href="#live-cameras" className="menu-item live-cameras">LIVE CAMERAS</a>
                    <a href="/photos" className="menu-item photos">PHOTOS</a> {/* Add href */}
                    <a href="/contact" className="menu-item contact">CONTACT</a> {/* Add href */}
                    
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