import React from "react";

const PricingTierTile = ({ pricingData }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    // Extracting necessary data from pricingData
    const {
        rate,
        pricing_tier_name: pricingTierName,
        start_time: startTime,
        end_time: endTime,
        pricingTierDays,
    } = pricingData;
    
    // Creating an array of active days for easier checking of active status
    const activeDays = pricingTierDays.map((d) => d.day_of_week);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                width: "95%",
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                boxShadow: "0px 4px 6px #0000001A",
                overflow: "hidden",
                margin: "10px auto",
                backgroundColor: "#ffffff",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2% 4%",
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#f4f4f4",
                    fontWeight: "600",
                }}
            >
                <div>{pricingTierName}</div>
                <div>{rate} USD/kWh</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", padding: "2% 4%", alignItems: "center" }}>
                <div>{startTime} - {endTime}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", padding: "2% 4%" }}>
                {weekDays.map((day, index) => (
                    <div
                        key={day}
                        style={{
                            color: activeDays.includes(index + 1) ? "#32C5A4" : "#9E9E9E",
                            fontWeight: activeDays.includes(index + 1) ? "600" : "400",
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingTierTile;
