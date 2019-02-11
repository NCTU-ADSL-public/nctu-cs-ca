
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Postfile from './Postfile'
import { englishCourseChange } from '../../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px'
  },
  input: {
    fontSize: '16px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  textFieldLong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
})

class EnglishCourseForm extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }
  
  render () {
    const { classes } = this.props
    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h2>基本資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label='申請人'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.sname}
              />
              <TextField
                label='班別'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.program}
              />
              <TextField
                label='學號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.student_id}
              />
              <TextField
                label='手機'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.phone}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>
            <div style={{ height: '30px' }} />
            <h2>課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label='課程名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.course_name}
                onChange={(event) => this.props.handleChange({ course_name: event.target.value })}
              />
              <TextField
                label='永久課號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.course_code}
                onChange={(event) => this.props.handleChange({ course_code: event.target.value })}
              />
              <TextField
                label='開課系所'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.department}
                onChange={(event) => this.props.handleChange({ department: event.target.value })}
              />
              <TextField
                label='授課老師'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.teacher}
                onChange={(event) => this.props.handleChange({ teacher: event.target.value })}
              />
            </div>
            <div style={{ height: '30px' }} />
            <h2>其他</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label='申請原因'
                helperText='請詳填'
                margin='normal'
                className={classes.textFieldLong}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{
                  classes: {
                    root: classes.input
                  }
                }}
                value={this.props.reason}
                onChange={(event) => this.props.handleChange({ reason: event.target.value })}
                multiline
                rowsMax='4'
              />
            </div>
            <br />
            註：<br />
            1. 須檢附用書書名及課程綱要。<br />
            <br />
            <Postfile fileChange={(file) => this.props.handleChange({ file: file })} file={this.props.file} />
          </div>
        </div>
        {/* For mobile screen */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2>基本資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='申請人'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.sname}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='班別'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.program}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.student_id}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='手機'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.phone}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>
            <div style={{ height: '30px' }} />
            <h2>課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='課程名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.course_name}
                onChange={(event) => this.props.handleChange({ course_name: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='永久課號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.course_code}
                onChange={(event) => this.props.handleChange({ course_code: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='開課系所'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.department}
                onChange={(event) => this.props.handleChange({ department: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='授課老師'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.teacher}
                onChange={(event) => this.props.handleChange({ teacher: event.target.value })}
              />
            </div>
            <div style={{ height: '30px' }} />
            <h2>其他</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='申請原因'
                helperText='請詳填'
                margin='normal'
                className={classes.textFieldLong}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{
                  classes: {
                    root: classes.input
                  }
                }}
                value={this.props.reason}
                onChange={(event) => this.props.handleChange({ reason: event.target.value })}
                multiline
                rowsMax='4'
              />
            </div>
            <br />
            註：<br />
            1. 須檢附用書書名及課程綱要。<br />
            <br />
            <Postfile fileChange={(file) => this.props.handleChange({ file: file })} file={this.props.file} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  year: state.Student.Credit.englishCourse.year,
  semester: state.Student.Credit.englishCourse.semester,
  department: state.Student.Credit.englishCourse.department, // 原課程depart
  teacher: state.Student.Credit.englishCourse.teacher, // 原課程teacher
  course_name: state.Student.Credit.englishCourse.course_name,
  course_code: state.Student.Credit.englishCourse.course_code,
  reason: state.Student.Credit.englishCourse.reason,
  phone: state.Student.Credit.englishCourse.phone,
  file: state.Student.Credit.englishCourse.file
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => { dispatch(englishCourseChange(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnglishCourseForm))
