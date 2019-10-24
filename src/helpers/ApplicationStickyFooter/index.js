import React from 'react';
import './index.scss';

export default class ApplicationStickyFooter extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isSticky: true
        };
     }
    
    componentDidMount() {
        window.onscroll = () => {
            const top = (document.documentElement && document.documentElement.scrollTop) 
                || document.body.scrollTop;
            if (top > 1) {
                this.setState ({
                    isSticky : false
                })
            } else  {
                this.setState ({
                    isSticky : true
                })
            }
        };   
    }

    render() {
        const { isSticky } = this.state;
        return (
            
            <div className = {isSticky === true ? 'sticky-footer' : ''}>
              {this.props.children}
            </div>
        )
    }
}