import React from 'react'
import axios from 'axios'
import TextForm from './TextForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Credit.css'
import Stepper from './Stepper'

class Credit extends React.Component {
  componentWillUpdate () {
  }
  render () {
    return (
      <div className='Credt-title-text'>
        <MuiThemeProvider>
          <Stepper studentIdcard={this.props.studentIdcard}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Credit
