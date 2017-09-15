import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style =[{
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'bold',
}] ;

const Link = ({ active, children, onClick }) => {
    if (active) {
        return (
            <MuiThemeProvider>
                <RaisedButton label={children} backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}
                                 disabled={true}>
                </RaisedButton>
            </MuiThemeProvider>
            )
    }

    return (
        <MuiThemeProvider>
            <RaisedButton label={children} backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={style} fullWidth={true}
                          onTouchTap={e => {
                              e.preventDefault()
                              onClick()
                          }}/>
        </MuiThemeProvider>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link