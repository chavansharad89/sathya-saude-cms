import Actions from './actions';

function onEmailChange(values) {
    return {
        type: Actions.ON_EMAIL_CHANGE,
        data : values
    }
}

function onPasswordChange(values) {
    return {
        type: Actions.ON_PASSWORD_CHANGE,
        data : values
    }
}
function OnLogin(values) {
    return {
        type: Actions.SET_ACCOUNT_ID,
        data : values
    }
}

export{
    onEmailChange,
    onPasswordChange,
    OnLogin
}