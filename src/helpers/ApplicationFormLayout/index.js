import React, { Component } from 'react';
import './index.scss';

export default  class ApplicationFormLayout extends Component {
    render() {
        return (
            <div className='application-form-layout'>
                <div className='application-form-layout__heading'> {this.props.title} </div>
                <div className='application-form-layout__content'> 
                    {this.props.children}
                </div>
            </div>
        )
    }
}
