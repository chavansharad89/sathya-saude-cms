import React ,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import ApplicationTable from '../../../helpers/ApplicationTable'
import ApplicationDurationIdentifier from '../../../helpers/ApplicationDurationIdentifier'
import ApplicationStatus from '../../../helpers/ApplicationStatus'
import ApplicationActionIcons from '../../../helpers/ApplicationActionIcons'
import {convertDate} from '../../../utils/DateFormat'
import {HomeLoadingStatus} from  '../store/dispatchers'
import {getUserDetails} from '../../../utils/Authentication'
import {isSelectedSubmenu} from '../../../shared/Settings/store/dispatchers'
import { onDashboardUploadsViewClicked } from '../../Dashboard/screens/Details/store/dispatchers';
import Loader from '../../../helpers/Loader/Loader'


class HomeTable extends Component {
   onDetailsClicked(params,dataUploadId){
        const {menulist,role}=this.props
        const { menuId, subMenuId } = params;
        const menu = this.findData(menulist,menuId)
        const subMenu = this.findData(menu.children,subMenuId);
        const condition = role === 'super-admin' ? false : true;
        this.props.isSelectedSubmenu(menu,subMenu)
        this.props.onDashboardUploadsViewClicked(condition); 
       
      
   }
   findData(list,id) {
    return list && list.find((menu) => {
        return  id === (menu.id.toString())
    })
}
    render(){
        const {tableData = [] ,
            columns,
            role,
            loadingHomeDetails,
            menulist,
            HomeLoadingStatus }=this.props
            
        const accountId =getUserDetails().accountId
        const list = tableData && tableData.map(({
            dataUploadId,
            categoryName,
            subCategoryId,
            categoryId,
            duration,
            userName,
            durationValue,
            createdAt,
            createdBy,
            status,
            menulist

            })=>{
                const params={menuId:categoryId.toString(),subMenuId:subCategoryId.toString()}
                return({
                    duration:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}> 
                            <div onClick = {e=>this.onDetailsClicked(params,dataUploadId)}>
                                <ApplicationDurationIdentifier title={categoryName} 
                                    duration={duration} 
                                    durationValue={durationValue} 
                                    titleValue={true}/> 
                            </div>
                            </Link>,
                       
                    admin: <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}> 
                            <div onClick = {e=>this.onDetailsClicked(params,dataUploadId)}> 
                                {userName } {}
                            </div> 
                        </Link>,
                    date:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}>
                            <div onClick = {e=>this.onDetailsClicked(params,dataUploadId)}> 
                                {convertDate(createdAt, ['mmm','DD', 'YYYY'])} 
                            </div> 
                        </Link>,
                    status:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}>
                            <div onClick = {e=>this.onDetailsClicked(params,dataUploadId)}> 
                                <ApplicationStatus status={status}/> 
                            </div> 
                        </Link>,
                    action: <ApplicationActionIcons status={status} 
                        createdBy={createdBy} 
                        accountId={accountId} 
                        id={dataUploadId} 
                        onIconClicks={this.onActionClicks} 
                        params={params}  
                        home={true} 
                        role={role} 
                        tableLoadingStatus={HomeLoadingStatus}/>
                })
        })
        return(
            loadingHomeDetails?<Loader/>
            :
            <ApplicationTable
                uploadeButton ={false}
                pagination = {false}
                filters ={ false }
                title={ 'recent activities' }
                list={list}
                columns={columns}
                HomeLoadingStatus={HomeLoadingStatus}
                role={role}
                menulist={menulist}
            />
        )
    }
}



const mapStateToProps = ({home,setting,login}) => {
    return {
        loadingHomeDetails:home.loadingHomeDetails,
        accountId:login.accountId,
        role:setting.role,
        menulist:setting.menulist,
        uploadeCounts:home.categoryDataMetrics,
        tableData:home.activityList,
        columns:home.columns,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        HomeLoadingStatus(value){
        
            dispatch(HomeLoadingStatus(value))
        },
        isSelectedSubmenu(menu,submenu){
            dispatch (isSelectedSubmenu(menu,submenu))
        },
        onDashboardUploadsViewClicked(value) {
           
            dispatch(onDashboardUploadsViewClicked(value))
        }
    };
};
    
 export default connect(mapStateToProps,mapDispatchToProps)(withApollo(withRouter(HomeTable)));
