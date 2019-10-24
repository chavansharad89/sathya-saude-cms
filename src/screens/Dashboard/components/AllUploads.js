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
import {isSelectedSubmenu} from '../../../shared/Settings/store/dispatchers'
import { onDashboardUploadsViewClicked } from '../screens/Details/store/dispatchers';
import {
    onAlluploadPaginate,
    onAlluploadCheckboxChange,
    uploadlistLoadingStatus,
    onAlluploadsPaginationClicked,
    onAlluploadsChecked,
    AlllistLoadingStatus
} from '../screens/UploadList/store/dispatchers'
import {getUserDetails} from '../../../utils/Authentication'

class AllUploads extends Component {
    onDetailsClicked(){
        const condition = this.props.role=== 'super-admin' ? false : true;
        this.props.onDashboardUploadsViewClicked(condition); 
    }
    render(){
        const accountId =getUserDetails().accountId
        const {tableData=[] ,
            columns,
            match ,
            onAlluploadPaginate,
            pageId,
            pageLimit,
            total,
            menulist,
            AlllistLoadingStatus,
            onAlluploadsChecked,
            onDashboardUploadsViewClicked,
            onAlluploadsPaginationClicked,
            isSelectedSubmenu,
            loadingListDetails,
            onAlluploadCheckboxChange,
            uploadlistLoadingStatus,
            allloadingListDetails,
            initialLoadAllUploadsTotal,
            role,
        }=this.props

        const params =match.params
        const totalPage= Math.ceil(total/pageLimit)
     
        const list = tableData && tableData.map(({
            dataUploadId,
            categoryName,
            subCategoryId,
            categoryId,
            duration,
            userName,
            durationValue,
            createdBy,
            createdAt,
            
            status
            })=>{
                
                return({
                    duration:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}> 
                            <div onClick = {e=>this.onDetailsClicked()}>
                                <ApplicationDurationIdentifier title={categoryName} 
                                    duration={duration} 
                                    durationValue={durationValue}/>
                            </div>
                        </Link>,
                    date: <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}>
                            <div onClick = {e=>this.onDetailsClicked()}> 
                                {convertDate(createdAt, ['mmm','DD', 'YYYY'])} 
                            </div> 
                        </Link>,
                    admin:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}> 
                            <div onClick = {e=>this.onDetailsClicked()}> 
                                {userName}
                            </div>
                        </Link>,   
                    status:  <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}> 
                            <div onClick = {e=>this.onDetailsClicked()}> 
                                <ApplicationStatus status={status}/> 
                            </div>
                        </Link>,
                    action: <ApplicationActionIcons status={status} 
                        id={dataUploadId} 
                        createdBy={createdBy} 
                        accountId={accountId}
                        onIconClicks={this.onActionClicks} 
                        params={params} 
                        role={role} 
                        tableLoadingStatus={AlllistLoadingStatus}/>
                })
        })
        return(
            
            <ApplicationTable
                uploadeButton={false}
                params={params}
                menulist={menulist}
                mainLoadingListDetails={loadingListDetails}
                isSelectedSubmenu={isSelectedSubmenu}
                onDashboardUploadsViewClicked={onDashboardUploadsViewClicked}
                role={role}
                title={ 'All Uploads' }
                list={list}
                columns={columns}
                onPaginate={onAlluploadPaginate} 
                pageId={pageId}
                total={totalPage}
                onAlluploadsChecked={onAlluploadsChecked}
                onAlluploadsPaginationClicked={onAlluploadsPaginationClicked}
                loadingListDetails={allloadingListDetails}
                onCheckboxChange={onAlluploadCheckboxChange}
                initialLoadUploadsTotal={initialLoadAllUploadsTotal}
                tableLoadingStatus={uploadlistLoadingStatus}
               />
        )
    }
}



const mapStateToProps = ({uploadList,setting}) => {
    return {
        role:setting.role,
        menulist:setting.menulist,
        tableData:uploadList.allUploads,
        loadingListDetails:uploadList.loadingListDetails,
        columns:uploadList.allUploadsColumns,
        pageId:uploadList.allUploadsPageId,
        pageLimit:uploadList.pageLimit,
        total:uploadList.allUploadsTotal,
        allloadingListDetails:uploadList.allloadingListDetails,
        initialLoadAllUploadsTotal:uploadList.initialLoadAllUploadsTotal
       
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAlluploadsChecked(){
            dispatch(onAlluploadsChecked())
        },
        onAlluploadsPaginationClicked(){
            dispatch(onAlluploadsPaginationClicked())
        },
        onAlluploadPaginate(value){
            dispatch (onAlluploadPaginate(value))
        },
        onAlluploadCheckboxChange(value){
            dispatch (onAlluploadCheckboxChange(value))
        },
        uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        },
        isSelectedSubmenu(menu,submenu){
            dispatch (isSelectedSubmenu(menu,submenu))
        },
        onDashboardUploadsViewClicked(value) {
            dispatch(onDashboardUploadsViewClicked(value))
        },
        AlllistLoadingStatus(value){
            dispatch(AlllistLoadingStatus(value))
        }
    };
};
    
 export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withApollo(AllUploads)));
