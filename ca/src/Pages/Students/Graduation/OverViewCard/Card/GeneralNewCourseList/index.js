
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { CoursePopover, GeneralCoursePopover } from '../CoursePopover'
import './style.css'

const styles = theme => ({
  container: {
    marginLeft: '25px',
    borderLeft: '15px solid #eaeaea'
  },
  fontCredit: {
    color: '#338d68',
    fontSize: '24px'
  }
})

const Title = (props) => (
  <div>
    <div className='cardTitle'>{ props.title }</div>
    <font size={5} color='#338d68'>{ props.complete }</font>/
    <div className='cardTitle'>{ props.require }</div>
    { props.unit }
  </div>
)

const GeneralNewCourseList = (props) => {
  let generalCourseTypes = [
    {
      name: '人文',
      dimension: '核心-人文',
      courses: []
    },
    {
      name: '社會',
      dimension: '核心-社會',
      courses: []
    },
    {
      name: '自然',
      dimension: '核心-自然',
      courses: []
    },
    {
      name: '校基本',
      dimension: '校基本素養',
      courses: []
    },
    {
      name: '跨院',
      dimension: '跨院基本素', // api return five words
      courses: []
    }
  ]

  // 把每個通識丟到正確的分類，然後加上會在 GeneralCoursePopover 用到的欄位
  props.courses.forEach(course => {
    let type = generalCourseTypes.find(type => course.dimension === type.dimension)
    if (type) {
      if (course.reason === 'now') {
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

  const { classes, rwd, overview } = props

  return (
    <div className={rwd ? '' : classes.container}>
      <div className='hidden-xs col-sm-4 col-md-3' style={{ paddingLeft: '0px', paddingRight: '60px' }}>
        <div className='general-course-dimension'>
          <Title
            title='核心'
            complete={overview.credit === null ? 0 : overview.credit.core}
            require={overview.require.core}
            unit='學分'
          />
        </div>
      </div>
      <div className='hidden-xs col-sm-1 general-left-arrow' />

      <div className='col-sm-12 col-md-12 col-lg-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
        {
          // 核心-自然並非必修
          generalCourseTypes
            .filter(type => type.dimension.slice(0, 2) === '核心' && !(type.dimension === '核心-自然' && type.courses.length === 0))
            .map((type, index) => (
              <GeneralCoursePopover
                key={index}
                type={type}
                title={props.title}
                assis={props.assis}
                rwd={props.rwd}
              />
            ))
        }
      </div>

      <div className='hidden-xs col-sm-4 col-md-3' style={{ marginTop: '20px', paddingLeft: '0px', paddingRight: '60px' }}>
        <div className='general-course-dimension'>
          <Title
            title='校基本'
            complete={overview.credit === null ? 0 : overview.credit.basic}
            require={overview.require.basic}
            unit='學分'
          />
        </div>
      </div>
      <div className='hidden-xs col-sm-1 general-left-arrow' style={{ marginTop: '20px' }} />

      <div className='col-sm-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
        {
          generalCourseTypes
            .find(type => type.dimension === '校基本素養').courses
            .map((course, index) => (
              <CoursePopover
                key={index}
                label={course.cn}
                course={course}
                title={props.title}
                assis={props.assis}
                rwd={props.rwd}
              />
            ))
        }
      </div>

      <div className='hidden-xs col-sm-4 col-md-3' style={{ marginTop: '20px', paddingLeft: '0px', paddingRight: '60px' }}>
        <div className='general-course-dimension'>
          <Title
            title='跨院'
            complete={overview.credit === null ? 0 : overview.credit.cross}
            require={overview.require.cross}
            unit='學分'
          />
        </div>
      </div>
      <div className='hidden-xs col-sm-1 general-left-arrow' style={{ marginTop: '20px' }} />

      <div className='col-sm-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
        {
          generalCourseTypes
            .find(type => type.dimension === '跨院基本素').courses
            .map((course, index) => (
              <CoursePopover
                key={index}
                label={course.cn}
                course={course}
                title={props.title}
                assis={props.assis}
                rwd={props.rwd}
              />
            ))
        }
      </div>
    </div>
  )
}

GeneralNewCourseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralNewCourseList)
