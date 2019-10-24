import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ApplicationHeader from'../../helpers/ApplicationHeader'
import ApplicatonPageLayout from '../../helpers/ApplicationPageLayout'
import ApplicationNavPageTitle from '../../helpers/ApplicationNavPageTitle'
import ApplicationNavigation from '../../helpers/ApplicationNavigation'
import ApplicationStickyFooter from '../../helpers/ApplicationStickyFooter'
import ApplicationFooter from '../../helpers/ApplicationFooter'
import DashboardDetails from './screens/Details';
import DashboardUploadForm from './screens/UploadForm';
import EditForm from './screens/EditPage'
import Settings from'../../shared/Settings'
import GetDashboardDetails from './components/GetDashboardDetails'
import { isSelectedSubmenu } from '../../shared/Settings/store/dispatchers'
import  UploadList from '../Dashboard/screens/UploadList'
import './index.scss'; 

class Dashboard extends Component {
    render() {
        const { match,history } = this.props;
        return (
            <React.Fragment>
                <ApplicationHeader/>
               
                <ApplicationNavigation history={history}/>
                <ApplicationNavPageTitle/>
                <Settings/>
                <GetDashboardDetails/>
                <ApplicatonPageLayout> 
                    <Route path = {`${match.path}`} component ={UploadList} exact />  
                    <Route path = { `${match.path}/:id/details` } component ={DashboardDetails} exact />
                    <Route path = { `${match.path}/:id/edit` } component ={EditForm} exact />
                    <Route path = {`${match.path}/upload` } component = {DashboardUploadForm} exact />    
                </ApplicatonPageLayout>
                <ApplicationStickyFooter>
                    <ApplicationFooter/>
                </ApplicationStickyFooter>
               
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = ({setting}) => {
    return {
        menulist:setting.menulist
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isSelectedSubmenu(menu,submenu){
            dispatch(isSelectedSubmenu(menu,submenu))
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)((Dashboard))