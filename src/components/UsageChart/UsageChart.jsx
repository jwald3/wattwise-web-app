import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const UsageChart = ({ data, period }) => {
    let formattedData = [...data];
    let xAxisKey = "";

    switch (period) {
        case 'Daily':
            formattedData = data.map(d => ({ ...d, time: d.time?.split("T")[1] }));
            xAxisKey = 'time';
            break;
        case 'Weekly':
            formattedData = data.map(d => ({ ...d, reading_time: d.reading_time?.split("T")[0]?.split("-")?.slice(1).join("-") }));
            xAxisKey = 'reading_time';
            break;
        case 'Monthly':
            formattedData = data.map(d => ({ ...d, time: d.time?.split("T")[0] }));
            xAxisKey = 'time';
            break;
        case 'Yearly':
            xAxisKey = 'start_date';
            break;
        default:
            xAxisKey = 'start_date';
            break;
    }

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
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={formattedData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey={xAxisKey}
                        textAnchor="middle"
                        interval={getInterval(period)}
                        height={60}
                        tickMargin={10}
                    />
                    <YAxis domain={["auto", "auto"]} />
                    <CartesianGrid stroke="#eee" />
                    <Line
                        type="monotone"
                        dataKey="energy_usage"
                        stroke="#32C5A4"
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
