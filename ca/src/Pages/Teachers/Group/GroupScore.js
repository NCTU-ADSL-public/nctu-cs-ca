import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'

import ScoreDialog from './ScoreDialog'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  noticeTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#bf6468',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#c87137',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#737373',
    margin: '55px 0 0 50px',
    float: 'left'
  },
  groups: {
    margin: '60px 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '6px',
    border: '1px #dfdfdf solid'
  },
  groupBtnThisYear: {
    margin: 30,
    padding: 20,
    background: '#f8efdd',
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
  groupScore: {
    fontSize: '1.6em',
    fontWeight: '100',
    color: '#c82230'
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

class GroupScore extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      total_number: 3,
      groupList: [],
      /*groupList: [
        { research_title: '資料錯誤',
          first_second: '0',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 ',
              score: 11,
            },
            { student_id: '0399777',
              sname: '李小霖',
              detail: '資工系 網多組3 ',
              score: 87,
            },
            { student_id: '0391234',
              sname: '郭小杰',
              detail: '資工系 網多組3 ',
              score: 90,
            }
          ],
          year: '106'
        }
      ]*/
    }
  }
  fetchData () {
    console.log(this.props.idCard.name)
    axios.get('/professors/students/projects', {
      // name: '彭文志'
      // name: this.props.idCard.name
      id: this.props.idCard.id
    }).then(res => {
      this.setState({
        total_number: res.data.total_number,
        groupList: res.data.groups
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
            <div style={styles.mainTitle}> 專題評分 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}> 請點擊評分按鈕給予評分。 </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          {this.state.groupList.length !== 0
            ? this.state.groupList.map((item, i) => (
              <GroupButton
                key={i}
                title={item.research_title}
                participants={item.participants}
                firstSecond={item.first_second}
                year={item.year}
                score={item.score}
                parentFunction={this.triggerUpdate}
                idCard={this.props.idCard}
              />
            ))
            : '(無專題生資料)'
          }
        </Row>
      </Grid>
    )
  }
}
export default GroupScore

const GroupButton = (props) => (
  <Grid style={props.year === '106' ? styles.groupBtnThisYear : styles.groupBtn}>
    <Row>
      <Col xs={3} md={3} lg={3}>
        <Image style={styles.pic} src={pic} circle />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <div style={styles.groupYear}>{props.year}年度</div>
        <ScoreDialog
          title={props.title}
          participants={props.participants}
          firstSecond={props.firstSecond}
          score={props.score}
          idCard={props.idCard}
          year={props.year}
          parentFunction={props.parentFunction}
        />
        {/*<div style={styles.groupScore}>評分: {props.score || '(尚未給評)' }</div>*/}
        <div style={styles.groupTitle}>{props.title}</div>
        <div>
          <MuiThemeProvider>
            <div style={styles.chipWrapper}>
              {props.participants.map((item, i) => (
                <Chip style={styles.chip} key={i}>
                  <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                  <span style={{color: 'red'}}>  {item.score}</span>
                </Chip>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
      </Col>
    </Row>
  </Grid>
)
