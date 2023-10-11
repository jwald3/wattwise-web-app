import React from "react";
import "./LandingPage.css";
import Layout from "../../Layouts/Layout";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Layout>
            <div className="main-page-landing">
                <div className="landing-page-content">
                    <div className="landing-page-left-content">
                        <div className="landing-page-copy">
                            <div className="landing-page-copy-text">
                                <span className="brand-color-main">Smart </span>
                                <span className="brand-color-dark">Power,</span>
                                <br />
                                <span className="brand-color-main">Smart </span>
                                <span className="brand-color-dark">
                                    Savings.
                                </span>
                            </div>
                        </div>
                        <div className="call-to-action-container">
                            <div className="call-to-action-text">
                                Understanding your energy consumption may seem
                                overwhelming, but it's simpler than you think
                                with Wattwise— making it easy to save, no matter
                                your lifestyle. Start conserving today, and
                                watch the savings stack up!
                            </div>
                            <div className="call-to-action-btn-container">
                                
                                {isAuthenticated ? (
                                    <Link to="/about-us">
                                        <button className="learn-more-button">
                                            Learn More
                                        </button>
                                    </Link>
                                ) : <LoginButton />}
                            </div>
                        </div>
                    </div>
                    <div className="landing-page-right-content">
                        <div className="image-tiles-container">
                            <img
                                src={process.env.PUBLIC_URL + "/recycling.png"}
                                alt=""
                                className="image-tile"
                                id="tile-1"
                            />
                            <img
                                src={process.env.PUBLIC_URL + "/gardening.png"}
                                alt=""
                                className="image-tile"
                                id="tile-2"
                            />
                            <img
                                src={process.env.PUBLIC_URL + "/swimming.png"}
                                alt=""
                                className="image-tile"
                                id="tile-3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LandingPage;
