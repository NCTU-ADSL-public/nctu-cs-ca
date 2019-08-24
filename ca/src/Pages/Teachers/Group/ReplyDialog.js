import React from 'react'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// for bootstrap 3
import {Button} from 'react-bootstrap'

// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/* const styles = {
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
} */

export default class ReplyDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  fetchStudentEmailById (s) {
    axios.post('/professors/students/StudentInfo', {
      student_id: s.student_id
    }).then(res => {
      return res.data.email
    }).catch(err => {
      console.log(err)
      return false
    })
  }

/*  sendEmailToStudents (ss, acc) {
    ss.forEach(async s => {
      console.log('YOMAJA')
      let sEmail
      sEmail = await this.fetchStudentEmailById (s)
      let log = {
        title: '【專題】資工專題申請回覆',
        sender_id: this.props.idCard.teacher_id,
        sender_email: this.props.idCard.mail,
        receiver_id: s.student_id,
        receiver_email: sEmail,
        content: this.props.idCard.tname + ' 教授 對於您申請專題的回覆是: ' + (acc ? '『接受』。' : '『婉拒』。' )
      }

      console.log(log)

      axios.post('/mail/sendmail', log).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    })
  }*/

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = (status) => {
    console.log(status)
    // 如果按在視窗外面就跳出，什麼都不做
    if( status !== 1 && status !== 3 ) {
      this.setState({open: false})
      return
    }
    // 防呆確認
    const statusText = status === 3 ? '『拒絕』' : '『接受』'
    if( !window.confirm('確定回覆' + statusText + '?') ) return

    let students = this.props.participants.map( p => (
      {
        student_id: p.student_id,
        mail: p.email
      }
    ))
    console.log(students)
    this.setState({open: false})
    axios.post('/professors/researchApply/setAgree', {
      research_title: this.props.title,
      tname: this.props.idCard.tname,
      mail: this.props.idCard.mail,
      agree: status,
      student: students,
      first_second: this.props.firstSecond,
      year: this.props.year
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })


    // trigger update
    this.props.parentFunction()
  }
  render () {
    const actions = [
      <FlatButton
        label='接受'
        primary
        onClick={ () => this.handleClose(1) }
      />,
      <FlatButton
        label='拒絕'
        secondary
        onClick={ () => this.handleClose(3) }
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
            title='回覆專題申請'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            請選擇『接受』或『拒絕』此申請，此動作不可反悔。
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

const ReplyStatus = (props) => {
  switch (props.status) {
    case '0':
      return <Button bsStyle='primary'>尚未回覆</Button>
    case '1':
      return <Button bsStyle='success' disabled>已接受</Button>
    case '2':
      return <Button bsStyle='info'>審核中</Button>
    default:
      return <Button bsStyle='primary'>回覆</Button>
  }
}