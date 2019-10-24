import React from 'react';
import './index.scss';

const actionButton = ({ type, 
    className, 
    title, 
    onClick }) => {
    return (
        <button type={type} 
            className={className} 
            onClick={onClick}>
                { title }
        </button>
    );
};

export default actionButton;