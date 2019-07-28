
import React from 'react'
import PopoverButton from '../PopoverButton'
import MoveGroupButton from '../MoveGroupButton'
import { courseBtnColor } from '../../../../../../Utilities'

const physicalCourse = ['物理(一)', '物理(二)', '物理(一)榮譽班', '物理(二)榮譽班', '微處理機系統實驗']

const Index = (props) => {
  const { courses, rwd, title } = props

  return (
    <div style={{ width: '100%' }}>
      {
        courses.map((course, index) => (
          <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2' key={index}>
            <PopoverButton
              label={(physicalCourse.includes(course.cn) && course.realCredit > 0) ? `${course.cn}  ${course.realCredit}學分` : course.cn}
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
        ))
      }
    </div>
  )
}

export default Index
