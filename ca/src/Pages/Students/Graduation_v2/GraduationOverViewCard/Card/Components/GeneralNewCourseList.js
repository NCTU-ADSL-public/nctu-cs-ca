import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PopoverButton from './PopoverButton'
import MoveGroupButton from './MoveGroupButton'
import './GeneralNewCourseList.css'

const styles = theme => ({
  container: {
    marginLeft: '25px',
    borderLeft: '15px solid #EAEAEA'
  },
  fontCredit: {
    color: '#338d68',
    fontSize: '24px'
  }
})

const decideCoreBtnBgColor = (courses) => {
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

const decideBtnFlash = (completed, selection) => {
  return !(completed | selection)
}

const decideBtnBgColor = (completed, reason, selection) => {
  let color = completed
    ? (reason === 'notCS')
      ? '#a29951'
      : (reason === 'free1' || reason === 'free2' || reason === 'english')
        ? '#6A94A2'
        : (reason === 'now')
          ? '#ab6bd9'
          : '#3db586'
    : selection
      ? (reason === 'now')
        ? '#ab6bd9'
        : 'gray'
      : (reason === 'now')
        ? '#ab6bd9'
        : '#d95467'
  return color
}

const GeneralCoursePopover = props => {
  const { rwd, type, title } = props
  return (
    <div className='col-xs-6 col-sm-3 col-md-2'>
      <PopoverButton
        label={type.name}
        backgroundColor={decideCoreBtnBgColor(type.courses)}
        flash={(type.length === 0)}
        rwd={rwd}
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
                  <div style={{ margin: '0 0 15px 8px' }}>
                    {/* An option for student to move a course to other group */}
                    <MoveGroupButton
                      key={key}
                      title={title}
                      item={course}
                      label={'移動課程'}
                    />
                  </div>
                </li>
              )
          }
        })}
      </PopoverButton>
    </div>
  )
}

const CoursePopover = props => {
  const { item, rwd, selection, title } = props
  return (
    <div className='col-xs-6 col-sm-3 col-md-2'>
      <PopoverButton
        label={item.cn}
        backgroundColor={decideBtnBgColor(item.complete, item.reason, selection)}
        flash={decideBtnFlash(item.complete, selection)}
        rwd={rwd}
      >
        <div>{item.cn}</div>
        <div>分數:&nbsp;{(item.score === null) ? '-' : item.score}</div>
        <div>等級:&nbsp;{(item.grade === '0') ? '-' : item.grade}</div>
        <div>英文授課:&nbsp;{(item.english) ? '是' : '否'}</div>
        <div>實得學分:&nbsp;{item.realCredit}</div>
        <br />
        {(item.reason === 'notCS') ? <div>此為外系課程，必須申請過抵免才能算通過。</div> : <div />}
        {(item.reason === 'free1') ? <div>您已申請過抵免了。</div> : <div />}
        {(item.reason === 'free2') ? <div>免修課程。</div> : <div />}
        {(item.reason === 'english') ? <div>此為抵免英文檢定考試的課程。</div> : <div />}
        {(item.reason === 'now') ? <div>當期課程。</div> : <div />}
        {(item.reason === 'now' && item.complete) ? <div>已修過這堂課，目前正重複修課中。</div> : <div />}

        {/* An option for student to move a course to other group */}
        <MoveGroupButton
          label={'移動課程'}
          backgroundColor={item.reason}
          rwd={rwd}
          item={item}
          title={title}
        />
      </PopoverButton>
    </div>
  )
}

class GeneralNewCourseList extends React.Component {
  constructor (props) {
    super(props)
    this.generalCourseTypes = [
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

    this.props.courses.forEach(course => {
      let type = this.generalCourseTypes.find(type => course.dimension === type.dimension)
      if (type) type.courses.push(course)
    })
  }

  componentDidUpdate (NextProp, NextState) {
    if (NextProp.courses !== this.props.courses) {
      console.log('------------- GeneralNEWCourseList updates -------------------')
      this.generalCourseTypes = [
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
      NextProp.courses.forEach(course => {
        let type = this.generalCourseTypes.find(type => course.dimension === type.dimension)
        if (type) type.courses.push(course)
      })
    }
  }
  render () {
    const { classes, overview, rwd, selection, title } = this.props

    return (
      <div className={rwd ? '' : classes.container}>
        <div className='hidden-xs col-sm-4 col-md-3' style={{ paddingLeft: '0px', paddingRight: '60px' }}>
          <div className='general-course-dimension'>
            核心&nbsp;&nbsp;
            <font className={classes.fontCredit}>{overview.credit === null ? 0 : overview.credit.core}</font>
            /{overview.require.core}&nbsp;(學分)
          </div>
        </div>
        <div className='hidden-xs col-sm-1 general-left-arrow' />

        <div className='col-sm-12 col-md-12 col-lg-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes
            .filter(type => type.dimension.slice(0, 2) === '核心' && !(type.dimension === '核心-自然' && type.courses.length === 0))
            .map((type, index) => (
              <GeneralCoursePopover key={index} type={type} title={title} />
            ))
          }
        </div>

        <div className='hidden-xs col-sm-4 col-md-3' style={{ marginTop: '20px', paddingLeft: '0px', paddingRight: '60px' }}>
          <div className='general-course-dimension'>
            校基本&nbsp;
            <font className={classes.fontCredit}>{overview.credit === null ? 0 : overview.credit.basic}</font>
            /{overview.require.basic}&nbsp;(學分)
          </div>
        </div>
        <div className='hidden-xs col-sm-1 general-left-arrow' style={{ marginTop: '20px' }} />

        <div className='col-sm-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes
            .find(type => type.dimension === '校基本素養').courses
            .map((item, index) => (
              <CoursePopover key={index} item={item} rwd={rwd} selection={selection} title={title} />
            ))
          }
        </div>

        <div className='hidden-xs col-sm-4 col-md-3' style={{ marginTop: '20px', paddingLeft: '0px', paddingRight: '60px' }}>
          <div className='general-course-dimension'>
            跨院&nbsp;&nbsp;
            <font className={classes.fontCredit}>{overview.credit === null ? 0 : overview.credit.cross}</font>
            /{overview.require.cross}&nbsp;(學分)
          </div>
        </div>
        <div className='hidden-xs col-sm-1 general-left-arrow' style={{ marginTop: '20px' }} />

        <div className='col-sm-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes
            .find(type => type.dimension === '跨院基本素').courses
            .map((item, index) => (
              <CoursePopover key={index} item={item} rwd={rwd} selection={selection} title={title} />
            ))
          }
        </div>
      </div>
    )
  }
}

GeneralNewCourseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralNewCourseList)
