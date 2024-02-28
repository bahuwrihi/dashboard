import React, { useState, useEffect } from 'react';
import "./info.css";
import { Form } from 'react-bootstrap';

const Top_praise_givers = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);

    useEffect(() => {
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/get_all_categories/", {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log("Categories:", data);
                setCategories(JSON.parse(data));
                if (data.length > 0) {
                    setSelectedCategoryId(data[0].pk);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_top_praise_givers/?current_item=0&category_id=${selectedCategoryId}`, {
                method: "GET",
                cache: "no-cache"
            })
                .then(response => response.json())
                .then(data => {
                    console.log("get_top_praise_givers");
                    console.log(JSON.parse(data));
                    setUsers(JSON.parse(data));
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [selectedCategoryId]);

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
    };

    return (
        <div className='top_praise'>
            <h3>Top praise givers</h3>
            <Form>
                <Form.Group controlId="categorySelect" style={{ marginBottom: '15px' }}>
                    <Form.Select value={selectedCategoryId} onChange={handleCategoryChange}>
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

export default Top_praise_givers;
