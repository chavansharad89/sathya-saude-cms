import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import { withRouter } from 'react-router-dom';
import { setSession, setUserDetails } from '../../../utils/Authentication';
import ApplicationBlockName from '../../../helpers/ApplicationBlockName';
import { onUserEnter } from'../../../shared/Settings/store/dispatchers'
import {HomeLoadingStatus} from  '../../Home/store/dispatchers'
import './index.scss';
import {OnLogin}from '../store/dispatchers'
import { connect } from 'react-redux';

 class LoginPage extends Component {
    loginFormSubmitHandler(history,onUserEnter, error, response) {
        if (response) {
            const userDetails = {
                firstName: response.firstName,
                lastName: response.lastName, 
                role: response.role,
                accountId:response.accountId
            };
             setSession(response.jwt);
             setUserDetails(userDetails);
            //  onUserEnter(response)
             this.props.OnLogin(response)
            // Redirect to Dashboard
            this.props.HomeLoadingStatus(false)
            history.push('/');
        } else if (error) {
            console.log(error.message);
        }
    }

    render() {
        const {history,onUserEnter} =this.props;
        return (
            <div className='login-page'>
                <div className='login-page__block'>
                    <ApplicationBlockName name='ADMIN LOGIN'/>
                </div>
                <div className='login-page__form'>
                    <LoginForm   onLoginFormSubmit={(error, response) => this.loginFormSubmitHandler(history,onUserEnter, error, response)}/>
                </div>
                
            </div>   
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUserEnter(value){
            dispatch (onUserEnter(value))
        },
        OnLogin(value){
            dispatch(OnLogin(value))
        },
        HomeLoadingStatus(value){
            dispatch(HomeLoadingStatus(value))
        }
    };
};
export default connect(null,mapDispatchToProps) (withRouter(LoginPage))