import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
}

const Loading = (props) => (
  <MuiThemeProvider style={style.container}>
    <RefreshIndicator
      size={props.size}
      left={props.left}
      top={props.top}
      loadingColor={'#00AEAE'}
      status={props.status ? 'hid' : 'loading'}
      style={{
        display: props.status ? 'none' : 'inline-block',
        position: 'relative'
      }}
        />
  </MuiThemeProvider>
)

export default Loading
