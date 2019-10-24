import React, { Component } from 'react';
import { Field,SubmissionError,reduxForm } from 'redux-form';
import ApplicationActionButton from '../ApplicationActionButton';
import ValidationWrapper from '../ValidationWrapper';
import ApplicationModal from '../ApplicationModal';
import ErrorStore from '../../utils/ErrorStore';
import { required } from '../../utils/Validator';
import Toastr from '../../utils/Toastr';
import gql from 'graphql-tag';
import { getDateDetails, compareDates } from '../../utils/DateFormat';
import './index.scss';

class ApplicationForm extends Component {
    constructor(props){
        super(props);
        this.state={
            submitModal:false,
            saveModal:false,
            isValid : false
        }
        this._onClose = this._onClose.bind(this)
        this._save = this._save.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onSubmitClose = this._onSubmitClose.bind(this);
        this._getSelectedValue = this._getSelectedValue.bind(this);
    }

    componentWillMount() {
        const { menuId , subMenuId } = this.props.match.params;
        this.props.onCategoryAndSubCategoryIdChange(menuId , subMenuId)
    }

    _onSubmitClose() {
        this._onClose();
    }

    _validate(formDetails) {
        const errorInstance = ErrorStore();
        if(formDetails.categoryId !== 4) {
            errorInstance.add('durationFrom',this._compareDates(), [required]);  
            errorInstance.add('durationTo', this._compareDates(), [required]);
            errorInstance.add('browseFile', formDetails.selectedFile.file, [required]);
        }
        else if(formDetails.categoryId === 4) {
            errorInstance.add('fiscalYear', formDetails.duration.fiscalYear , [required]);
            errorInstance.add('browseFile', formDetails.selectedFile.file, [required]);
        }
        return errorInstance.get();
    }
     
    _formatObject(formDetails) {
        const { categoryId, 
            subCategoryId, 
            duration, 
            fileId, 
            notes } = formDetails;
        const { startDate, endDate, fiscalYear } = duration;

        const _updatedDetails = {
            categoryId,
            subCategoryId,
            durationValue : fiscalYear && fiscalYear !== null ? { fiscalYear : fiscalYear } : { startDate, endDate },
            fileId,
            notes
        }
        return _updatedDetails;
    }

    _onSubmit(formDetails) {
        let errors = null;
        const client = this.props.client;
        const history = this.props.history;
        const { categoryId, subCategoryId } = this.props.uploadFormDetails;
        const details = this._validate(formDetails);
        const data = this._formatObject(formDetails);

        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if(errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } 
        else {
            client.mutate({
                mutation: gql`${this.props.gql}`,
                variables: {
                    'uploadFormDetails': data,
                    'dataUploadId' : formDetails.dataUploadId ? formDetails.dataUploadId : null
                }
            }).then(({data}) => {
                const { dataUploadId } = data.addDataUpload ? data.addDataUpload : data.updateDataUpload; 
                Toastr.success("Data Uploaded Successfully");    
                history.push(`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`);
            })
            .catch(err => {
                Toastr.error(err);
            });
        }
        this.props.onDashboardUploadsViewClicked(true)
    }

    _onSave(formDetails){
        let errors = null;
        const client = this.props.client;
        const history = this.props.history;
        const { categoryId, subCategoryId } = this.props.uploadFormDetails;
        const details = this._validate(formDetails);
        const data = this._formatObject(formDetails);
        
        if(details) {
            errors = { ...(errors || {}), ...details };
        }
        if(errors) {
            return new Promise(() => {
                throw new SubmissionError({ ...errors });
            });            
        } 
        else {
            client.mutate({
                mutation: gql`${this.props.gqlDraft}`,
                variables: {
                    'uploadFormDetails': data,
                    'dataUploadId' : formDetails.dataUploadId ? formDetails.dataUploadId : null
                }
            }).then(({data} ) => {
                const { dataUploadId } = data.updateDataUpload ? data.updateDataUpload : data.updateDraftDataUpload; 
                Toastr.success("Data Draft Successfully");    
                history.push(`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`);
            })
            .catch(err => {
                Toastr.error(err);
            });
        }
    }
    _save(){
        this._onClose();
    }
    _onClose(){
        this.setState({
            submitModal: false,
            saveModal: false
        })
    }

    _getSelectedValue = (date) => {
        const _convertedDate = date ? getDateDetails(date) : null;
        return _convertedDate;
    }

    _compareDates() {
        const {startDate, endDate} = this.props.duration;
        const _date = compareDates(startDate, endDate);
        return _date;
    }

    render() {
        const { 
            title,            
            handleSubmit, 
            uploadFormDetails, 
            selectedFile,
            fiscalYearOptions,
            onFileUpload,
            onFiscalYearChange,
            onDurationFromChange, 
            onDurationToChange, 
            onNoteDetailsChange } = this.props;
        const {submitModal, saveModal} = this.state;
        const { startDate, endDate, fiscalYear } = this.props.duration;
        return (
            <form>
                {
                    title.displayName === "Commissioner Data" || title.displayName === "Access To Justice" ||
                    title.displayName === "Language Service" ? 
                    <Field 
                    props = {{Fieldtype : 'duration', 
                        className:'duration-from',
                        isRequired:'true',
                        fieldsetTitle:'Duration',
                        validateDateValues : this._compareDates(),
                        selectedValues:this._getSelectedValue(startDate),
                        onChange:onDurationFromChange}}
                    name = 'durationFrom'
                    component = {ValidationWrapper}/>
                    : <div className = 'hide-block'></div>
                }
                {
                    title.displayName === "Commissioner Data" || title.displayName === "Access To Justice" ||
                    title.displayName === "Language Service" ?
                    <Field 
                    props = {{Fieldtype : 'duration',
                        className:'duration-to',
                        isRequired:'true',
                        fieldsetTitle:'Duration',
                        validateDateValues : this._compareDates(),
                        selectedValues:this._getSelectedValue(endDate),
                        onChange:onDurationToChange}}
                    name = 'durationTo'
                    component = {ValidationWrapper}/>
                    : <div className='hide-block'> </div>
                }
                {
                    title.displayName === "Filings"
                    ?  <Field 
                    props = {{Fieldtype : 'dropdown',
                        className:'fiscal-year-dropdown',
                        isRequired:'true',
                        fieldsetTitle:'Year',
                        dropdownoptions:fiscalYearOptions,
                        fiscalYear: fiscalYear,
                        onChange: onFiscalYearChange}}
                    name = 'fiscalYear'
                    component = {ValidationWrapper}/> 
                    : <div className='hide-block'> </div>
                }
                <Field 
                    props = {{Fieldtype : 'input',
                        className : 'browsefile',
                        fieldsetTitle : 'Browse File xlx.',
                        isRequired : 'true',
                        selectedFile: selectedFile.file,
                        type:'file',                        
                        onFileUploadChange:onFileUpload}}
                    name = 'browseFile'
                    component = {ValidationWrapper}/>
                <Field 
                    props={{Fieldtype: 'textArea',
                        className:'field-noteDetails',
                        textAreaClassName:'note-details',
                        maxLimit:150,
                        placeholder: 'Enter note details',
                        noteDetails:uploadFormDetails.notes,
                        onchange:onNoteDetailsChange,
                        fieldsetTitle:'Note'}}
                    name = 'note'
                    component = {ValidationWrapper}/>

                <div className='action-buttons'>
                    <ApplicationActionButton 
                        title = "save & preview"
                        className = "save-preview-button"
                        onClick = {handleSubmit((e) => this._onSave(uploadFormDetails))}
                        />
                    <ApplicationActionButton 
                        title = "Submit"
                        className = "submit-button"
                        onClick = {handleSubmit(() => this._onSubmit(uploadFormDetails))}
                        />
                </div>
                {
                    submitModal ? <ApplicationModal 
                        meassage = "Your details Sucessfully submitted."
                        title = "submit sucessfully" 
                        showModal = "true"
                        onClose = {this._onSubmitClose} 
                        buttons = {[{name:"close"}]}/> : null
                }
                {
                    saveModal ? <ApplicationModal 
                    meassage = "Do you want to save your data? You will be able to edit your data."
                    title = "save documents" 
                    showModal = "true"
                    onClose = {this._onClose} 
                    onSave  =  {this._save}
                    buttons = {[{name:"save"}, {name:"cancel"}]}/> : null
                }
            </form>
        )
    }
}

ApplicationForm = reduxForm({
    'form': 'ApplicationForm'
})(ApplicationForm);

export default (ApplicationForm);
