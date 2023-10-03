import React from "react";
import "./PricingTierTile.css"

const PricingTierTile = ({ pricingData }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const {
        rate,
        pricing_tier_name: pricingTierName,
        start_time: startTime,
        end_time: endTime,
        pricingTierDays,
    } = pricingData;
    
    const convertTo12Hour = (timeStr) => {
        // Extract hours, minutes, and seconds
        const [hours, minutes] = timeStr.split(":");
        
        // Determine AM/PM
        const isPM = hours >= 12;
        const isMidday = hours === 12;
    
        // Convert hours to 12-hour format
        const convertedHours = isMidday ? 12 : hours % 12;
    
        // Construct 12-hour format time string
        const timeIn12Hour = `${convertedHours.toString().padStart(2, '0')}:${minutes} ${isPM ? 'PM' : 'AM'}`;
    
        return timeIn12Hour;
    }

    const activeDays = pricingTierDays.map((d) => d.day_of_week);
    const startTimeIn12Hour = convertTo12Hour(startTime);
    const endTimeIn12Hour = convertTo12Hour(endTime);

    return (
        <div className="tile">
            <div className="tile-header">
                <div>{pricingTierName}</div>
                <div>{rate} USD/kWh</div>
            </div>
            <div className="tile-content">
                <div className="time">{startTimeIn12Hour} - {endTimeIn12Hour}</div>
                <div className="days">
                    {weekDays.map((day, index) => (
                        <div
                            key={day}
                            className={activeDays.includes(index + 1) ? "day active" : "day"}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTierTile;
