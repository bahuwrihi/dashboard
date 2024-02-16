// import "./styles.css";
import React from "react";
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
    const [chartData, setChartData] = React.useState(generateData(period));

    const handleChange = (event) => {
        setPeriod(event.target.value);
        setChartData(generateData(event.target.value));
    };

    function generateData(days) {
        const generatedData = [];

        for (let day = 1; day <= days; day++) {
            const randomSales = Math.floor(Math.random() * 100);
            const randomCustomers = Math.floor(Math.random() * 100);
            const randomAmt = Math.floor(Math.random() * 5000);

            const entry = {
                name: `${day}`,
                sales: randomSales,
                customers: randomCustomers,
                amt: randomAmt,
            };

            generatedData.push(entry);
        }

        return generatedData;
    }




    return (
        <div className="Chart_wrapper">
            <div className="Periodselect">
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Period</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={period}
                        onChange={handleChange}
                        autoWidth
                        label="period"
                    >
                        <MenuItem value={7}>Week</MenuItem>
                        <MenuItem value={31}>Month</MenuItem>
                    </Select>
                </FormControl>
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
                {/* <CartesianGrid strokeDasharray="0 0" /> */}




                <XAxis dataKey="name" stroke="" padding={{ right: 20 }} />
                <YAxis stroke="" padding={{ top: 20 }} />
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="top" align="right" />
                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#FF9500"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                />
                <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#347AE2"
                    strokeWidth={2}
                    activeDot={{ r: 6 }} />
            </LineChart>
        </div>
    );
}
