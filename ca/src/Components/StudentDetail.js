import React from 'react'
import axios from 'axios'
import Frame from './Frame'
import StudentGrad from '../Pages/Students/Graduation_v2/index'

import Loading from './Loading'

import { fetchGraduationCourseAssistantVersion } from '../Redux/Students/Actions/Graduation/index'
import { connect } from 'react-redux'

class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props.match.params.sid)
    props.fetchGraduationCourseAssistantVersion(this.props.match.params.sid)
  }

  render () {

    return (
      <Frame>
        <StudentGrad />
      </Frame>
    )
    if (this.props.done) {
      return (
        <Loading size={100}
          left={100}
          top={100}
          isLoading
                />
      )
    } else {
      return (
        <Frame>
          <StudentGrad />
        </Frame>
      )
    }
  }
}
const mapState = (state) => ({
  done: state.Student.Graduation.status === 'DONE'
})

const mapDispatch = (dispatch) => ({
  fetchGraduationCourseAssistantVersion: (id) => dispatch(fetchGraduationCourseAssistantVersion(id))
})

export default connect(mapState, mapDispatch)(StudentDetail)
