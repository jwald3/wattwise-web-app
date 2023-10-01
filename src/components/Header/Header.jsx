import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-header-left">
        <div className="header-logo">
          <img
            src={process.env.PUBLIC_URL + "/headerLogo.png"}
            alt="logo"
            className="header-logo-img"
          />
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
