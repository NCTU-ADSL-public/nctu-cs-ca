import React from 'react'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// for bootstrap 3
import {Button, Glyphicon} from 'react-bootstrap'

// for multiTheme
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
  itemsBlock: {
    padding: '5px 0 7px 10px',
    maxHeight: 900,
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

export default class ChangeTitleDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      title: ''
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
      title: this.props.title
    })
  }

  handleClose = (status) => {
    if(status !== 1){
      this.setState({open: false})
    }else if(status === 1){
      this.setState({open: false})
      console.log('research_title: ' + this.props.title)
      console.log('tname: ' + this.props.idCard.name)
      console.log('first_second: ' + this.props.firstSecond)
      console.log('year: ' + this.props.yaer)
      console.log('new_title: ' + this.state.title)

      axios.post('/professors/students/setResearchTitle', {
        research_title: this.props.title,
        tname: this.props.idCard.name,
        first_second: this.props.firstSecond,
        year: this.props.year,
        new_title: this.state.title
      }).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })


      this.props.parentFunction()
    }
  }

  handleChange = (event) => {
    let title = event.target.value
    this.setState({title})
  }

  render () {
    const students = this.props.participants
    const actions = [
      <FlatButton
        label='送出'
        primary
        onClick={ () => this.handleClose(1) }
      />,
      <FlatButton
        label='取消'
        secondary
        onClick={ () => this.handleClose(0) }
      />
    ]

    return (
      <div>
        <MuiThemeProvider>
          <div onClick={this.handleOpen}>
            <Button bsStyle='warning'>修改標題 <Glyphicon glyph='pencil' /></Button>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title='修改專題標題'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div style={styles.itemsBlock}>
              <MuiThemeProvider>
                <TextField
                  floatingLabelText={'標題'}
                  style={styles.text1}
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </MuiThemeProvider>
            </div>
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}