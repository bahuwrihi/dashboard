import React, { useState, useEffect } from 'react';
import "./Faq.css"

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


    return (
        <div className="faq-container">
            <h3>All FAQ</h3>
            <ul className="faq-list">
                {faq.map((faq, index) => (
                    <li key={index} className="faq-item">
                        <span className="faq-question">{faq.fields.question}</span>
                        <span className="faq-date">{formatDate(faq.fields.time)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Faq;
