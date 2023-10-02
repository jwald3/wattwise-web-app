import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const UsageChart = ({ data }) => {
    return (
        <div style={{ flex: 1 }}>
            <LineChart
                width={700}
                height={450}
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <XAxis
                    dataKey="start_date"
                    textAnchor="end"
                    interval={20}
                    angle={-30}
                    height={60}
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
        </div>
    );
};

export default UsageChart;
