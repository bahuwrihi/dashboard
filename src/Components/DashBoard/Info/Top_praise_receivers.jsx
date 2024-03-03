import React, { useState, useEffect } from 'react';
import "./info.css"
import { Form } from 'react-bootstrap';


const Top_praise_receivers = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");
    useEffect(() => {
        if (selectedCategoryId == "All") {
            fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_receivers/?current_item=0`, {
                method: "GET",
                cache: "no-cache"
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(JSON.parse(data))
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
        else {
            fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_receivers/?current_item=0&category_id=${selectedCategoryId}`, {
                method: "GET",
                cache: "no-cache"
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(JSON.parse(data))
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [selectedCategoryId]);


    useEffect(() => {

        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_all_categories/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                setCategories(JSON.parse(data));
                if (data.length > 0) {
                    setSelectedCategoryId(data[0].pk);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });


    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
    };
    return (
        <div className='top_praise'>

            <h3>Top praise receivers</h3>
            < Form>
                <Form.Group controlId="categorySelect" style={{ marginBottom: '15px' }}>
                    <Form.Select value={selectedCategoryId} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        {categories.map((category) => (
                            <option key={category.pk} value={category.pk}>
                                {category.fields.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <div className='d-flex justify-content-between'>
                            <span style={{ fontWeight: '600' }} >{user.username}</span>
                            <span>{user.sent_praise_count}</span>
                        </div>
                    </li>

                ))}
            </ul>
        </div>

    );
};

export default Top_praise_receivers;
