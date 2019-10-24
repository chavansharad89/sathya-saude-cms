import Actions from './actions';

function updateDetails(status,values) {
    return {
        type: Actions.ON_UPDATE_HOME_DETAILS,
        data : values,
        status:status
    }
}
function tableLoadingStatus(values) {
    return {
        type: Actions.HOME_TABLE_LOADING_STATUS,
        data : values
    }
}
function HomeLoadingStatus(values) {
    return {
        type: Actions.HOME_LOADING_STATUS,
        data : values
    }
}

export{
    updateDetails,
    tableLoadingStatus,
    HomeLoadingStatus
}