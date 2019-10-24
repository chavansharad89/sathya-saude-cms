import Actions from './actions';

const defaultState = {
    uploadFormDetails: {
        categoryId: '',
        subCategoryId:'',
        duration: {
            startDate: null,
            endDate: null,
            fiscalYear: null
        },
        selectedFile: {
            file: null
        },
        fileId: '',
        notes: ''
    },

    fiscalYearOptions: [
        {fiscalYearId: 1, value: '2018', name: 'fiscalyear'},
        {fiscalYearId: 2, value: '2017', name: 'fiscalyear'},
        {fiscalYearId: 3, value: '2016', name: 'fiscalyear'},
        {fiscalYearId: 4, value: '2015', name: 'fiscalyear'},
        {fiscalYearId: 5, value: '2014', name: 'fiscalyear'},
        {fiscalYearId: 6, value: '2013', name: 'fiscalyear'},
        {fiscalYearId: 7, value: '2012', name: 'fiscalyear'},
    ]
}
export default function UploadFormReducer(state = defaultState, action) {
  
    switch(action.type) {
        case Actions.RESET:
            return{
                ...defaultState
            };
        case Actions.ON_UPDATE_CATEGORY_AND_SUBCATEGORY_ID_CHANGE:
            return {
                ...state,
                uploadFormDetails : {
                    ...state.uploadFormDetails,
                    categoryId: parseInt(action.data.menuId),
                    subCategoryId: parseInt(action.data.subMenuId)
                }
            }

        case Actions.ON_UPLOAD_FORM_DURATION_FROM_CHANGE:
            return {
                ...state,
                uploadFormDetails : {
                    ...state.uploadFormDetails,
                    duration : {
                        ...state.uploadFormDetails.duration,
                        startDate: action.data                    
                    }
                }
            }
        case Actions.ON_UPLOAD_FORM_DURATION_TO_CHANGE:
            return {
                ...state,
                uploadFormDetails: {
                    ...state.uploadFormDetails,
                    duration : {
                        ...state.uploadFormDetails.duration,
                        endDate: action.data
                    }
                }
            }
        case Actions.ON_UPLOAD_FORM_FISCAL_YEAR_CHANGE:
            return {
                ...state,
                uploadFormDetails : {
                    ...state.uploadFormDetails,
                    duration : {
                        ...state.uploadFormDetails.duration,
                        fiscalYear: action.data                    
                    }
                }
        }
        case  Actions.ON_UPLOAD_FORM_NOTE_DETAILS:
            return {
                ...state,
                uploadFormDetails: {
                    ...state.uploadFormDetails,
                    notes: action.data
                }
            }
        case  Actions.ON_UPLOAD_FORM_FILE_UPLOAD:
            return {
                ...state,
                uploadFormDetails: {
                    ...state.uploadFormDetails,
                    selectedFile: {
                        ...state.uploadFormDetails.selectedFile,
                        file: action.data
                    }
                }
            }
        case Actions.ON_FILE_UPLOAD_ID:
            return {
                ...state,
                uploadFormDetails: {
                    ...state.uploadFormDetails,
                    fileId: action.data
                }
            }
        default:
            return state;
    }
}

