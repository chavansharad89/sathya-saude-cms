import React, { Component } from 'react';
import './index.scss';

export default class ApplicationCheckBox extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }
    _onChange(event, option,isChecked,index) {

        const { onChange } = this.props;
        onChange(option,isChecked,index);
    }

    render() {
        const { filterOptions,type } = this.props;
        const className= type==='horizontal'?' horizontal-layout':''
        const randomValue = new Date().getTime();
        return (
            <ul className={`application-checkbox-section ${className}`}>
                {
                    filterOptions.map((option, index) => {
                        const { value, name,isChecked } = option;
                        return (
                            <li className='application-checkbox-section__item' key={index}> 
                                <input 
                                    type="checkbox"
                                    className='application-checkbox-section__checkbox-button'
                                    id={`${value}${randomValue}`}
                                    name={`${name}${randomValue}`} 
                                    value={value}
                                    checked={ isChecked }
                                    onChange={event => this._onChange(event, option,!isChecked,index)} 
                                    />
                                <label className='application-checkbox-section__values' 
                                    htmlFor={`${value}${randomValue}`}> 
                                    {value} 
                                </label>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}