import React from 'react'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

const styles = {
  labelStyle: {
    fontFamily: 'Noto Sans CJK TC',
    color: '#434343',
  },
  titleSender: {
    fontFamily: 'Noto Sans CJK TC',
    padding: '3px 3px 5px 3px',
  },
  title: {
    fontFamily: 'Noto Sans CJK TC',
    padding: '3px 3px 0px 3px',
  },
  items: {
    padding: '2px 0 3px 20px',
  },
  item: {
    display: 'inline-block',
    height: '10px',
    width: 'auto',
    padding: '2px',
    color: '#979797',
    fontSize: '8px',
  },
  itemsReceiver: {
    padding: '5px 0 7px 20px',
    maxHeight: 50,
    overflow: 'auto',
  },
  text1: {
    width: '90%',
    padding: '5px',
    fontFamily: 'Noto Sans CJK TC',
  },
  text2: {
    width: '90%',
    padding: '5px',
    fontSize: '12px',
    fontFamily: 'Noto Sans CJK TC',
  },
  reply: {
    default: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#575757'
    },
    red: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#9f2624'
    },
    brown: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#845b2d'
    },
    green: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#3c8a63'
    }
  }
}

export default class ReplyDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ]

    return (
      <div>
        <MuiThemeProvider>
          <div onClick={this.handleOpen}>
            <ReplyStatus status={this.props.status}/>
          </div>
          {/*<RaisedButton label="Modal Dialog" >*/}
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            Only actions can close this dialog.
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

const ReplyStatus = (props) => {
  switch (props.status) {
    case 0:
      return <div style={styles.reply.default}>尚未回覆</div>
    case 1:
      return <div style={styles.reply.green}>已接受</div>
    case 2:
      return <div style={styles.reply.brown}>審核中</div>
    default:
      return null
  }
}