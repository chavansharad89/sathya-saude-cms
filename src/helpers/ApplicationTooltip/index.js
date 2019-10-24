import React from 'react';
import './index.scss';

const toolTip = ({value}) => {
    return (
        <div className={`tooltip`} > { value }</div>
    );
};

export default toolTip;