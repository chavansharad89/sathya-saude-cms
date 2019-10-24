import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  find } from 'ramda';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Toastr from '../../utils/Toastr';
import gql from 'graphql-tag';
import ApplicationTooltip from '../ApplicationTooltip'
import ApplicationModal from '../ApplicationModal'
import { isSelectedSubmenu } from '../../shared/Settings/store/dispatchers';
import {uploadlistLoadingStatus} from  '../../screens/Dashboard/screens/UploadList/store/dispatchers'
import { onDashboardUploadsViewClicked } from '../../screens/Dashboard/screens/Details/store/dispatchers';
import { onUpdateFormStatus,onEditButtonClicked } from '../../screens/Dashboard/screens/Details/store/dispatchers';
import './index.scss';

class actions extends Component {
    constructor(props) {
        super(props);
        this._delete = this._delete.bind(this)
        this._onClose  = this._onClose.bind(this)
        this.onActionClicks = this.onActionClicks.bind(this)
        this.state = {
            deleteModal: false,
            onEdit: false,
            activityId: '',
            showApproveModal : false,
            showRejectModal : false
        }
        this._onClose = this._onClose.bind(this);
    }

    _onClose() {
        this.setState({
            deleteModal: false,
            showApproveModal: false,
            showRejectModal: false
        })
    }

    onModalApprove(e) {
        this.setState({
            showApproveModal: true,
            showRejectModal: false
        })
    }

    onModalReject(e) {
        this.setState({
            showApproveModal: false,
            showRejectModal: true
        })
    }

    onActionClicks(type, activityId,e) {
        if(type === "delete") {
            this.setState({
                deleteModal: true,
                activityId: activityId
            })  
        }
        if(type === "edit") {
            this.setState({
                onEdit: true,
                activityId: activityId
            })
            this._onEditClicked(activityId)
        }
        if(type === "preview") {
            this.setState({
                activityId: activityId
            })
           this._onPreviewClicked(activityId)
        }
        if(type === "accept") {
            this.setState({
                activityId: activityId
            })
            this.onModalApprove(e)
        }
        if(type === "reject") {
            this.setState({
                activityId: activityId
            })
            this.onModalReject(e)
        }

    }

    getDeleteMutationGql() {
        return `mutation deleteActivity ($dataUploadId: Int) {
            deleteActivity(dataUploadId: $dataUploadId) {
                dataUploadId
            }
        }`
    }  

    _delete() {
        const { id } = this.props;
        const client = this.props.client;
        const _gql = this.getDeleteMutationGql();  

        client.mutate({
            mutation: gql`${_gql}`,
            variables: {
                'dataUploadId': parseInt(id)
            }
        }).then(() => {
            this.props.tableLoadingStatus(false)
            Toastr.success("Deleted Successlly");    
        })
        .catch(err => {
            Toastr.error(err);
        });
        this._onClose();
    }

    _onPreviewClicked() {
        // const { params,menulist, onDashboardUploadsViewClicked } = this.props;
        // const { menuId, subMenuId } = params;
        // const menu = this.findData(menulist,menuId)
        // const subMenu = this.findData(menu.children,subMenuId);
        // const condition = this.props.role === 'super-admin' ? false : true;
        // this.props.home && (this.props.isSelectedSubmenu(menu,subMenu));   
        // onDashboardUploadsViewClicked(condition); 
    }

    _onEditClicked(id) {
        const { menulist ,params} = this.props;
        const { menuId, subMenuId } = params;
        const menu = this.findData(menulist,menuId)
         const subMenu = this.findData(menu.children,subMenuId);
         this.props.home && (this.props.isSelectedSubmenu(menu,subMenu));
        this.props.onEditButtonClicked();
        this.props.history.push(`/menus/${menuId}/sub-menu/${subMenuId}/${id}/edit`);
    }

    findData(list,id) {
       
        return list && list.find((menu) => {
            return  id === (menu.id.toString())
        })
    }
    getMutationGql() {
        return `mutation updateActivityStatus($status: String, $dataUploadId: Int, $reason: String) {
            updateActivityStatus(status: $status, dataUploadId: $dataUploadId, reason: $reason) {
                dataUploadId
            }
        }`
    }  

    onApproveStatusUpdate(e, status, _reason) {
        const { id } = this.props;
        const client = this.props.client;
        const _gql = this.getMutationGql();    
        
        const reason =  status !== "rejected" ? null : _reason;
        client.mutate({
            mutation: gql`${_gql}`,
            variables: {
                'dataUploadId': parseInt(id),
                'status': status,
                'reason' : reason
            }
        }).then(() => {
            Toastr.success("Approved successfully");  
            this.props.tableLoadingStatus(false)
        })
        .catch(err => {
            Toastr.error(err);
        });
        this.props.onUpdateFormStatus(status);
        this._onClose();
    }

    onRejectStatusUpdate(e, status, _reason) {
        const { id } = this.props;
        const client = this.props.client;
        const _gql = this.getMutationGql();    
        const reason =  status !== "rejected" ? null : _reason;

        client.mutate({
            mutation: gql`${_gql}`,
            variables: {
                'dataUploadId': parseInt(id),
                'status': status,
                'reason' : reason
            }
        }).then(() => {
            this.props.onUpdateFormStatus(status);
            Toastr.error("Request Rejected");  
            this.props.tableLoadingStatus(false) 
        })
        .catch(err => {
            Toastr.error(err);
        });
        this._onClose();
    }
    
    render(){
        const { deleteModal } = this.state
        const { status,
            id, 
            params, 
            role = 'admin', 
            rejectionReason ,
            createdBy,
            accountId } = this.props;
        const { menuId, subMenuId } = params
        const adminExdcludeOptions = status === 'approved'|| status === 'rejected' || !(accountId === createdBy) ? ['edit','delete']:[];
        const superAdminExcludeOptions = status === 'approved'|| status === 'rejected' ? ['accept','reject'] : []; 
        let exdcludeOptions ;
        if( role === 'admin'){
            exdcludeOptions = adminExdcludeOptions
        } else{
            exdcludeOptions = superAdminExcludeOptions;
        }
        const adminOptions = [
            { 
                name:"preview",
                icon:"icon-eye preview" 
            },
            { 
                name:"edit",
                icon:"icon-pencil edit" 
            },
            { 
                name:"delete",
                icon:"icon-trash delete" 
            }
        ];
        const superAdminOptions = [
            { 
                name:"preview",
                icon:"icon-eye preview" 
            },
            { 
                name:"accept",
                icon:"icon-check accept" 
            },
            { 
                name:"reject",
                icon:"icon-cancel reject" 
            }
        ];

        const options= role === 'admin' ? adminOptions : superAdminOptions;
        const filteredOptions = options.reduce((accumlator, option) => {
            const excludedOption = find(excludeOption => excludeOption === option.name)(exdcludeOptions);
            if (!excludedOption) {
                return accumlator.concat([option]);
            } else {
                return accumlator;
            }
        }, []);
        
        return(
            <div className= 'action-icons'>
            {   
                filteredOptions.map(({icon, name}, index) => {
                    return (
                        <div  key={index} >
                            {
                                name === 'preview'?
                                    // <Link to={`/menus/${menuId}/sub-menu/${subMenuId}/${id}/details`}>
                                        <span  
                                            className = {`${icon} ${name}-hover`} 
                                            onClick = {e=>this.onActionClicks(name ,id)}>
                                                <ApplicationTooltip value={name} />
                                        </span>
                                    // </Link>
                                : name === 'edit'?
                                    <Link to={`/menus/${menuId}/sub-menu/${subMenuId}/${id}/edit`}>
                                        <span  
                                            className = {`${icon} ${name}-hover`} 
                                            onClick = {e=>this.onActionClicks(name ,id)}>
                                                <ApplicationTooltip value={name} />
                                        </span>
                                    </Link>
                                :   <span  
                                        className = {`${icon} ${name}-hover`} 
                                        onClick = {e=>this.onActionClicks(name ,id,e)}>
                                            <ApplicationTooltip value={name} />
                                    </span>
                            }
                            
                        </div>
                    )
                })
            }
            {
                deleteModal ? <ApplicationModal
                    meassage = "Are you sure you want to delete your data ?"
                    title = "delete data"
                    showModal = "true"
                    modalName = 'approve'
                    onClose = {this._onClose}
                    onDelete = {this._delete}
                    buttons = {[{ name: "delete" }, { name: "cancel" }]} /> : null
            }
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
        );
    }
}
const mapStateToProps = ({setting, detailsForm}) => {
    return {
        menulist: setting.menulist,
        rejectionReason: detailsForm.rejectionReason
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        isSelectedSubmenu(menu,subMenu){
            dispatch (isSelectedSubmenu(menu,subMenu))
        },
        onDashboardUploadsViewClicked(value) {
            dispatch(onDashboardUploadsViewClicked(value))
        },
        onUpdateFormStatus(status) {
            dispatch(onUpdateFormStatus(status))
        },
        onEditButtonClicked(){
            dispatch(onEditButtonClicked())
        },
        uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)( withRouter(withApollo(actions)));