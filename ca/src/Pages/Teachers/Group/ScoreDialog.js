import React from 'react'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// for bootstrap 3
import {Button} from 'react-bootstrap'

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

export default class ScoreDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      score: '',
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }
  // {student_id:'0416026',tname:'彭文志', research_title:'聊天機器人', first_second:2, new_score:88}
  handleClose = (status) => {
    this.setState({open: false})
    if(status === 1){
      console.log('student_id: ' + this.props.participants[0].student_id)
      console.log('tname: ' + this.props.idCard.name)
      console.log('research_title: ' + this.props.title)
      console.log('first_second: ' + this.props.firstSecond)
      console.log('new_score: ' + this.state.score)
      axios.post('/professors/students/setScore', {
        student_id: this.props.participants[0].student_id,
        tname: this.props.idCard.name,
        research_title: this.props.title,
        first_second: this.props.firstSecond,
        new_score: this.state.score
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.props.parentFunction()
    }
  }
  handleChangeScore = (event) => {
    this.setState({
      score: event.target.value,
    });
  };
  render () {
    const actions = [
      <FlatButton
        label='確定'
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
            <ReplyStatus status={this.props.status}/>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title='專題評分'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <MuiThemeProvider>
              <TextField
                floatingLabelText="分數"
                style={styles.text1}
                value={this.state.score}
                onChange={this.handleChangeScore}
              />
            </MuiThemeProvider>
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

const ReplyStatus = (props) => {
  switch (props.status) {
    case '0':
      return <Button bsStyle='primary'>評分</Button>
    case '1':
      return <Button bsStyle='success' disabled>已評: {props.score}</Button>
    default:
      return <Button bsStyle='primary'>評分</Button>
  }
}