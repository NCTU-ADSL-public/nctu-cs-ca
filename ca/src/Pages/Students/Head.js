import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row } from 'react-bootstrap'
import Navbar from '../../Components/Navbar'
import { fetchProfessors } from '../../Redux/Students/Actions/Professor'
import { fetchUser } from '../../Redux/Students/Actions/User'
import { fetchCourse, fetchCoursePass } from '../../Redux/Students/Actions/Map'
import { fetchGraduationCourse } from '../../Redux/Students/Actions/Graduation'


class Head extends Component {
  componentDidMount () {
    this.props.fetchUser()
    this.props.fetchProfessor()
    this.props.fetchCourse()
    this.props.fetchCoursePass()
    this.props.fetchGraduationCourse()
  }

  render () {
    const router = [
      '/students/head',
      '/students/grad',
      '/students/map',
      '/students/recommend',
      '/students/professor',
      '/students/project',
      '/students/credit'
    ]
    const onTouchTapsrouter = [
      () => this.props.history.push(router[0]),
      () => this.props.history.push(router[1]),
      () => this.props.history.push(router[2]),
      () => this.props.history.push(router[3]),
      () => this.props.history.push(router[4]),
      () => this.props.history.push(router[5]),
      () => this.props.history.push(router[6]),
      () => this.select(6),
      () => this.select(7),
      () => this.select(8),
      () => this.select(9)
    ]
    const onTouchTapsOthers = [
      () => this.select(0),
      () => window.alert('非資工系學生無此功能'),
      () => window.alert('非資工系學生無此功能'),
      () => this.select(3),
      () => this.select(4),
      () => this.select(5),
      () => this.select(6),
      () => this.select(7),
      () => this.select(8),
      () => this.select(9)
    ]
    const subname = this.props.studentIdcard.program + this.props.studentIdcard.grade
    return (
      <Grid id='Head' fluid>
        <Row>
          <Navbar type={'student'}
            version={this.props.studentIdcard.grad}
            name={this.props.studentIdcard.sname}
            id={this.props.studentIdcard.student_id}
            subname={subname}
            onTouchTaps={this.props.studentIdcard.status === 'c' ? onTouchTapsOthers : onTouchTapsrouter}
            onTouchProjectTaps={this.selectProject}
            router={router}
          />
        </Row>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  printData: state.Student.Graduation.data
})

const mapDispatch = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchProfessor: () => dispatch(fetchProfessors()),
  fetchCourse: () => dispatch(fetchCourse()),
  fetchCoursePass: () => dispatch(fetchCoursePass()),
  fetchGraduationCourse: () => dispatch(fetchGraduationCourse())
})

export default connect(mapState, mapDispatch)(withRouter(Head))
