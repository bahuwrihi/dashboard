import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import DownloadIcon from '@mui/icons-material/Download';

function Wellness() {
    const [wellnessEntries, setWellnessEntries] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_wellness/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data))
                setWellnessEntries(JSON.parse(data));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex justify-content-between'>
                    <h2>Wellness Check-ins</h2>
                    <div><DownloadIcon /></div>

                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Emoji</th>
                                <th className='table_header'>Date</th>
                                <th className='table_header'>Group Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wellnessEntries.map((entry) => (
                                <tr key={entry.pk}>
                                    <td>{entry.sender__username}</td>
                                    <td>{entry.emoji}</td>
                                    <td>{formatDate(entry.formatted_time)}</td>
                                    <td>{entry.group__name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Wellness;
