import React, { useState, useEffect } from 'react';
import "./Faq.css"
import DownloadIcon from '@mui/icons-material/Download';

const Faq = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_all_FAQ/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data))
                setFaq(JSON.parse(data))
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-EN', { day: 'numeric', month: 'short' });
    };

    function Download() {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/FAQ_to_csv/", {
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
        </div>
    )
};

export default Faq;
