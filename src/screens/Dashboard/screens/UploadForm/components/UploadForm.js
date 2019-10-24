import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { 
    onUploadFormDurationFromChange, 
    onCategoryAndSubCategoryIdChange,
    onUploadFormDurationToChange,
    onUploadFormFileUpload,
    onUploadFormNoteDetailsChange,
    resetForm,
    onUploadFormFiscalYearChange } from '../store/dispatchers';
import { onDashboardUploadsViewClicked } from '../../Details/store/dispatchers';
import ApplicationForm from '../../../../../helpers/ApplicationForm';
import '../../UploadForm/index.scss';

 class UploadForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            submitModal:false,
            saveModal:false,
            isValid : false
        }
    }
    
    getMutationGql() {
        return `mutation addDataUpload($uploadFormDetails: UploadFormInput) {
            addDataUpload(uploadFormDetails: $uploadFormDetails) {
                dataUploadId
            }
        }`
    } 
    getDraftMutationGql() {
        return `mutation addDraftDataUpload($uploadFormDetails: UploadFormInput) {
            addDraftDataUpload(uploadFormDetails: $uploadFormDetails) {
                dataUploadId
            }
        }`
    } 
    render() {
        const { history,
            client,
            match,
            title,
            duration,
            selectedFile,
            fiscalYearOptions,
            uploadFormDetails,
            onUploadFormDurationFromChange, 
            onCategoryAndSubCategoryIdChange,
            onDashboardUploadsViewClicked,
            onUploadFormDurationToChange,
            onUploadFormFileUpload,
            onUploadFormNoteDetailsChange,
            onUploadFormFiscalYearChange} = this.props;
        const _gql = this.getMutationGql();  
        const _gqlDraft = this.getDraftMutationGql();     

        return (
            <ApplicationForm 
                gql = {_gql}
                match = {match}
                history = {history}
                client={client}
                title = {title}
                duration = {duration}
                selectedFile = {selectedFile}
                onDashboardUploadsViewClicked = {onDashboardUploadsViewClicked}
                fiscalYearOptions = {fiscalYearOptions}
                uploadFormDetails = {uploadFormDetails} 
                onCategoryAndSubCategoryIdChange = {onCategoryAndSubCategoryIdChange}
                onFiscalYearChange = {onUploadFormFiscalYearChange}
                onDurationFromChange = {onUploadFormDurationFromChange} 
                onDurationToChange = {onUploadFormDurationToChange} 
                onFileUpload = {onUploadFormFileUpload}   
                onNoteDetailsChange = {onUploadFormNoteDetailsChange}
                gqlDraft = {_gqlDraft}
            />
        )
    }
}

const mapStateToProps = ({uploadForm, setting}) => {
    return {
        uploadFormDetails:uploadForm.uploadFormDetails,
        duration: uploadForm.uploadFormDetails.duration,
        selectedFile: uploadForm.uploadFormDetails.selectedFile,
        fiscalYearOptions: uploadForm.fiscalYearOptions,
        title: setting.title  
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm(){
           
            dispatch(resetForm())
        },
        onDashboardUploadsViewClicked(value) {
            dispatch(onDashboardUploadsViewClicked(value))
        },
        onCategoryAndSubCategoryIdChange(menuId, subMenuId) {
            dispatch(onCategoryAndSubCategoryIdChange(menuId, subMenuId))
        },
        onUploadFormFiscalYearChange(values) {
            dispatch(onUploadFormFiscalYearChange(values))
        },
        onUploadFormDurationFromChange(values) {
            dispatch(onUploadFormDurationFromChange(values))
        },
        onUploadFormDurationToChange(values) {
            dispatch(onUploadFormDurationToChange(values))
        },
        onUploadFormFileUpload(values) {
            dispatch(onUploadFormFileUpload(values))
        },
        onUploadFormNoteDetailsChange(values){
            dispatch (onUploadFormNoteDetailsChange(values))
        }
    };
};

const UploadFormWithApollo = withApollo(UploadForm);
export default connect( mapStateToProps, mapDispatchToProps)(withRouter(UploadFormWithApollo));
