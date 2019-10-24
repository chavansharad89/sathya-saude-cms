import React from 'react';
import './index.scss';

export default function ApplicationListSection ({
    listNames,
    onClickOption,
    viewType = 'chart',
}) {
    function onClick(name){
        onClickOption(name);
    }
    let className;
    if (viewType === 'table'){
        className = 'position-table'
    } else if (viewType === 'sub-menu') {
        className = 'position-sub-menu'
    } else {
        className = 'position-chart'
    }
    return (
        
        <ul className = {`application-list ${className}`}>
            {   
                listNames && listNames.map((listName, index) => {
                    return (
                        <li 
                            key={index} 
                            className='application-list__item' 
                            onClick={e => onClick(listName)}> 
                            {listName.displayName}                                
                        </li>   
                    )
                })
            }
        </ul>
        
            
        );
};
