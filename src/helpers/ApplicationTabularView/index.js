import React from 'react';
import './index.scss';

const tabularView = ({ 
    values,
    columns 
}) => {
    function renderTabularView() {
        return (
            values.map((value, index) => {
                return (
                    <li className = 'item' key = {index}>
                        <ul className = 'item-row row'>
                            {
                                columns.map(({ key, className }) => {
                                    return (
                                       <li key = {key} className = {className}>{value[key]}</li>
                                    );
                                })
                            }
                        </ul>
                    </li>
                );
            })
        )
    }
    return (
        <div className = 'tabular-view'>
            {
                values && values.length > 0 ? <ul className='list-title row'>
                    { columns.map(column => {
                        return (
                            <li key = {column.key} className = {column.className}>
                                {column.name}
                            </li>
                        );
                    })}
                </ul> : null
            }
            <ul className ='list-items'>
                {
                    values && values.length > 0 ? renderTabularView() : (
                        <div className ='no-results'>No results to display!!!</div>
                    )
                }
            </ul>
        </div>
    );
};

export default tabularView;