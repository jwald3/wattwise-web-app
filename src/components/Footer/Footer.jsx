import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footerContainer">
            <div className="leftSection">
                <span>© 2023 Wattwise</span>
            </div>
            <div className="rightSection">
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/privacy">Privacy</Link>
				<Link to="/about-us">About</Link>
				<Link to="/#">Contact Us</Link>
            </div>
        </footer>
    );
};

export default Footer;
