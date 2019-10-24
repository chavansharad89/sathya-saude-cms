import React, { Component } from 'react';
import ApplicationFormLayout from '../../../../helpers/ApplicationFormLayout';
import UploadForm from './components/UploadForm';
import { withRouter } from 'react-router-dom';

 class Main extends Component {
    
    render() {
        return (
            <React.Fragment>
                <ApplicationFormLayout title = {'Details'}>
                    <UploadForm />
                </ApplicationFormLayout>
            </React.Fragment>
        );
    }
}
export default (withRouter(Main))