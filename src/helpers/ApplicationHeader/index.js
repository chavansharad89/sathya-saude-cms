import React from 'react';
import logo from '../../assets/images/logo.png'
import courtIcon from '../../assets/images/court-logo-mob.png'
import ApplicationPageLayout from '../ApplicationPageLayout';

import './index.scss';

export default function ApplicationHeader() {
    
    return (
        <div className="application-header">
            <ApplicationPageLayout>
                <div className="application-header__img">
                    <img className="application-header__logo" src={logo} alt="logo" />
                    <img className="application-header__icon" src={courtIcon} alt="court icon" />
                </div>
            </ApplicationPageLayout>
        </div>
    )
}
