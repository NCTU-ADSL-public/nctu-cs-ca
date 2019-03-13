import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'


import Navbar from '../../Components/Navbar'

// Redux
import {connect} from 'react-redux'
import {fetchUser} from '../../Redux/Teachers/Actions/User'

const router = [
  '/teachers/head',
  '/teachers/group',
  '/teachers/course',
  '/teachers/family',
  '/teachers/verify'
]

class Head extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.props.FetchUser()
  }

  select (index) {
    this.props.history.push(router[index])
    this.setState({selectedIndex: index})
  }
  render () {
    const onTouchTapsrouter = [
      () => this.select(0),
      () => this.select(1),
      () => this.select(2),
      () => this.select(3),
      () => this.select(4)
    ]
    return (
      <Grid id='Head' fluid>
        <Row style={{background: '#F5F5F5'}}>
          <Navbar type='teacher'
            name={this.props.idCard.tname}
            subname={this.props.idCard.teacher_id}
            selectedIndex={this.state.selectedIndex}
            onTouchTaps={onTouchTapsrouter}
            router={router}
          />
          <Col xs={12} mdHidden lgHidden>
            { this.state.selectedIndex === 0 || this.state.selectedIndex === 1 || this.state.selectedIndex === 3
              ? ''
              : <div className='alert alert-danger' style={{marginTop: 50}}>
                行動版網頁尚未完善，請用電腦登入打開網頁以享有更佳的視覺效果，謝謝
              </div> }
          </Col>
          {/* <Col xs={12} md={12} style={{padding: 0}}> */}
          {/* <div id='page' /> */}
          {/* </Col> */}
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
  FetchUser: () => dispatch(fetchUser())
})

export default connect(mapState, mapDispatch)(Head)
