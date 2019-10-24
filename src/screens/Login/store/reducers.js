import Actions from './actions';

const defaultState = {
    emailId:'' ,
    password:'',
    accountId:null,
}
export default function LoginReducer(state = defaultState, action) {
    switch(action.type) {
        case Actions.ON_EMAIL_CHANGE:
            return {
                ...state,
                emailId: action.data
            }
        
        case Actions.ON_PASSWORD_CHANGE:
            return {
                ...state,
                password: action.data
            }
        case Actions.SET_ACCOUNT_ID:
            return {
                ...state,
                accountId: action.data.accountId
            }
        default:
            return state;
    }
}