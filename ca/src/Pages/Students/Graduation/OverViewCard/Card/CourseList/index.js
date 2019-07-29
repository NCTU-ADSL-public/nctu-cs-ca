
import React from 'react'
import { CoursePopover } from '../CoursePopover'

const physicalCourse = ['物理(一)', '物理(二)', '物理(一)榮譽班', '物理(二)榮譽班', '微處理機系統實驗']

const Index = (props) => (
  <div style={{ width: '100%' }}>
    {
      props.courses.map((course, index) => (
        <CoursePopover
          key={index}
          label={(physicalCourse.includes(course.cn) && course.realCredit > 0)
            ? `${course.cn}  ${course.realCredit}學分`
            : course.cn
          }
          course={course}
          title={props.title}
          assis={props.assis}
          rwd={props.rwd}
        />
      ))
    }
  </div>
)

export default Index
