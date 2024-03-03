import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import CustomerRow from "./category_data"
import './category.css';
import DownloadIcon from '@mui/icons-material/Download';
function All_categories() {
    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
        fetch("http://64.226.70.3:8001/get_all_categories/", {
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


    function Download() {
        fetch("http://64.226.70.3:8001/categories_to_csv/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let filename = "categories.csv";
                const disposition = response.headers.get('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }

                return response.blob().then(blob => {
                    return { blob, filename };
                });
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();

                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    return (
        <>
            {/* <Header /> */}
            <div className="container mt-5">
                <div className='d-flex justify-content-between align-items-center'>
                    <h2>All Assistants</h2>
                    <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>

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