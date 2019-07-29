
import React from 'react'
import PopoverButton from '../PopoverButton'
import MoveGroupButton from '../MoveGroupButton'

// 決定普通課程的按鈕顏色
const courseBtnColor = (completed, reason) => {
  let color = completed
    ? (reason === 'notCS')
      ? '#a29951'
      : (reason === 'free1' || reason === 'free2' || reason === 'english')
        ? '#6A94A2'
        : (reason === 'now')
          ? '#ab6bd9'
          : '#3db586'
    : (reason === 'now')
      ? '#ab6bd9'
      : '#d95467'
  return color
}

// 決定通識課程的按鈕顏色
const generalCourseBtnColor = (courses) => {
  if (courses.length === 0) {
    return '#d95467'
  } else if (courses.length === 1 && courses[0].reason === 'now') {
    return '#ab6bd9'
  } else {
    return '#3cab7d'
  }
}

const CoursePopover = props => {
  const { rwd, course, title, label } = props
  return (
    <div className='col-xs-6 col-sm-3 col-md-2'>
      <PopoverButton
        label={label}
        backgroundColor={courseBtnColor(course.complete, course.reason)}
        flash={!course.complete}
        rwd={rwd}
      >
        <div>{course.cn}</div>
        <div>分數:&nbsp;{(course.score === null) ? '-' : course.score}</div>
        <div>等級:&nbsp;{(course.grade === '0') ? '-' : course.grade}</div>
        <div>英文授課:&nbsp;{(course.english) ? '是' : '否'}</div>
        <div>實得學分:&nbsp;{course.realCredit}</div>
        <br />
        { (course.reason === 'notCS') && <div>此為外系課程，必須申請過抵免才能算通過。</div> }
        { (course.reason === 'free1') && <div>您已申請過抵免了。</div> }
        { (course.reason === 'free2') && <div>免修課程。</div> }
        { (course.reason === 'english') && <div>此為抵免英文檢定考試的課程。</div> }
        { (course.reason === 'now') && <div>當期課程。</div> }
        { (course.reason === 'now' && course.complete) && <div>已修過這堂課，目前正重複修課中。</div> }

        {/* An option for student to move a course to other group */}
        {
          !props.assis &&
          <MoveGroupButton
            title={title}
            item={course}
            label={'移動課程'}
            rwd={rwd}
          />
        }
      </PopoverButton>
    </div>
  )
}

const GeneralCoursePopover = props => {
  const { rwd, type, title } = props
  return (
    <div className='col-xs-6 col-sm-3 col-md-2'>
      <PopoverButton
        label={type.name}
        backgroundColor={generalCourseBtnColor(type.courses)}
        flash={(type.length === 0)}
        rwd={rwd}
      >
        {
          type.courses.map((course, index) => (
            <li key={index}>
              { course.cn }
              <div style={{ float: 'right', color: course.color }}>{course.score}</div>
              <div style={{ margin: '0 0 15px 8px' }}>
                {/* An option for student to move a course to other group */}
                {
                  !props.assis &&
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
  )
}

export { CoursePopover, GeneralCoursePopover }
