import Actions from './actions';

const defaultState = {
    excelFormDetails : {
        categoryId: '',
        subCategoryId: '',
        dataUploadId: '',
        durationType:'',
        duration: { 
            startDate: null,
            endDate: null,
            fiscalYear: null
        },
        selectedFile: {
            file: null
        },
        fileId: '',
        notes: '',
        createdBy:null,
        status: '',
        uploadedBy: '',
        uploadedAt: ''
    },
    editButtonStatus : false,
    rejectionReason: '',
    uploadFormDetailsLoaded: false,
    loadingUploadFormDetails: false
}

export default function DetailsFormReducer(state = defaultState, action) {
    let uploadFormDetailsLoaded = false;
    switch(action.type) {
        case Actions.ON_UPLOAD_FORM_DETAILS :
            if (action.status === false) {
           
                uploadFormDetailsLoaded = true;
            }
        
            return {
                ...state,
                loadingUploadFormDetails: action.status,
                uploadFormDetailsLoaded: uploadFormDetailsLoaded,
                excelFormDetails : {
                    ...state.excelFormDetails,
                    categoryId: action.data && action.data.categoryId,
                    subCategoryId: action.data && action.data.subCategoryId,
                    dataUploadId: action.data && action.data.dataUploadId,
                    durationType: action.data && action.data.duration,
                    duration : action.data && action.data.durationValue,
                    selectedFile: { file: action.data && action.data.fileName },
                    fileId: action.data && action.data.fileId,
                    notes: action.data && action.data.notes,
                    status : action.data && action.data.status,
                    uploadedBy: action.data && action.data.userName,
                    uploadedAt: action.data && action.data.createdAt,
                    createdBy:action.data && action.data.createdBy
                },
                rejectionReason: action.data && action.data.reason
            }

            case Actions.ON_DASHBOARD_UPLOADS_VIEW_CLICKED:
                return {
                    ...state,
                    editButtonStatus: action.data,
                    uploadFormDetailsLoaded:false
                }

            case Actions.ON_MODAL_REJECTION_REASON_UPDATE:
                return {
                    ...state,
                    rejectionReason: action.data
                }
                
            case Actions.ON_UPDATE_FORM_STATUS:
                return {
                    ...state,
                    excelFormDetails: {
                        ...state.excelFormDetails,
                        status: action.data
                    }
                }

            case Actions.ON_EDIT_FORM_FISCAL_YEAR_CHANGE :
                return {
                    ...state,
                    excelFormDetails : {
                        ...state.excelFormDetails,
                        duration : {
                            ...state.excelFormDetails.duration,
                            fiscalYear: action.data                    
                        }
                    }
                }
            
            case Actions.ON_EDIT_FORM_DURATION_FROM_CHANGE:
                return {
                    ...state,
                    excelFormDetails : {
                        ...state.excelFormDetails,
                        duration : {
                            ...state.excelFormDetails.duration,
                            startDate: action.data                    
                        }
                    }
                }
            case Actions.ON_EDIT_FORM_DURATION_TO_CHANGE:
                return {
                    ...state,
                    excelFormDetails: {
                        ...state.excelFormDetails,
                        duration : {
                            ...state.excelFormDetails.duration,
                            endDate: action.data
                        }
                    }
                }
            case Actions.ON_EDIT_FORM_NOTE_DETAILS:
                return {
                    ...state,
                    excelFormDetails: {
                        ...state.excelFormDetails,
                        notes: action.data
                    }
                }
            case  Actions.ON_EDIT_FORM_FILE_UPLOAD:
                return {
                    ...state,
                    excelFormDetails: {
                        ...state.excelFormDetails,
                        selectedFile: {
                            ...state.excelFormDetails.selectedFile,
                            file: action.data
                        }
                    }
                }
            case Actions.ON_FILE_UPLOAD_ID:
                return {
                    ...state,
                    excelFormDetails: {
                        ...state.excelFormDetails,
                        uploadedFileId: action.data
                    }
                }
            case  Actions.ON_EDIT_BUTTON_CLICKED:
                return{
                    ...state,
                uploadFormDetailsLoaded:false
                }
        default : 
            return state;
    }
}