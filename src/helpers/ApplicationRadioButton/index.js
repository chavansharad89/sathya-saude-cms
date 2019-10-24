import React, {Component} from 'react';
import './index.scss';

export default class ApplicationRadioButton extends Component {
    constructor(props) {
        super(props);
        this.state =  { 
           selectedOption: props.selectedOption
        };
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event, option) {
        const selectedOption = event.target.value;
        const { onChange } = this.props;
        this.setState({
            selectedOption 
        });
        onChange(option);
    }

    render() {
        const { options } = this.props;
        const { selectedOption } = this.state;
        return (
            <ul className='application-radio-button-section'>
                {
                    options.map((option, index) => {
                        const { value, name } = option;
                        return (
                            <li className='application-radio-button-section__list' key={index}> 
                                <input 
                                    type="radio"
                                    className='application-radio-button-section__list__radio-button'
                                    id={value}
                                    name={name} 
                                    value={value}
                                    checked={ selectedOption && selectedOption === value ? true : false}
                                    onChange={event => this._onChange(event, option)} 
                                    />
                                <label className='application-radio-button-section__list__values' htmlFor={value}> {value} </label>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}