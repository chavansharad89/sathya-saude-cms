import React, { Component } from 'react';
import ApplicationPageLayout from '../ApplicationPageLayout';
import ApplicationActionDropdown from '../ApplicationActionDropdown';
import { Link } from 'react-router-dom';
import './index.scss';


export default class ApplicationPageTitle extends Component {
    render() {
        const {dropdown=false ,title}=this.props
        return (
            <div className='application-page-title'>
                <ApplicationPageLayout>
                   <div className='application-page-title__content'> 
                        {title?
                            <div className='application-page-title__content__header'>
                                {title}
                            </div>
                            :
                            <div className='application-page-title__content__header'>
                                {
                                    !dropdown 
                                        ? <Link to='/' >Content Management system</Link>
                                        : <span >Content Management system</span> 
                                }   
                            </div>
                        }
                        <div>
                        { dropdown &&
                            <ApplicationActionDropdown  />
                        }
                        </div>
                   </div>
                </ApplicationPageLayout>
            </div>
        )
    }
}