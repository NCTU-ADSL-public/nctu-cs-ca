import React from 'react'
import AnimatedProgress from '../../../Components/AnimatedProgress'
import CourseList from './CourseList'

export default class IndividualCourse extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: 0
    }
  }
  componentWillMount () {
    for (let i = 0; i < this.props.pass.length; i++) {
      if (!this.props.pass[i].complete) {
        this.setState({
          flag: this.state.flag + 1
        })
      }
    }
  }

  render () {
    return (
      <div className='little-form' ref='my'>
        <div id='little-title'>
          <AnimatedProgress
            style={{
              width: '300px',
              float: 'left'
            }}
            value={(this.props.title === '體育' || this.props.title === '服務學習' || this.props.title === '藝文賞析') ? (this.props.pass.length - this.state.flag) / this.props.total * 100 : this.props.credit / this.props.total * 100} />
          <div className='little-title-title'>
            <div id='little-title-number'><font size={6} color='#338d68'>{(this.props.title === '體育' || this.props.title === '服務學習' || this.props.title === '藝文賞析') ? this.props.pass.length - this.state.flag : this.props.credit}</font>/{this.props.total}{(this.props.title === '體育' || this.props.title === '服務學習' || this.props.title === '藝文賞析') ? '(門)' : '(學分)'}</div>
            <div id='little-title-text' ><font size={this.props.fontflag ? 5 : 6}>{this.props.title}</font></div>
          </div>
        </div>
        <CourseList items={this.props.pass} selection={this.props.selection} />
      </div>
    )
  }
}
