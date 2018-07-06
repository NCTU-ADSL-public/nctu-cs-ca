import React from 'react'

import axios from 'axios'
import List from './Search/List'

import FakeData from '../../../Resources/FakeData'

const styles = {
  container: {},
  list: {
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

  constructor (props) {
    super(props);
    this.state = {
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

      initItem: FakeData.StudentList,
    }
  }

  fetchData(){
    axios.get('/professors/students/list', {
      id: this.props.tid,
    }).then(res => {
      this.setState({initItem: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount(){
    this.fetchData();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.tid !== nextProps.tid){
      this.fetchData();
    }
  }

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
    this.setState({ scoreChartDetail });
  }

  render () {
    // const showCourse = (
    //   <div style={styles.course.main}>
    //     <div style={styles.course.title}>[{this.state.item.unique_id}] {this.state.item.sem}
    //       - {this.state.item.cos_cname}</div>
    //     <div style={styles.course.score}>
    //       <div style={styles.course.scoreItem}><ShowScore title={'平均成績'} score={this.state.scoreDetail.avg}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'及格平均成績'} score={this.state.scoreDetail.Pavg}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'修課人數'} score={this.state.scoreDetail.member}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'及格人數'} score={this.state.scoreDetail.passed}/></div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'不及格人數'}
    //                                                       score={ this.state.scoreDetail.member === '-'
    //                                                         ? '-'
    //                                                         : this.state.scoreDetail.member - this.state.scoreDetail.passed}/>
    //       </div>
    //       <div style={styles.course.scoreItem}><ShowScore title={'最高分'} score={this.state.scoreDetail.max}/></div>
    //     </div>
    //     <div style={styles.course.box}><GaugeChart member={this.state.scoreDetail.member}
    //                                                passed={this.state.scoreDetail.passed}/></div>
    //     <div style={styles.course.box}><ScoreChart detail={this.state.scoreChartDetail}/></div>
    //   </div>
    // );

    const showDefault = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>(此功能尚在測試階段)</div>
      </div>
    );

    return (
      <div style={styles.container}>

        <div style={styles.list}>
          <List items={this.state.initItem} parentFunction={this.searchCallback}/>
        </div>

        {/*{ this.state.item.unique_id ? showCourse : showDefault }*/}
        { showDefault }

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

