import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-header-left">
        <div className="header-logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/headerLogo.png"}
            alt="logo"
            className="header-logo-img"
          />
          </Link>
        </div>
      </div>
      <div className="main-header-right">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/#">About</Link>
        <Link to="/#">Contact Us</Link>
        <Link to="/#">Logout</Link>
      </div>
    </div>
  );
};

export default Header;
