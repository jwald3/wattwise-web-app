import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Label, ReferenceArea, Tooltip } from "recharts";
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
                    formattedData = data.map(d => ({ ...d, energy_usage: d.energy_usage / 24, time: d.time?.split("T")[0] }));
                    xAxis = 'time';
                    break;
                case 'Yearly':
                    formattedData = data.map(d => ({ ...d, energy_usage: d.energy_usage / 24 }));
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
            case 'Yearly': return 60;
            default: return 12;
        }
    };

    const tooltipFormatter = (value) => {
        // Assuming value is a number and exists
        return value.toFixed(3); // Round to 3 significant digits
    };

    return (
        <div className="usage-chart-container">
            <ResponsiveContainer>
                <LineChart
                    data={formattedDataArray}
                    margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                    >
                    <XAxis
                        dataKey={xAxisKey}
                        textAnchor="middle"
                        interval={window.innerWidth <= 1000 ? 2 * getInterval(period) : getInterval(period)}
                        height={60}
                        tickMargin={10}
                        style={{ fontSize: window.innerWidth <= 1000 ? '10px' : '12px' }}
                    />
                    <YAxis domain={[0, 2.0]} style={{ fontSize: window.innerWidth <= 1000 ? '10px' : '12px' }} >
                    <Label 
                        value="Energy Usage (kWh)" 
                        angle={-90} 
                        position="insideLeft" 
                        offset={10} 
                        style={{ 
                            textAnchor: 'middle', 
                            fontSize: '12px', 
                            // fontFamily: 'Arial' 
                        }} 
                    />
                
                    </YAxis>
                    <CartesianGrid className="cartesian-grid-stroke" />
                    <Line
                        type="monotone"
                        dataKey="energy_usage"
                        className="line-stroke"
                        stroke="#32C5A4"
                        dot={false}
                        isAnimationActive={false}
                        activeDot={{ r: 4, fill: '#32C5A4' }}
                    />
                    <Tooltip formatter={tooltipFormatter} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
