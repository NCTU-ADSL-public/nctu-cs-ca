import React from 'react'
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
        student_id: this.props.match.params.sid
      }
    }).then(
      res => {
        this.setState({data: res.data[this.props.match.params.type].filter(e=> e.timestatmp === this.props.match.params.time)[0]})
      }
    )
  }
  render () {
    const name = ['compulsory_course','english_course','waive_course','exempt_course']
    return (
      <div style={{margin: '100px auto',marginBottom: 50,width: '90%'}}>
        {this.props.match.params.type === name[0] && <CompulsoryCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[1] && <EnglishCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[2] && <WaiveCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[3] && <ExemptCoursePanel data={this.state.data}/>}
      </div>
    )
  }
}

export default StudentVerify
