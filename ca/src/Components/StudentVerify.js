import React from 'react'
import Frame from './Frame'
import axios from 'axios'

import WaiveCoursePanel from '../Pages/Students/Credit/CreditPanel/waiveCoursePanel'
import ExemptCoursePanel from '../Pages/Students/Credit/CreditPanel/exemptCoursePanel'
import CompulsoryCoursePanel from '../Pages/Students/Credit/CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from '../Pages/Students/Credit/CreditPanel/englishCoursePanel'


class StudentVerify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data : {}
    }
    
  }
  componentDidMount(){
    axios.get('/students/credit/all',{
      params: {
        id: this.props.sid
      }
    }).then(
      res => {
        this.setState({data: res.data[this.props.type].filter(e=> e.timestatmp === this.props.time)[0]})
      }
    )
  }
  render () {
    return (
      <Frame>
        {/* {this.props.type === name[0] && <CompulsoryCoursePanel data={}/>}
        {this.props.type === name[1] && <CompulsoryCoursePanel data={}/>}
        {this.props.type === name[2] && <CompulsoryCoursePanel data={}/>}
        {this.props.type === name[3] && <CompulsoryCoursePanel data={}/>} */}
      </Frame>
    )
  }
}

export default StudentVerify
