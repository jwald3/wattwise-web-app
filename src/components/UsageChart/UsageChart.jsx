import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const UsageChart = ({ data, period }) => {
    // switch period into data key, i.e., daily -> time, yearly -> start_date, etc.
    const dataKey = (period) => {
        switch (period) {
            case 'Daily':
                console.log("time")
                return 'time';
            case 'Weekly':
                console.log("time")
                return 'week';
            case 'Monthly':
                console.log("time")
                return 'month';
            case 'Yearly':
                console.log("time")
                return 'start_date';
            default:
                return 'start_date';
        }
    }

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey={dataKey(period)}
                        textAnchor="middle"
                        interval={30}
                        height={60}
                        // add space between axis and label
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
