import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DownloadIcon from '@mui/icons-material/Download';
import Pagination from '@mui/material/Pagination';

function Worktime() {
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [sortOption, setSortOption] = useState('date_asc');
    const [pageCount, setpageCount] = useState('date_asc');

    useEffect(() => {
        fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_worktime/?current_page=${current}&sorting=${sortOption}`, {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                setpageCount(data.pages_count)
                setUsers(JSON.parse(data.data));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [current, sortOption]);

    const handlePageChange = (event, value) => {
        setCurrent(value);
    };
    function Download() {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/worktime_to_csv/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let filename = "worktime.csv";
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

    const handleSortOptionChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            <div className="container mt-5">

                <div className='d-flex justify-content-between align-items-center'>
                    <h2>Worktime</h2>
                    <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>

                </div>

                <Form.Control as="select" value={sortOption} onChange={handleSortOptionChange}>
                    <option value="" disabled>Select</option>
                    <option value="date_asc">Date Ascending</option>
                    <option value="date_desc">Date Descending</option>
                    <option value="work_periods_asc">Work Periods Ascending</option>
                    <option value="work_periods_desc">Work Periods Descending</option>
                </Form.Control>


                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Date</th>
                                <th className='table_header'>Working Hours</th>
                                <th className='table_header'>Work Periods</th>
                                <th className='table_header'>Group</th>
                                <th className='table_header'>Topic</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.pk}>
                                    <td>{user.username}</td>
                                    <td>{user.formatted_date}</td>
                                    <td>{user.working_hours}</td>
                                    <td>{user.work_periods}</td>
                                    <td>{user.group__name}  </td>
                                    <td> {user.topic} </td>
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
export default Worktime