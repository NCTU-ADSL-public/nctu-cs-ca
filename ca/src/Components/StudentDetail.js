import React from 'react'
import Frame from './Frame'
import StudentGrad from '../Pages/Students/Graduation'

import { fetchGraduationCourseAssistantVersion } from '../Redux/Students/Actions/Graduation/index'
import { connect } from 'react-redux'

class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    props.fetchGraduationCourseAssistantVersion(this.props.match.params.sid, this.props.match.params.sname, this.props.match.params.program, 0)
  }

  render () {
    return (
      <Frame>
        <StudentGrad />
      </Frame>
    )
  }
}
const mapState = (state) => ({
  done: state.Student.Graduation.status === 'DONE'
})

const mapDispatch = (dispatch) => ({
  fetchGraduationCourseAssistantVersion: (id, sname, program, feild) => dispatch(fetchGraduationCourseAssistantVersion(id, sname, program, feild))
})

export default connect(mapState, mapDispatch)(StudentDetail)
