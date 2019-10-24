import Actions from './actions';

const defaultState = {
   reEntered:'',
    password:'',
    passwordMatch:true, code: "21400a4c-f523-495b-b274-46bb2b518894",
}

export default function ResetPasswordReducer(state = defaultState, action) {
    switch(action.type) {
        case Actions.ON_PASSWORD_NOT_MATCHED:
            return {
                ...state,
                passwordMatch: false,
            }
        case Actions.ON_PASSWORD_RESET:
            return {
                ...state,
                password: action.data,
                passwordMatch: true,
            }
        case Actions.ON_REENTERD_PASSWORD_RESET:
            return {
                ...state,
                reEntered: action.data,
                passwordMatch: true,
            }
        default:
            return state;
    }
}