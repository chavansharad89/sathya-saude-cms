import React, { Component } from 'react';
import ApplicationActionButton from '../ApplicationActionButton';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { onModalRejectionReasonUpdate } from '../../screens/Dashboard/screens/Details/store/dispatchers';
import ErrorStore from '../../utils/ErrorStore';
import { rejection } from '../../utils/Validator';
import { connect } from 'react-redux';
import ValidationWrapper from '../ValidationWrapper';
import './index.scss';

class ApplicationModal extends Component {
    constructor(props) {
        super();
        this.state = {
            showModal: props.showModal
        };
        this.modalPosition = props.modalPosition;
        this.modalBackgroundOpacity = props.modalBackgroundOpacity;
    }

    _validate() {
        const { rejectionReason } = this.props;
        const errorInstance = ErrorStore();
        errorInstance.add('rejection', rejectionReason, [rejection]);
        return errorInstance.get();
    }

    _onSubmit() {
        let errors = null;        
        const details = this._validate();
        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if(errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            })           
        } else {
            this.props.onStatusUpdate();
        }
    }

    onBackdropClick(event) {
        const { closeOnBackdropClick = true, onClose } = this.props;
        const classNames = event.target.className;
        if (closeOnBackdropClick && classNames.indexOf('modal-opacity') !== -1) {
            if (onClose) {
                onClose();
            }
        }
    }

    _onClick(button) {
        const { onClose,
             onSave, 
             onDelete, 
             onStatusUpdate, 
             modalName } = this.props;
        if(modalName === "reject" && button.name === "yes") {
            return this._onSubmit()
        }
        else if(modalName === "reject" && button.name === "no") {
            return onClose() 
        }
        else if(modalName === 'approve') { 
            if((button.name === "close" || 
                button.name === "no" || 
                button.name === "cancel" )) {
                return onClose()  
            } else if(onSave) {
                return onSave()
            } else if(onDelete) {
                return onDelete()
            } else {
                return onStatusUpdate()
            }
        }
    }

    render() {
        const { showModal, 
            title, 
            handleSubmit, 
            meassage, 
            onClose, 
            rejectionReason, 
            buttons=[] } = this.props;
        if (showModal === true) {
            document.body.classList.add("on-modal-open");
        }
        return showModal ? (
            <div className = "modal-opacity" onClick = {this.onBackdropClick.bind(this)}>
                <div className = "custom-modal application-modal">
                    <div className = "application-modal__header">
                        <div>
                            <span> {title} </span>
                        </div>
                        <div>
                            <span className = "icon-cancel cancel-icon" onClick = {onClose}> </span>
                        </div>
                    </div>
                    <div className = "application-modal__body">
                        <div> 
                        {
                            meassage.length > 0 ? meassage 
                            : <React.Fragment>
                                <div className = 'rejection-title'> Enter Your Rejection Reason. </div>
                                    <form>
                                        <Field 
                                        props = {{Fieldtype: 'textArea',
                                            className:'field-noteDetails',
                                            noteDetails: rejectionReason,
                                            fieldsetTitle: 'Rejection Reason',
                                            placeholder: "Please specify your rejection reason", 
                                            textAreaClassName:'rejection-modal-note',
                                            onchange: this.props.onModalRejectionReasonUpdate}}
                                        name = 'rejection'
                                        component = {ValidationWrapper} />   
                                    </form>
                                    <span> </span>
                            </React.Fragment>
                        }
                        </div>
                        <div className="application-modal__body__buttons">
                        {
                            buttons.map((button, index) => {
                            return (
                                <ApplicationActionButton
                                    key = {index}
                                    type = "Button"
                                    title = {button.name}
                                    className = {(button.name === "save" || button.name === "delete" || 
                                        button.name === "close" || button.name === "yes") 
                                        ? "submit-button" : "save-button"
                                    }
                                    onClick = {handleSubmit(() => this._onClick(button))} />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        ) : <React.Fragment></React.Fragment>
    }
}


const mapStateToProps = ({detailsForm}) => {
    return {
        rejectionReason: detailsForm.rejectionReason
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onModalRejectionReasonUpdate(reason){
            dispatch(onModalRejectionReasonUpdate(reason))
        }
    };
}


ApplicationModal = reduxForm({
    'form': 'ApplicationModal'
})(ApplicationModal);

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationModal);