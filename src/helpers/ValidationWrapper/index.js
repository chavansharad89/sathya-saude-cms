import React, {Component} from 'react';
import Error from '../Error/index';
import ApplicationDropdown from '../ApplicationDropdown';
import Fieldset from '../Fieldset';
import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import InputField from '../InputField';
import './index.scss';

export default class ValidationWrapper extends Component {    
    _getType(Fieldtype) {
        switch(Fieldtype) {
            case 'duration':
                return (
                    <Fieldset {...this.props}> 
                    {
                        <DatePicker {...this.props}/>
                    }
                    </Fieldset> 
                )   

            case 'dropdown':
                return (
                    <Fieldset {...this.props}> 
                    {
                        <ApplicationDropdown {...this.props} />
                    }
                    </Fieldset>
                )
            case 'textArea' :
                return (
                    <Fieldset {...this.props}>
                    {
                        <TextArea {...this.props} />
                    }
                    </Fieldset>
                )
            case 'input':
                return (
                    <Fieldset {...this.props}>
                    {
                        <InputField {...this.props}/>
                    }
                    </Fieldset>
                )
            default:
                return null;
        } 
    }

    render() {
        const { input, Fieldtype, meta, className, validateDateValues, selectedValues} = this.props;

        return ( 
            <div className={className ==='duration-from' || 
                className === 'duration-to' ? 'duration-block validation-wrapper' : 'validation-wrapper'}>
            {
                this._getType(Fieldtype)
            }
            {
                input.name === 'durationTo' ? 
                    selectedValues !== null && validateDateValues === false 
                    ?   <Error show={true} text={'Enter a Valid Date Range.'} /> 
                    :   validateDateValues 
                        ?   '' 
                        :   <Error show={meta.touched && !!meta.error} text={meta.error} />

                : input.name === 'durationFrom' ?   
                    selectedValues !== null 
                    ?   '' 
                    :   <Error show={meta.touched && !!meta.error} text={meta.error} />
                : <Error show={meta.touched && !!meta.error} text={meta.error} />
            }
            </div>
        )
    }
}
