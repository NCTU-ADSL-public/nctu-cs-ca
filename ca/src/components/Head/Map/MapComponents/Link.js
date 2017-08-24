import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style =[{
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'bold',
}] ;

const Link = ({ active, children, onClick }) => {
    if (active) {
        return (
            <RaisedButton label={children} backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}
                             disabled={true}>
            </RaisedButton>
            )
    }

    return (
        <RaisedButton href="#"
               onTouchTap={e => {
               e.preventDefault()
               onClick()
           }}
        >
            {children}
        </RaisedButton>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link