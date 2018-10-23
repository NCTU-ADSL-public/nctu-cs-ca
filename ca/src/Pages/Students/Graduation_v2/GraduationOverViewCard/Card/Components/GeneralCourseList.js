import React from 'react'
import PopoverButton from './PopoverButton'

class GeneralCourseList extends React.Component {
  constructor (props) {
    super(props)
    this.decideBtnBgColor = this.decideBtnBgColor.bind(this)
    this.generalCourseTypes = [
      {
        name: '當代',
        dimension: '通識',
        courses: []
      },
      {
        name: '公民',
        dimension: '公民',
        courses: []
      },
      {
        name: '群己',
        dimension: '群己',
        courses: []
      },
      {
        name: '文化',
        dimension: '文化',
        courses: []
      },
      {
        name: '歷史',
        dimension: '歷史',
        courses: []
      },
      {
        name: '自然',
        dimension: '自然',
        courses: []
      }
    ]

    this.props.courses.forEach(course => {
      let type = this.generalCourseTypes.find(type => course.dimension === type.dimension)
      if (type) type.courses.push(course)
    })
  }

  decideBtnBgColor (courses) {
    if (courses.length === 0) {
      return '#D95467'
    }
    else if (courses.length === 1 && courses[0].reason === 'now') {
      return '#AB6BD9'
    }
    else {
      return '#3cab7d'
    }
  }

  render () {
    return (
      <div>
        {this.generalCourseTypes.map((type, index) => (
          <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2' key={index}>
            <PopoverButton
              label={type.name}
              backgroundColor={this.decideBtnBgColor(type.courses)}
              flash={(type.length === 0)}
              rwd={this.props.rwd}
            >
              {type.courses.map((course, key) => {
                switch (course.reason) {
                  case 'now':
                    return (
                      <li key={key}>{course.cn}
                        <div style={{ float: 'right', color: '#9e48d9' }}>&nbsp;&nbsp;&nbsp;(當期課程)</div>
                      </li>
                    )
                  case 'free1':
                  case 'free2':
                    return (
                      <li key={key}>{course.cn} (抵免課程)
                        <div style={{ float: 'right', color: '#6A94A2' }}>&nbsp;&nbsp;&nbsp;{course.score}</div>
                      </li>
                    )
                  default:
                    return (
                      <li key={key}>{course.cn}
                        <div style={{ float: 'right', color: 'green' }}>&nbsp;&nbsp;&nbsp;{course.score}</div>
                      </li>
                    )
                }
              })}
            </PopoverButton>
          </div>
        ))}
      </div>
    )
  }
}

export default GeneralCourseList
