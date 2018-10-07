import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Credit.css'
import Stepper from './Stepper'

class Credit extends React.Component {
  render () {
    return (
      <div className='Credt-title-text'>
        <MuiThemeProvider>
          <Stepper studentIdcard={this.props.studentIdcard} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Credit
