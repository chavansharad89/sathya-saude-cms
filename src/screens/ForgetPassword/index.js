import React, { Component } from 'react';
import ApplicationPageLayout from '../../helpers/ApplicationPageLayout';
import ApplicationPageTitle from '../../helpers/ApplicationPageTitle'
import ApplicationHeader from'../../helpers/ApplicationHeader'
import ForgetPasswordPage from './ForgetPasswordPage'


export default class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <ApplicationHeader/>
                <ApplicationPageTitle />
                <ApplicationPageLayout>
                    <ForgetPasswordPage/>
                </ApplicationPageLayout>
            </React.Fragment>   
        )
    }
}