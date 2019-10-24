import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ApplicationRejectionNote from'../ApplicationRejectionNote';
import ApplicationApporveNote from'../ApplicationApporveNote';
import { convertDate } from '../../utils/DateFormat';
import ApplicationActionButton from  '../ApplicationActionButton'
import ApplicationStatus from '../ApplicationStatus';
import ApplicationModal from '../ApplicationModal';
import { FILE_API_URL } from '../../constants';
import Toastr from '../../utils/Toastr';
import {getUserDetails} from '../../utils/Authentication'
import gql from 'graphql-tag';
import './index.scss';

class ApplicationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showApproveModal : false,
            showRejectModal : false
        }
        this._onClose = this._onClose.bind(this);
        this.onModalReject = this.onModalReject.bind(this);
        this.onModalApprove = this.onModalApprove.bind(this);
        this._getNoteComponent = this._getNoteComponent.bind(this);
        this._onEditClicked = this._onEditClicked.bind(this);
        this._getComponentByStatus = this._getComponentByStatus.bind(this);
    }

    // componentWillMount() {
    //     this.props.onEditButtonClicked();
    // }

    _getConvertedDate(date) {
        const _date = date ? new Date(date) : null;
        const _convertedDate = convertDate(_date, ['mmm', 'dd', 'yyyy']);
        return _convertedDate;
    }

    _onEditClicked(history){
        const { menuId, subMenuId , id } = this.props.match.params;
        history.push(`/menus/${menuId}/sub-menu/${subMenuId}/${id}/edit`)
    }

    _getNoteComponent(status){
        if(status === 'approved') {
            return <ApplicationApporveNote />
        } 
        else if (status === 'rejected') {
            return <ApplicationRejectionNote data={this.props.rejectionReason}/>
        } 
    }

    _getComponentByStatus(status, role, editButtonStatus,createdBy) {
        const accountId=getUserDetails().accountId;
        if(status === 'approved') {
            return ''
        } 
        else if (status === 'rejected') {
            return''
        } 
        else if(role === 'admin'&& (createdBy === accountId )) {
            return <ApplicationActionButton
                title = "Edit"
                className = "edit-button" 
                onClick={() => this._onEditClicked(this.props.history)}/>
        }
        else if(!(role === 'admin')) {
            if(editButtonStatus && (createdBy === accountId)) {
                return (
                    <ApplicationActionButton
                    title = "Edit"
                    className = "edit-button" 
                    onClick={() => this._onEditClicked(this.props.history)}/>
                )
            }
            else {
                return (
                    <div className='super-admin-action-buttons action-buttons'>
                        <span className='icon-eye'></span>
                        <ApplicationActionButton 
                            type = "Button"
                            title = "Preview"
                            className = "preview-button"
                        />
                        <ApplicationActionButton 
                            type = "Button"
                            title = "Approve" 
                            className = "submit-button"
                            onClick = {this.onModalApprove}
                        />
                        <ApplicationActionButton 
                            type = "Button"
                            title = "Reject" 
                            className = "save-button"
                            onClick = {this.onModalReject}
                        />
                    </div>
                )
            }
        }
    }

    onModalApprove() {
        this.setState({
            showApproveModal: true,
            showRejectModal: false
        })
    }

    onModalReject() {
        this.setState({
            showApproveModal: false,
            showRejectModal: true
        })
    }
    _onClose() {
        this.setState({
            showApproveModal: false,
            showRejectModal: false
        })
    }

    getMutationGql() {
        return `mutation updateActivityStatus($status: String, $dataUploadId: Int, $reason: String) {
            updateActivityStatus(status: $status, dataUploadId: $dataUploadId, reason: $reason) {
                dataUploadId
            }
        }`
    }  

    onApproveStatusUpdate(e, status, _reason,) {
        const { menuId, subMenuId , id } = this.props.match.params;
        const client = this.props.client;
        const history = this.props.history;
        const _gql = this.getMutationGql(); 
        const reason =  status !== "rejected" ? null : _reason
        client.mutate({
            mutation: gql`${_gql}`,
            variables: {
                'dataUploadId': parseInt(id),
                'status': status,
                'reason' : reason
            }
        }).then(() => {
            Toastr.success("Approved successfully");   
            this.props.onEditButtonClicked(); 
            history.push(`/menus/${menuId}/sub-menu/${subMenuId}/${id}/details`);
        })
        .catch(err => {
            Toastr.error(err);
        });
        this.props.onUpdateFormStatus(status);
        this._onClose();
    }

    onRejectStatusUpdate(e, status, _reason,) {
        const { menuId, subMenuId , id } = this.props.match.params;
        const client = this.props.client;
        const history = this.props.history;
        const _gql = this.getMutationGql(); 
        const reason =  status !== "rejected" ? null : _reason
        client.mutate({
            mutation: gql`${_gql}`,
            variables: {
                'dataUploadId': parseInt(id),
                'status': status,
                'reason' : reason
            }
        }).then(() => {
            Toastr.error("Request Rejected.");    
            this.props.onEditButtonClicked();
            history.push(`/menus/${menuId}/sub-menu/${subMenuId}/${id}/details`);
        })
        .catch(err => {
            Toastr.error(err);
        });
        this.props.onUpdateFormStatus(status);
        this._onClose();
    }

    render() {
        const { 
            duration={},
            role,
            title,
            editButtonStatus, 
            uploadedBy,
            uploadedAt,
            notes, 
            rejectionReason,
            selectedFile, 
            fileId,
            status,
            createdBy } = this.props;
        const _startDate = this._getConvertedDate(duration && duration.startDate);
        const _endDate = this._getConvertedDate(duration && duration.endDate);
        const _uploadedAt = this._getConvertedDate(uploadedAt);
        const downloadResumeUrl = `${FILE_API_URL}/${fileId}`;
        return (
            <React.Fragment>
                <div className = 'application-details-status'>
                { 
                    this._getNoteComponent(status)
                } 
                </div>
                <div className = 'application-details'>
                    <div className = 'application-details-heading-content'>
                        <div className='application-details__heading'> 
                            Details 
                        </div>
                        <div> 
                            <span  className = 'application-details-status-heading'>  Status: </span>
                            <div className='application-details-status-details'> 
                                <ApplicationStatus status={status}/> 
                            </div>
                        </div>
                    </div>
                    <div className='application-details__content'>
                        <div className = 'application-details__content__duration-field field'>
                            <div className='application-details__content__uploaded-field__UploadsData field-header'> 
                                <span className='application-details__content__uploaded-field__UploadsData__title'> 
                                    Uploaded By: 
                                </span> 
                                <span className = 'application-details__content__uploaded-field__fiscal-year'> 
                                    {uploadedBy} 
                                </span> 
                            </div> 
                            <div className = 'application-details__content__uploaded-field__UploadsData field-header'> 
                                <span className='application-details__content__uploaded-field__UploadsData__title'> 
                                    Uploaded At: 
                                </span> 
                                <span className = 'application-details__content__uploaded-field__fiscal-year'> 
                                    {_uploadedAt} 
                                </span> 
                            </div>
                        </div> 
                        <div className = 'application-details__content__duration-field field'>
                        {
                            title.displayName === 'Filings' ?
                                <div  className='application-details__content__duration-field__Duartion field-header'>
                                    <span className='application-details__content__duration-field__Duartion__title'> 
                                        Fiscal Year : 
                                    </span> 
                                    <span className='application-details__content__duration-field__fiscal-year'> 
                                        {duration.fiscalYear} 
                                    </span> 
                                </div> :
                                 <React.Fragment>
                                    <div  className='application-details__content__duration-field__Duartion field-header fromDate'>
                                        <span className='application-details__content__duration-field__Duartion__title'>
                                            From :
                                        </span>
                                        <span className='application-details__content__duration-field__start-date'>
                                            {_startDate}
                                        </span> 
                                    </div>
                                    <div  className='application-details__content__duration-field__Duartion field-header'>
                                        <span className='application-details__content__duration-field__Duartion__title'>
                                            To : 
                                        </span>
                                        <span className='application-details__content__duration-field__end-date'>
                                            {_endDate}
                                        </span> 
                                    </div>
                                </React.Fragment>  
                        }
                        </div>
                        <div className='application-details__content__browse-file-field field'>
                            <div className ='application-details__content__browse-file-field__title-filed field-header' >
                                File Name
                            </div>
                            <div className ='application-details__content__browse-file-field__data field-header'>
                                <div className='file-download'>
                                    <div className='span'>{selectedFile}</div>
                                    <a href={downloadResumeUrl} target="_blank" rel='noopener noreferrer' ><div className='icon-download download'></div></a>
                                </div>
                            </div>
                        </div>
                        <div className='application-details__content__note-field field'>
                            <div className ='application-details__content__note-field__title-filed field-header' >
                                Note
                            </div>
                            <div className ='application-details__content__note-field__data'>
                                {notes !== '' ? notes : '-'}
                            </div>
                        </div>
                        <div className = {role === 'super-admin' ? 'application-details-status' : ''}>
                        { 
                            this._getComponentByStatus(status, role, editButtonStatus,createdBy)
                        } 
                        </div>
                        {
                            this.state.showApproveModal ? <ApplicationModal 
                                meassage = "Are you sure you want to approve?"
                                title = "Approve" 
                                showModal = "true"
                                modalName = 'approve'
                                onClose = {this._onClose}
                                onStatusUpdate = {(e) => this.onApproveStatusUpdate(e, 'approved', rejectionReason)}
                                buttons = {[{name:"yes"}, {name : "no"}]}
                            /> : null
                        }
                        {
                            this.state.showRejectModal ? <ApplicationModal 
                                meassage = ""
                                title = "Reject" 
                                showModal = "true"
                                modalName = 'reject'
                                onClose = {this._onClose} 
                                onStatusUpdate = {(e) => this.onRejectStatusUpdate(e, 'rejected', rejectionReason)}
                                buttons = {[{name:"yes"}, {name : "no"}]}
                            /> : null
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default (withRouter(ApplicationDetails));
