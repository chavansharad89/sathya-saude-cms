import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import side_arrow from '../../assets/images/side_arrow.png'
import {isSelectedSubmenu} from '../../shared/Settings/store/dispatchers'
import {uploadlistLoadingStatus} from '../../screens/Dashboard/screens/UploadList/store/dispatchers'
import './index.scss';



 class ApplicationUploadsCount extends Component {

    _onClick(name,id) {
        const menu = this.props.menuList.find(menu => id === menu.id)
        const submenu = menu.children && menu.children[0]
       
        this.props.isSelectedSubmenu(menu,submenu)
        const subId= submenu? submenu.id :null
        this.props.uploadlistLoadingStatus(true)
        this.props.history.push(`/menus/${id}/sub-menu/${subId}`)

    }
    
    render() {
        const{uploadsData}=this.props
        return (
            <div className='application-uploads-component'>
            {
                uploadsData.map(({displayName, 
                    myUploads, 
                    allUploads,
                    categoryId}, index) => {
                    const id= categoryId;
                    const name = displayName;
                    return (
                        <div key={index} className='application-uploads-component__content'>
                            <div className='application-uploads-component__content__header' onClick={(e) => this._onClick(name,id)}>
                                {name} 
                                <img src={side_arrow} className='side-arrow' alt='more'></img>
                            </div>
                            <div className='application-uploads-component__content__count'>
                                <div className='application-uploads-component__content__count__my-uploads' onClick={(e) => this._onClick(name,id)} >
                                    {myUploads} 
                                    <p className='uploads-text'> my uploads </p>
                                </div>
                                <div className='application-uploads-component__content__count__all-uploads' onClick={(e) => this._onClick(name,id)}>
                                    {allUploads}
                                    <p className='uploads-text'> all uploads </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
const mapStateToProps = ({setting}) => {
   
    return {
        title:setting.title,
        subTitle:setting.subTitle
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        isSelectedSubmenu(menu,submenu) {  
            dispatch(isSelectedSubmenu(menu,submenu));
        },
        uploadlistLoadingStatus(value){
            dispatch(uploadlistLoadingStatus(value))
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (withRouter(ApplicationUploadsCount))