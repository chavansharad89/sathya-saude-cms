import dashboards from './screens/Dashboard/store'; 
import login from './screens/Login/store/reducers'; 
import resetPassword from './screens/ResetPassword/store/reducers';
import shared from'./shared/store'
import forgetPassword from './screens/ForgetPassword/store/reducers'; 
import changePassword from './screens/ChangePassword/store/reducers'
 import home from './screens/Home/store/reducers'
import {checkbox }from './helpers/ApplicationHorizontalCheckbox/store'

export default {
    ...shared,
    ...dashboards,
    changePassword,   
    login, 
    forgetPassword, 
    resetPassword,
    home,
    checkbox
};