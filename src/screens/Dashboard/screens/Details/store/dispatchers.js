import Actions from './actions';

export function onUploadFormDetails(status,value) {
    return {
        type: Actions.ON_UPLOAD_FORM_DETAILS,
        status: status,
        data : value
    }
}
export function onModalRejectionReasonUpdate(reason) {
    return {
        type: Actions.ON_MODAL_REJECTION_REASON_UPDATE,
        data: reason
    }
} 

export function onDashboardUploadsViewClicked(value) {
    return {
        type: Actions.ON_DASHBOARD_UPLOADS_VIEW_CLICKED,
        data: value
    }
}  

export function onUpdateFormStatus(values) {
    return {
        type: Actions.ON_UPDATE_FORM_STATUS,
        data: values
    }
}

export function onEditFormFiscalYearChange(values) {
    return {
        type: Actions.ON_EDIT_FORM_FISCAL_YEAR_CHANGE,
        data: values
    }
}

export function onEditFormDurationFromChange(values) {
    return {
        type: Actions.ON_EDIT_FORM_DURATION_FROM_CHANGE,
        data: values
    }
}

export function onEditFormDurationToChange(values) {
    return {
        type: Actions.ON_EDIT_FORM_DURATION_TO_CHANGE,
        data: values
    }
}
export function onEditFormFileUpload(values) {
    return {
        type: Actions.ON_EDIT_FORM_FILE_UPLOAD,
        data: values
    }
}

export function onFileUploadId(values) {
    return {
        type: Actions.ON_FILE_UPLOAD_ID,
        data : values
    }
}

export function onEditFormNoteDetailsChange(values) {
    return {
        type : Actions.ON_EDIT_FORM_NOTE_DETAILS,
        data: values
    }
}
export function onEditButtonClicked() {
    return {
        type : Actions.ON_EDIT_BUTTON_CLICKED,
    }
}
