import React from 'react'
import {NavItem,Glyphicon} from 'react-bootstrap'

const style = {
  Icon: {
    width: '100%',
    fontSize: 19,
    height: 24,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  IconSelected: {
    color: '#68BB66',
  },
  Label: {
    lineHeight: '15px',
    transition: 'color 0.3s, font-size 0.3s',
  },
  LabelSelected: {
    fontSize: 14,
    color: '#68BB66',
  },
}

class NavButton extends React.Component {
  render() {
    const {label, icon, selected, onClick} = this.props
    return (/*
            <BottomNavigationItem
                icon={icon}
                style={style}
                onTouchTap={onTouchTap}
                selected={selected}
            />*/
      <NavItem className='nav-button' onClick={onClick}>
        <i className={icon + ' hidden-xs'} style={{...style.Icon, ...(selected && style.IconSelected)}}  aria-hidden="true"></i>
        <div style={{...style.Label, ...(selected && style.LabelSelected)}}>{label}</div>
      </NavItem>
    )

  }
}

export default NavButton