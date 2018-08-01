import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import {Grid, Row, Col} from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeItem from './Home.js'
import GraduationItem from './Graduation/index'
import ProjectItem from './Project/index'
import Mail from '../../Components/mail'

import Navbar from '../../Components/Navbar'
import {connect} from 'react-redux'
import {UpdateUserInfo} from '../../Redux/Assistants/Actions/User'

class Head extends React.Component {

    constructor (props) {

        super(props)
        axios.get('/assistants/profile').then(studentData => {
            this.props.UpdateUserInfo({
                name: studentData.data[0].aname,
                prog: studentData.data[0].assistant_id,
                grad: studentData.data[0].status
            })
        }).catch(err => {
            console.log(err)
        })

        this.state = {
            selectedIndex: 0,
        }
    }

    componentDidMount () {
        this.select(1)
    }

    select (index) {
        this.setState({selectedIndex: index})
    }

    getPage = index => {
      if (index === 0) {
        return (
          <div>
              <FadeIn>
                  <HomeItem />
              </FadeIn>
          </div>
        )
      } else if (index === 1) {
        return (
          <div>
              <FadeIn>
                  <GraduationItem idCard={this.props.idCard} />
              </FadeIn>
          </div>
        )
      } else if (index === 2) {
        return (
          <div>
            <FadeIn>
              <ProjectItem />
            </FadeIn>
          </div>
        )
      } else if (index === 4) {
        return (
          <div>
            <FadeIn>
              <MuiThemeProvider>
                <Mail type='assistant' id={this.props.idCard.id} />
              </MuiThemeProvider>
            </FadeIn>
          </div>
        )
      }
    }

    render () {
      const onTouchTaps = [
        () => this.select(0),
        () => this.select(1),
        () => this.select(2),
        () => this.select(3),
        () => this.select(4),
      ]
      return (
        <Grid id='Head' fluid={true}>
          <Row>
            <Navbar type='assistant'
                    name={this.props.idCard.name}
                    subname={this.props.idCard.prog + this.props.idCard.grad}
                    selectedIndex={this.state.selectedIndex}
                    onTouchTaps={onTouchTaps}
            />
            <Col xsHidden smHidden>
              { this.getPage(this.state.selectedIndex) }
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

const mapState = (state)=>({
    idCard: state.Assistant.User.idCard
})

const mapDispatch = (dispatch)=>({
    UpdateUserInfo: (payload) => dispatch(UpdateUserInfo(payload))
})

export default connect(mapState, mapDispatch)(Head)
