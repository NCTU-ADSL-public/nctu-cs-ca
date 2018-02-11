import React from 'react'
import {BottomNavigationItem} from 'material-ui/BottomNavigation';

const style = {
    fontFamily: 'Noto Sans CJK TC',
    background: '#EEEEEE',
    lineHeight: '15px',
    fontSize: '11px',
    width: '10px',
}

class NavItem extends React.Component {
    render() {
        const {label, icon, select, onTouchTap} = this.props
        return (
            <BottomNavigationItem
                label={label}
                className="TopButton"
                icon={icon}
                style={style}
                onTouchTap={onTouchTap}
            />
        )
    }
}

export default NavItem