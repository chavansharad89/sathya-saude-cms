import Actions from './actions';

export function onCategoryAndSubCategoryIdChange(menuId, subMenuId) {
    return {
        type: Actions.ON_UPDATE_CATEGORY_AND_SUBCATEGORY_ID_CHANGE,
        data: { menuId: menuId, subMenuId: subMenuId }
    }
}

export function onUploadFormDurationFromChange(values) {
    return {
        type: Actions.ON_UPLOAD_FORM_DURATION_FROM_CHANGE,
        data: values
    }
}

export function onUploadFormDurationToChange(values) {
    return {
        type: Actions.ON_UPLOAD_FORM_DURATION_TO_CHANGE,
        data: values
    }
}

export function onUploadFormCaseTypeChange(values) {
    return {
        type: Actions.ON_UPLOAD_FORM_CASE_TYPE_CHANGE,
        data : values
    }
}

export function onUploadFormFiscalYearChange(values) {
    return {
        type: Actions.ON_UPLOAD_FORM_FISCAL_YEAR_CHANGE,
        data:values
    }
}

export function onUploadFormFileUpload(values) {
    return {
        type: Actions.ON_UPLOAD_FORM_FILE_UPLOAD,
        data: values
    }
}

export function onFileUploadId(values) {
    return {
        type: Actions.ON_FILE_UPLOAD_ID,
        data : values
    }
}

export function onUploadFormNoteDetailsChange(values) {
  
    return {
        type : Actions.ON_UPLOAD_FORM_NOTE_DETAILS,
        data: values
    }
}
export function resetForm(){
    return {
        type : Actions.RESET,
    }
}