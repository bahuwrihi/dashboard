import React, { useState, useEffect } from 'react';
import "./info.css"


const Top_praise_receivers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_receivers/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log("get_top_praise_receivers")
                console.log(JSON.parse(data))
                setUsers(JSON.parse(data))
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_praises/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log("get_praises")
                console.log(JSON.parse(data))
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className='top_praise'>

            <h3>Top praise receivers</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <div className='d-flex justify-content-between'>
                            <span>{user.username}</span>
                            <span>{user.received_praises_count}</span>
                        </div>
                    </li>

                ))}
            </ul>
        </div>

    );
};

export default Top_praise_receivers;
