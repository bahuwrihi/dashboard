import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Edit_assistant({ assistant_id, AssistantName, AssistantInstruction }) {
    const [AssistantNameNew, setAssistantNameNew] = useState('');
    const [AssistantInstructionNew, setAssistantInstructionNew] = useState('');
    let { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/get_category/?id=${id}`, {
            method: "GET",
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAssistantNameNew(data.name)
                setAssistantInstructionNew(data.description)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);



    const handleBack = () => {
        navigate("/categories");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("AssistantName " + AssistantNameNew)
        console.log("AssistantInfo " + AssistantInstructionNew)
        fetch(`https://dashboard-dmitrykarpov.pythonanywhere.com/change_category/${id}/`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: AssistantNameNew,
                description: AssistantInstructionNew,

            })
        })
            .then(response => response.json())
            .then(data => {

            })
            .catch(error => { console.error("Error fetching data:", error); })
    };




    return (
        <div>
            <Header />

            <Container>
                <h1>Edit Assistant</h1>
                <Form >
                    <Form.Group as={Row} className="mb-3" controlId="formCategoryName">
                        <Form.Label column sm={2}>
                            Assistant Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={AssistantNameNew}
                                onChange={(e) => setAssistantNameNew(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formCategoryInfo">
                        <Form.Label column sm={2}>
                            Assistant information
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter info"
                                value={AssistantInstructionNew}
                                onChange={(e) => setAssistantInstructionNew(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="secondary" type="button" onClick={handleBack}>
                            Cancel
                        </Button>{' '}
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Edit_assistant