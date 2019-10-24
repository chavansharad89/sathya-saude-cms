import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo'
import ApplicationHeader from'../../helpers/ApplicationHeader'
import ApplicatonPageLayout from '../../helpers/ApplicationPageLayout'
import ApplicationUploadsCount from '../../helpers/ApplicationUploadsCount'
import ApplicationPageTitle from'../../helpers/ApplicationPageTitle'
import ApplicationFooter from'../../helpers/ApplicationFooter'
import ApplicationStickyFooter from'../../helpers/ApplicationStickyFooter'
import GetHomeDetails from './components/GetHomeDetails'
import HomeTable from  './components/HomeTable'
import {
    tableLoadingStatus
} from './store/dispatchers';
import Settings from'../../shared/Settings'
import Loader from '../../helpers/Loader/Loader'
import './index.scss';




class Main extends Component {
   
    render() {
      
        const {uploadsData ,
            menuList ,
            loadingHomeDetails}=this.props
        return (
            <React.Fragment>
                <ApplicationHeader/>
                <ApplicationPageTitle dropdown={true} />
                <GetHomeDetails/>
                <Settings />
                <ApplicatonPageLayout> 
                {
                    loadingHomeDetails?
                        <Loader/>   
                    :
                        <div className='home'>
                            <ApplicationUploadsCount uploadsData={uploadsData} menuList={menuList}/>   
                            <HomeTable />
                        </div>
                        
                }
                </ApplicatonPageLayout>
                <ApplicationStickyFooter>
                    <ApplicationFooter/>
                </ApplicationStickyFooter>
            </React.Fragment>
           
        );
    }
}


const mapStateToProps = ({home,setting,login}) => {
   
    return {
        loadingHomeDetails:home.loadingHomeDetails,
        accountId:login.accountId,
        uploadsData:home.categoryDataMetrics,
        tableLoadingStatus:home.tableLoadingStatus,
        menuList:setting.menulist
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        tableLoadingStatus(data) {
            dispatch(tableLoadingStatus(data));
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withApollo(Main));