import React from 'react'
import axios from 'axios'

import { 
  Button,
} from '@material-ui/core'

import WaiveCoursePanel from '../Pages/Students/Credit/Panel/waiveCoursePanel'
import ExemptCoursePanel from '../Pages/Students/Credit/Panel/exemptCoursePanel'
import CompulsoryCoursePanel from '../Pages/Students/Credit/Panel/compulsoryCoursePanel'
import EnglishCoursePanel from '../Pages/Students/Credit/Panel/englishCoursePanel'
import WaiveCourse from '../Pages/Students/Credit/PrintForm/WaiveCourse'
import ExemptCourse from '../Pages/Students/Credit/PrintForm/ExemptCourse'


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
    axios.get('/assistants/offsetApply/Info',{
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
        {
          !this.state.doPrinting &&(
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
            </React.Fragment>
          )
        }
      <div id='printArea'>
          {
            (this.props.match.params.type === name[2] && this.state.all.length > 0 && <WaiveCourse courses={this.state.all} studentIdcard={{
              student_id: this.props.match.params.sid,
              sname: this.props.match.params.sname,
              program: this.props.match.params.program,
              grade: this.props.match.params.grade
            }} />) 
             || (this.props.match.params.type === name[3] && this.state.all.length > 0 && <ExemptCourse courses={this.state.all} studentIdcard={{
              student_id: this.props.match.params.sid,
              sname: this.props.match.params.sname,
              program: this.props.match.params.program,
              grade: this.props.match.params.grade
            }} />)
          }
        </div>
      </React.Fragment>
    )
  }
}

export default StudentVerify
