import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";

const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="header-container">
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
                    <div className="desktop-menu">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/privacy">Privacy</Link>
                                <Link to="/about-us">About</Link>
                                <Link to="https://twitter.com/WattwiseApp">
                                    Contact Us
                                </Link>
                                <div
                                    onClick={() =>
                                        logout({
                                            returnTo: window.location.origin,
                                        })
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </div>
                            </>
                        ) : (
                            <div
                                onClick={loginWithRedirect}
                                style={{ cursor: "pointer" }}
                            >
                                Login
                            </div>
                        )}
                    </div>
                    <div className="mobile-menu">
                        <HeaderDropdown
                            isAuthenticated={isAuthenticated}
                            loginWithRedirect={loginWithRedirect}
                            logout={logout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
