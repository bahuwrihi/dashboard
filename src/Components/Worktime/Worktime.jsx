import React, { useEffect, useState } from 'react';
import Header from '../Header/header';
import { Form } from 'react-bootstrap';
import DownloadIcon from '@mui/icons-material/Download';

function Worktime() {
    const [users, setUsers] = useState([]);
    const [sortOption, setSortOption] = useState('dateAsc');

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_worktime/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data);
                sortData(parsedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        sortData(users);
    }, [sortOption]);

    const sortData = (data) => {
        const sorted = [...data].sort((a, b) => {
            let isAscending = sortOption.endsWith('Asc');
            let sortBy = sortOption.startsWith('date') ? 'date' : 'work_periods';
            let valA = sortBy === 'date' ? new Date(a.formatted_date) : a.work_periods;
            let valB = sortBy === 'date' ? new Date(b.formatted_date) : b.work_periods;

            return isAscending ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
        });
        setUsers(sorted);
    };

    const handleSortOptionChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            <div className="container mt-5">

                <div className='d-flex justify-content-between'>
                    <h2>Worktime</h2>
                    <div><DownloadIcon /></div>

                </div>

                <Form>
                    <Form.Group controlId="sortOption">
                        <Form.Label>Sort Options</Form.Label>
                        <Form.Control as="select" value={sortOption} onChange={handleSortOptionChange}>
                            <option value="">Select</option>
                            <option value="dateAsc">Date Ascending</option>
                            <option value="dateDesc">Date Descending</option>
                            <option value="work_periodsAsc">Work Periods Ascending</option>
                            <option value="work_periodsDesc">Work Periods Descending</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Date</th>
                                <th className='table_header'>Working Hours</th>
                                <th className='table_header'>Work Periods</th>
                                <th className='table_header'>Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.pk}>
                                    <td>{user.username}</td>
                                    <td>{user.formatted_date}</td>
                                    <td>{user.working_hours}</td>
                                    <td>{user.work_periods}</td>
                                    <td>{user.group__name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default Worktime