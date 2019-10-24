import React, {Component} from 'react';
import './index.scss';

export default class Fieldset extends Component {

    render() {
        const {className, 
            fieldsetTitle, 
            isRequired, 
            children} = this.props;
        return(
            <React.Fragment>
                <fieldset id='fieldset' className={className}>
                    <legend className='fieldset-title'>
                        {fieldsetTitle}
                        {isRequired ? <span className='required-field'>*</span> : ''}
                        {className === 'duration-from' ? <span className='duration-fieldset-title'> : From </span> : ''}
                        {className === 'duration-to' ? <span className='duration-fieldset-title'> : To </span> : ''}
                    </legend>
                    { children }
                </fieldset> 
            </React.Fragment>
        )
    }
} 
