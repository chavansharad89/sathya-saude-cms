import Actions from './actions';

function updateDetails(list ,params) {
    return {
        type: Actions.ON_DETAILS_CHANGE,
        data : {list,params}
    }
}
function isOpenSubmenu(values){
    return {
        type: Actions.ON_SUBMENU_OPEN,
        data : values
    }
}
function isSelectedSubmenu(menuTitle,menuSubTitle){
    return{
        type: Actions.ON_SUBMENU_SELECTED,
        data : {
            menuTitle:menuTitle,
            menuSubTitle:menuSubTitle
            }
    }
}
function isSelectedMenu(value,subTitle){
    return {
        type: Actions.ON_MENU_SELECTED,
        data : {
            value:value,
            subTitle:subTitle
        }
    }
}
function onUserEnter(value){
    return {
        type:Actions.ON_USER_ENTER,
        data : value
    }
}

export {
    updateDetails,
    isOpenSubmenu,
    isSelectedSubmenu,
    isSelectedMenu,
    onUserEnter
}