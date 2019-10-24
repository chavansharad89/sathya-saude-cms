import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Error = props => (props.show ? 
    <div className={props.text !== 'Rejection reason should be mentioned.' ? "text-danger" : "modal-error"}> {props.text} </div> : null);
Error.propTypes = {
    text: PropTypes.string,
    show: PropTypes.bool
};

export default Error;
