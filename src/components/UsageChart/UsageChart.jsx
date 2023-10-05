import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const UsageChart = ({ data, period }) => {
    // switch period into data key, i.e., daily -> time, yearly -> start_date, etc.
    const dataKey = (period) => {
        switch (period) {
            case 'Daily':
                return 'time';
            case 'Weekly':
                return 'reading_time';
            case 'Monthly':
                console.log("time")
                return 'time';
            case 'Yearly':
                console.log("time")
                return 'start_date';
            default:
                return 'start_date';
        }
    }

    // format data for chart where the object is a datetime
    const formatData = (data, period) => {
        // if period is yearly, return data as is
        if (period === 'Yearly') {
            return data;
        }
        // if period is weekly, strip out the time from the datetime
        else if (period === 'Weekly') {
            return data.map(d => {
                return {
                    ...d,
                    // extract date from datetime (splitting on space or T not working on their own)
                    // need to convert to date object to get rid of time
                    reading_time: new Date(d.reading_time).toLocaleDateString()
                }
            })
        }
        else {
            return data;
        }
    }


    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <LineChart
                    data={formatData(data)}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey={dataKey(period)}
                        textAnchor="middle"
                        // interval={30} year
                        interval={24} // month
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
