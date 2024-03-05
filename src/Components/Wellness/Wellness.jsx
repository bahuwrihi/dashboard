import React, { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination'; // Make sure to import from @mui/material, not react-bootstrap

function Wellness() {
    const [wellnessEntries, setWellnessEntries] = useState([]);
    const [sortOption, setSortOption] = useState('asc');
    const [current, setCurrent] = useState(1);
    const [pageCount, setPageCount] = useState(0); // This should be set based on API response

    useEffect(() => {
        fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_wellness/?current_page=${current}&sorting=${sortOption}`, {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const parsedData = JSON.parse(data.data);
                setWellnessEntries(parsedData);
                setPageCount(data.total_pages);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [current, sortOption]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrent(value);
    };


    function Download() {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/wellness_to_csv/", {
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

                <Form>
                    <Form.Group controlId="sortOption">
                        <Form.Label>Sort by</Form.Label>
                        <Form.Control as="select" value={sortOption} onChange={handleSortChange}>
                            <option value="asc">Date Ascending</option>
                            <option value="desc">Date Descending</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Emoji</th>
                                <th className='table_header'>Date</th>
                                <th className='table_header'>Group Name</th>
                                <th className='table_header'>Topic</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wellnessEntries.map((entry) => (
                                <tr key={entry.pk}>
                                    <td>{entry.sender__username}</td>
                                    <td>{entry.emoji}</td>
                                    <td>{formatDate(entry.formatted_time)}</td>
                                    <td>{entry.group__name} </td>
                                    <td> {entry.topic}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-container">
                    <Pagination
                        count={pageCount}
                        page={current}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
        </>
    );
}

export default Wellness;
