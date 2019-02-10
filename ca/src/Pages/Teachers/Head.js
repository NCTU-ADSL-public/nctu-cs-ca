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

  componentWillMount () {
    // axios.get('/professors/profile').then(res => {
    //   this.props.UpdateUserInfo({
    //     name: res.data[0].tname,
    //     status: res.data[0].status,
    //     id: res.data[0].teacher_id
    //   })
    //   this.select(2)
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  componentDidMount () {
    // this.select(0)
  }

  /*
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
              <CourseItem tid={this.props.idCard.id} />
            </FadeIn>
          </div>
        </Col>,
        document.getElementById('page'))
    } else if (index === 2) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <FadeIn>
            <GroupItem idCard={this.props.idCard} />
          </FadeIn>
        </Col>,
        document.getElementById('page'))
    } else if (index === 3) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <a>
            <FadeIn>
              <div className='hidden-sm hidden-xs'>
                <FamilyItem tname={this.props.idCard.tname} tid={this.props.idCard.id} tmail={this.props.idCard.mail} />
              </div>
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
                <Mail type='professor' id={this.props.idCard.id} />
              </MuiThemeProvider>
            </FadeIn>
          </a>
        </Col>,
        document.getElementById('page'))
    } else if (index === 5) {
      ReactDOM.render(
        <FadeIn>
          <ProfileItem idCard={this.props.idCard} />
        </FadeIn>,
        document.getElementById('page'))
    }

    this.setState({selectedIndex: index})
  }
*/

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
