import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'

import ScoreDialog from './ScoreDialog'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Vedios from './Vedio.json'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
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
    fontWeight: '500',
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

class GroupVedio extends React.Component {
  componentWillMount () {
    console.log(Vedios)
  }
  render () {
    Vedios.map((item, i) => (
      console.log(item)
    ))
    return (
      <Grid style={{minHeight: 500}}>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.mainTitle}> 各組專題影片 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}> 可作為評分依據。(影片載入時間依網路速度而定，請耐心等候，謝謝!) </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          { Vedios.map((item, i) => (
            <GroupButton
              key={i}
              item={item}
              />
            ))
          }
        </Row>
      </Grid>
    )
  }
}
export default GroupVedio

const GroupButton = (props) => (
  <Grid style={styles.groupBtn}>
    <Row>
      <Col xs={7} md={7} lg={7}>
        <iframe src={props.item.link} width='600' height='360' />
      </Col>
      <Col xs={5} md={5} lg={5}>
        <div style={styles.groupYear}>主題 : {props.item.title}</div>
      </Col>
      <Col xs={5} md={5} lg={5}>
        <div style={styles.groupYear}>成員 : {props.item.Menber}</div>
      </Col>
    </Row>
  </Grid>
)
