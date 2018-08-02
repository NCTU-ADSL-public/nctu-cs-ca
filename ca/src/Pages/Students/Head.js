import React, { Component } from 'react'
//import '../../assets/styles/main.scss'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import {Grid,Row,Col} from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeItem from './Home/Home.js'
import MapItem from './Map/MapComponents/Map.js'
import GradCreditCheckPage from './Graduation_v2'
import CreditItem from './Credit/Credit.js'
import Mail from '../../Components/mail'
import ProjectList from './ProjectList'
import Mentor from './Mentor'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import Navbar from '../../Components/Navbar'
import Loading from '../../Components/Loading'
import graduationStore from './Graduation_v2/Reducers'

import defaultData from '../../Resources/FakeData'
import { createStore, applyMiddleware } from 'redux'
import { fetchProfessors } from '../../Redux/Students/Actions/Professor/index'
import { fetchGraduationCourse } from './Graduation_v2/Actions'

import {connect} from 'react-redux'
import {fetchUser, ChangeFooterColor} from '../../Redux/Students/Actions/User'

let store_graduation = createStore(graduationStore, applyMiddleware(thunk))

let graduationItems = defaultData.GraduationItems
let revise = defaultData.GraduationItems_Revised
let studentCos = defaultData.Course
let studentPas = defaultData.CoursePass
let printData = defaultData.PrintData

let MapCourseData
let StudentCosPas


class Head extends Component {
  constructor (props) {
    super(props)
    this.res = this.res.bind(this)
    this.props.FetchProfessorInfo()
    this.props.FetchUser()
    store_graduation.dispatch(fetchGraduationCourse())
  }

  state = {
    selectedIndex: 0,
    print_courseCategoryArray: printData,
    isLoading:true,
    projectName:'',
    project_status_data:[{"student_id":"0416008","sname":"王冠升","research_title":"0416008","tname":"彭文志","agree":"2","first_second":"1","phone":"sds","email":"danny021406.cs04@nctu.edu.tw"}],
    project_data:[{"student_id":"0416008","semester":"106-2","sname":"王冠升","research_title":"虛擬貨幣交易機器人","tname":"彭文志","agree":"1","first_second":"1","phone":"sds","email":"danny021406.cs04@nctu.edu.tw"}]
  }

  async componentWillMount () {
    await this.res()
    let _this = this
    this.setState({isLoading:false})
    this.select(0)
    setTimeout(function () {
      _this.select(0)
    }, 100)
    // setTimeout(function () {
    //   if(_this.state.studentIdcard.sname === '資料錯誤')window.location.reload('/')
    // }, 2000)
  }

  res () {
    let _this = this
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
    MapCourseData = Object.keys(studentCos).map(function (key) {
      let user = studentCos[key]
      user.id = key
      return user
    })
    StudentCosPas = Object.keys(studentPas).map(function (key) {
      let user = studentPas[key]
      user.id = key
      return user
    })
    axios.get('/students/courseMap').then(studentData => {
      MapCourseData = Object.keys(studentData.data).map(function (key) {
        let user = studentData.data[key]
        user.id = key
        return user
      })
    }).catch(err => {
      console.log(err)
    })
    axios.get('/students/coursePass').then(studentData => {
      // studentData.status HTTP response code (e.g., 200, 401)
      // studentData.data object parsed from HTTP response body
      // studentData.headers  HTTP presonse headers

      StudentCosPas = Object.keys(studentData.data).map(function (key) {
        let user = studentData.data[key]
        user.id = key
        return user
      })

    }).catch(err => {
      console.log(err)
    })

    axios.get('/students/graduate/print').then(function (resp) {
      this.setState({
        print_courseCategoryArray: resp.data
      })

    }.bind(this)).catch(err => {
      console.log(err)
    })

  }

  picButtonCallback = (selection) => {
    this.select(selection)
  }

  getpageitem = () => {

    if (this.state.selectedIndex === 0) {
      this.props.ChangeFooterColor('#6C6C6C')
      return(
        <FadeIn>
          <HomeItem parentFunction={this.picButtonCallback}/>
        </FadeIn>
      )
    }
    else if (this.state.selectedIndex === 1) {
      this.props.ChangeFooterColor('#34855e')
      return(
        <a>
          <FadeIn>
            <Provider store={store_graduation}>
            <GradCreditCheckPage
              items={graduationItems}
              result={graduationItems[11]}
              revise={revise}
              reviseresult={revise[11]}
              studentProfile={this.props.studentIdcard}
              courseCategoryArray={this.state.print_courseCategoryArray}/>
            </Provider>
          </FadeIn>
        </a>

      )
    }
    else if (this.state.selectedIndex === 2) {
      this.props.ChangeFooterColor('#34855e')
      return(
        <div>
          <FadeIn>
            <MapItem
              studentPasdata={StudentCosPas}
              data={MapCourseData}
              studentId={this.props.studentIdcard.program}
              studentsGrad={this.props.studentIdcard.grade}/>
          </FadeIn>
        </div>
      )
    }
    else if (this.state.selectedIndex === 3) {
      this.props.ChangeFooterColor('#01579B')
      return(
        //<FadeIn>
        //  <CreditItem studentIdcard={this.state.studentIdcard}/>
        //</FadeIn>
        <FadeIn>
          <Mentor studentIdcard={this.props.studentIdcard}/>
        </FadeIn>
      )
    }
    else if (this.state.selectedIndex === 4) {
      this.props.ChangeFooterColor('#34855e')
      return(
        <FadeIn>
          <MuiThemeProvider>
            <Mail type='student' id={this.props.studentIdcard.student_id}/>
          </MuiThemeProvider>
        </FadeIn>
      )
    }
    else if (this.state.selectedIndex === 5) {
      this.props.ChangeFooterColor('#5D4037')
      return(
        <FadeIn>
          <MuiThemeProvider>
            <ProjectList project_status={this.state.project_status_data} project={this.state.project_data} studentProfile={this.props.studentIdcard}/>
          </MuiThemeProvider>
        </FadeIn>
      )
    }
  }
  getpage = () => {
    if(this.state.selectedIndex===0){
      return(
        this.getpageitem()
      )
    }
    else {
      return (
        <div>
          <Col >
            <div id="page">
              {this.getpageitem()}
            </div>
          </Col>
          {/* For mobile, tablet user */}
          {/*<Col xs={12} mdHidden lgHidden>*/}
            {/*<h2>行動版功能目前測試中，造成不便敬請見諒。</h2>*/}
          {/*</Col>*/}
        </div>
      )
    }
  }
  // xsHidden smHidden
  select (index) {
    this.setState({selectedIndex: index })
  }

  // xsHidden smHidden
  selectProject = (project) => {
    this.setState({selectedIndex: 10, project:project})
  }
// <BottomNavigationItem
//     label="抵免"
//     icon={checkIcon}
//     style={this.state.styleButton}
// onTouchTap={() => this.select(3)}
// />
  render () {
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
      () => this.select(9),
    ]

    return (
      <Grid id="Head" fluid={true}>
        <Row>
          <Navbar type={ 'student'}
                  version={this.props.studentIdcard.grad}
                  name={this.props.studentIdcard.sname}
                  id={this.props.studentIdcard.student_id}
                  subname={this.props.studentIdcard.program + this.props.studentIdcard.grade}
                  selectedIndex={ this.state.selectedIndex}
                  onTouchTaps={onTouchTaps}
                  onTouchProjectTaps={this.selectProject}
          />
            {this.getpage()}
        </Row>
      </Grid>
    )
  }
}


const mapState = (state)=>({
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatch = (dispatch)=>({
  FetchUser: () => dispatch(fetchUser()),
  FetchProfessorInfo: () => dispatch(fetchProfessors()),
  ChangeFooterColor: (color) => dispatch(ChangeFooterColor(color))
})

export default connect(mapState, mapDispatch)(Head)
