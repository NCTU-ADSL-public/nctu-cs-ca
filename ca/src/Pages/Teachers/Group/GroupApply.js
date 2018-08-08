import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'
import ReplyDialog from './ReplyDialog'

import Loading from '../../../Components/Loading'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  noticeTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#e5e5e5',
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
    margin: '55px 0 0 70px',
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
    border: '1px #dfdfdf solid'
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
      total_number: 0,
      applyList: []
      /*applyList: [
        { research_title: '資料錯誤',
          status: 0,
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            },
            { student_id: '0399777',
              sname: '李小霖',
              detail: '資工系 網多組3 '
            },
            { student_id: '0391234',
              sname: '李毛毛',
              detail: '資工系 網多組3 '
            }
          ],
          year: ''
        },
        { research_title: '資料錯誤',
          status: '1',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: ''
        },
        { research_title: '資料錯誤',
          status: '2',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: ''
        },
        { research_title: '資料錯誤',
          status: '3',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: ''
        }
      ]*/
    }
  }
  fetchData () {
    axios.get('/professors/students/applyList', {
      // name: '彭文志'
      // name: this.props.idCard.name
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

    axios.get('/professors/students/projects', {
      // name: '彭文志'
      // name: this.props.idCard.name
      id: this.props.idCard.id
    }).then(res => {
      this.setState({
        total_number: res.data.total_number,
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
  render () {
    const tn = this.state.total_number
    return (
      <Grid style={{minHeight: 500}}>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.noticeTitle} onClick={() => this.fetchData()}> 學生專題申請 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}>
              尚可接受專題生數量: {tn <= 7 ? 7 - tn + '人' : '(已超收學生)'}
            </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          <Loading
            size={100}
            left={40}
            top={100}
            isLoading={this.state.loading} />
          {this.state.applyList.length !== 0
            ?
              this.state.applyList.map((item, i) => (
                <ApplyButton
                  key={i}
                  title={item.research_title}
                  participants={item.participants}
                  name={this.props.idCard.name}
                  status={item.status}
                  parentFunction={this.triggerUpdate}
                  firstSecond={item.first_second}
                  year={item.year}
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

const ApplyButton = (props) => {
  return (
    <Grid style={styles.groupBtn}>
      <Row style={{marginBottom: '10px'}}>
        <Col xs={12} md={12} lg={12}>
          <ReplyDialog
            status={props.status}
            title={props.title}
            name={props.name}
            participants={props.participants}
            parentFunction={props.parentFunction}
            firstSecond={props.firstSecond}
            year={props.year}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div style={styles.groupTitle}>{props.title}</div>
          <div>
            <MuiThemeProvider>
              <div style={styles.chipWrapper}>
                {props.participants.map((item, i) => (
                  <Chip style={styles.chip} key={i}>
                    <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                  </Chip>
                ))}
              </div>
            </MuiThemeProvider>
          </div>
        </Col>
      </Row>
    </Grid>
  )
}
