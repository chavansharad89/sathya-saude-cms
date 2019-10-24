import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplicationPageLayout from '../ApplicationPageLayout';
import ApplicationActionDropdown from '../ApplicationActionDropdown';
import ApplicationAccordian from '../ApplicationAccordian';
import ApplicationSubMenu from '../ApplicationSubMenu';
import ApplicationSubmenuBody from '../ApplicationSubmenuBody'
import { withRouter } from 'react-router-dom';
import {uploadlistLoadingStatus} from '../../screens/Dashboard/screens/UploadList/store/dispatchers'
import {isOpenSubmenu,isSelectedSubmenu} from '../../shared/Settings/store/dispatchers'
import './index.scss';



class ApplicationNavPageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.length === 1 ? true : false  ,
        }
    }
    componentDidMount(){
        window.onpopstate  = (e) => {
            const {match,menulist,isSelectedSubmenu,uploadlistLoadingStatus} = this.props
            const {isExact,params} = match
            const { menuId,subMenuId }=params
            const menu = this.findData(menulist,menuId)
            const subMenu = this.findData(menu.children,subMenuId);
            if(isExact){
                isSelectedSubmenu( menu,subMenu)
                uploadlistLoadingStatus(true)
            }
        }
    }
    
    findData(list,id) {
        return list && list.find((menu) => {
            return  id === (menu.id.toString())
    })}
    
    onToggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    _onSelectMenuItem = (menu,subMenu)=>{
        const { history,isSelectedSubmenu,uploadlistLoadingStatus }=this.props
        isSelectedSubmenu( menu)
        uploadlistLoadingStatus(true)
         history && history.push(`/menus/${menu.id}/sub-menu/${subMenu && subMenu.id}`)
    }
    render () {
        const { isOpen} =this.state;
        const {isOpenSubmenu,
            uploadlistLoadingStatus,
            isSelectedSubmenu,
            menulist=[],
            Title,
            SubTitle ,
            history}=this.props

            
        return (
            <React.Fragment>
                <div className='application-page-title'>
                    <ApplicationPageLayout>
                        <div className="application-page-title__content" onClick= {this.onToggleMenu.bind(this)}>
                            <div className="application-page-title__header">
                                <div>
                                    <div className='application-page-title__header__title'> {Title.displayName} </div>
                                    <div className='application-page-title__header__subTitle'> {SubTitle && SubTitle.displayName} </div>
                                </div>
                                <div>
                                    <ApplicationActionDropdown />       
                                </div>
                               
                            </div>
                            <div className="application-page-title__arrow-images">
                                {
                                    isOpen?
                                        <span className = "icon-chevron-up application-page-title__arrow-images__up-arrow"></span>
                                    :   <span className = "icon-chevron-down application-page-title__arrow-images__down-arrow"></span>
                                }
                                
                                
                            </div>
                            
                        </div>
                        <div className='desktop-submenu'>
                            {  
                                menulist.map((menu,index)=>{
                                    return (
                                        (menu.displayName===Title.displayName) ?
                                        <ApplicationSubMenu
                                            subMeunList={menu.children}
                                            title={menu}
                                            key ={index}
                                            selectedSubMenu={[SubTitle]}
                                            onClickSubMenu={isSelectedSubmenu}
                                            history={history}
                                            tableReloade={uploadlistLoadingStatus} /> 
                                        : ''
                                    )                                    
                                })
                            }
                        </div>
                        
                    </ApplicationPageLayout>
                    <div className='application-page-menu'>
                        {
                            isOpen  ?
                                <div className= "mobile-submenu">
                                { 
                                    menulist.map ((menu,index) => {
                                        const className = ""
                                        return( menu.children && menu.children.length > 0 ?
                                            <div key={index}>
                                               
                                                <div className={`mobile-submenu__options`}>
                                                   { menu.isSelected ? <span className="selected"></span> :''}
                                                    <ApplicationAccordian title ={menu} 
                                                        className={className} 
                                                        isOpen={menu.isOpen}  
                                                        body={ 
                                                            <ApplicationSubmenuBody child={menu.children} 
                                                                title ={menu} 
                                                                history={history} 
                                                                subTitle={SubTitle} 
                                                                tableReloade={uploadlistLoadingStatus}  
                                                                isSelectedSubmenu={isSelectedSubmenu}/>}   
                                                        isOpenSubmenu={isOpenSubmenu} />
                                                </div>
                                            </div> 
                                            :
                                            <div key={index} className='mobile-submenu__options'>
                                                 { menu.isSelected ? <span className="selected"></span> :''}
                                                <div className={`accordian `}  onClick={e => this._onSelectMenuItem ( menu ,null)} >
                                                    <div className={`accordian__header `} >
                                                        {menu.displayName}
                                                    </div>
                                                </div>
                                            </div> )
                                    })
                                }  
                                </div> 
                            : null
                        }
                    </div>
                </div>
            </React.Fragment>

        );
    };
}
const mapStateWithProps = ({setting}) => {
    return {
        menulist:setting.menulist,
        Title:setting.title,
        SubTitle:setting.subTitle
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isOpenSubmenu(values) {
            dispatch(isOpenSubmenu(values))
        },
        isSelectedSubmenu(title,subTitle){
            
            dispatch(isSelectedSubmenu(title,subTitle))
        },
        uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps) (withRouter(ApplicationNavPageTitle)) ;
