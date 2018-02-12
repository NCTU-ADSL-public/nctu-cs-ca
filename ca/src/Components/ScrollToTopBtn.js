import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/editor/vertical-align-top'

const homeIcon = <ContentAdd />

const style = {
  marginRight: 20,
  position: 'fixed',
  bottom: '41px',
  right: '3px'
}

const IconButtonExampleTooltip = () => (
  <div className='fixed' >
    <MuiThemeProvider>
      <FloatingActionButton
        style={style}
        backgroundColor='grey'>
        {homeIcon}
      </FloatingActionButton>
    </MuiThemeProvider>
  </div>
)

export default IconButtonExampleTooltip
