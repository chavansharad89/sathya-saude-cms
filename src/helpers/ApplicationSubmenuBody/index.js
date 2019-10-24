import React , { Component }from 'react';
import './index.scss';

 class ApplicationSubmenuBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected:  false  ,
            selectedTitle: ''
        }
    }
    _getSelectedSubMenu(menutitle,title) {
        this.setState({isSelected:true ,selectedTitle:menutitle.displayName})
        const {history}=this.props;
        const subMenu = menutitle ? menutitle.id:null
        this.props.isSelectedSubmenu(title,menutitle);
        this.props.tableReloade(true)
        history && history.push(`/menus/${title.id}/sub-menu/${subMenu}`)
    }

    render(){
        const {child=[],title,subTitle} = this.props;
        return (
            <div className= "application-submenu-body">
                {
                    child.map((children, index)=>{
                        return(
                            <div key={index} className='mobile-submenu__options'>
                            { subTitle && subTitle.id === children.id  ? <span className="selected"></span> :''}
                            {      
                                <div className={`accordian $`}>
                                    <div className={`accordian__header`} onClick={(e) => this._getSelectedSubMenu(children ,title) }>
                                        {children.displayName}
                                    </div>
                                </div>}
                      
                            </div>
                        )
                    })
                }
            
            </div>
        )
    }
}


export default ApplicationSubmenuBody;