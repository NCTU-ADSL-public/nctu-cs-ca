
import React from 'react'
import PopoverButton from '../PopoverButton'
import MoveGroupButton from '../MoveGroupButton'
import { generalCourseBtnColor } from '../../../../../../Utilities'

class Index extends React.Component {
  render () {
    const { title, rwd } = this.props
    let generalCourseTypes = [
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

    // 把每個通識丟到正確的分類，然後加上會在 PopoverButton > li 用到的欄位
    this.props.courses.forEach(course => {
      let type = generalCourseTypes.find(type => course.dimension === type.dimension)
      if (type) {
        if (course.reason == 'now') {
          type.courses.push({
            ...course,
            color: '#9e48d9',
            score: '(當期課程)'
          })
        }
        else if (course.reason === 'free1' || course.reason === 'free2') {
          type.courses.push({
            ...course,
            color: '#6A94A2',
            cn: `${course.cn} (抵免課程)`
          })
        }
        else {
          type.courses.push({
            ...course,
            color: 'green'
          })
        }
      }
    })

    return (
      <div>
        {
          generalCourseTypes.map((type, index) => (
            <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2' key={index}>
              <PopoverButton
                label={type.name}
                backgroundColor={generalCourseBtnColor(type.courses)}
                flash={(type.length === 0)}
                rwd={rwd}
              >
                {
                  type.courses.map((course, index) => (
                    <li key={index}>
                      {course.cn}
                      <div style={{ float: 'right', color: course.color }}>{course.score}</div>
                      <div style={{ margin: '0 0 15px 8px' }}>
                        {/* An option for student to move a course to other group */}
                        {
                          !this.props.assis &&
                          <MoveGroupButton
                            title={title}
                            item={course}
                            label='移動課程'
                          />
                        }
                      </div>
                    </li>
                  ))
                }
              </PopoverButton>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Index
