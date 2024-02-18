import React, { useEffect, useState } from 'react';
import Linechart from "./linechart"
import 'bootstrap/dist/css/bootstrap.min.css';
import Top_praise_givers from './Info/Top_praise_givers';
import Top_praise_receivers from './Info/Top_praise_receivers';

function Dashboard() {


    return (
        <>

            <dashboard className="ml-5">

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