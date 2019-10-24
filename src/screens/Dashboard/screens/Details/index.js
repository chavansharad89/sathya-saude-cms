import React, { Component } from 'react';
import ApplicationDetailsSection from '../../../../helpers/ApplicationDetailsSection';
import DetailsGetQuery from '../Details/components/DetailsGetQuery';
import { onUpdateFormStatus, onEditButtonClicked,onDashboardUploadsViewClicked } from '../Details/store/dispatchers';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import Loader from '../../../../helpers/Loader/Loader'

 class Details extends Component {
    componentDidMount(){
        window.onpopstate  = (e) => {
            const {match,role,onDashboardUploadsViewClicked} = this.props
            const {isExact} = match
            const condition = role=== 'super-admin' ? false : true;
            if(isExact){
                onDashboardUploadsViewClicked(condition);
            }
        }
    }
    render() {
        const {excelFormDetails, 
            match, 
            role, 
            client, 
            title,
            editButtonStatus, 
            rejectionReason, 
            uploadedBy, 
            uploadedAt,     
            loadingUploadFormDetails,
            onEditButtonClicked } = this.props;
        return (
            <React.Fragment>
                <DetailsGetQuery id={match.params.id}/>
                {
                    loadingUploadFormDetails ?
                        <Loader/>
                    :
                        <ApplicationDetailsSection 
                            match = {match}
                            client = {client}
                            role = {role}
                            title = {title}
                            uploadedBy = {uploadedBy}
                            uploadedAt = {uploadedAt}
                            onEditButtonClicked = {onEditButtonClicked}
                            rejectionReason = {rejectionReason}
                            editButtonStatus = {editButtonStatus}
                            onUpdateFormStatus = {onUpdateFormStatus}
                            duration= {excelFormDetails.duration}
                            durationType = {excelFormDetails.durationType}
                            notes = {excelFormDetails.notes}
                            selectedFile = {excelFormDetails.selectedFile.file}
                            status = {excelFormDetails.status}
                            createdBy = {excelFormDetails.createdBy}  
                            fileId={excelFormDetails.fileId} 
                        />
                }
                
            </React.Fragment>
        )
    }
}


const mapStateToProps = ({detailsForm, setting}) => {
    return {
        menulist:setting.menulist,
        role: setting.role,
        uploadedBy: detailsForm.excelFormDetails.uploadedBy,
        uploadedAt: detailsForm.excelFormDetails.uploadedAt,
        excelFormDetails: detailsForm.excelFormDetails,
        editButtonStatus: detailsForm.editButtonStatus,
        rejectionReason: detailsForm.rejectionReason,
        title: setting.title,
        loadingUploadFormDetails:detailsForm.loadingUploadFormDetails
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onEditButtonClicked(){
            dispatch(onEditButtonClicked())
        },
        onUpdateFormStatus(status) {
            dispatch(onUpdateFormStatus(status))
        },
        onDashboardUploadsViewClicked(condition){
            dispatch(onDashboardUploadsViewClicked(condition))
        }
    };
}

const DetailsWithApollo = withApollo(Details);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailsWithApollo));
