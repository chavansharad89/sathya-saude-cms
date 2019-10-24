import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ApplicationNavigationmenu from '../ApplicationNavigationMenu';
import ApplicationPageLayout from '../ApplicationPageLayout';
import {HomeLoadingStatus} from '../../screens/Home/store/dispatchers'
import {isOpenSubmenu,isSelectedSubmenu} from '../../shared/Settings/store/dispatchers'
import './index.scss';

const ApplicationNavigation = ({ 
    menulist ,
    isSelectedSubmenu,
    HomeLoadingStatus,
    title,
    history
    }) => {
       
        return (

            <div className="application-navigation">
                <ApplicationPageLayout>
                    <div className="application-navigation__content">
                        <div className='application-navigation__content__title'> 
                        <Link to='/'>
                            <span onClick = { e => HomeLoadingStatus(false)}> 
                                Content management system 
                            </span> 
                        </Link>
                        </div>
                        <div className='desktop-navigation-menu'>
                            <ApplicationNavigationmenu 
                                meunList={menulist}  
                                onClickSubMenu={isSelectedSubmenu}
                                selectedMenu={[title]} 
                                history={history}
                            />
                        </div>
                    </div>
                </ApplicationPageLayout>
            </div>
        )
}

const mapStateWithProps = ({setting}) => {
    return {
        menulist:setting.menulist,
        title:setting.title
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
        HomeLoadingStatus(value){
            dispatch(HomeLoadingStatus(value))
        }
    };
};

export default connect(mapStateWithProps, mapDispatchToProps) (ApplicationNavigation) ;
