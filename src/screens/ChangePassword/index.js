import React, { Component } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import ApplicationHeader from '../../helpers/ApplicationHeader'
import ApplicationNavigation from '../../helpers/ApplicationNavigation'
import ApplicationPageLayout from '../../helpers/ApplicationPageLayout'
import ApplicationPageTitle from '../../helpers/ApplicationPageTitle'
import ApplicationFooter from '../../helpers/ApplicationFooter'
import ApplicationStickyFooter from '../../helpers/ApplicationStickyFooter'
import Settings from '../../shared/Settings'
import ApplicationFormLayout from '../../helpers/ApplicationFormLayout';


export default class ChangePassword extends Component {
    render() {
        return (
            <React.Fragment>
                <ApplicationHeader/>
                <ApplicationNavigation history={this.props.history}/>
                <ApplicationPageTitle dropdown={true} title={'Change Password'}/>
                <Settings/>
                <ApplicationPageLayout> 
                    <ApplicationFormLayout>
                        <ChangePasswordForm />
                    </ApplicationFormLayout>
                </ApplicationPageLayout>
                <ApplicationStickyFooter>
                     <ApplicationFooter/>
                </ApplicationStickyFooter>
            </React.Fragment>   
        );
    }
}