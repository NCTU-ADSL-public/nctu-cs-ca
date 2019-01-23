import React from 'react'
import { Grid, Col } from 'react-bootstrap'
//
import axios from 'axios'
import CourseList from './CourseSearch/CourseList'
import ScoreChart from './ScoreChart'
import GaugeChart from './GaugeChart'

const styles = {
  container: {},
  courseList: {
    width: '50%',
    display: 'inline-block'
  },
  course: {
    main: {
      width: '50%',
      padding: '40px 20px 0 0',
      display: 'inline-block',
      verticalAlign: 'top'
    },
    title: {
      padding: '10px 0 0 60px',
      height: 100,
      width: '100%',
      fontSize: 24,
      fontWeight: 500,
      color: '#7a7a7a',
    },
    box: {
      margin: '0 auto',
      padding: 20,
      width: 400,
    },
    score: {
      margin: '0 auto',
      padding: 10,
      textAlign: 'center',
      width: 600,
      height: 200,
    },
    scoreItem: {
      margin: '0 auto',
      float: 'left',
      padding: 10,
      width: 186,
    }
  },
  score: {
    fontSize: 32,
    fontWeight: 500,
    padding: '3px 0 0 0px',
  }
}

export default class index extends React.Component {

  state = {
    activeKey: '1',
    start: 0,
    //for passing Course id selected by List
    item: {
      id: '',
      sem: '',
      cos_cname: '(無資料)',
      unique_id: '',
      avg: '-',
      Pavg: '-',
    },

    scoreDetail: {
      avg: '-',
      Pavg: '-',
      member: '-',
      passed: '-',
      max: '-',
    },

    scoreChartDetail: {
      passed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      failed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },

    initItem: [
      {
        unique_id: '',
        cos_code: '',
        cos_cname: '(無資料)',
        cos_ename: '',
      },

    ],
  }

  fetchData () {
    axios.get('/professors/courseInfo/courses', {
      id: this.props.tid,
    }).then(res => {
      this.setState({initItem: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tid !== nextProps.tid) {
      this.fetchData()
    }
  }

  onTabClick = (key) => {
    if (key === this.state.activeKey) {
      this.setState({
        activeKey: '1',
      })
    }
  }

  /*_randInt = (num) => ( Math.floor(Math.random() * 10 + num) )

  _randomSetScore = () => {
    let member = Math.floor(Math.random() * 20 + 100)

    let scoreDetail = {
      avgScore: ( Math.random() * 20 + 70 ).toFixed(1),
      pAvgScore: ( Math.random() * 20 + 78 ).toFixed(1),
      member: member,
      passed: Math.floor(member * ( Math.random() * 0.3 + 0.6 )),
      max: Math.floor(( Math.random() * 5 + 95 )),
    }
    let scoreChartDetail = {
      passed: [0, 0, 0, 0, 0, this._randInt(20), this._randInt(50), this._randInt(33), this._randInt(12), this._randInt(1)],
      failed: [0, this._randInt(3), this._randInt(5), this._randInt(7), this._randInt(15), 0, 0, 0, 0, 0],
    }

    console.log(scoreChartDetail)

    this.setState({scoreDetail, scoreChartDetail,})
  }*/

  searchCallback = (item) => {
    this.setState({item})

    axios.post('/professors/courseInfo/score', {
      cos_code: item.cos_code,
      unique_id: item.unique_id,
    }).then(res => {
      this.setState({scoreDetail: res.data[0]})
    }).catch(err => {
      console.log(err)
    })

    axios.post('/professors/courseInfo/scoreInterval', {
      cos_code: item.cos_code,
      unique_id: item.unique_id,
    }).then(res => {
      this.ChartData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  ChartData = (data) => {
    let scoreChartDetail = {
      passed: [0, 0, 0, 0, 0, 0, data[7], data[8], data[9], data[10]],
      failed: [data[1], data[2], data[3], data[4], data[5], data[6], 0, 0, 0, 0],
    }
    this.setState({scoreChartDetail})
  }

  render () {
    const showCourse = (
      <Grid>
        <Col xsHidden smHidden>
          <div style={styles.course.main}>
            <div style={styles.course.title}>[{this.state.item.unique_id}] {this.state.item.sem}
              - {this.state.item.cos_cname}</div>
            <div style={styles.course.score}>
              <div style={styles.course.scoreItem}><ShowScore title={'平均成績'} score={this.state.scoreDetail.avg}/></div>
              <div style={styles.course.scoreItem}><ShowScore title={'及格平均成績'} score={this.state.scoreDetail.Pavg}/>
              </div>
              <div style={styles.course.scoreItem}><ShowScore title={'修課人數'} score={this.state.scoreDetail.member}/>
              </div>
              <div style={styles.course.scoreItem}><ShowScore title={'及格人數'} score={this.state.scoreDetail.passed}/>
              </div>
              <div style={styles.course.scoreItem}><ShowScore title={'不及格人數'}
                                                              score={this.state.scoreDetail.member === '-'
                                                                ? '-'
                                                                : this.state.scoreDetail.member - this.state.scoreDetail.passed}/>
              </div>
              <div style={styles.course.scoreItem}><ShowScore title={'最高分'} score={this.state.scoreDetail.max}/></div>
            </div>
            <div style={styles.course.box}><GaugeChart member={this.state.scoreDetail.member}
                                                       passed={this.state.scoreDetail.passed}/></div>
            <div style={styles.course.box}><ScoreChart detail={this.state.scoreChartDetail}/></div>
          </div>
        </Col>
      </Grid>
    )

    const showDefault = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>(此功能尚在測試階段)</div>
      </div>
    )

    return (
      <div style={styles.container}>

        <div style={styles.courseList}>
          <CourseList items={this.state.initItem} parentFunction={this.searchCallback}/>
        </div>

        {this.state.item.unique_id ? showCourse : showDefault}

      </div>
    )
  }
}

const ShowScore = (props) => (
  <div>
    <div>{props.title}</div>
    <div style={styles.score}>{props.score}</div>
  </div>
)

