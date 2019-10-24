import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { isAuthenticated } from '../../utils/Authentication';
import ApplicationPageLayout from '../../helpers/ApplicationPageLayout';
import ApplicationPageTitle from '../../helpers/ApplicationPageTitle'
import ApplicationHeader from'../../helpers/ApplicationHeader'
import ResetPassword from './ResetPasswordPage'


export default class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <ApplicationHeader/>
                <ApplicationPageTitle />
                <ApplicationPageLayout>
                     <ResetPassword /> 
                </ApplicationPageLayout>
            </React.Fragment>
            
            
        )
    }
}