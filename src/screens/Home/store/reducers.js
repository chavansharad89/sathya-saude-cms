import Actions from './actions';

const defaultState = {
    categoryDataMetrics:[] ,
    activityList:[],
    filterOptions:[
        {id:1,value:'All' , name:'All',isChecked:true},
        {id:2,value:'Pending', name:'Pending',isChecked:true},
        {id:3,value:'Approved', name:'Approved',isChecked:true},
        {id:4,value:'Rejected', name:'Rejected',isChecked:true},
        {id:5,value: 'Draft', name:'Draft',isChecked:true}
    ] ,
    
    selectedFilterOptions: ['Pending','Approved','Rejected','Draft'],
    tableLoadingStatus:true,
    columns: [
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
            name: 'Date',
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
    uploadHomeLoadingStatus:false,
    loadingHomeDetails: false
}

export default function HomeReducer(state = defaultState, action) {
    let uploadHomeLoadingStatus=false
    switch(action.type) {
        case Actions.ON_UPDATE_HOME_DETAILS:
            if (action.status === false) {
                uploadHomeLoadingStatus = true;
            }
            return {
                ...state,
                categoryDataMetrics: action.data && action.data.categoryDataMetrics,
                activityList: action.data && action.data.recentActivities,
                uploadHomeLoadingStatus:uploadHomeLoadingStatus,
                loadingHomeDetails:action.status
            }
        case Actions.HOME_TABLE_LOADING_STATUS:
            return {
                ...state,
                tableLoadingStatus:action.data
        }
        case Actions.HOME_LOADING_STATUS:
            return {
                ...state,
                uploadHomeLoadingStatus:action.data
        }
        default:
            return state;
    }
}