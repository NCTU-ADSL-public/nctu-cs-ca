import React from 'react'
import axios from 'axios'

import { 
  Button,
} from '@material-ui/core'

import WaiveCoursePanel from '../Pages/Students/Credit/CreditPanel/waiveCoursePanel'
import ExemptCoursePanel from '../Pages/Students/Credit/CreditPanel/exemptCoursePanel'
import CompulsoryCoursePanel from '../Pages/Students/Credit/CreditPanel/compulsoryCoursePanel'
import EnglishCoursePanel from '../Pages/Students/Credit/CreditPanel/englishCoursePanel'
import WaiveCourse from '../Pages/Students/Credit/ApplicationForm/WaiveCourse'
import ExemptCourse from '../Pages/Students/Credit/ApplicationForm/ExemptCourse'


class StudentVerify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      all: [],
      data : {},
      doPrinting: false
    }
    this.printApplicationTable = this.printApplicationTable.bind(this)
  }
  componentDidMount(){
    axios.get('/assistants/credit/all',{
      params: {
        student_id: this.props.match.params.sid
      }
    }).then(
      res => {
        this.setState({
          all: res.data[this.props.match.params.type],
          data: res.data[this.props.match.params.type].filter(e=> e.timestamp === this.props.match.params.time)[0]
        })
      }
    )
  }
  componentDidUpdate () {
    if(this.state.doPrinting){
      this.setState({doPrinting: false})
      window.print()
    }
  }

  printApplicationTable () {
    document.title = this.props.match.params.type
    this.setState({ doPrinting: true })
  }
  render () {
    const name = ['compulsory_course','english_course','waive_course','exempt_course']
    return (
      <React.Fragment>
      <div style={{ marginTop: '70px',textAlign: 'right',paddingRight: '5%'}}>
        <Button
          variant='contained'
          color='primary'
          onClick={this.printApplicationTable}
          disabled={this.props.match.params.type === name[0] || this.props.match.params.type === name[1]}
        >
          列印申請表
        </Button>
      </div>
      <div style={{margin: '50px auto',marginBottom: 50,width: '90%'}}>
        {this.props.match.params.type === name[0] && <CompulsoryCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[1] && <EnglishCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[2] && <WaiveCoursePanel data={this.state.data}/>}
        {this.props.match.params.type === name[3] && <ExemptCoursePanel data={this.state.data}/>}
      </div>
      <div id='printArea'>
          {
            (this.props.match.params.type === name[2] && <WaiveCourse course={this.state.all}/>) 
             || (this.props.match.params.type === name[3] && <ExemptCourse course={this.state.all}/>)
          }
        </div>
      </React.Fragment>
    )
  }
}

export default StudentVerify
