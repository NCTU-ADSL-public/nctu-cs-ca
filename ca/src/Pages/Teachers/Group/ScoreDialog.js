import React from 'react'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
  itemsBlock: {
    padding: '5px 0 7px 10px',
    maxHeight: 900,
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
  text3: {
    width: '90%',
    padding: '0px 5px 5px 2px',
    marginTop: '0',
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
      scores: [],
      comments: [],
      errs: [],
    }
  }

  handleOpen = () => {
    let scores = new Array(this.props.participants.length).fill('')
    let errs = new Array(this.props.participants.length).fill('')
    let comments =  new Array(this.props.participants.length).fill('')
    this.props.participants.forEach((item, i) => {
      if( this.isInt100(item.score) ) scores[i] = item.score
    })
    this.props.participants.forEach((item, i) => {
      if( item.comment !== null ) comments[i] = item.comment
    })
    this.setState({open: true, scores, errs, comments})
  }

  handleClose = (status) => {
    if(status !== 1){
      if( window.confirm('確定要放棄評分? 輸入的資料將會被清除!') ) this.setState({open: false})
    }else if(status === 1 && this.checkAllText() ){
      if( !window.confirm('是否確定評分?') ) return

      this.setState({open: false})
      console.log('----------------------- /professors/students/setScore ---------------------------')

      console.log('tname: ' + this.props.idCard.tname)
      console.log('research_title: ' + this.props.title)
      console.log('first_second: ' + this.props.firstSecond)

      this.props.participants.forEach((item, i) => {
        console.log('student_id: ' + item.student_id)
        console.log('new_score[' + i + ']: ' + this.state.scores[i])
        console.log('comment[' + i + ']: ' + this.state.comments[i])

        axios.post('/professors/research/setScore', {
          student_id: item.student_id,
          tname: this.props.idCard.tname,
          research_title: this.props.title,
          first_second: item.firstSecond,
          year: this.props.year,
          new_score: this.state.scores[i],
          comment: this.state.comments[i]
        }).then(res => {
          // Magic update
          setTimeout(
            () => {
              console.log('----- fetch /professors/students/projects! ----')
              this.props.parentFunction()
            }, 250)
          setTimeout(
            () => {
              console.log('----- fetch /professors/students/projects! ----')
              this.props.parentFunction()
            }, 500)
          setTimeout(
            () => {
              console.log('----- fetch /professors/students/projects! ----')
              this.props.parentFunction()
            }, 1000)
        }).catch(err => {
          console.log(err)
        })
      })


    }
  }

  checkAllText = () => {
    let scores = this.state.scores
    let errs = this.state.errs
    let studentNum = this.props.participants.length
    errs.forEach(i => {
      errs[i] = ( this.isInt100(scores[i]) ? '' :'分數必須是0~100之間的整數' )
    })
    this.setState({errs})
    let pass = false
    for(let i=0; i<studentNum; i++){
      pass = this.isInt100(scores[i])
      if(!pass) break
    }
    if (!pass) alert('分數輸入格式錯誤! 請修正後再送出。')
    if(pass){
      for(let i=0; i<studentNum; i++){
        if(parseFloat(scores[i]) >= 90){
          if(this.state.comments[i] === ''){
            pass = false
          }
        }
      }
      if (!pass)  alert('90分以上必須給評語！請修正後再送出。')
    }
    return pass
  }

  isInt100 = (value) => {
    let x = parseFloat(value);
    if( isNaN(value) || (x | 0) !== x ) return false
    return x >= 0 && x <= 100
  }

  handleComment = (event, i) => {
    console.log(event.target.value)

    let _comments = {...this.state.comments}
    _comments[i] = event.target.value
    this.setState({comments:_comments})
  }

  handleChangeScore = (event, i) => {
    let scores = this.state.scores
    let errs = this.state.errs
    scores[i] = event.target.value
    errs[i] = ( this.isInt100(scores[i]) ? '' :'分數必須是0~100之間的整數' )
    this.setState({scores, errs})
  }

  render () {
    const students = this.props.participants
    const actions = [
      <FlatButton
        label='送出評分'
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
            <ReplyStatus status={ students[0].score === null }/>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title='專題評分'
            autoScrollBodyContent
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div style={styles.itemsBlock}>
              {students.map((item, i) => (
                <div key={i}>
                  <MuiThemeProvider >
                    <TextField
                      floatingLabelStyle={{fontSize: 24, color: '#452b12'}}
                      floatingLabelText={item.student_id + ' ' + item.sname + '  的評分：'}
                      floatingLabelFixed
                      style={styles.text1}
                      placeholder={'請在此填寫評分'}
                      value={this.state.scores[i]}
                      errorText={this.state.errs[i]}
                      onChange={(event) => this.handleChangeScore(event, i)}

                    />
                  </MuiThemeProvider>
                  { ( this.state.scores[i] !== '' && (parseFloat(this.state.scores[i]) >= 90 || parseFloat(this.state.scores[i]) < 60 ) )?
                    <div style={{borderLeft: '10px solid #e63e42', paddingLeft: 10, marginLeft: 10, background: '#f2f2f2'}}>
                    <TextField
                      floatingLabelStyle={{fontSize: 22, color: '#e63e42'}}
                      floatingLabelText={'評語 (若評分為【90分以上】或者【低於60】需要填寫填語!)'}
                      floatingLabelFixed
                      placeholder={'---------- 請用你的滑鼠在這裡點一下，在此填寫評語給 ' + item.sname + ' ----------'}
                      style={styles.text3}
                      value={this.state.comments[i]}
                      onChange={(event) =>this.handleComment(event, i)}
                    /></div> : '' }
                </div>
              ))}
            </div>
          </Dialog>
        </MuiThemeProvider>
        </div>
    )
  }
}

const ReplyStatus = (props) => {
  switch (props.status) {
    case true:
      return <Button bsStyle='primary'>評分</Button>
    case false:
      return <Button bsStyle='success'>重新評分</Button>
    default:
      return <Button bsStyle='primary'>評分</Button>
  }
}