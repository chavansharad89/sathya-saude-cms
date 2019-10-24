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
import {
    onMyuploadPaginate,
    onMyuploadCheckboxChange,
    onMyuploadsChecked,
    onMyuploadsPaginationClicked,
    onPaginationReset,
    uploadlistLoadingStatus,
    MylistLoadingStatus
} from '../screens/UploadList/store/dispatchers'
import {isSelectedSubmenu} from '../../../shared/Settings/store/dispatchers';
import { onDashboardUploadsViewClicked } from '../screens/Details/store/dispatchers';

class MyUploads extends Component {
    componentDidMount() {
        this.unlisten =  this.props.history.listen( location =>  {
           this.props.onPaginationReset();
         });
    }
    componentWillUnmount() {
        this.unlisten();

    }
    onDetailsClicked(){
        const condition = this.props.role=== 'super-admin' ? false : true;
        this.props.onDashboardUploadsViewClicked(condition); 
    }
    render(){
        const {tableData=[] ,
            columns,
            match,
            pageId,
            onMyuploadPaginate,
            pageLimit,
            onMyuploadsChecked,
            onMyuploadsPaginationClicked,
            total ,
            myloadingListDetails,
            loadingListDetails,
            MylistLoadingStatus,
            uploadlistLoadingStatus,
            initialLoadMyUploadsTotal,
            onMyuploadCheckboxChange,
            onDashboardUploadsViewClicked,
            isSelectedSubmenu,
            menulist
        }=this.props
        const params =match.params
        const totalPage = Math.ceil(total/pageLimit)
        const list =tableData &&  tableData.map(({
            dataUploadId,
            categoryName,
            duration,
            subCategoryId,
            categoryId,
            userName,
            durationValue,
            createdAt,
            status
            })=>{
                return({
                    duration: <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}>
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
                    status: <Link to={`/menus/${categoryId}/sub-menu/${subCategoryId}/${dataUploadId}/details`}>
                            <div onClick = {e=>this.onDetailsClicked()}>
                                <ApplicationStatus status={status}/>
                            </div>
                        </Link>,
                    action: <ApplicationActionIcons status={status} 
                        id={dataUploadId} 
                        onIconClicks={this.onActionClicks} 
                        params={params}  
                        tableLoadingStatus={MylistLoadingStatus}/>
                })
        })
       
        return(
            
            <ApplicationTable
                title={ 'My Uploads' }
                list={list}
                columns={columns} 
                onPaginate={onMyuploadPaginate} 
                mainLoadingListDetails={loadingListDetails}
                pageId={pageId}
                onMyuploadsChecked={onMyuploadsChecked}
                onMyuploadsPaginationClicked={onMyuploadsPaginationClicked}
                total={totalPage}
                loadingListDetails={myloadingListDetails}
                onCheckboxChange={onMyuploadCheckboxChange}
                initialLoadUploadsTotal={initialLoadMyUploadsTotal}
                tableLoadingStatus={uploadlistLoadingStatus}
                params={params}
                menulist={menulist}
                onDashboardUploadsViewClicked={onDashboardUploadsViewClicked}
                isSelectedSubmenu={isSelectedSubmenu}
                />
        )
    }
}



const mapStateToProps = ({uploadList,setting}) => {
    return {
        role:setting.role,
        menulist:setting.menulist,
        tableData:uploadList.myUploads,
        columns:uploadList.myUploadsColumns,
        loadingListDetails:uploadList.loadingListDetails,
        pageId:uploadList.myUploadsPageId,
        pageLimit:uploadList.pageLimit,
        total:uploadList.myUploadsTotal,
        myloadingListDetails:uploadList.myloadingListDetails,
        initialLoadMyUploadsTotal:uploadList.initialLoadMyUploadsTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMyuploadsChecked(){
         
            dispatch(onMyuploadsChecked())
        },
        onMyuploadsPaginationClicked(){
            dispatch(onMyuploadsPaginationClicked())
        },
        onMyuploadPaginate(value){
            dispatch (onMyuploadPaginate(value))
        }  , 
        onMyuploadCheckboxChange(value){
            dispatch (onMyuploadCheckboxChange(value))
        } ,
        onPaginationReset(){
            dispatch(onPaginationReset())
        }   ,
         uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        },
        isSelectedSubmenu(menu,submenu){
            dispatch (isSelectedSubmenu(menu,submenu))
        },
        onDashboardUploadsViewClicked(value) {
            dispatch(onDashboardUploadsViewClicked(value))
        }  ,
        MylistLoadingStatus(value){
            dispatch (MylistLoadingStatus(value))
        }
    };
};
    
 export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withApollo(MyUploads)));
