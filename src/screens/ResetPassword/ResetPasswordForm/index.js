import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, SubmissionError,reduxForm } from 'redux-form';
import ErrorStore from '../../../utils/ErrorStore';
import { required,minLength6 } from '../../../utils/Validator';
import ApplicationActionButton from '../../../helpers/ApplicationActionButton';
import ValidationWrapper from '../../../helpers/ValidationWrapper';
import { onReEnterdReset , onPasswordReset,onPasswordNotMatched } from '../store/dispatchers';
import './index.scss';


 class ResetPasswordForm extends Component {
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
        errorInstance.add('password', this.props.password, [required,minLength6]);
        errorInstance.add('confirm password', this.props.reEntered, [required,minLength6]);
        return errorInstance.get();
    }

    _onSubmit(){
        let errors = null;
        const client = this.props.client;
        const code=this.props.match.params.code
        const {password,reEntered}=this.props
        const details = this._validate();
        
        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if (errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } else{
            if(password===reEntered){
                return client.mutate({
                mutation: gql`mutation reset($code: String!, $password: String!) {
                    resetPassword(code: $code, password: $password) {
                        accountId
                    }
                }`,
                    variables: {
                        'code': code,
                        'password': this.props.password
                    }
                })

                .then(( ) => {  
                    this.setState({status:`true`,error:false})
                })
                .catch(err => {
                    this.setState({status:err.message,error:true})
                });
            }else{
                this.setState({status:'Password Dose Not Matched',error:true})
            }   
        }
    }

    showStatus(status,error){
        
        if (status && error){
            return<div className={`reset-password-for__error red`}>
                <p >{status}</p>
            </div>
        }

        if(status && !error) {
            return <div className={`reset-password-for__error`}>
                <Link to='/login'><span className='ClickHere'>Click Here To Login</span></Link> 
            </div>
        }   
    }
    render() {
        const{handleSubmit, onPasswordReset,onReEnterdReset } = this.props;
        const {status,error}=this.state
        return (
            <div className='reset-password-form'>
                <form onSubmit={handleSubmit(this._onSubmit)}>
                    <Field 
                        props={{Fieldtype: 'input',
                            onChange:onPasswordReset,
                            inputTypeClassName:'text',
                            fieldsetTitle:'Password',
                            type:"text"}}
                        name='password'
                        isRequired={true}
                        component={ValidationWrapper}
                        />
                    <Field 
                        props={{Fieldtype: 'input',
                            onChange:onReEnterdReset,
                            inputTypeClassName:'text',
                            fieldsetTitle:'Confirm Password',
                            type:"text"}}
                        name='confirm password'
                        isRequired={true}
                        component={ValidationWrapper}
                        />
                        {
                            this.showStatus(status,error)
                                               
                        }
                    <ApplicationActionButton 
                        title="Submit"
                        className = "login-button"
                        onClick={ handleSubmit(this._onSubmit) }/>  
                </form> 
            </div>   
        )
    }
}

const mapStateToProps = ({resetPassword}) => {
    return {
       password: resetPassword.password,
       reEntered:resetPassword.reEntered,
       passwordMatch:resetPassword.passwordMatch
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPasswordReset(values) {
            dispatch(onPasswordReset(values))
        },
        onReEnterdReset(values) {
            dispatch(onReEnterdReset(values))
        },
        onPasswordNotMatched() {
            dispatch(onPasswordNotMatched())
        }
    };
};
ResetPasswordForm = reduxForm({
    'form': 'ResetPasswordForm'
})(ResetPasswordForm);

const ResetPasswordFormWithApollo = withApollo(ResetPasswordForm);
export default connect(mapStateToProps,mapDispatchToProps)(withRouter (ResetPasswordFormWithApollo));