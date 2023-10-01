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
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
      </div>
    </div>
  );
};

export default Header;
