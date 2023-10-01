import React from "react";

const LandingPage = () => {
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                height: "100vh",
                width: "80%",
                maxWidth: 1400,
                margin: "auto",
                flexDirection: "column",
            }}
        >
            <div
                className="header"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "15vh",
                    padding: "0 5%",
                    marginBottom: "5%",
                }}
            >
                <div
                    className="header-left"
                    style={{
                        display: "flex",
                        height: "100%",
                        flex: 1,
                        alignItems: "center",
                        paddingLeft: "10px",
                    }}
                >
                    <div
                        className="logo"
                        style={{ display: "flex", height: "auto" }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/headerLogo.png"}
                            alt="logo"
                            style={{
                                height: "auto",
                                width: "200px",
                                maxWidth: "100%",
                            }}
                        />
                    </div>
                </div>
                <div
                    className="header-right"
                    style={{
                        display: "flex",
                        height: "100%",
                        flex: 2,
                        alignItems: "center",
                        gap: "20px",
                        justifyContent: "flex-end",
                    }}
                >
                    <p>Links</p>
                    <p>Links</p>
                    <p>Links</p>
                    <p>Links</p>
                    <p>Links</p>
                    <p>Links</p>
                </div>
            </div>
            <div
                className="content"
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    padding: "0 5%",
                    maxWidth: "100%"
                }}
            >
                <div
                    className="left-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 2,
                        padding: "5% 0", // Adjusted the padding here to reduce it vertically
                        justifyContent: "space-around",
                        maxHeight: 800
                    }}
                >
                    <div
                        className="text-container"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: "3.25rem"}}>
                            <span style={{ color: "#32C5A4" }}>Smart </span>
                            <span style={{ color: "black" }}>Power,</span>
                            <br />
                            <div className="right-skew" style={{ marginLeft: 0}}>
                            <span style={{ color: "#32C5A4" }}>Smart </span>
                            <span style={{ color: "black" }}>Savings</span>
                            </div>
                            
                        </div>
                    </div>
                    <div
                        className="call-to-action"
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "30vw",
                            gap: "3rem",
                        }}
                    >
                        <div
                            className="cta-header"
                            style={{
                                display: "flex",
                                width: "100%",
                                fontSize: "1.25rem",
                            }}
                        >
                            Understanding your energy consumption may seem
                            overwhelming, but it's simpler than you think with
                            Wattwise— making it easy to save, no matter your
                            lifestyle. Start conserving today, and watch the
                            savings stack up!
                        </div>
                        <div
                            className="btn-container"
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <button
                                className="cta-button"
                                style={{
                                    backgroundColor: "#4CAF50", // Or any color you prefer
                                    color: "white", // Text color
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    boxShadow:
                                        "0px 8px 15px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.3s ease-in-out",
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform =
                                        "translateY(-7px)";
                                    e.target.style.boxShadow =
                                        "0px 15px 20px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform =
                                        "translateY(0px)";
                                    e.target.style.boxShadow =
                                        "0px 8px 15px rgba(0, 0, 0, 0.1)";
                                }}
                            >
                                Sign Up Now
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="right-content"
                    style={{
                        display: "flex",
                        flex: 3,
                        justifyContent: "flex-end", // Aligns the child div (image-container) to the right (flex-end) within the flex container.
                    }}
                >
                    <div
                        className="image-container"
                        style={{
                            position: "relative", // This will prevent any positioned child elements from overflowing this container.
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/recycling.png"}
                            alt=""
                            style={{
                                width: "16rem",
                                height: "16rem",
                                borderRadius: 20,
                                position: "absolute",
                                top: 0,
                                right: 0,
                                zIndex: 1,
                            }}
                        />
                        <img
                            src={process.env.PUBLIC_URL + "/gardening.png"}
                            alt=""
                            style={{
                                width: "16rem",
                                height: "16rem",
                                borderRadius: 20,
                                position: "absolute",
                                top: 200,
                                right: 160,
                                zIndex: 2,
                            }}
                        />
                        <img
                            src={process.env.PUBLIC_URL + "/swimming.png"}
                            alt=""
                            style={{
                                width: "16rem",
                                height: "16rem",
                                borderRadius: 20,
                                position: "absolute",
                                top: 420,
                                right: 20,
                                zIndex: 1,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
