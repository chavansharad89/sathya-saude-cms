import React from 'react';
import LoaderImage from '../../assets/images/mdj_loader.gif';
import './Loader.scss';

const loader = () => {
    return (
        <div className='loader'>
            <img src={LoaderImage}  alt ="loader"/>
        </div>
    );
};

export default loader;