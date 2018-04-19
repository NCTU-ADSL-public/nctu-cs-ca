import React from 'react'

import axios from 'axios'
import List from './Search/List'
import Profile from './Search/Profile'

import FakeData from '../../../Resources/FakeData'

const styles = {
  container: {
  },
  list: {
    width: '50%',
    display: 'inline-block'
  },
  course: {
    main: {
      width: '500px',
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
      teacher: "default",

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

      initItem: [{"tname":"吳凱強","scount":"1"},{"tname":"吳毅成","scount":"5"},{"tname":"吳育松","scount":"1"}],
    }
  }

  fetchData(){
    axios.get('/students/projectNum').then(function (resp) {
    this.setState({
      initItem: resp.data
    })}.bind(this)).catch(err => {
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
    console.log(item)
    this.setState({teacher: item})
  }

  render () {

    const showDefault = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>請由左方列表點選教授</div>
      </div>
    );

    return (
      <div style={styles.container}>

        <div style={styles.list}>
          <List items={this.state.initItem} parentFunction={this.searchCallback}/>
        </div>

        { this.state.teacher !== "default" ?
          <div style={styles.course.main}>
            <Profile name = {this.state.teacher}/>
          </div>: showDefault }

      </div>
    )
  }
}


