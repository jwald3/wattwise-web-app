import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const UsageChart = ({ data }) => {
    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey="start_date"
                        textAnchor="middle"
                        interval={20}
                        height={60}
                        // add space between axis and label
                        tickMargin={10}
                    />
                    <YAxis domain={["auto", "auto"]} />
                    <CartesianGrid stroke="#eee" />
                    <Line
                        type="monotone"
                        dataKey="energy_usage"
                        stroke="#635dff"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
