import React, { useEffect, useState } from 'react';
import Header from '../Header/header';

function Worktime() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_worktime/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data))
                setUsers(JSON.parse(data));

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
                <h2>Worktime</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Date</th>
                                <th className='table_header'>Working Hours</th>
                                <th className='table_header'>Work Periods </th>
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

export default Worktime;
