import Actions from './actions';

function onPasswordReset(values) {
    return {
        type: Actions.ON_PASSWORD_RESET,
        data : values
    }
}
function onReEnterdReset(values) {
    return {
        type: Actions.ON_REENTERD_PASSWORD_RESET,
        data : values
    }
}
function onPasswordNotMatched(values) {
    return {
        type: Actions.ON_PASSWORD_NOT_MATCHED,
        data : values
    }
}
export{
    onReEnterdReset,
    onPasswordReset,
    onPasswordNotMatched
}