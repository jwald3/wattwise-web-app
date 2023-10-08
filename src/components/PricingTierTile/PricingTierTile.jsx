import React from "react";
import "./PricingTierTile.css";
import { Link } from "react-router-dom";

const PricingTierTile = ({ pricingData, state, region, regionName, isEdit }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const {
        rate,
        pricing_tier_name: pricingTierName,
        start_time: startTime,
        end_time: endTime,
        pricingTierDays,
        pricing_id,
    } = pricingData;

    console.log(pricingData);

    // convert time string from 24-hour format to 12-hour format where 00:00 is 12:00 AM
    const convertTo12Hour = (timeStr) => {
        if (timeStr) {
            const [hours, minutes] = timeStr.split(":");
            const suffix = hours >= 12 ? "PM" : "AM";
            const hoursIn12HourFormat = hours % 12 || 12;

            return `${hoursIn12HourFormat}:${minutes} ${suffix}`;
        } else {
            return "";
        }
    }

    const activeDays = pricingTierDays.map((d) => d.day_of_week);
    const startTimeIn12Hour = convertTo12Hour(startTime);
    const endTimeIn12Hour = convertTo12Hour(endTime);

    const renderTileContent = () => (
        <div className="tile">
            <div className="pricing-tile-header">
                <div>{pricingTierName}</div>
                <div>{rate || ""} USD/kWh</div>
            </div>
            <div className="tile-content">
                <div className="time">
                    {startTimeIn12Hour} - {endTimeIn12Hour}
                </div>
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

    return isEdit ? (
        <Link
            to={`/pricing-tier/${pricing_id}/edit`}
            className="tile-link tile"
            state={{
                pricingData: pricingData,
                tierName: pricingTierName,
                state: state,
                region: region,
                regionName: regionName,
            }}
        >
            {renderTileContent()}
        </Link>
    ) : (
        renderTileContent()
    );
};

export default PricingTierTile;
