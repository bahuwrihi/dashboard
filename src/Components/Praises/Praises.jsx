import React, { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';

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



    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-EN', { day: 'numeric', month: 'short' });
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h2>Praises</h2>
                <div className='download_csv' onClick={Download}>Download csv <DownloadIcon /></div>

            </div>

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
                            <td>{praise.group__name} </td>
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
        </>

    );
}

export default Praises;
