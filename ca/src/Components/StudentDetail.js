import React from 'react'
import Frame from './Frame'
import StudentGrad from '../Pages/Students/Graduation'

import { getGraduationInfoAssistantVersion } from '../Redux/Students/Actions/Graduation/index'
import { connect } from 'react-redux'

class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    props.getGraduationInfoAssistantVersion(this.props.match.params.sid, this.props.match.params.sname, this.props.match.params.program, 0)
  }

  render () {
    return (
      <Frame>
        <StudentGrad />
      </Frame>
    )
  }
}
const mapState = (state) => ({})

const mapDispatch = (dispatch) => ({
  getGraduationInfoAssistantVersion: (id, sname, program, feild) => dispatch(getGraduationInfoAssistantVersion(id, sname, program, feild))
})

export default connect(mapState, mapDispatch)(StudentDetail)
