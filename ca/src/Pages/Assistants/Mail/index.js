import React from 'react'
import {connect} from 'react-redux'
import Mail from '../../../Components/mail'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const AssistantMail = (props) => (
  <MuiThemeProvider>
    <Mail type='assistant' id={props.idCard.id} />
  </MuiThemeProvider>
)

const mapState = (state) => ({
  idCard: state.Assistant.User.idCard
})

export default connect(mapState)(AssistantMail)
