import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ApplicationFormLayout from '../../../../helpers/ApplicationFormLayout';
import DetailsGetQuery from '../Details/components/DetailsGetQuery';
import Editform from './components/Editform';
import {onDashboardUploadsViewClicked }from '../Details/store/dispatchers'
import Loader from '../../../../helpers/Loader/Loader'
class EditPage extends Component {
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

    render(){
        const {match, 
            uploadFormDetailsLoaded,
            loadingUploadFormDetails} = this.props
        return (
            <ApplicationFormLayout>
               <DetailsGetQuery id={match.params.id}/>
               {
                   uploadFormDetailsLoaded ? 
                        loadingUploadFormDetails?
                            <Loader/>  
                        :
                            <Editform/> 
                    : null
               }
            </ApplicationFormLayout>
        );
    }
}



const mapStateWithProps = ({ detailsForm ,setting}) => {
    return {
        role: setting.role,
        uploadFormDetailsLoaded: detailsForm.uploadFormDetailsLoaded,
        loadingUploadFormDetails:detailsForm.loadingUploadFormDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDashboardUploadsViewClicked(value){
            dispatch(onDashboardUploadsViewClicked(value))
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps)(withRouter(EditPage));
