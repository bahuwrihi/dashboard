import React, { useState, useEffect } from 'react';
import "./Faq.css";
import DownloadIcon from '@mui/icons-material/Download';
import Pagination from '@mui/material/Pagination'; // Import the Pagination component

const Faq = () => {
    const [faq, setFaq] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageCount, setPageCount] = useState(0); // State to track the total number of pages

    useEffect(() => {
        fetch(`https://dcdashboard.top/get_all_FAQ/?current_page=${current}`, {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(JSON.parse(data))
                const parsedData = JSON.parse(data);
                setFaq(parsedData);
                // setPageCount(parsedData.total_pages);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [current]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-EN', { day: 'numeric', month: 'short' });
    };

    const handlePageChange = (event, value) => {
        setCurrent(value);
    };
    function Download() {
        fetch("https://dcdashboard.top/FAQ_to_csv/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let filename = "faq.csv";
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
        <div className="faq-container">
            <div className='d-flex justify-content-between align-items-center'>
                <h2>All FAQ</h2>
                <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>

            </div>
            <ul className="faq-list">
                {faq.map((faq, index) => (
                    <>
                        <div className='d-flex align-items-center'>
                            <div className='faq_group'>{faq.group__name} </div>
                            <div>{faq.topic}</div>
                        </div>

                        <li key={index} className="faq-item">
                            <span className="faq-question">{faq.question}</span>
                            <span className="faq-date">{formatDate(faq.formatted_time)}</span>
                        </li>
                    </>

                ))}
            </ul>
            {/* <div className="pagination-container">
                <Pagination
                    count={pageCount}
                    page={current}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div> */}
        </div>
    )
};

export default Faq;
