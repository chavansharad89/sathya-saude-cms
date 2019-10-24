import Actions from './actions';

const defaultState = {
    myUploads:[] ,
    allUploads:[],
    initialLoadMyUploadsTotal: null,
    initialLoadAllUploadsTotal:null,
    allUploadsPageId:1,
    myUploadsPageId:1,
    pageLimit:5,
    allUploadsTotal:null,
    myUploadsTotal:null,

    allUploadstatus:[],
    myUploadstatus:[],
    myUploadsColumns: [
        {
            name: 'Duration',
            key: 'duration',
            className: 'width-40'
        },
        {
            name: 'Uploaded',
            key: 'date',
            className: 'width-20'
        },
        {
            name: 'Status',
            key: 'status',
            className: 'width-20'
        },
        {
            name: 'Actions',
            key: 'action',
            className: 'action-width'
        }

    ],
    allUploadsColumns: [
        {
            name: 'Duration',
            key: 'duration',
            className: 'width-30'
        },
        {
            name: 'Admin',
            key: 'admin',
            className: 'width-20'
        },
        {
            name: 'Uploaded',
            key: 'date',
            className: 'width-20'
        },
        {
            name: 'Status',
            key: 'status',
            className: 'width-20'
        },
        {
            name: 'Actions',
            key: 'action',
            className: 'action-width'
        }
    ],
    uploadsLoadingStatus:false,
    loadingListDetails: false,

    alluploadsLoadingStatus:true,
    allloadingListDetails: false,
    myuploadsLoadingStatus:true,
    myloadingListDetails: false,

    allUploadsCheckBoxClicked:false,
    allUploadsPaginate:false,
    myUploadsCheckBoxClicked :false,
    myUploadsPaginate:false
    
}

export default function UploadListReducer(state = defaultState, action) {
    let uploadsLoadingStatus = false;
    switch(action.type) {
        case Actions.ON_UPDATE_UPLODE_LIST_DETAILS:
            if (action.status === false) {
                uploadsLoadingStatus = true;
            }
            return {
                ...state,
                myUploads: action.data && action.data.myUploads.activityList ,
                allUploads:action.data && action.data.allUploads.activityList,
                allUploadsTotal :action.data && action.data.allUploads.totalCount,
                myUploadsTotal : action.data &&  action.data.myUploads.totalCount,
                initialLoadMyUploadsTotal: action.data &&  action.data.myUploads.totalCount,
                initialLoadAllUploadsTotal: action.data && action.data.allUploads.totalCount,

                uploadsLoadingStatus:uploadsLoadingStatus,
                loadingListDetails:action.status,
                myloadingListDetails:action.status,
                allloadingListDetails:action.status,

                allUploadsCheckBoxClicked:false,
                allUploadsPaginate:false,
                myUploadsCheckBoxClicked :false,
                myUploadsPaginate:false
                // allUploadsCheckBoxClicked:false
            }
        
        case Actions.ON_UPDATE_MYUPLODE_LIST_DETAILS:
              
            let myuploadsLoadingStatus = false;
            if (action.status === false) {
               
                myuploadsLoadingStatus = true;
            }
            return {
                ...state,
                myUploads: action.data && action.data.myUploads.activityList ,
                myUploadsTotal : action.data &&  action.data.myUploads.totalCount,

                myuploadsLoadingStatus:myuploadsLoadingStatus,
                myloadingListDetails:action.status,

                myUploadsCheckBoxClicked:false,
                myUploadPaginate:false
            }
        case Actions.ON_UPDATE_ALLUPLODE_LIST_DETAILS:
               
            let alluploadsLoadingStatus=false
            if (action.status === false) {
                alluploadsLoadingStatus = true;
            }
            return {
                ...state,
                allUploads:action.data && action.data.allUploads.activityList,
                allUploadsTotal :action.data && action.data.allUploads.totalCount,

                alluploadsLoadingStatus:alluploadsLoadingStatus,
                allloadingListDetails:action.status,

                allUploadsCheckBoxClicked:false,
                allUploadsPaginate:false
            }

        case Actions.ON_ALLUPLOAD_PAGINATION:
            return{
                ...state,
                allUploadsPageId:action.data,
                alluploadsLoadingStatus:false,
            }
        case Actions.ON_RESET_PAGINATION:
            return{
                ...state,
                allUploadsPageId:1,
                myUploadsPageId:1,
            }
        case Actions.ON_MYUPLOAD_PAGINATION:
            return{
                ...state,
                myUploadsPageId:action.data,
                myuploadsLoadingStatus:false,
                // loadingListDetails:action.status
            }
        case Actions.ON_ALLUPLOAD_CHECKBOX_CHANGE:
            return{
                ...state,
                allUploadstatus:action.data, 
                
                // allUploadsCheckBoxClicked:true
            }
        case Actions.ON_MYUPLOAD_CHECKBOX_CHANGE:
                
            return{
                ...state,
                myUploadstatus:action.data,
            }
        case Actions.UPLOAD_TABLE_LOADING_STATUS:
            const status = action.data ? false : true
            return {
                ...state,
                uploadsLoadingStatus:status,
        }
        case Actions.All_TABLE_LOADING_STATUS:
            return {
                ...state,
                alluploadsLoadingStatus:action.data,
        }
        case Actions.My_TABLE_LOADING_STATUS:
            return {
                ...state,
                myuploadsLoadingStatus:action.data,
        }
        case Actions.ON_ALLUPLOAD_Checked:
            return{
                ...state,
                allUploadsCheckBoxClicked:true,
                allUploadsPageId:1,
                alluploadsLoadingStatus:false
            }
        case Actions.ON_MYUPLOAD_Checked:
        return{
            ...state,
            myUploadsCheckBoxClicked:true,
            myUploadsPageId:1,
            myuploadsLoadingStatus:false
        }
        case Actions.ON_MYUPLOAD_PAGINATION_CLICKED:
        return{
            ...state,
            myUploadsPaginate:true,
            myuploadsLoadingStatus:false
        }
        case Actions.ON_ALLUPLOAD_PAGINATION_CLICKED:
        return{
            ...state,
            allUploadsPaginate:true,
            alluploadsLoadingStatus:false
        }
        default:
            return state;
    }
}