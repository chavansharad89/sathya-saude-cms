import React, { Component } from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Field, 
    SubmissionError,
    reduxForm } from 'redux-form';
import { withApollo } from 'react-apollo';
import ErrorStore from '../../../utils/ErrorStore';
import { required,minLength6 } from '../../../utils/Validator';
import ValidationWrapper from '../../../helpers/ValidationWrapper';
import ApplicationActionButton from '../../../helpers/ApplicationActionButton'
import Toastr from'../../../utils/Toastr'
import {onNewPasswordChange,
    onReset,
    onReEnterdPasswordChange,
    onPasswordNotMatched} from'../store/dispatchers';
import '../index.scss';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._reset = this._reset.bind(this);
    }
    _validate() {
        const errorInstance = ErrorStore();
        errorInstance.add('new password', this.props.newPassword, [required,minLength6]);
        errorInstance.add('confirm password', this.props.reEnteredPassword, [required,minLength6]);
        return errorInstance.get();
    }
    _reset(){
        this.props.onReset();
        this.props.reset();
    }
    _onSubmit(){
        let errors = null;
        const client = this.props.client;
        const {newPassword,reEnteredPassword}=this.props
        const details = this._validate();

        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if (errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } else{
            if(newPassword===reEnteredPassword){
                return client.mutate({
                    mutation: gql`mutation changePassword($password: String!) {
                        changePassword(password: $password) {
                            accountId
                        }
                    }`,
                    variables: {
                        'password': this.props.newPassword,
                    }
                })
                .then(( {data} ) => {    
                    Toastr.success("Password Change Successfully");      
                })
                .catch(err => {
                    Toastr.error(err.Message); 
                });
            }
            else
            {
                this.props.onPasswordNotMatched();
            }
            
        }
       
    }
    render() {
        const{passwordMatch ,
            handleSubmit, 
            onNewPasswordChange,
            onReEnterdPasswordChange} = this.props;
        return (
            <div className='Change-password-form'>
                <form onSubmit={handleSubmit(this._onSubmit)}>
                    <Field 
                        props={{Fieldtype: 'input',
                            className:'change-password',
                            onChange:onNewPasswordChange,
                            inputTypeClassName:'text',
                            fieldsetTitle:'New Password',
                            type:"text"}}
                        name='new password'
                        isRequired={true}
                        component={ValidationWrapper}
                        />
                    <Field 
                        props={{Fieldtype: 'input',
                            className:'change-password__last',
                            onChange:onReEnterdPasswordChange,
                            inputTypeClassName:'text',
                            fieldsetTitle:'Confirm New Password',
                            type:"text"}}
                        name='confirm password'
                        isRequired={true}
                        component={ValidationWrapper}
                        />
                        {
                            (!passwordMatch) &&
                            <div className='Change-password-form__error'>
                                <p >Password does not match</p>
                            </div>
                        }
                    <div className ='Change-password-form__action-button'>
                        <ApplicationActionButton 
                            title="Clear"
                            type="reset"
                            className = "save-button"
                            onClick={ handleSubmit(this._reset) }/> 
                        <ApplicationActionButton 
                            title="Submit"
                            className = "submit-button"
                            onClick={ handleSubmit(this._onSubmit) }/>  
                    </div>
                   
                    
                </form> 
            </div>   
        )
    }
}
const mapStateToProps = ({changePassword}) => {
   
    return {
        passwordMatch:changePassword.passwordMatch,
        newPassword:changePassword.newPassword,
        reEnteredPassword:changePassword.reEnteredPassword

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewPasswordChange(value){
            dispatch(onNewPasswordChange(value))
        },
        onReEnterdPasswordChange(value){
            dispatch(onReEnterdPasswordChange(value))
        },
        onPasswordNotMatched(){
            dispatch(onPasswordNotMatched())
        },
        onReset(){
          
            dispatch(onReset())
        }
        
    };
};
ChangePasswordForm = reduxForm({
    'form': 'ChangePasswordForm'
})(ChangePasswordForm);

const ChangePasswordFormWithApollo = withApollo(ChangePasswordForm);
export default connect(mapStateToProps,mapDispatchToProps)((ChangePasswordFormWithApollo));