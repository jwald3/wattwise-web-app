import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import "./PricingTierForm.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import NumberInput from "../../components/NumberInput/NumberInput";

const PricingTierForm = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [rate, setRate] = useState("");

    const [activeDays, setActiveDays] = useState([]);

    const toggleDay = (day) => {
        setActiveDays((prevDays) => {
            if (prevDays.includes(day)) {
                return prevDays.filter((d) => d !== day);
            } else {
                return [...prevDays, day];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ startTime, endTime, rate, activeDays });
    };

    // days of the week as an array of objects, using single letter abbreviations and 1-indexed days
    const daysOfWeek = [
        { display: "S", value: 1 },
        { display: "M", value: 2 },
        { display: "T", value: 3 },
        { display: "W", value: 4 },
        { display: "T", value: 5 },
        { display: "F", value: 6 },
        { display: "S", value: 7 },
    ];

    return (
        <Layout>
            <div className="form-container">
                <h2 className="form-header">Pricing Tier</h2>
                <form onSubmit={handleSubmit} className="form-body">
                    <div className="input-group">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker 
                                label="Start Time"  
                                value={startTime}
                                onChange={(newValue) => {
                                    setStartTime(newValue.format("HH:mm:ss"));
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="input-group">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker 
                            label="End Time"  
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue.format("HH:mm:ss"));
                            }}
                        />
                        </LocalizationProvider>
                    </div>
                    <div className="input-group">
                        <NumberInput 
                            label="Rate" 
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="dow-label" htmlFor="days">
                            Days
                        </label>
                        <div className="dow-container">
                            {daysOfWeek.map((day, i) => {
                                return (
                                    <div
                                        className={`dow-toggle ${
                                            activeDays.includes(day.value)
                                                ? "active"
                                                : ""
                                        }`}
                                        key={day}
                                        onClick={() => toggleDay(day.value)}
                                    >
                                        {day.display}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                        <button className="cancel-button">
                            <Link to="/dashboard">Cancel</Link>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default PricingTierForm;
