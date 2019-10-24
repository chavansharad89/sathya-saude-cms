import Actions from './actions';

function onEmailChange(values) {
    return {
        type: Actions.ON_EMAIL_CHANGE,
        data : values
    }
}

export {
    onEmailChange
}