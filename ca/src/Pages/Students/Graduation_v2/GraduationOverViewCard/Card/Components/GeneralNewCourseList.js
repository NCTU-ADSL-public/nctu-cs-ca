import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import PopoverButton from './PopoverButton'
import MoveGroupButton from './MoveGroupButton'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  },
  text: {
    fontSize: '20px'
  },
  textRwd: {
    fontSize: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  littletext: {
    fontSize: '15px'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#7c7c7c'
  },
  flex: {
    flex: 1
  },
  chip: {
    margin: '5px',
    fontSize: '18px'
  },
  progress: {
    backgroundColor: '#00a152'
  }
})



class GeneralNewCourseList extends React.Component {
  constructor (props) {
    super(props)
    this.decideCoreBtnBgColor = this.decideCoreBtnBgColor.bind(this)
    this.decideBtnFlash = this.decideBtnFlash.bind(this)
    this.decideBtnBgColor = this.decideBtnBgColor.bind(this)

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
        dimension: '校基本',
        courses: []
      },
      {
        name: '跨院',
        dimension: '跨院',
        courses: []
      }
    ]

    this.props.courses.forEach(course => {
      let type = this.generalCourseTypes.find(type => course.dimension === type.dimension)
      if (type) type.courses.push(course)
    })
  }

  decideCoreBtnBgColor (courses) {
    if (courses.length === 0) { return '#D95467' } else if (courses.length === 1 && courses[0].reason === 'now') { return '#AB6BD9' } else { return '#3cab7d' }
  }

  decideBtnFlash (completed, selection) {
    return !(completed | selection)
  }

  decideBtnBgColor (completed, reason, selection) {
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

  render () {
    const { overview, classes, rwd } = this.props
    const progressValue = {
      core: Number(overview.credit.core) / Number(overview.require.core) * 100,
      basic: Number(overview.credit.basic) / Number(overview.require.basic) * 100,
      cross: Number(overview.credit.cross) / Number(overview.require.cross) * 100
    }

    return (
      <div style={{ marginLeft: '40px' }}>
        <div className='col-sm-12 col-md-3 col-lg-3' style={{ marginLeft: '20px' }}>
          <div className={rwd ? classes.textRwd : classes.text} style={{ fontSize: '18px' }}>
            核心&nbsp;&nbsp;<font size={5} color='#338d68'>{overview.credit.core}</font>/{overview.require.core}&nbsp; (學分) &nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div className='hidden-xs hidden-sm col-md-3 col-lg-3' style={{ marginLeft: '-30px', marginTop: '20px' }}>
          <LinearProgress
            classes={{ barColorPrimary: classes.progress }}
            variant='determinate'
            value={progressValue.core > 100 ? 100 : progressValue.core}
            color={progressValue.core >= 100 ? 'primary' : 'secondary'}
          />
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes.filter(type => type.dimension.slice(0, 2) === '核心' && !(type.dimension === '核心-自然' && type.courses.length === 0)).map((type, index) => (
            <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2' key={index}>
              <PopoverButton
                label={type.name}
                backgroundColor={this.decideCoreBtnBgColor(type.courses)}
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

        <div className='col-sm-12 col-md-3 col-lg-3' style={{ marginLeft: '20px', marginTop: '20px' }}>
          <div className={rwd ? classes.textRwd : classes.text} style={{ fontSize: '18px' }}>
            校基本&nbsp;&nbsp;<font size={5} color='#338d68'>{overview.credit.basic}</font>/{overview.require.basic}&nbsp; (學分) &nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div className='hidden-xs hidden-sm col-md-3 col-lg-3' style={{ marginLeft: '-30px', marginTop: '40px' }}>
          <LinearProgress
            classes={{ barColorPrimary: classes.progress }}
            variant='determinate'
            value={progressValue.basic > 100 ? 100 : progressValue.basic}
            color={progressValue.basic >= 100 ? 'primary' : 'secondary'}
          />
        </div>  

        <div className='col-sm-12 col-md-12 col-lg-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes.find(type => type.dimension === '校基本').courses.map((item, index) => (
            <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2 pl-0' key={index}>
              <PopoverButton
                label={item.cn}
                backgroundColor={this.decideBtnBgColor(item.complete, item.reason, this.props.selection)}
                flash={this.decideBtnFlash(item.complete, this.props.selection)}
                rwd={this.props.rwd}
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
                  key={index}
                  label={'移動課程'}
                  backgroundColor={item.reason}
                  rwd={rwd}
                />
              </PopoverButton>
            </div>
          ))}
        </div>

        <div className='col-sm-12 col-md-3 col-lg-3' style={{ marginLeft: '20px', marginTop: '20px' }}>
          <div className={rwd ? classes.textRwd : classes.text} style={{ fontSize: '18px' }}>
            跨院&nbsp;&nbsp;&nbsp;<font size={5} color='#338d68'>{overview.credit.cross}</font>/{overview.require.cross}&nbsp;(學分)&nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div className='hidden-xs hidden-sm col-md-3 col-lg-3' style={{ marginLeft: '-30px', marginTop: '40px' }}>
          <LinearProgress
            classes={{ barColorPrimary: classes.progress }}
            variant='determinate'
            value={progressValue.cross > 100 ? 100 : progressValue.cross}
            color={progressValue.cross >= 100 ? 'primary' : 'secondary'}
          />
        </div>

        <div className='col-md-12 col-lg-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>
          {this.generalCourseTypes.find(type => type.dimension === '跨院').courses.map((item, index) => (
            <div className='col-xs-6 col-sm-3 col-md-2 col-lg-2 pl-0' key={index}>
              <PopoverButton
                label={item.cn}
                backgroundColor={this.decideBtnBgColor(item.complete, item.reason, this.props.selection)}
                flash={this.decideBtnFlash(item.complete, this.props.selection)}
                rwd={this.props.rwd}
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
                  key={index}
                  label={'移動課程'}
                  backgroundColor={item.reason}
                  rwd={rwd}
                />
              </PopoverButton>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

GeneralNewCourseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralNewCourseList)
