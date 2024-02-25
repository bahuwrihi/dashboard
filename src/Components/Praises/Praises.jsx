import React, { useEffect, useState } from 'react';

function Praises() {
    const [praises, setPraises] = useState([]);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_praises/?current_item=0", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data))
                setPraises(JSON.parse(data));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-EN', { day: 'numeric', month: 'short' });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Group</th>
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
                        <td>{praise.sender__username}</td>
                        <td>{praise.receiver__username}</td>
                        <td>{praise.reason || "—"}</td>
                        <td>{praise.category__name}</td>
                        <td>{formatDate(praise.formatted_time)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Praises;
