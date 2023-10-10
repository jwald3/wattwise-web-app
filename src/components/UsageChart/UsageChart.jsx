import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "./UsageChart.css";
import { useSelector } from "react-redux";

const UsageChart = () => {
    const data = useSelector(state => state.energyUsage?.energyUsage);
    const period = useSelector(state => state.dashboard.period);
    
    const [formattedDataArray, setFormattedDataArray] = useState([]);
    const [xAxisKey, setXAxisKey] = useState("");

    useEffect(() => {
        if (data?.length > 0) {

            let formattedData = [...data];
            let xAxis = "";
        
            switch (period) {
                case 'Daily':
                    formattedData = data.map(d => ({ ...d, time: d.time?.split("T")[1] }));
                    xAxis = 'time';
                    break;
                case 'Weekly':
                    formattedData = data.map(d => ({ ...d, reading_time: d.reading_time?.split("T")[0]?.split("-")?.slice(1).join("-") }));
                    xAxis = 'reading_time';
                    break;
                case 'Monthly':
                    formattedData = data.map(d => ({ ...d, time: d.time?.split("T")[0] }));
                    xAxis = 'time';
                    break;
                case 'Yearly':
                    xAxis = 'start_date';
                    break;
                default:
                    xAxis = 'start_date';
                    break;
            }

            setFormattedDataArray(formattedData);
            setXAxisKey(xAxis);
        }
    }, [data, period]);


    

    const getInterval = (period) => {
        switch (period) {
            case 'Daily': return 2;
            case 'Weekly': return 24;
            case 'Monthly': return 6;
            case 'Yearly': return 30;
            default: return 12;
        }
    };

    return (
        <div className="usage-chart-container">
            <ResponsiveContainer>
                <LineChart
                    data={formattedDataArray}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey={xAxisKey}
                        textAnchor="middle"
                        interval={getInterval(period)}
                        height={60}
                        tickMargin={10}
                        /* Add style prop if you need to decrease fontSize for the label on smaller screens */
                        style={{ fontSize: window.innerWidth <= 1000 ? '10px' : '12px' }}
                    />
                    <YAxis domain={["auto", "auto"]} style={{ fontSize: window.innerWidth <= 1000 ? '10px' : '12px' }} />
                    <CartesianGrid className="cartesian-grid-stroke" />
                    <Line
                        type="monotone"
                        dataKey="energy_usage"
                        className="line-stroke"
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
