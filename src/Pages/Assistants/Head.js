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

class Head extends React.Component {

    constructor (props) {

        super(props)
        axios.get('/assistants/profile').then(studentData => {
            this.setState({
                idCard: {
                    name: studentData.data[0].aname,
                    prog: studentData.data[0].assistant_id,
                    grad: studentData.data[0].status
                }
            })
        }).catch(err => {
            console.log(err)
        })

        this.state = {
            selectedIndex: 0,
            idCard: {
                name: '小翠',
                prog: '助理',
                grad: '',
                id: 'T1234'
            }
        }
    }

    componentDidMount () {
        this.select(1)
    }

    select (index) {
        if (index === 0) {
            ReactDOM.render(
                <div>
                    <FadeIn>
                        <HomeItem />
                    </FadeIn>
                </div>,
                document.getElementById('page'))
        } else if (index === 1) {
            ReactDOM.render(
                <div>
                    <FadeIn>
                        <GraduationItem idCard={this.state.idCard} />
                    </FadeIn>
                </div>,
                document.getElementById('page'))
        } else if (index === 2) {
          ReactDOM.render(
            <div>
              <FadeIn>
                <ProjectItem />
              </FadeIn>
            </div>,
            document.getElementById('page'))
        } else if (index === 4) {
          ReactDOM.render(
            <div>
              <FadeIn>
                <MuiThemeProvider>
                  <Mail type='assistant' id={this.state.idCard.id} />
                </MuiThemeProvider>
              </FadeIn>
            </div>,
            document.getElementById('page')
          )
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
      ]
      return (
        <Grid id='Head' fluid={true}>
          <Row>
            <Navbar type='assistant'
                    name={this.state.idCard.name}
                    subname={this.state.idCard.prog + this.state.idCard.grad}
                    selectedIndex={this.state.selectedIndex}
                    onTouchTaps={onTouchTaps}
            />
            <Col xsHidden smHidden>
              <div id='page' />
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
