// External Libraries
import React, { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

// Components
import Layout from "../../Layouts/Layout";
import NumberInput from "../../components/NumberInput/NumberInput";

// API Calls/Utilities
import { updatePricingTier } from "../../api/Api";

// Styles
import "./EditPricingTierForm.css";

const EditPricingTierForm = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [rate, setRate] = useState(0);
    const [activeDays, setActiveDays] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const tierNameFromState = location.state?.tierName || "Default Name";
    const stateFromState = location.state?.state || "Default State";
    const regionFromState = location.state?.region || "Default Region";
    const pricingId = location.state?.pricingData?.pricing_id || null;

    console.log(location.state?.pricingData);

    useEffect(() => {
        const pricingData = location.state?.pricingData;
        if (pricingData) {
            // convert start time into a dayjs object
            const startTime = pricingData.start_time
                ? dayjs(pricingData.start_time, "HH:mm:ss")
                : null;

            // convert end time into a dayjs object
            const endTime = pricingData.end_time
                ? dayjs(pricingData.end_time, "HH:mm:ss")
                : null;

            setStartTime(startTime);
            setEndTime(endTime);
            setRate(pricingData.rate);
            setActiveDays(pricingData.pricingTierDays.map((d) => d.day_of_week));
        }
    }, [location.state?.pricingData]);

    const queryParams = new URLSearchParams();

    const toggleDay = (day) => {
        setActiveDays((prevDays) => {
            if (prevDays.includes(day)) {
                return prevDays.filter((d) => d !== day);
            } else {
                return [...prevDays, day];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            provider_id: 1,
            region_id: regionFromState,
            pricing_tier_name: tierNameFromState,
            start_time: startTime ? startTime.format("HH:mm:ss") : null,
            end_time: endTime ? endTime.format("HH:mm:ss") : null,
            rate: rate,
            pricingTierDays: activeDays,
            pricingTierSpecialDates: [],
        };

        console.log(payload);

        try {
            const response = await updatePricingTier({ pricingTierID: pricingId, payload: payload });
            console.log(response);

            // go back to dashboard
            queryParams.set("state", stateFromState);
            queryParams.set("region", regionFromState);
            navigate(`/dashboard?${queryParams.toString()}`, { replace: true });
        } catch (error) {
            console.error("Error posting data", error);
        }
    };

    // days of the week as an array of objects, using single letter abbreviations and 1-indexed days
    const daysOfWeek = [
        { display: "S", value: 0 },
        { display: "M", value: 1 },
        { display: "T", value: 2 },
        { display: "W", value: 3 },
        { display: "T", value: 4 },
        { display: "F", value: 5 },
        { display: "S", value: 6 },
    ];

    return (
        <Layout>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="form-container">
                    <h2 className="form-header">Pricing Tier</h2>
                    <form onSubmit={handleSubmit} className="form-body">
                        <div className="input-group">
                            <TimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={setStartTime}
                            />
                        </div>
                        <div className="input-group">
                            <TimePicker
                                label="End Time"
                                value={endTime}
                                onChange={setEndTime}
                            />
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
                                            className={`dow-toggle ${activeDays.includes(day.value) ? "active" : ""
                                                }`}
                                            key={day.value}
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
                            <Link to="/dashboard" className="cancel-button">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </LocalizationProvider>
        </Layout>
    );
};

export default EditPricingTierForm;
