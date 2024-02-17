import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
// import CustomerRow from "./category_data"
// import './category.css';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_users/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data))
                setUsers(JSON.parse(data))
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div className="container mt-5">
                <h2>All Users</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table_header'>Username</th>
                                <th className='table_header'>Sent praises</th>
                                <th className='table_header'>Received praises</th>
                                <th className='table_header'>Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((users) => (
                                <tr key={users.pk}>
                                    <td>{users.username}</td>
                                    <td>{users.sent_praise_count}</td>
                                    <td>{users.received_praise_count}</td>
                                    <td>{users.groups || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Users;