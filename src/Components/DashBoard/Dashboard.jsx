import React, { useEffect, useState } from 'react';
import Linechart from "./linechart"
import Card from "./Card"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Header from '../Header/header';
import Top_praise_givers from './Info/Top_praise_givers';
import Top_praise_receivers from './Info/Top_praise_receivers';

function Dashboard() {

    // useEffect(() => {
    //     fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_givers/?current_item=0", {
    //         method: "GET",
    //         cache: "no-cache"
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("get_top_praise_givers")
    //             console.log(JSON.parse(data))
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);

    // useEffect(() => {
    //     fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_receivers/?current_item=0", {
    //         method: "GET",
    //         cache: "no-cache"
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("get_top_praise_receivers")
    //             console.log(JSON.parse(data))

    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);

    // useEffect(() => {
    //     fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_praises_by_date/?current_item=0", {
    //         method: "GET",
    //         cache: "no-cache"
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("get_praises_by_date")
    //             console.log(JSON.parse(data))

    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);

    return (
        <>
            {/* <Header
                text={"Welcome back, Luciano"} /> */}
            <dashboard className="ml-5">

                {/* <div className='d-flex justify-content-between info_container '>
                    <Card
                        icon={PeopleOutlineIcon}
                        title={'Total Users'}
                        total={'87,394'}
                        persents={"1.01"}

                    />
                    <Card
                        icon={WorkOutlineIcon}
                        title={'Total products '}
                        total={'23,283.5'}
                        persents={"0.49"}
                    />
                    <Card
                        icon={VerifiedIcon}
                        title={'Total Users'}
                        total={'46,827'}
                        persents={"0,91"}
                    />
                    <Card
                        icon={RotateRightIcon}
                        title={'Refunded'}
                        total={'87,394'}
                        persents={"1.51"}
                    />
                </div> */}

                <Linechart />

                <div className='row'>
                    <Top_praise_givers className="col" />
                    <Top_praise_receivers className="col" />
                </div>


            </dashboard >
        </>

    )
}

export default Dashboard