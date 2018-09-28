import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return (
      <MuiThemeProvider>
        <RaisedButton
          label={children}
          backgroundColor='#D3D3D3'
          labelColor='#778899'
          labelStyle={{
            fontFamily: 'Noto Sans CJK TC',
            fontWeight: 'bold'
          }}
          fullWidth
          disabled />
      </MuiThemeProvider>
    )
  }

  return (
    <MuiThemeProvider>
      <RaisedButton
        label={children}
        backgroundColor='#D3D3D3'
        labelColor='#778899'
        labelStyle={{
          fontFamily: 'Noto Sans CJK TC',
          fontWeight: 'bold'
        }}
        fullWidth
        onTouchTap={e => {
          e.preventDefault()
          onClick()
        }}
      />
    </MuiThemeProvider>
  )
}

export default Link
