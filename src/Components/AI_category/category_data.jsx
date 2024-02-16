import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CustomerRow = ({ name, description, id, user_id }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/categories/" + id);
    };

    return (
        <tr className='TableRow'>
            <td className="py-3 table_text align-middle">{id}</td>
            <td className="py-3 table_text align-middle">{name}</td>
            <td className="py-3 table_text align-middle">{description}</td>
            <td className="py-3 table_text align-middle">
                <button className='status_active' onClick={handleSubmit}>Edit</button>
            </td>
        </tr>
    );
};

export default CustomerRow;
