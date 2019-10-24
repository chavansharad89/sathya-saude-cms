import React ,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import ApplicationHorizontalCheckbox from '../ApplicationHorizontalCheckbox'
import ApplicationTabularView from '../ApplicationTabularView';
import ApplicationPagination from '../ApplicationPagination';
import ApplicationUploadButton from '../ApplicationUploadButton'
import Loader from '../Loader/Loader'
import './index.scss'

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    
    render() {
        const {
            title, 
            list,
            columns,
            uploadeButton = true,
            pagination = true,
            filters = true ,
            match,
            onPaginate,
            loadingListDetails,
            pageId,
            onAlluploadsChecked,
            initialLoadUploadsTotal,
            onAlluploadsPaginationClicked,
            onMyuploadsChecked,
            onMyuploadsPaginationClicked,
            total,
            onCheckboxChange,
            role='admin',
            tableLoadingStatus
           } = this.props;
        
        const hidePagination=(this.props.list && this.props.list.length) > 0 ? true:false
        return (
            <div className='table'>
                <div className='table__header'>
                    {title}
                    {uploadeButton && <ApplicationUploadButton id={match.params} />}
                </div>
                <div className='table__Data'>
                    {
                        (filters && initialLoadUploadsTotal ) ? <div className='table__filters'>
                            <ApplicationHorizontalCheckbox onMyuploadsChecked ={onMyuploadsChecked} onAlluploadsChecked = {onAlluploadsChecked} onCheckboxChange={onCheckboxChange} list={list} role={role} tableLoadingStatus={tableLoadingStatus}/>
                        </div>:''
                    }
                    {
                        (loadingListDetails ) ? 
                            <React.Fragment>
                                <Loader/>   
                            </React.Fragment>
                            :
                            <ApplicationTabularView values={ list } 
                            columns={ columns } />
                    }
                    
                    {   
                        (pagination && hidePagination && !loadingListDetails) && 
                            <ApplicationPagination 
                                onPaginate={onPaginate} 
                                onAlluploadsPaginationClicked={onAlluploadsPaginationClicked}
                                onMyuploadsPaginationClicked={onMyuploadsPaginationClicked}
                                pageId={pageId} 
                                total={total}/> 
                    }
                </div>
            </div>
        )
    }
}

export default (withRouter(TableData))