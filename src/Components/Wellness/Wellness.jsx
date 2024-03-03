import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import DownloadIcon from '@mui/icons-material/Download';

function Wellness() {
    const [wellnessEntries, setWellnessEntries] = useState([]);

    useEffect(() => {
        fetch("http://64.226.70.3:8001/get_wellness/?current_item=0", {
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

    function Download() {
        fetch("http://64.226.70.3:8001/wellness_to_csv/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let filename = "wellness.csv";
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

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex justify-content-between align-items-center'>
                    <h2>Wellness Check-ins</h2>
                    <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>

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
