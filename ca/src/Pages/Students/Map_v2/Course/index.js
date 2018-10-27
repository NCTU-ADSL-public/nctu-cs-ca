import React from 'react'
import VisibleTodoList from './ColList'
import Button from './DoBtn'
import { Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import RwdSugCourse from './DoBtn/SugCourse/others'
import { ShowCourseCondition } from '../../../../Redux/Students/Actions/Map'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.getRwd = this.getRwd.bind(this)
    this.state = {
      v: 'e',
      year: 0,
      grad1: {
        grad: 'grade',
        upSession: 'up-session',
        downSession: 'down-session'
      },
      grad2: {
        grad: 'grade',
        upSession: 'up-session',
        downSession: 'down-session'
      },
      grad3: {
        grad: 'grade',
        upSession: 'up-session',
        downSession: 'down-session'
      },
      grad4: {
        grad: 'grade',
        upSession: 'up-session',
        downSession: 'down-session'
      }

    }
  }

  componentWillMount () {
    let Today = new Date()
    let month = (Today.getMonth() + 1)
    let year = Today.getFullYear() - 1911
    let _this = this
    setTimeout(function () { _this.setState({ v: 'v' }) }, 1000)
    if (this.props.studentsGrad === '大一') {
      this.setState({
        year: year
      })
      if (month > 7 || month < 2) {
        this.setState({
          grad1: {
            grad: 'grade grade-cur',
            upSession: 'up-session session-cur',
            downSession: 'down-session'
          }
        })
      } else {
        this.setState({
          grad1: {
            grad: 'grade grade-cur',
            upSession: 'up-session',
            downSession: 'down-session session-cur'
          }
        })
      }
    } else if (this.props.studentsGrad === '大二') {
      this.setState({
        year: year - 1
      })
      if (month > 7 || month < 2) {
        this.setState({
          grad2: {
            grad: 'grade grade-cur',
            upSession: 'up-session session-cur',
            downSession: 'down-session'
          }
        })
      } else {
        this.setState({
          grad2: {
            grad: 'grade grade-cur',
            upSession: 'up-session',
            downSession: 'down-session session-cur'
          }
        })
      }
    } else if (this.props.studentsGrad === '大三') {
      this.setState({
        year: year - 2
      })
      if (month > 7 || month < 2) {
        this.setState({
          grad3: {
            grad: 'grade grade-cur',
            upSession: 'up-session session-cur',
            downSession: 'down-session'
          }
        })
      } else {
        this.setState({
          grad3: {
            grad: 'grade grade-cur',
            upSession: 'up-session',
            downSession: 'down-session session-cur'
          }
        })
      }
    } else if (this.props.studentsGrad === '大四') {
      this.setState({
        year: year - 3
      })
      if (month > 7 || month < 2) {
        this.setState({
          grad4: {
            grad: 'grade grade-cur',
            upSession: 'up-session session-cur',
            downSession: 'down-session'
          }
        })
      } else {
        this.setState({
          grad4: {
            grad: 'grade grade-cur',
            upSession: 'up-session',
            downSession: 'down-session session-cur'
          }
        })
      }
    }
  }

  getRwd () {
    let { rwddisplay, grade } = this.props
    let _this = this

    let _grade
    if (grade === '大一') _grade = 1
    if (grade === '大二') _grade = 2
    if (grade === '大三') _grade = 3
    if (grade === '大四') _grade = 4
    if (rwddisplay === 'map') {
      return (
        <div>
          <Button rwd />
          <div className='jumbotron' style={{ color: 'gray', padding: '5px', textAlign: 'center', marginBottom: '5px' }}>
              各學期建議修課課程。
          </div>
          <Tabs defaultActiveKey={_grade} id='uncontrolled-tab-example'>
            <Tab eventKey={1} title='大一'>
              <div className={'grades' + this.state.grad1.grad} id='grade-1'>
                <div className='row grade-num '>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大一上({this.state.year})</div>
                  </div>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大一下({this.state.year})</div>
                  </div>
                </div>
                <div className='session'>
                  <div className={this.state.grad1.upSession}>
                    <VisibleTodoList v={this.state.v} grad='1' sem='1' />
                  </div>
                  <div className={this.state.grad1.downSession}>
                    <VisibleTodoList v={this.state.v} grad='1' sem='2' />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={2} title='大二'>
              <div className={'grades' + this.state.grad2.grad} id='grade-2'>
                <div className='row grade-num '>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大二上({this.state.year + 1})</div>
                  </div>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大二下({this.state.year + 1})</div>
                  </div>
                </div>
                <div className='session'>
                  <div className={this.state.grad2.upSession}>
                    <VisibleTodoList v={this.state.v} grad='2' sem='1' />

                  </div>
                  <div className={this.state.grad2.downSession}>
                    <VisibleTodoList v={this.state.v} grad='2' sem='2' />

                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={3} title='大三'>
              <div className={'grades' + this.state.grad3.grad} id='grade-3'>
                <div className='row grade-num'>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大三上({this.state.year + 2})</div>
                  </div>
                  <div className='col-xs-6 col-sm-6'>
                    <div>大三下({this.state.year + 2})</div>
                  </div>
                </div>
                <div className='session'>
                  <div className={this.state.grad3.upSession}>
                    <VisibleTodoList v={this.state.v} grad='3' sem='1' />
                  </div>
                  <div className={this.state.grad3.downSession}>
                    <VisibleTodoList v={this.state.v} grad='3' sem='2' />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={4} title='大四'>
              <div className={'grades' + this.state.grad4.grad} id='grade-4'>
                <div className='row grade-num'>
                  <div className=' col-xs-6 col-sm-6'>
                    <div>大四上({this.state.year + 3})</div>
                  </div>
                  <div className=' col-xs-6 col-sm-6'>
                    <div>大四下({this.state.year + 3})</div>
                  </div>
                </div>
                <div className='session'>
                  <div className={this.state.grad4.upSession}>
                    <VisibleTodoList v={this.state.v} grad='4' sem='1' />
                  </div>
                  <div className='down-session'>
                    <VisibleTodoList v={this.state.v} grad='4' sem='2' />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    }
    return (
      <RwdSugCourse />
    )
  }

  render () {
    return (
      <div>
        <div className='visible-xs visible-sm'>
          {this.getRwd()}
        </div>
        <div className='grades visible-md visible-lg'>
          <div className={this.state.grad1.grad} id='grade-1'>
            <div className='grade-num'><div>大一({this.state.year})</div></div>
            <div className='session'>
              <div className={this.state.grad1.upSession}>
                <VisibleTodoList v={this.state.v} grad='1' sem='1' />
              </div>
              <div className={this.state.grad1.downSession}>
                <VisibleTodoList v={this.state.v} grad='1' sem='2' />
              </div>
            </div>
          </div>

          <div className={this.state.grad2.grad} id='grade-2'>
            <div className='grade-num'><div>大二({this.state.year + 1})</div></div>
            <div className='session'>
              <div className={this.state.grad2.upSession}>
                <VisibleTodoList v={this.state.v} grad='2' sem='1' />

              </div>
              <div className={this.state.grad2.downSession}>
                <VisibleTodoList v={this.state.v} grad='2' sem='2' />

              </div>
            </div>
          </div>

          <div className={this.state.grad3.grad} id='grade-3'>
            <div className='grade-num'><div>大三({this.state.year + 2})</div></div>
            <div className='session'>
              <div className={this.state.grad3.upSession}>
                <VisibleTodoList v={this.state.v} grad='3' sem='1' />
              </div>
              <div className={this.state.grad3.downSession}>
                <VisibleTodoList v={this.state.v} grad='3' sem='2' />
              </div>
            </div>
          </div>

          <div className={this.state.grad4.grad} id='grade-4'>
            <div className='grade-num'><div>大四({this.state.year + 3})</div></div>
            <div className='session'>
              <div className={this.state.grad4.upSession}>
                <VisibleTodoList v={this.state.v} grad='4' sem='1' />
              </div>
              <div className='down-session'>
                <VisibleTodoList v={this.state.v} grad='4' sem='2' />
              </div>
            </div>
          </div>

        </div>
        <div className='mods hidden-xs hidden-sm'>
          <Button />
        </div>
        {/* <div className="mods"><Button studentPasdata={this.props.studentPasdata} data={this.props.data}/></div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rwddisplay: state.Student.Map.rwddisplay,
  grade: state.Student.User.studentIdcard.grade
})
const mapDispatchToProps = (dispatch) => ({
  ShowCourseCondition: () => dispatch(ShowCourseCondition())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
