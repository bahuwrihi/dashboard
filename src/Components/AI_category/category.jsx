import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryForm() {
    const [AssistantName, setAssistantName] = useState('');
    const [AssistantInfo, setAssistantInfo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ AssistantName, AssistantInfo });
    };

    return (
        <Container>
            <div className='title'>Create a new Assistant</div>
            <Form onSubmit={handleSubmit} className='w-75'>
                <Form.Group className="mb-3 col" controlId="formCategoryName">
                    <Form.Label>
                        Enter Assistant Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Assistant name"
                        value={AssistantName}
                        onChange={(e) => setAssistantName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategoryInfo">
                    <Form.Label column sm={2}>
                        Category information
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter info"
                            value={AssistantInfo}
                            onChange={(e) => setAssistantInfo(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <div className="text-center">
                    <Button variant="secondary" type="button">
                        Cancel
                    </Button>{' '}
                    <Button variant="primary" type="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CategoryForm;
