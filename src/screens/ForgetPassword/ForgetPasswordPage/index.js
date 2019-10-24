import React, { Component } from 'react';
import ForgetPasswordForm from '../ForgetPasswordForm'
import ApplicationBlockName from '../../../helpers/ApplicationBlockName'
import './index.scss';

export default class ForgetPasswordPage extends Component {
    render() {
        return (
            <div className='forget-password-page'>
                <div className='forget-password-page__block'>
                    <ApplicationBlockName name='FORGOT PASSWORD?'/>
                </div>
                <div className='forget-password-page__form'>
                    <ForgetPasswordForm />
                </div>
                
            </div>   
        )
    }
}