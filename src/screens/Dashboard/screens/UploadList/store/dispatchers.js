import Actions from './actions';

function updateUploadeListDetails(status,values) {
    return {
        type: Actions.ON_UPDATE_UPLODE_LIST_DETAILS,
        data : values,
        status:status
    }
}
function updateMyUploadeListDetails(status,values) {
    return {
        type: Actions.ON_UPDATE_MYUPLODE_LIST_DETAILS,
        data : values,
        status:status
    }
}
function updateAllUploadeListDetails(status,values) {
    return {
        type: Actions.ON_UPDATE_ALLUPLODE_LIST_DETAILS,
        data : values,
        status:status
    }
}
function onMyuploadPaginate(value){
    return{
        type: Actions.ON_MYUPLOAD_PAGINATION,
        data:value
    }
}
function onAlluploadPaginate(value){
    return{
        type: Actions.ON_ALLUPLOAD_PAGINATION,
        data:value
    }
}
function onAlluploadCheckboxChange(value){
    return{
        type:Actions.ON_ALLUPLOAD_CHECKBOX_CHANGE,
        data:value
    }
}
function onMyuploadCheckboxChange(value){
    return{
        type:Actions.ON_MYUPLOAD_CHECKBOX_CHANGE,
        data:value
    }
}
function onPaginationReset(){
    return{
        type:Actions.ON_RESET_PAGINATION
    }
}
function uploadlistLoadingStatus(values) {
    return {
        type: Actions.UPLOAD_TABLE_LOADING_STATUS,
        data : values
    }
}

function MylistLoadingStatus(values) {
    return {
        type: Actions.My_TABLE_LOADING_STATUS,
        data : values
    }
}
function AlllistLoadingStatus(values) {
    return {
        type: Actions.All_TABLE_LOADING_STATUS,
        data : values
    }
}

function onAlluploadsChecked() {
    return {
        type: Actions.ON_ALLUPLOAD_Checked,
    }
}
function onMyuploadsChecked() {
    return {
        type: Actions.ON_MYUPLOAD_Checked,
    }
}
function onAlluploadsPaginationClicked() {
    return {
        type: Actions.ON_ALLUPLOAD_PAGINATION_CLICKED,
    }
}
function onMyuploadsPaginationClicked() {
    return {
        type: Actions.ON_MYUPLOAD_PAGINATION_CLICKED,
    }
}

export{
    updateUploadeListDetails,
    updateMyUploadeListDetails,
    updateAllUploadeListDetails,
    onMyuploadPaginate,
    onAlluploadPaginate,
    onAlluploadCheckboxChange,
    onMyuploadCheckboxChange,
    uploadlistLoadingStatus,
    onPaginationReset,
    MylistLoadingStatus,
    AlllistLoadingStatus,
    onAlluploadsChecked,
    onAlluploadsPaginationClicked,
    onMyuploadsChecked,
    onMyuploadsPaginationClicked,
   
}