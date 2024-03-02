import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import CustomerRow from "./category_data"
import './category.css';
import DownloadIcon from '@mui/icons-material/Download';
function All_categories() {
    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_all_categories/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                setCustomersData(JSON.parse(data));
                console.log(JSON.parse(data))
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            {/* <Header /> */}
            <div className="container mt-5">
                <div className='d-flex justify-content-between'>
                    <h2>All Assistants</h2>
                    <div><DownloadIcon /></div>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>id</th>
                                <th className='table_header'>Name</th>
                                <th className='table_header'>Instruction</th>
                                <th className='table_header'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((customer, index) => (
                                <CustomerRow key={index}
                                    name={customer.fields.name}
                                    description={customer.fields.description}
                                    id={customer.pk} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default All_categories;