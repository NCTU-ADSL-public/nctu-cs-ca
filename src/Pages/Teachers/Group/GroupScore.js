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
  render () {
    return (
      <Grid style={{minHeight: 500}}>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.mainTitle}> 各組專題影片 </div>
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
      <Col xs={9} md={9} lg={9}>
        <div style={styles.groupYear}>{props.year}年度</div>
        <div style={styles.groupTitle}>{props.title}</div>
      </Col>
    </Row>
  </Grid>
)
