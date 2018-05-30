import React from 'react'
import axios from 'axios'

import List from './Search/List'
import Profile from './Search/Profile'

import FakeData from '../../../Resources/FakeData'

const styles = {
  container: {
    width: '100%',
  },
  list: {
    width: '50%',
    display: 'inline-block',
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
      teacher: "default",
      initItem: FakeData.ProjectNum,
      profile: {
        name: '彭文志',
        phone: '48763',
        photo: '',
        email: 'wcpeng@nctu.edu.tw',
        expertise: '資料庫、電腦視覺、深度學習',
        info: '我的經歷就是範例...'
      }
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

  async componentWillMount(){
    await this.fetchData();
  }

  async componentWillReceiveProps(nextProps){
    if(this.props.tid !== nextProps.tid){
      await this.fetchData();
    }
  }

  searchCallback = (item) => {
    console.log("before"+item)
    this.setState({teacher: item})
    axios.post('/students/ProInfo', {
      teacher_id: item
    }).then(res => {
      this.setState({
        profile: {
          name: res.data[0].tname,
          phone: res.data[0].phone,
          email: res.data[0].email,
          expertise: res.data[0].expertise,
          info: res.data[0].info,
          photo: res.data[0].photo
        }
      })
    }).catch(err => {
      console.log(err)
    })
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
            <Profile teacher={this.state.teacher} profile = {this.state.profile} studentIdcard={this.props.studentIdcard}/>
          </div>: showDefault }

      </div>
    )
  }
}


