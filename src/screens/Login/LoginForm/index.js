import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Field, SubmissionError,reduxForm } from 'redux-form';
import ErrorStore from '../../../utils/ErrorStore';
import { required, email } from '../../../utils/Validator';
import ApplicationActionButton from '../../../helpers/ApplicationActionButton';
import ValidationWrapper from '../../../helpers/ValidationWrapper';
import { onEmailChange , onPasswordChange } from '../store/dispatchers';
import './index.scss';


 class LoginForm extends Component {
     constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state={
            invalidDetails:false,
            message:''
        }
     }
    
    _validate() {
        const errorInstance = ErrorStore();
        errorInstance.add('email', this.props.emailId, [required, email]);
        errorInstance.add('password', this.props.password, [required]);
        return errorInstance.get();
    }

    _onSubmit(){
        let errors = null;
        const details = this._validate();
        const client = this.props.client;
        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if (errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } else{
            client.mutate({
                mutation: gql`mutation login($email: String!, $password: String!) {
                    login (email:$email, password: $password) {
                        accountId,
                        jwt,
                        name,
                        email
                    }
                }`,
                variables: {
                    'email': this.props.emailId,
                    'password':this.props.password
                }
            }).then(({data} ) => {          
               
               this.props.onLoginFormSubmit(null, data.login);
              
            })
            .catch(err => {
                
                this.setState({
                    invalidDetails:true,
                    message:err.message
                })
            });
        }
       
    }


    render() {
        const{ handleSubmit, onEmailChange, onPasswordChange} = this.props;
        const{invalidDetails,message,}=this.state

        return (
            <div className='login-form'>
                <form onSubmit={handleSubmit(this._onSubmit)}>
                    <Field 
                        props={{Fieldtype: 'input', 
                            onChange:onEmailChange,
                            inputTypeClassName:'text',
                            fieldsetTitle:'Email',
                            type:"text"
                        }}
                        title='Email'
                        name='email'
                        isRequired={true}
                        component={ValidationWrapper}/>
                    <Field 
                        props={{Fieldtype: 'input',
                            onChange:onPasswordChange,
                            inputTypeClassName:'text',
                            fieldsetTitle:'Password',
                            type:"password"}}
                        name='password'
                        isRequired={true}
                        component={ValidationWrapper}
                        />
                        {
                            (invalidDetails) &&
                            <div className='login-form__error'>
                                <p >{message}</p>
                            </div>
                        }
                    <div className='login-form__forget'>
                        <Link to ='/forget-password'>
                            <span className='forget-password'>Forgot Password?</span>
                        </Link> 
                    </div>  
                    <ApplicationActionButton 
                        title="Login"
                        className = "login-button"
                        onClick={ handleSubmit(this._onSubmit) }/>  
                </form> 
            </div>   
        )
    }
}

const mapStateToProps = ({login}) => {
  
    return {
        emailId : login.emailId,
        password: login.password
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange(values) {
            dispatch(onEmailChange(values))
        },
        onPasswordChange(values) {
            dispatch(onPasswordChange(values))
        }
    };
};
LoginForm = reduxForm({
    'form': 'LoginForm'
})(LoginForm);


const LoginFormWithApollo = withApollo(LoginForm);
export default connect(mapStateToProps,mapDispatchToProps)((LoginFormWithApollo));
