import Actions from './actions';

const defaultState = {
    menulist: [],
    title:{},
    subTitle:{},
    selectedSubMenu:'',
    role:'',
    username:'',
    loadingSettings:true
}
export default function SettingReducer(state = defaultState, action) {
    switch(action.type) {
        
        case Actions.ON_DETAILS_CHANGE:
           
            const updatedMenuList = action.data.list.map((menu,index) =>{
                const isSelected = index===0 ?true :false
                
                return {
                    ...menu,
                    isopen:false,
                    isSelected:isSelected
                       
                }
            })
            const{menuId,subMenuId}=action.data.params
            const title = state.title.id ? state.title : updatedMenuList.find((menu) => menu.id ===  parseInt(menuId))

            const subMenu = state.title.id ? 
                state.subTitle 
                : title && title.children?
                    title && title.children.find((child) => child.id ===  parseInt(subMenuId))
                    :null

            return {
                ...state,
                menulist:updatedMenuList,
                title:title,
                subTitle:subMenu,  
                loadingSettings:false    
        }

        case Actions.ON_SUBMENU_SELECTED:
            
                const submenuOptions = state.menulist.map((option) => {
                    if(option.displayName === action.data.menuTitle.displayName ) {
                        return {
                           ...option,
                           isSelected: true,  
                        }
                    }
                    else {
                        
                        return {
                            ...option,
                            isSelected: false,
                          
                        }
                    }
                })
            
                return{
                    ...state,
                    title: action.data.menuTitle,
                    subTitle:action.data.menuSubTitle,
                    menulist : submenuOptions,
                }
        case Actions.ON_SUBMENU_OPEN:
           
                // let id;
                const menuOptions =  state.menulist.map((option) => {
                    if(option.displayName === action.data.displayName ) {
                        // id=action.data.id
                        return {
                           ...option,
                            isOpen: !option.isOpen,
                          
                        }
                    } 
                    else {
                        // id=action.data.id
                        return {
                            ...option,
                            isOpen: false,
                           
                        }
                    }
                })
                return {
                    ...state,
                    menulist:menuOptions,
                }
        case Actions.ON_MENU_SELECTED:
                
                const menu= state.menulist.map((option) => {
                    if(option.displayName === action.data.value.displayName ) {
                        return {
                           ...option,
                           isSelected:true,
                        }
                    }
                    else {
                        return {
                            ...option,
                            isSelected: false,
                          
                        }
                    }
                })
              
            return{
                ...state,
                menulist:menu,
                title: action.data.value,
                subTitle:action.data.value.children &&  action.data.value.children[0]
            }
        case Actions.ON_USER_ENTER:
            return{
                ...state,
                role:action.data.role,
                username:action.data.firstName,
                
            }
        default:
            return state;
    }
}