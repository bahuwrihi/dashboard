import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



const UserInfoCard = ({ icon: Icon, title, total, persents }) => {



    return (
        <div
            className='mb-2 border-1 card-container'
            style={{ width: '25%' }}
        >
            <Card className="card-border-right" style={{ border: 'none' }}>
                <Card.Body
                    style={{ marginLeft: "2rem" }}>
                    <Card.Title
                        className="mb-0 font-weight-bold"
                        style={{ fontSize: '2rem', fontWeight: '700' }}
                    >
                        {total}
                    </Card.Title>

                    <Card.Text
                        style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '0.5rem', marginTop: '0.5rem' }}
                    >
                        {title}
                    </Card.Text>

                    <div className="d-flex align-items-center">
                        <KeyboardBackspaceIcon
                            className={persents > 0 ? "mr-1 top" : "mr-1 low"}
                        />
                        <div
                            className={persents > 0 ? "font-weight-bold text-success" : "font-weight-bold text-danger"}
                            style={{ marginRight: '0.5rem', fontSize: '1rem' }}
                        >
                            {persents > 0 ? "+" : "-"}{persents}% this week
                        </div>

                    </div>
                    <div className='Card_icon pl-5'>
                        <Icon />
                    </div>
                </Card.Body>
            </Card>
        </div >

    );
};

export default UserInfoCard;
