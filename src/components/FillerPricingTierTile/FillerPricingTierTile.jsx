import React from "react";
import "./FillerPricingTierTile.css"

const FillerPricingTierTile = ({ pricingTierName }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    return (
        <div className="tile">
            <div className="tile-header">
                <div>{pricingTierName}</div>
                <div style={{ fontWeight: "bold"}}>+</div>
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
