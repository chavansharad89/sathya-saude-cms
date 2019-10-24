import React from 'react';
import './index.scss';
export default function ApplicationSubMenu({
    subMeunList=[],
    onClickSubMenu,
    selectedSubMenu,
    title,
    tableReloade,
    history
}) {
    function onClick(e, name) {
        let subMenuContent = document.getElementsByClassName("sub-menu");
        for (let i = 0; i < subMenuContent.length; i++) {
            subMenuContent[i].classList.remove("active");
        }
        e.target.classList.add("active");
        onClickSubMenu(title,name);
        const subTitle = name ? name.id : null;
        history && history.push(`/menus/${title.id}/sub-menu/${subTitle}`)
        tableReloade(true)
    }
    return (
        <div className="application-sub-menu">
            <ul>
                {
                    subMeunList && subMeunList.map((subMenu, index) => {
                        if ((selectedSubMenu && selectedSubMenu[0].id === subMenu.id) || (!selectedSubMenu && subMenu.id === 1)) {
                            return <li key={index} className="sub-menu active"
                                onClick={e => onClick(e, subMenu)}>
                                {subMenu.displayName}
                            </li>
                        } else {
                            return <li key={index} className="sub-menu"
                                onClick={e => onClick(e, subMenu)}>
                               {subMenu.displayName}    
                            </li>
                        }
                    })
                }
            </ul>
        </div>
    )
}