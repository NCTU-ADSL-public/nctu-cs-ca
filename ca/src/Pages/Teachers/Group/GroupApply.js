import React from 'react'
import axios from 'axios'
import { Grid, Row, Col } from 'react-bootstrap'

import defaultPic from '../../../Resources/defalt.jpg'
import ReplyDialog from './ReplyDialog'
import InfoCard from '../Shared/InfoCard'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { Dialog } from 'material-ui'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const styles = {
  noticeTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#ae777c',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#e5e5e5',
    margin: '32px 0 0 70px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#bfbfbf',
    margin: '55px 0 0 37px',
    float: 'left'
  },
  subHintTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#bfbfbf',
    margin: '25px 0px 0px 37px',
    float: 'left'
  },
  groups: {
    margin: '0 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '6px',
    border: '1px #dfdfdf solid',
    boxShadow: 'rgba(51, 51, 102, 0.3) 2px 4px 15px -2px'
  },
  pic: {
    width: '80%'
  },
  groupYear: {
    fontSize: '1.2em',
    fontWeight: '200',
    color: '#575757'
  },
  groupTitle: {
    fontSize: '2em',
    fontWeight: '100',
    color: '#575757'
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  },
  groupIntro: {
    padding: 5,
    color: '#9c9c9c',
    fontSize: '1.4em',
    fontWeight: 100
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

class GroupApply extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      cs_number: 0,
      chipOpen: new Map(),
      // applyList: [],
      applyList: [
        { research_title: '資料錯誤',
          status: 0,
          year: '107-1',
          first_second: '2',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 1,
            },
            { student_id: '0391234',
              sname: '郭梁兒',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 1,
            },
            { student_id: '0391666',
              sname: '耿平',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 0,
            },
            { student_id: '0416014',
              sname: '王立洋',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 1,
            },
            { student_id: '0391444',
              sname: '俞阿杰',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 0,
            }
          ]
        },
        { research_title: '我的專題',
          status: 0,
          year: '107-1',
          first_second: '2',
          participants: [
            { student_id: '0416014',
              sname: '王立洋',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 1,
            }
          ]
        },
        { research_title: '資料錯誤',
          status: '2',
          year: '107-1',
          first_second: '2',
          participants: [
            { student_id: '0399997',
              sname: '陳乾頭',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 0,
            }
          ]
        },
        { research_title: '資料錯誤',
          status: '3',
          year: '107-1',
          first_second: '2',
          participants: [
            { student_id: '0399987',
              sname: '陳憨頭',
              email: 'danny021406@gmail.com',
              phone: '',
              first_second: '2',
              student_status: 1,
            }
          ]
        }
      ]
    }
  }

  fetchData () {
    axios.get('/professors/students/applyList', {
      id: this.props.idCard.id
    }).then(res => {
      console.log(res.data)
      this.setState({
        applyList: res.data,
        loading: false
      })
    }).catch(err => {
      console.log(err)
    })
    let Today = new Date()
    let semester = ((Today.getFullYear()-1912)+ Number(((Today.getMonth()+1)>=8?1:0))) + '-' + ((Today.getMonth()+1)>=8?'1':'2')
    axios.post('/professors/students/projects', {
      teacherId: this.props.idCard.teacher_id,
      sem: semester
    }).then(res => {
      this.setState({
        cs_number: res.data.cs_number,
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      console.log(nextProps)
      this.fetchData()
    }
  }

  delay(t){
    return new Promise((res, rej) => {
      setTimeout(() => (res(1)), t)
    })
  }

  triggerUpdate = () => {
    this.fetchData()
    this.delay(1000).then((v) => (
      this.fetchData()
    )).catch((e) => (
      console.log('trigger update error' + e)
    ))
  }

  // FOR CHIP
  handleChip = (i) => {
    let chipOpen = this.state.chipOpen
    chipOpen.set(i, true)
    this.setState({chipOpen})
  }

  handleRequestClose = () => {
    this.setState({
      chipOpen: new Map(),
    })
  }

  render () {
    const csNum = this.state.cs_number
    return (
      <Grid style={{minHeight: 500}}>
        <Row>

          <Col xs={12} md={4} lg={4}>
            <div style={styles.noticeTitle} onClick={() => this.fetchData()}> 學生專題申請 </div>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <div style={styles.subTitle}>
              尚可接受專題生數量: {csNum <= 7 ? 7 - csNum + '人' : <span style={{color: 'red', fontWeight: 'bold'}}>(已超收學生)</span> }
            </div>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <div style={styles.subHintTitle}>
              <StudentStatusHint status={1}/>
              <StudentStatusHint status={0}/>
            </div>
          </Col>

        </Row>
        <Row style={styles.groups}>
          {/*<Loading*/}
            {/*size={100}*/}
            {/*left={40}*/}
            {/*top={100}*/}
            {/*isLoading={this.state.loading} />*/}
          {this.state.applyList.length !== 0
            ?
              this.state.applyList.map((item, i) => (
                <ApplyButton
                  key={i}
                  keyId={i}
                  item={item}
                  idCard={this.props.idCard}
                  parentFunction={this.triggerUpdate}
                  chipOpen={this.state.chipOpen}
                  handleChip={this.handleChip}
                  handleRequestClose={this.handleRequestClose}
                />
              ))
            : '(目前尚無專題申請)'
          }
        </Row>
      </Grid>
    )
  }
}
export default GroupApply

const StudentStatusHint = (props) => (
  <MuiThemeProvider>
      <Chip style={styles.chip }
            backgroundColor={ props.status === 1 ? '#BDD8CC' : '#FFCD80' }>
        <Avatar src={defaultPic}/> { props.status === 1 ? '本系生' : '外系生' }
      </Chip>
  </MuiThemeProvider>
)

const ApplyButton = (props) => {
  return (
    <Grid style={styles.groupBtn} key={props.keyId}>
      <Row style={{marginBottom: '10px'}}>
        <Col xs={12} md={12} lg={12}>
          <ReplyDialog
            idCard={props.idCard}
            status={props.item.status}
            title={props.item.research_title}
            participants={props.item.participants}
            firstSecond={props.item.first_second}
            year={props.item.year}
            parentFunction={props.parentFunction}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div style={styles.groupTitle}>
            <span className='apply-btn-year'>{props.item.year}</span>
            {props.item.research_title}
          </div>
          <div>
            <MuiThemeProvider>
              <div style={styles.chipWrapper}>
                {props.item.participants.map((p, i) => (
                  <div key={i}>

                    <Chip style={styles.chip }
                          backgroundColor={ p.student_status === 1 ? '#BDD8CC' : '#FFCD80' }
                          key={i}
                          onClick={() => props.handleChip(props.key + p.student_id)}>
                      <Avatar src={defaultPic}/> {p.student_id} {p.sname}
                      <span style={{color: 'red'}}>  {p.score}</span>
                    </Chip>

                    <MuiThemeProvider>
                      <Dialog
                        key={i}
                        modal={false}
                        open={props.chipOpen.size === 0 ? false : props.chipOpen.get(props.key + p.student_id)}
                        onRequestClose={() => props.handleRequestClose()}
                        autoScrollBodyContent
                        contentStyle={{maxWidth: 'none', width: '90%', position: 'absolute', top: 0, left: '5%'}}
                      >
                        <InfoCard
                          key={i}
                          student={p}
                          sender={props.idCard.tname}
                          sender_email={props.idCard.email}
                        />
                      </Dialog>
                    </MuiThemeProvider>

                  </div>
                ))}
              </div>
            </MuiThemeProvider>
          </div>
        </Col>
      </Row>
    </Grid>
  )
}
