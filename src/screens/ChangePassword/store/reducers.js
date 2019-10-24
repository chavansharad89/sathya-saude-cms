import Actions from './actions';

const defaultState = {
    newPassword:'',
    reEnteredPassword:'',
    passwordMatch:true,
    //code: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
}

export default function ResetPasswordReducer(state = defaultState, action) {
    switch(action.type) {
        case Actions.ON_NEW_PASSWORD_CHANGE:
            return{
                ...state,
                newPassword:action.data,
                passwordMatch: true,
            }
        case Actions.ON_REENTERD_NEW_PASSWORD_CHANGE:
            return {
                ...state,
                reEnteredPassword: action.data,
                passwordMatch: true,
            }
        case Actions.ON_PASSWORD_NOT_MATCHED:
            return {
                ...state,
                passwordMatch: false,
            }
        case Actions.ON_RESET:
            return{
                ...state,
                passwordMatch: true,
            }
        default:
            return state;
    }
}