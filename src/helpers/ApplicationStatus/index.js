import React from 'react';
import './index.scss';
const status = ({ status }) => {
    
    return (
        <div className = 'status'>
            <div className = {status}>{status}</div>
        </div>
    );
}
export default status;