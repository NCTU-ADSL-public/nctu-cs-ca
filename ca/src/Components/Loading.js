import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Loading = (props) => (
  <MuiThemeProvider>
    <RefreshIndicator
      size={props.size}
      left={props.left}
      top={props.top}
      loadingColor={'#98e879'}
      status={props.isLoading ? 'loading' : 'hide'}
      style={{
        display: props.isLoading ? 'inline-block' : 'none',
        position: 'relative'
      }}
    />
  </MuiThemeProvider>
)

export default Loading
