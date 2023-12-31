import React from "react";
import "./FillerPricingTierTile.css"
import { Link } from "react-router-dom";

const FillerPricingTierTile = ({ pricingTierName, state, region }) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return (
        <div className="tile">
            <div className="tile-header">
                <div>{pricingTierName}</div>
                <Link
                    to={`/pricing-tier`}
                    state={{ tierName: pricingTierName, state: state, region: region }}
                    className={ region ? "add-link" : "disabled-link" }
                >
                    +
                </Link>
            </div>
            <div className="tile-content">
                <div className="time">
                    --:-- --  -  --:-- --
                </div>
                <div className="days">
                    {weekDays.map((day, index) => (
                        <div
                            key={day}
                            className="day"
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FillerPricingTierTile;
