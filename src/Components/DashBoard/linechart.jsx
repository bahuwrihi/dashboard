// import "./styles.css";
import React, { useEffect, useState } from 'react';
import data from "./data"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function App() {
    const [period, setPeriod] = React.useState(7);
    const [chartData, setChartData] = React.useState([]);

    const handleChange = (event) => {
        setPeriod(event.target.value);
    };

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-EN', options).format(date);
    }


    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_praises_by_date/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data);
                const formattedData = parsedData.map(entry => ({
                    name: formatDate(entry.day_str.split(' ')[0]),
                    praises: entry.count
                }));
                setChartData(formattedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    return (
        <div className="Chart_wrapper">
            <div className="Periodselect">

            </div>
            <LineChart
                width={1000}
                height={400}
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis dataKey="name" stroke="" padding={{ right: 20 }} />
                <YAxis stroke="" padding={{ top: 20 }} />
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="top" align="right" />

                <Line
                    type="monotone"
                    dataKey="praises"
                    stroke="#FF9500"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </div>
    );
}
