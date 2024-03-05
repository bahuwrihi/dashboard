import React, { useState } from 'react';
import Linechart from "./linechart"
import 'bootstrap/dist/css/bootstrap.min.css';
import Top_praise_givers from './Info/Top_praise_givers';
import Top_praise_receivers from './Info/Top_praise_receivers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal, Button } from 'react-bootstrap'; // Importing Modal and Button from react-bootstrap

function Dashboard() {
    const [show, setShow] = useState(false); // useState to control the display of the modal

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        // Here you can add the logic to delete all data
        console.log('Deleting all data...');
        handleClose(); // Close the modal after the action
    };

    return (
        <>
            <div className='d-flex align-items-center justify-content-end delete_all' onClick={handleShow}>
                Delete all data <DeleteForeverIcon />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete all data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="ml-5">
                <Linechart />
                <div className='row'>
                    <Top_praise_givers className="col" />
                    <Top_praise_receivers className="col" />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
