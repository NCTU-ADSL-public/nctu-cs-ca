import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'

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
  original_course_name: state.Student.Credit.exemptCourse.original_course_name,
  original_course_department: state.Student.Credit.exemptCourse.original_course_department,
  original_course_credit: state.Student.Credit.exemptCourse.original_course_credit,
  original_course_score: state.Student.Credit.exemptCourse.original_course_score,
  original_course_year: state.Student.Credit.exemptCourse.original_course_year,
  original_course_semester: state.Student.Credit.exemptCourse.original_course_semester,
  current_course_code: state.Student.Credit.exemptCourse.current_course_code,
  current_course_name: state.Student.Credit.exemptCourse.current_course_name,
  current_course_credit: state.Student.Credit.exemptCourse.current_course_credit,
  file: state.Student.Credit.exemptCourse.file
})

const mapDispatchToProps = (dispatch) => ({
})

class ExemptCourseFormConfirm extends React.Component {

  render () {
    const { classes } = this.props
    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h4 style = {{ color: 'red' }}>確認無誤後送出</h4>
            <h2>基本資料</h2>
            <hr style = {{ margin: '5px' }}/>
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
                InputProps={{ readOnly: true }}
                defaultValue={this.props.phone}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>已修習課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
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
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_name}
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
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_department}
              />
              <TextField
                label='修課年級'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={['', '一', '二', '三', '四'][this.props.original_course_year]}
              >
              </TextField>
              <TextField
                label='學期'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={['', '上', '下'][this.props.original_course_semester]}
              >
              </TextField>
              <TextField
                label='學分'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_credit}
              />
              <TextField
                label='成績'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_score}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>申請免修課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
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
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_code}
              />
              <TextField
                label='課名'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_name}
              />
              <TextField
                label='學分'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_credit}
              />
            </div>
            <br />
            註：<br />
            1. 課程內容需與本系課程一致。<br />
            2. 須檢附用書書名及課程綱要。<br />
            <br />
            檔案：{this.props.file.name}
          </div>
        </div>
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h4 style={{ color: 'red' }}>確認無誤後送出</h4>
            <h2>基本資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='申請人'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
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
                    root: classes.labelMb
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
                    root: classes.labelMb
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
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.phone}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>已修習課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='課程名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_name}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='開課系所'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_department}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='修課年級'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={['', '一', '二', '三', '四'][this.props.original_course_year]}
              >
              </TextField>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學期'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={['', '上', '下'][this.props.original_course_semester]}
              >
              </TextField>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學分'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_credit}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='成績'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.original_course_score}
              />
            </div>
            <div style={{ height: '50px' }} />
            <h2>申請免修課程資料</h2>
            <hr style = {{ margin: '5px' }}/>
            <div style = {{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='永久課號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_code}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='課名'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_name}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='學分'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.current_course_credit}
              />
            </div>
            <br />
            註：<br />
            1. 課程內容需與本系課程一致。<br />
            2. 須檢附用書書名及課程綱要。<br />
            <br />
            檔案：{this.props.file.name}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExemptCourseFormConfirm))
