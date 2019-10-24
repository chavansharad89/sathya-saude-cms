import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { 
    onEditFormDurationFromChange, 
    onEditFormDurationToChange,
    onEditFormFileUpload,
    onEditFormNoteDetailsChange,
    onDashboardUploadsViewClicked,
    onEditFormFiscalYearChange,
    onFileUploadId } from '../../Details/store/dispatchers';
import { onCategoryAndSubCategoryIdChange } from '../../UploadForm/store/dispatchers';
import ApplicationForm from '../../../../../helpers/ApplicationForm'

 class EditForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            submitModal:false,
            saveModal:false,
            isValid : false
        }
    }
    getMutationGql() {
        return `mutation updateDataUpload($dataUploadId: Int, $uploadFormDetails: UploadFormInput) {
            updateDataUpload(dataUploadId: $dataUploadId, uploadFormDetails: $uploadFormDetails) {
                dataUploadId
            }
        }`
    }  
    getDraftMutationGql() {
        return `mutation updateDraftDataUpload($dataUploadId: Int, $uploadFormDetails: UploadFormInput) {
            updateDraftDataUpload(dataUploadId: $dataUploadId, uploadFormDetails: $uploadFormDetails) {
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
            onDashboardUploadsViewClicked,
            onEditFormDurationFromChange, 
            onEditFormNoteDetailsChange,
            onEditFormDurationToChange, 
            onEditFormFiscalYearChange,
            onEditFormFileUpload,
            onFileUploadId } = this.props;
        const _gql = this.getMutationGql();
        const _gqlDraft = this.getDraftMutationGql();     

        return (
            <ApplicationForm 
                gql = {_gql}
                match = {match}
                history = {history}
                title = {title}
                client = {client}
                duration = {duration}
                selectedFile = {selectedFile}
                onDashboardUploadsViewClicked = {onDashboardUploadsViewClicked}
                fiscalYearOptions = {fiscalYearOptions}
                uploadFormDetails = {uploadFormDetails} 
                onFiscalYearChange = {onEditFormFiscalYearChange}
                onCategoryAndSubCategoryIdChange = {onCategoryAndSubCategoryIdChange}
                onDurationFromChange = {onEditFormDurationFromChange} 
                onDurationToChange = {onEditFormDurationToChange} 
                onFileUpload = {onEditFormFileUpload}   
                onFileUploadId = {onFileUploadId}
                onNoteDetailsChange = {onEditFormNoteDetailsChange}
                gqlDraft = {_gqlDraft}
            />
        )
    }
}

const mapStateToProps = ({detailsForm, uploadForm, setting}) => {
    return {
        uploadFormDetails:detailsForm.excelFormDetails,
        duration: detailsForm.excelFormDetails.duration,
        selectedFile: detailsForm.excelFormDetails.selectedFile,
        fiscalYearOptions: uploadForm.fiscalYearOptions,
        title: setting.title  
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDashboardUploadsViewClicked(value) {
            dispatch(onDashboardUploadsViewClicked(value))
        },
        onCategoryAndSubCategoryIdChange(menuId, subMenuId) {
            dispatch(onCategoryAndSubCategoryIdChange(menuId, subMenuId))
        },
        onEditFormFiscalYearChange(values) {
            dispatch(onEditFormFiscalYearChange(values))
        },
        onEditFormDurationFromChange(values) {
            dispatch(onEditFormDurationFromChange(values))
        },
        onEditFormDurationToChange(values) {
            dispatch(onEditFormDurationToChange(values))
        },
        onEditFormFileUpload(values) {
            dispatch(onEditFormFileUpload(values))
        },
        onFileUploadId(values) {
            dispatch(onFileUploadId(values))
        },
        onEditFormNoteDetailsChange(values){
            dispatch(onEditFormNoteDetailsChange(values))
        }
    };
};
const EditFormWithApollo = withApollo(EditForm);
export default connect( mapStateToProps, mapDispatchToProps)(withRouter(EditFormWithApollo));
