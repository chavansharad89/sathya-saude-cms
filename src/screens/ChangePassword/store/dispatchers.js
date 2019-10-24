import Actions from './actions';

function onNewPasswordChange(values){
    return {
        type: Actions.ON_NEW_PASSWORD_CHANGE,
        data : values
    }
}
function onReEnterdPasswordChange(values) {
    return {
        type: Actions.ON_REENTERD_NEW_PASSWORD_CHANGE,
        data : values
    }
}
function onPasswordNotMatched(values) {
    return {
        type: Actions.ON_PASSWORD_NOT_MATCHED,
        data : values
    }
}
function onReset(values ){
    return{
        type:Actions.ON_RESET,
        data : values
    }
}
export{

    onNewPasswordChange,
    onReEnterdPasswordChange,
    onPasswordNotMatched,
    onReset
}