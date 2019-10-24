import React from 'react';
import {convertDate} from '../../utils/DateFormat'
import './index.scss';
const DurationIdentifier = ({ title,
    duration,
    durationValue={} ,
    titleValue}) => {
        
    const startDate=convertDate(durationValue.startDate, ['mmm','DD', 'YYYY']);
    const endDate=convertDate( durationValue.endDate, ['mmm','DD', 'YYYY']);
    const durationCheck = (duration==='year') ? durationValue.fiscalYear :`${startDate} to ${endDate}`
    const category = titleValue ? title : ''

    return (
        <div>
            {   
                <div className='duaration'>
                    {
                        (duration==='year') ? 
                            <span className='font-color'> {category} </span> 
                            :<div className='font-color'> {category} </div> 
                    }
                    {category ? `(${durationCheck})`: durationCheck }  
                </div>
            }
        </div>   
    );
}
export default DurationIdentifier;