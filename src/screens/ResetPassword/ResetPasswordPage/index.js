    import React, { Component } from 'react';
import ResetPasswordForm from '../ResetPasswordForm';
import { withRouter } from 'react-router-dom';
import { setSession, setUserDetails } from '../../../utils/Authentication';
import ApplicationBlockName from '../../../helpers/ApplicationBlockName'
import './index.scss';

 class ResetPasswordPage extends Component {
    onResetPasswordFormSubmit(history, error, response) {
        if (response) {
            const userDetails = {
                firstName: response.firstName,
                lastName: response.lastName,  
            };
             setSession(response.jwt);
             setUserDetails(userDetails);
            // Redirect to Dashboard
            history.push('/login');
        } else if (error) {
            alert(error);
        }
    }

    render() {
        const {history} =this.props;
        return (
            <div className='Reset-password-page'>
                <div className='Reset-password-page__block'>
                    <ApplicationBlockName name='Reset Password'/>
                </div>
                <div className='Reset-password-page__form'>
                    <ResetPasswordForm   onResetPasswordFormSubmit={(error, response) => this.onResetPasswordFormSubmit(history, error, response)}/>
                </div>
                
            </div>   
        )
    }
}
export default (withRouter(ResetPasswordPage))