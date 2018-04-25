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
    subTitle: {
      padding: '10px 0 0 60px',
      height: 40,
      width: '100%',
      fontSize: 18,
      fontWeight: 300,
      color: '#7a7a7a',
    },
  }
}

export default class index extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      //for passing Course id selected by List

      item: {},
      initItem: FakeData.MailList,
    }
  }

  fetchData(){
    axios.post('/professors/mail/inbox', {
      id: 'T9229'
      // id: this.props.tid,
    }).then(res => {
      console.log('DATA RECEIVED')
      console.log(res.data)
      this.setState({initItem: res.data})
    }).catch(err => {
      console.log(err)
    })
  }

  fetchMailContent(mid){
    axios.post('/professors/mail/content', {
      mail_id: mid,
    }).then(res => {
      console.log('MAIL CONTENT RECEIVED')
      console.log(res.data)
      this.setState({item: res.data[0]})
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
    this.fetchMailContent(item.mail_id)
  }

  render () {
    const showCourse = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>{this.state.item.title}</div>
        <div style={styles.course.subTitle}>寄件人: {this.state.item.sender_id} {this.state.item.sender}</div>
        <div style={styles.course.subTitle}>寄信時間: {this.state.item.send_time}</div>
        <div style={styles.course.subTitle}>{this.state.item.content}</div>
      </div>
    );

    const showDefault = (
      <div style={styles.course.main}>
        <div style={styles.course.title}>請由左方列表點選信件</div>
      </div>
    );

    return (
      <div style={styles.container}>

        <div style={styles.list}>
          <List items={this.state.initItem} parentFunction={this.searchCallback}/>
        </div>

        { this.state.item.mail_id ? showCourse : showDefault }

      </div>
    )
  }
}

const ShowItem = (props) => (
  <div>
    <div>{props.title}</div>
    <div style={styles.score}>{props.score}</div>
  </div>
)

