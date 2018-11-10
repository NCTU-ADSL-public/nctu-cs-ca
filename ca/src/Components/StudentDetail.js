import React from 'react'
import Frame from './Frame'
import StudentGrad from '../Pages/Students/Graduation_v2/index'

import Loading from './Loading'

import { fetchGraduationCourseAssistantVersion } from '../Redux/Students/Actions/Graduation/index'
import { connect } from 'react-redux'

class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    props.fetchGraduationCourseAssistantVersion(this.props.match.params.sid, this.props.match.params.sname, this.props.match.params.program)
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
  fetchGraduationCourseAssistantVersion: (id, sname, program) => dispatch(fetchGraduationCourseAssistantVersion(id, sname, program))
})

export default connect(mapState, mapDispatch)(StudentDetail)
