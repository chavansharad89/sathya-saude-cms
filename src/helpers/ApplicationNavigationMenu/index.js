import React from 'react';
import { connect } from 'react-redux';
import ApplicationListSection from "../ApplicationListSection";
import {isSelectedMenu} from '../../shared/Settings/store/dispatchers'
import { uploadlistLoadingStatus } from '../../screens/Dashboard/screens/UploadList/store/dispatchers';
import './index.scss';

 function ApplicationNavigationMenu({
    meunList=[],
    onClickMenu,
    isSelectedMenu,
    onClickSubMenu,
    selectedMenu,
    menuId,
    title,
    subTitle,
    uploadlistLoadingStatus,
    history
}) {
    function onClick( menu,subtitle) {
       
        let subMenuContent = document.getElementsByClassName("menu");
        for (let i = 0; i < subMenuContent.length; i++) {
            subMenuContent[i].classList.remove("menu-active");
        }
        for (let i = 0; i < subMenuContent.length; i++) {
           if(menu.id === i+1) {
            subMenuContent[i].classList.add("menu-active");
           }
        }
        
        onClickSubMenu(menu,subtitle)
        const subMenu = subtitle ? subtitle.id:null
        history && history.push(`/menus/${menu.id}/sub-menu/${subMenu}`)
        uploadlistLoadingStatus(true)
    }
    return (
        <div className="application-navigation-menu">  
            <ul>
                {  
                    meunList.map((menu, index) => {
                        const sub= menu.children && menu.children[0]
                        const navigationSubMenu = menu.children &&  menu.children.map((child, index) => child)

                        if (((selectedMenu && selectedMenu[0].id) === (menu&& menu.id ))
                            ||( !selectedMenu && (menu&&menu.id === 1))) {     
                            return <li key={index} className="menu menu-active">
                                <div onClick={e => onClick( menu,sub)}>{menu.displayName}</div>
                                <div className="sub-menu-list">
                                    <ApplicationListSection 
                                        listNames={navigationSubMenu} 
                                        viewType={"sub-menu"} 
                                        onClickOption={(displayName) => onClick(menu,displayName)} />
                                </div>
                            </li>
                        } else {
                            return <li key={index} className="menu">
                                <div onClick={e => onClick( menu,sub)}>{menu.displayName}</div>
                                <div className="sub-menu-list">
                                    <ApplicationListSection 
                                        listNames={navigationSubMenu} 
                                        viewType={"sub-menu"} 
                                        onClickOption={(displayName) => onClick(menu,displayName)} />
                                </div>
                            </li>
                        }
                    })
                }

            </ul>
        </div>
    )
}

const mapStateWithProps = ({setting}) => {
    return {
        title:setting.title,
        subTitle:setting.subTitle
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isSelectedMenu(values,subTitle) {
            dispatch(isSelectedMenu(values,subTitle))
        },
        uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps) (ApplicationNavigationMenu) ;
