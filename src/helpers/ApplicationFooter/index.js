import React from 'react';
import youtubeimg from '../../assets/images/youtubeimg.png';
import ApplicationPageLayout from '../ApplicationPageLayout';
import mdcourtsimg from '../../assets/images/mdcourtsimg.png';
import './index.scss';

export default function ApplicationFooter() {
    return (
            <div className='application-footer'>
                        <ApplicationPageLayout>
                <div className='application-footer__content'>
                    <div className='application-footer__content__text'>
                        <div className='application-footer__content__text__mdcourts-link'>
                            <a href='http://www.sathyasaude.com'>www.sathyasaude.com</a>
                        </div>
                        <div className='application-footer__content__text__copyright-text'>
                            Copyright &copy; 2019 sathya saude. All rights reserved.
                        </div>
                        <div className='application-footer__content__text__terms-text'>
                            <span className='a'>Term of Use/Disclaimer</span>
                        </div>
                    </div>
                </div>
                </ApplicationPageLayout>
            </div>
    );
};