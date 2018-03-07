import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import {Grid,Row,Col} from 'react-bootstrap'

import HomeItem from './Home.js'
import CourseItem from './Course/index.js'
import GroupItem from './Group/Group.js'
import FamilyItem from './Family/Family.js'

import Navbar from '../../Components/Navbar'

class Head extends Component {

  state = {
    selectedIndex: 0,
    idCard: {
      name: '資料錯誤',
      status: '',
      id: 'T9455',
    },
  }

  componentWillMount () {
    let _this = this

    axios.get('/professors/profile').then(res => {
      _this.setState({
        idCard: {
          name: res.data[0].tname,
          status: res.data[0].status,
          id: res.data[0].teacher_id,
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.select(1)
  }

  select (index) {
    if (index === 0) {
      ReactDOM.render(
        <div>
          <FadeIn>
            <HomeItem/>
          </FadeIn>
        </div>,
        document.getElementById('page'))
    }
    else if (index === 1) {
      ReactDOM.render(
        <div>
          <FadeIn>
            <CourseItem tid={this.state.idCard.id}/>
          </FadeIn>
        </div>,
        document.getElementById('page'))
    }
    else if (index === 2) {
      ReactDOM.render(
        <FadeIn>
          <GroupItem/>
        </FadeIn>,
        document.getElementById('page'))
    }
    else if (index === 3) {
      ReactDOM.render(
        <a>
          <FadeIn>
            <FamilyItem/>
          </FadeIn>
        </a>,
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
    ]
    return (
      <Grid id="Head" fluid={true}>
        <Row>
          <Navbar type='teacher'
                  name={this.state.idCard.name}
                  subname={this.state.idCard.id}
                  selectedIndex={this.state.selectedIndex}
                  onTouchTaps={onTouchTaps}
          />
          <Col sm={12} xsHidden smHidden>
            <div id="page"/>
          </Col>
          {/* For mobile, tablet user */}
          <Col xs={12} mdHidden lgHidden>
            <h2>行動版功能目前測試中，造成不便敬請見諒。</h2>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Head
