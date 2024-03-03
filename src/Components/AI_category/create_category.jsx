import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
function CategoryForm() {
    const [AssistantName, setAssistantName] = useState('');
    const [AssistantInfo, setAssistantInfo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("AssistantName " + AssistantName)
        console.log("AssistantInfo " + AssistantInfo)
        const formData = new FormData();
        formData.append('name', AssistantName);
        formData.append('description', AssistantInfo);
        console.log(formData)
        fetch("https://dashboard-dmitrykarpov.pythonanywhere.com/create_category/", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            body: formData
        })
            .then(response => response.json())
            .then(data => {

            })
            .catch(error => { console.error("Ошибка при получении данных:", error); });
    };

    return (
        <>
            <Container>
                <div className='title'>Create a new Assistant</div>
                <Form onSubmit={handleSubmit} className='w-75'>
                    <Form.Group className="mb-3" controlId="formAssistantName">
                        <Form.Label className='m-0'>
                            Enter Assistant Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Assistant name"
                            value={AssistantName}
                            onChange={(e) => setAssistantName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAssistantInfo">
                        <Form.Label className='m-0'>
                            Assistant Information
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Enter info"
                            value={AssistantInfo}
                            onChange={(e) => setAssistantInfo(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button variant="outline" type="button" className='cancel_create'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='submit_create'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>

        </>

    );
}

export default CategoryForm;
