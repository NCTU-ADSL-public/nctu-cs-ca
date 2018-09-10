import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import { Grid, Row, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeItem from './Home.js'
import CourseItem from './Course/index.js'
import GroupItem from './Group/Group.js'
import FamilyItem from './Family/index.js'
import ProfileItem from './Profile.js'
import Mail from '../../Components/mail'

import Navbar from '../../Components/Navbar'

// Redux
import {connect} from 'react-redux'
import {fetchUser, UpdateUserInfo} from '../../Redux/Teachers/Actions/User'

class Head extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      idCard: {
        name: '資料錯誤',
        status: 'teacher',
        id: '0000'
      }
    }
  }

  componentWillMount () {
    axios.get('/professors/profile').then(res => {
      this.props.UpdateUserInfo({
        tname: res.data[0].tname,
        status: res.data[0].status,
        teacher_id: res.data[0].teacher_id
      })
      this.setState({
        idCard: {
          name: res.data[0].tname,
          status: res.data[0].status,
          id: res.data[0].teacher_id
        }
      })
      this.select(2)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.select(0)
  }

  select (index) {
    if (index === 0) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <div>
            <FadeIn>
              <HomeItem />
            </FadeIn>
          </div>
        </Col>,
        document.getElementById('page'))
    } else if (index === 1) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <div>
            <FadeIn>
              <CourseItem tid={this.state.idCard.id} />
            </FadeIn>
          </div>
        </Col>,
        document.getElementById('page'))
    } else if (index === 2) {
      ReactDOM.render(
        <Col>
          <FadeIn>
            <GroupItem idCard={this.state.idCard} />
          </FadeIn>
        </Col>,
        document.getElementById('page'))
    } else if (index === 3) {
      ReactDOM.render(
        <Col>
          <a>
            <FadeIn>
              <FamilyItem tname={this.state.idCard.name} tid={this.state.idCard.id} tmail={this.state.idCard.mail} />
            </FadeIn>
          </a>
        </Col>,
        document.getElementById('page'))
    } else if (index === 4) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <a>
            <FadeIn>
              <MuiThemeProvider>
                <Mail type='professor' id={this.state.idCard.id} />
              </MuiThemeProvider>
            </FadeIn>
          </a>
        </Col>,
        document.getElementById('page'))
    } else if (index === 5) {
      ReactDOM.render(
        <FadeIn>
          <ProfileItem idCard={this.state.idCard} />
        </FadeIn>,
        document.getElementById('page'))
    }

    this.setState({selectedIndex: index})
  }

  render () {
    const onTouchTaps = [
      () => this.select(0),
      () => this.select(1),
      () => this.select(2),
      () => this.select(3),
      () => this.select(4),
      () => this.select(5)
    ]
    return (
      <Grid id='Head' fluid>
        <Row style={{background: '#F5F5F5'}}>
          <Navbar type='teacher'
            name={this.state.idCard.tname}
            subname={this.state.idCard.teacher_id}
            selectedIndex={this.state.selectedIndex}
            onTouchTaps={onTouchTaps}
          />
          <Col xs={12} mdHidden lgHidden>
            { this.state.selectedIndex === 3 || this.state.selectedIndex === 5
              ? ''
              : <div className='alert alert-danger'>
                行動版網頁尚會跑版，可用電腦登入打開網頁以享有更佳的視覺效果，謝謝
              </div> }
          </Col>
          <Col xs={12} md={12} style={{padding: 0}}>
            <div id='page' />
          </Col>
          {/* For mobile, tablet user */}
        </Row>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  idCard: state.Teacher.User.idCard
})

const mapDispatch = (dispatch) => ({
  FetchUser: () => dispatch(fetchUser()),
  UpdateUserInfo: (t) => dispatch(UpdateUserInfo(t))
})

export default connect(mapState, mapDispatch)(Head)
