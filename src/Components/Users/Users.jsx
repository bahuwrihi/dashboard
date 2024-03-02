import React, { useEffect, useState } from 'react';
import Header from '../Header/header'
import DownloadIcon from '@mui/icons-material/Download';


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
                <div className='d-flex justify-content-between'>
                    <h2>All Users</h2>
                    <div><DownloadIcon /></div>
                </div>
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
                                    <td>{users.group__name || "—"}</td>
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