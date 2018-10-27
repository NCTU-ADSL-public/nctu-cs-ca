import React, { Component } from 'react'
// import '../../assets/styles/main.scss'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import { Grid, Row, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeItem from './Home/Home.js'
import Map from './Map_v2'
import GradCreditCheckPage from './Graduation_v2'
import Mail from '../../Components/mail'
import ProjectList from './ProjectList'
import Mentor from './Mentor'
import Credit from './Credit'

import Navbar from '../../Components/Navbar'

import defaultData from '../../Resources/FakeData'
import { fetchProfessors } from '../../Redux/Students/Actions/Professor/index'

import { connect } from 'react-redux'
import { fetchUser, ChangeFooterColor } from '../../Redux/Students/Actions/User'
import { fetchCourse, fetchCoursePass } from '../../Redux/Students/Actions/Map'
import { fetchGraduationCourse } from '../../Redux/Students/Actions/Graduation'
import { withRouter } from 'react-router-dom'

let graduationItems = defaultData.GraduationItems
let revise = defaultData.GraduationItems_Revised
// let studentCos = defaultData.Course
// let studentPas = defaultData.CoursePass

// let MapCourseData
// let StudentCosPas

class Head extends Component {
  constructor (props) {
    super(props)
    this.res = this.res.bind(this)
    this.picButtonCallback = this.picButtonCallback.bind(this)
    this.getpageitem = this.getpageitem.bind(this)
    this.getpage = this.getpage.bind(this)
    this.select = this.select.bind(this)
    this.selectProject = this.selectProject.bind(this)

    this.props.FetchUser()
    this.props.FetchProfessorInfo()
    this.props.fetchGraduationCourse()

    this.state = {
      selectedIndex: 0,
      isLoading: true,
      projectName: '',
      project_status_data: [{ 'student_id': '0416008', 'sname': '王冠升', 'research_title': '0416008', 'tname': '彭文志', 'agree': '2', 'first_second': '1', 'phone': 'sds', 'email': 'danny021406.cs04@nctu.edu.tw' }],
      project_data: [{ 'student_id': '0416008', 'semester': '106-2', 'sname': '王冠升', 'research_title': '虛擬貨幣交易機器人', 'tname': '彭文志', 'agree': '1', 'first_second': '1', 'phone': 'sds', 'email': 'danny021406.cs04@nctu.edu.tw' }]
    }
  }

  async componentWillMount () {
    await this.res()
    let _this = this
    this.setState({ isLoading: false })
    this.select(0)
    setTimeout(function () {
      _this.select(0)
    }, 100)
    // setTimeout(function () {
    //   if(_this.state.studentIdcard.sname === '資料錯誤')window.location.reload('/')
    // }, 2000)
  }

  res () {
    // let _this = this
    axios.get('/students/graduate/original').then(studentData => {
      graduationItems = studentData.data
    }).catch(err => {
      console.log(err)
    })
    axios.get('/students/graduate/revised').then(studentData => {
      revise = studentData.data
    }).catch(err => {
      console.log(err)
    })
    /* MapCourseData = Object.keys(studentCos).map(function (key) {
      let user = studentCos[key]
      user.id = key
      return user
    })
    StudentCosPas = Object.keys(studentPas).map(function (key) {
      let user = studentPas[key]
      user.id = key
      return user
    }) */
  }

  picButtonCallback (selection) {
    this.select(selection)
  }

  getpageitem () {
    if (this.state.selectedIndex === 0) {
      this.props.ChangeFooterColor('#6C6C6C')
      return (
        <FadeIn>
          <HomeItem parentFunction={this.picButtonCallback} />
        </FadeIn>
      )
    } else if (this.state.selectedIndex === 1) {
      this.props.ChangeFooterColor('#254c33')
      return (
        <a>
          <FadeIn>
            <GradCreditCheckPage />
          </FadeIn>
        </a>

      )
    } else if (this.state.selectedIndex === 2) {
      this.props.ChangeFooterColor('#5f9191')
      return (
        <div>
          <FadeIn>
            <Map />
          </FadeIn>
        </div>
      )
    } else if (this.state.selectedIndex === 3) {
      this.props.ChangeFooterColor('#01579B')
      return (
        // <FadeIn>
        //  <CreditItem studentIdcard={this.state.studentIdcard}/>
        // </FadeIn>
        <FadeIn>
          <Mentor />
        </FadeIn>
      )
    } else if (this.state.selectedIndex === 4) {
      this.props.ChangeFooterColor('#5D4037')
      return (
        <FadeIn>
          <MuiThemeProvider>
            <ProjectList />
          </MuiThemeProvider>
        </FadeIn>
      )
    } else if (this.state.selectedIndex === 5) {
      this.props.ChangeFooterColor('#5D4037')
      return (
        <FadeIn>
          <MuiThemeProvider>
            <Mail type='student' id={this.props.studentIdcard.student_id} />
          </MuiThemeProvider>
        </FadeIn>
      )
    }
  }
  getpage () {
    if (this.state.selectedIndex === 0) {
      return (
        this.getpageitem()
      )
    } else {
      return (
        <div>
          <Col >
            <div id='page'>
              {this.getpageitem()}
            </div>
          </Col>
          {/* For mobile, tablet user */}
          {/* <Col xs={12} mdHidden lgHidden> */}
          {/* <h2>行動版功能目前測試中，造成不便敬請見諒。</h2> */}
          {/* </Col> */}
        </div>
      )
    }
  }
  // xsHidden smHidden
  select (index) {
    this.setState({ selectedIndex: index })
  }

  // xsHidden smHidden
  selectProject (project) {
    this.setState({ selectedIndex: 10, project: project })
  }
  // <BottomNavigationItem
  //     label="抵免"
  //     icon={checkIcon}
  //     style={this.state.styleButton}
  // onTouchTap={() => this.select(3)}
  // />
  render () {
    const router = [
      '/students/head',
      '/students/grad',
      '/students/map',
      '/students/professor',
      '/students/project'
    ]
    const onTouchTaps = [
      () => this.select(0),
      () => this.select(1),
      () => this.select(2),
      () => this.select(3),
      () => this.select(4),
      () => this.select(5),
      () => this.select(6),
      () => this.select(7),
      () => this.select(8),
      () => this.select(9)
    ]
    const onTouchTapsrouter = [
      () => this.props.history.push(router[0]),
      () => this.props.history.push(router[1]),
      () => this.props.history.push(router[2]),
      () => this.props.history.push(router[3]),
      () => this.props.history.push(router[4]),
      () => this.select(5),
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
            selectedIndex={this.state.selectedIndex}
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
  FetchUser: () => dispatch(fetchUser()),
  FetchProfessorInfo: () => dispatch(fetchProfessors()),
  fetchGraduationCourse: () => dispatch(fetchGraduationCourse()),
  ChangeFooterColor: (color) => dispatch(ChangeFooterColor(color))
})

export default connect(mapState, mapDispatch)(withRouter(Head))
