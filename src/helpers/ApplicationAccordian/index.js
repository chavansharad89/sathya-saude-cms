import React, { Component } from 'react';
import './index.scss';

class ApplicationAccordian extends Component {
   
    render() {
       
        const { title, 
            body ,
            isOpen ,
            className,
            isOpenSubmenu ,
            bodyClassName} = this.props;
        const accordianClass = isOpen ? "icon-caret-up up":"icon-caret-down down";
        return (
            <React.Fragment>
                <div className={`accordian ${className}`}>
                    <div className={`accordian__header`} onClick={(e)=>{isOpenSubmenu (title )}}>
                        { title.displayName }
                        <span className={accordianClass}></span>
                    </div> 
                </div>
                <div className={`accordian__body-container`}>
                    {
                        isOpen ?
                            <div className={`accordian__body ${bodyClassName}`}>    
                                { body }
                            </div> : null
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default ApplicationAccordian;