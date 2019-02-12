import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { exemptCourseChange } from '../../../../../Redux/Students/Actions/Credit'
import Postfile from './Postfile'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px'
  },
  labelMb: {
    fontSize: 18
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 150,
    fontSize: '20px'
  },
  menuMb: {
    width: 150,
    fontSize: 18
  }
})

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  phone: state.Student.Credit.exemptCourse.phone,
  original_course_year: state.Student.Credit.exemptCourse.original_course_year,
  original_course_semester: state.Student.Credit.exemptCourse.original_course_semester,
  original_course_name: state.Student.Credit.exemptCourse.original_course_name,
  original_course_department: state.Student.Credit.exemptCourse.original_course_department,
  original_course_credit: state.Student.Credit.exemptCourse.original_course_credit,
  original_course_score: state.Student.Credit.exemptCourse.original_course_score,
  current_course_code: state.Student.Credit.exemptCourse.current_course_code,
  current_course_name: state.Student.Credit.exemptCourse.current_course_name,
  current_course_credit: state.Student.Credit.exemptCourse.current_course_credit,
  file: state.Student.Credit.exemptCourse.file,
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => dispatch(exemptCourseChange(payload))
})

class ExemptForm extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h2>基本資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style={{ margin: '5px' }}>
              <TextField
                label='申請人'
                defaultValue={this.props.studentIdcard.sname}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label='班別'
                defaultValue={this.props.studentIdcard.program}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label='學號'
                defaultValue={this.props.studentIdcard.student_id}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label='手機'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputProps={{
                }}
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
            <div style={{ height: '50px' }} />
            <h2>已修習課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                label='課程名稱'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.original_course_name}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
              />
              <TextField
                label='開課系所'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.original_course_department}
                onChange={(event) => this.props.handleChange({ original_course_department: event.target.value })}
              />
              <TextField
                select
                label='修課年級'
                className={classes.textField}
                defaultValue={0}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.props.original_course_year}
                onChange={(event) => this.props.handleChange({ original_course_year: event.target.value })}
              >
                <option key={0} value={0}>請選擇修課年級</option>
                <option key={1} value={1}>一</option>
                <option key={2} value={2}>二</option>
                <option key={3} value={3}>三</option>
                <option key={4} value={4}>四</option>
              </TextField>
              <TextField
                select
                label='修課學期'
                defaultValue={0}
                className={classes.textField}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.props.original_course_semester}
                onChange={(event) => this.props.handleChange({ original_course_semester: event.target.value })}
              >
                <option key={0} value={0}>請選擇學期</option>
                <option key={1} value={1}>上</option>
                <option key={2} value={2}>下</option>
              </TextField>
              <TextField
                label='學分'
                defaultValue=''
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.original_course_credit}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
              <TextField
                label='成績'
                defaultValue=''
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.original_course_score}
                onChange={(event) => this.props.handleChange({ original_course_score: event.target.value })}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>申請免修課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                label='永久課號'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.current_course_code}
                onChange={(event) => this.props.handleChange({ current_course_code: event.target.value })}
              />
              <TextField
                label='課程名稱'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.current_course_name}
                onChange={(event) => this.props.handleChange({ current_course_name: event.target.value })}
              />
              <TextField
                label='學分'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.current_course_credit}
                onChange={(event) => this.props.handleChange({ current_course_credit: event.target.value })}
              />
            </div>
            <br />
            註：<br />
            1. 課程內容需與本系課程一致。<br />
            2. 須檢附用書書名及課程綱要。<br />
            <br />
            <Postfile fileChange={(file) => this.props.handleChange({file: file})} file={this.props.file} />
          </div>
        </div>
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2>基本資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='申請人'
                defaultValue={this.props.studentIdcard.sname}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='班別'
                defaultValue={this.props.studentIdcard.program}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學號'
                defaultValue={this.props.studentIdcard.student_id}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='手機'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.phone}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>已修習課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='課程名稱'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_name}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='開課系所'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_department}
                onChange={(event) => this.props.handleChange({ original_course_department: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                select
                label='修課年級'
                defaultValue={0}
                className={classes.textField}
                SelectProps={{
                  MenuProps: {
                    className: classes.menuMb
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.props.original_course_year}
                onChange={(event) => this.props.handleChange({ original_course_year: event.target.value })}
              >
                <option key={0} value={0}>請選擇修課年級</option>
                <option key={1} value={1}>一</option>
                <option key={2} value={2}>二</option>
                <option key={3} value={3}>三</option>
                <option key={4} value={4}>四</option>
              </TextField>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                select
                defaultValue={0}
                label='學期'
                className={classes.textField}
                SelectProps={{
                  MenuProps: {
                    className: classes.menuMb
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.props.original_course_semester}
                onChange={(event) => this.props.handleChange({ original_course_semester: event.target.value })}
              >
                <option key={0} value={0}>請選擇學期</option>
                <option key={1} value={1}>上</option>
                <option key={2} value={2}>下</option>
              </TextField>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學分'
                defaultValue=''
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_credit}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='成績'
                defaultValue=''
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_score}
                onChange={(event) => this.props.handleChange({ original_course_score: event.target.value })}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>申請免修課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='永久課號'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.current_course_code}
                onChange={(event) => this.props.handleChange({ current_course_code: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='課程名稱'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.current_course_name}
                onChange={(event) => this.props.handleChange({ current_course_name: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學分'
                defaultValue=''
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.current_course_credit}
                onChange={(event) => this.props.handleChange({ current_course_credit: event.target.value })}
              />
            </div>
            <br />
            註：<br />
            1. 課程內容需與本系課程一致。<br />
            2. 須檢附用書書名及課程綱要。<br />
            <br />
            <Postfile fileChange={(file) => this.props.handleChange({file: file})} file={this.props.file} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExemptForm))
