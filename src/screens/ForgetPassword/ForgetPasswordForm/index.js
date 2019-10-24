import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, SubmissionError,reduxForm } from 'redux-form';
import ErrorStore from '../../../utils/ErrorStore';
import { required ,email} from '../../../utils/Validator';
import ApplicationActionButton from '../../../helpers/ApplicationActionButton';
import { onEmailChange } from '../store/dispatchers';
import ValidationWrapper from '../../../helpers/ValidationWrapper';
import './index.scss';


class ForgetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            status:'',
            error:false
        }
        this._onSubmit = this._onSubmit.bind(this);
     }
    _validate() {
        const errorInstance = ErrorStore();
        errorInstance.add('email', this.props.emailId, [required,email]);
        return errorInstance.get();
    }

    _onSubmit(){
        let errors = null;
        const client = this.props.client;
        const details = this._validate();
        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if (errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } else {
              return client.mutate({
                mutation: gql `mutation forgotPassword($emailId: String!) {
                    forgotPassword(email:$emailId) {
                        email
                    }
                }`,
                variables: {
                    'emailId': this.props.emailId,
                }
            })
            .then((responce) => {
                this.setState({
                   status:"Mail has been set to your Mail-Id" ,
                   error:false
                })
            })
            .catch(err => {
                this.setState({
                    status:err.message ,
                    error:true
                 })
            });
        }

    }

    render() {
        const {handleSubmit ,onEmailChange}=this.props
        const {status,error}= this.state    
        const className = error? "red" :''
        return (
            <div className='forget-password-form'>
                <div className = 'forget-password-form__note margin-bottom' >
                    Enter your email address below to reset your passward and we will help you to reset your passward
                </div>
                <div className='forget-password-form__form'>
                    <form onSubmit={handleSubmit(this._onSubmit)}>
                        <Field 
                                props={{Fieldtype: 'input', 
                                    onChange:onEmailChange,
                                    inputTypeClassName:'text',
                                    fieldsetTitle:'Enter Email ID',
                                    type:"text"
                                }}
                                title='Email'
                                name='email'
                                isRequired={true}
                                component={ValidationWrapper}/>
                    </form>
                    {
                        (status) &&
                        <div className={`forget-password-form__form__error ${className}`}>
                            <p >{status}</p>
                        </div>
                    }
                </div>
                
                <div className='forget-password-form__button'>  
                    <ApplicationActionButton 
                        title="Submit"
                        className = "login-button reset-margin"
                        onClick={handleSubmit(this._onSubmit)}/>   
                </div>
            </div>   
        )
    }
}

const mapStateToProps = ({forgetPassword}) => {
    return {
       emailId : forgetPassword.emailId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange(values) {
            dispatch(onEmailChange(values))
        }
    };
};
ForgetPasswordForm = reduxForm({
    'form': 'ForgetPasswordForm'
})(ForgetPasswordForm);


const ForgetPasswordFormWithApollo = withApollo(ForgetPasswordForm);
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ForgetPasswordFormWithApollo));