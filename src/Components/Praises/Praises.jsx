import React, { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';

function Praises() {
    const [praises, setPraises] = useState([]);
    const [sortOption, setSortOption] = useState('asc');
    const [current, setCurrent] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_praises/?current_page=${current}&sorting=${sortOption}`, {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data.data);
                setPraises(parsedData);
                setPageCount(data.pages_count); // Assuming 'pages_count' is provided by your API
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [current, sortOption]);

    const handlePageChange = (event, value) => {
        setCurrent(value);
    };

    const handleSortOptionChange = (e) => {
        setSortOption(e.target.value);
    };

    // useEffect(() => {
    //     sortData(praises);
    // }, [sortOption]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-EN', { day: 'numeric', month: 'short' });
    };


    function Download() {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/praises_to_csv/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let filename = "praises.csv";
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
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Praises</h2>
                <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>
            </div>

            <Form>
                <Form.Group controlId="sortOption">
                    <Form.Label>Sort Options</Form.Label>
                    <Form.Control as="select" value={sortOption} onChange={handleSortOptionChange}>
                        <option value="asc">Time Ascending</option>
                        <option value="desc">Time Descending</option>
                    </Form.Control>
                </Form.Group>
            </Form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Topic</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Reason</th>
                        <th>Category</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {praises.map((praise) => (
                        <tr key={praise.pk}>
                            <td>{praise.group__name}</td>
                            <td>{praise.topic}</td>
                            <td>{praise.sender__username}</td>
                            <td>{praise.receiver__username}</td>
                            <td>{praise.reason || "—"}</td>
                            <td>{praise.category__name}</td>
                            <td>{formatDate(praise.formatted_time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <Pagination
                    count={pageCount}
                    page={current}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </>
    );
}

export default Praises;
