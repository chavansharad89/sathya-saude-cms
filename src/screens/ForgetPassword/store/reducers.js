import Actions from './actions';

const defaultState = {
    emailId:''
}

export default function ForgetPasswordReducer(state = defaultState, action) {
    switch(action.type) {
        case Actions.ON_EMAIL_CHANGE:
            return {
                ...state,
                emailId: action.data
            }
        default:
            return state;
    }
}