import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { waiveCourseChange } from '../../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  textFieldLong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  menu: {
    width: 150,
    fontSize: '20px'
  }
})

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  phone: state.Student.Credit.waiveCourse.phone,
  original_school: state.Student.Credit.waiveCourse.original_school,
  original_department: state.Student.Credit.waiveCourse.original_department,
  current_school: state.Student.Credit.waiveCourse.current_school,
  current_department: state.Student.Credit.waiveCourse.current_department,
  original_graduation_credit: state.Student.Credit.waiveCourse.original_graduation_credit,
  apply_year: state.Student.Credit.waiveCourse.apply_year,
  apply_semester: state.Student.Credit.waiveCourse.apply_semester,
  original_course_name: state.Student.Credit.waiveCourse.original_course_name,
  original_course_department: state.Student.Credit.waiveCourse.original_course_department,
  original_course_credit: state.Student.Credit.waiveCourse.original_course_credit,
  original_course_score: state.Student.Credit.waiveCourse.original_course_score,
  current_course_code: state.Student.Credit.waiveCourse.current_course_code,
  current_course_credit: state.Student.Credit.waiveCourse.current_course_credit,
  // students: state.Assistant.Graduation.students,
})

const mapDispatchToProps = (dispatch) => ({
  // fetch_students: (grade) => dispatch(fetchStudent(grade)),
  handleChange: (payload) => dispatch(waiveCourseChange(payload))
})

class WaiveCourseFormConfirm extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <h4 style = {{ color: 'red' }}>確認無誤後送出</h4>
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
          <TextField
            label='原就讀學校'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.original_school}
          />
          <TextField
            label='原就讀系所科別'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.original_department}
          />
          <TextField
            label='原就讀系所科別最低畢業學分'
            margin='normal'
            className={classes.textFieldLong}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.original_graduation_credit}/>
        </div>
        <div style={{ height: '50px' }} />
        <h2>原就讀學校科目成績</h2>
        <hr style = {{ margin: '5px' }}/>
        <div style = {{ margin: '5px' }}>
          <TextField
            label='科目'
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
            InputProps={{ readOnly: true }}
            defaultValue={['', '一', '二', '三', '四'][this.props.apply_year]}
          >
          </TextField>
          <TextField
            label='學期'
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
            InputProps={{ readOnly: true }}
            defaultValue={['', '上', '下'][this.props.apply_semester]}
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
        <h2>抵免本校之科目學分</h2>
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
        <div style={{ height: '100px' }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaiveCourseFormConfirm))
