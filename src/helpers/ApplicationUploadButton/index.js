import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ApplicationActionButton from '../ApplicationActionButton';
import './index.scss'


const uplaodButton = ({id}) => {
    const { menuId , subMenuId} = id;
    return (
        <div className="add-button">
            <Link to={`/menus/${menuId}/sub-menu/${subMenuId}/upload`}>  
                <ApplicationActionButton
                    title='upload data'
                    type='button'
                    className='upload-button' />
            </Link>
        </div>
    );
};

export default (withRouter(uplaodButton));