import React from 'react';
import './index.scss';
const rejectionNote = ({ data }) => {
    return (
        <div className='rejection-note'>
            <div className='rejection-note__tilte'>Your data has rejected by super admin</div>
            <div className='rejection-note__data'> <strong> Reason: </strong> {data}</div>
        </div>
    );
}
export default rejectionNote;