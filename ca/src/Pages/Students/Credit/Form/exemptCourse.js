
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { exemptCourseChange } from '../../../../Redux/Students/Actions/Credit'
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

class ExemptCourseForm extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h1 style={{color: 'black'}} >課程免修單</h1>
            <Divider />
            <div style={{ color: 'red', fontSize: '20px' }}>申請多門抵免需額外填寫另一張表單</div>
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
                label='系所/年級/班別'
                placeholder='例：資工系資工組大一A班'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.class}
                error={this.props.errorsubmitted ? this.props.class === '' : false}
                onChange={(event) => this.props.handleChange({ class: event.target.value })}
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
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>已修習課程資料</h2>
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
                value={this.props.original_course_name}
                error={this.props.errorsubmitted ? this.props.original_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
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
                value={this.props.original_course_department}
                error={this.props.errorsubmitted ? this.props.original_course_department === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_department: event.target.value })}
              />
              <TextField
                select
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
                value={this.props.original_course_year}
                error={this.props.errorsubmitted ? this.props.original_course_year === 0 : false}
                onChange={(event) => this.props.handleChange({ original_course_year: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課年級</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>一</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>二</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>三</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>四</MenuItem>
              </TextField>
              <TextField
                select
                label='修課學期'
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
                error={this.props.errorsubmitted ? this.props.original_course_semester === 0 : false}
                onChange={(event) => this.props.handleChange({ original_course_semester: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
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
                error={this.props.errorsubmitted ? this.props.original_course_credit === '' : false}
                value={this.props.original_course_credit}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
              <TextField
                label='成績'
                placeholder='若無分數則填通過與否'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.original_course_score}
                error={this.props.errorsubmitted ? this.props.original_course_score === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_score: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請免修課程資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label='永久課號'
                placeholder='例：DCP1183'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.current_course_code}
                error={this.props.errorsubmitted ? this.props.current_course_code === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_code: event.target.value })}
              />
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
                value={this.props.current_course_name}
                error={this.props.errorsubmitted ? this.props.current_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_name: event.target.value })}
              />
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
                value={this.props.current_course_credit}
                error={this.props.errorsubmitted ? this.props.current_course_credit === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_credit: event.target.value })}
              />
              <TextField
                select
                label='選別'
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
                value={this.props.current_course_type}
                error={this.props.errorsubmitted ? this.props.current_course_type === '請選擇選別' : false}
                onChange={(event) => this.props.handleChange({ current_course_type: event.target.value })}
              >
                <MenuItem value={'請選擇選別'} style={{ height: '10px' }}>請選擇選別</MenuItem>
                <MenuItem value={'必修'} style={{ height: '10px' }}>必修</MenuItem>
                <MenuItem value={'選修'} style={{ height: '10px' }}>選修</MenuItem>
                <MenuItem value={'通識'} style={{ height: '10px' }}>通識</MenuItem>
                <MenuItem value={'外語'} style={{ height: '10px' }}>外語</MenuItem>
                <MenuItem value={'體育'} style={{ height: '10px' }}>體育</MenuItem>
                <MenuItem value={'大學部修研究所課程'} style={{ height: '10px' }}>大學部修研究所課程</MenuItem>
              </TextField>
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile
                fileChange={(file) => this.props.handleChange({ file: file })}
                error={this.props.errorsubmitted ? this.props.file === '' : false}
                file={this.props.file}
              />
            </div>
          </div>
        </div>

        {/* For mobile screen */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2 style={{color: 'black', fontSize: '20px'}} >課程免修單</h2>
            <Divider />
            <div style={{ color: 'red', fontSize: '16px' }}>申請多門抵免需額外填寫另一張表單</div>
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
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.sname}
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
                label='系所/年級/班別'
                placeholder='例：資工系資工組大一A班'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.class}
                error={this.props.errorsubmitted ? this.props.class === '' : false}
                onChange={(event) => this.props.handleChange({ class: event.target.value })}
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
                value={this.props.phone}
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>已修習課程資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
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
                value={this.props.original_course_name}
                error={this.props.errorsubmitted ? this.props.original_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
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
                value={this.props.original_course_department}
                error={this.props.errorsubmitted ? this.props.original_course_department === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_department: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                select
                label='修課年級'
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
                error={this.props.errorsubmitted ? this.props.original_course_year === 0 : false}
                onChange={(event) => this.props.handleChange({ original_course_year: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課年級</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>一</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>二</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>三</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>四</MenuItem>
              </TextField>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                select
                label='修課學期'
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
                error={this.props.errorsubmitted ? this.props.original_course_semester === 0 : false}
                onChange={(event) => this.props.handleChange({ original_course_semester: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
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
                value={this.props.original_course_credit}
                error={this.props.errorsubmitted ? this.props.original_course_credit === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='成績'
                placeholder='若無分數則填通過與否'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_score}
                error={this.props.errorsubmitted ? this.props.original_course_score === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_score: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請免修課程資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='永久課號'
                placeholder='例：DCP1183'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.current_course_code}
                error={this.props.errorsubmitted ? this.props.current_course_code === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_code: event.target.value })}
              />
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
                value={this.props.current_course_name}
                error={this.props.errorsubmitted ? this.props.current_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_name: event.target.value })}
              />
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
                value={this.props.current_course_credit}
                error={this.props.errorsubmitted ? this.props.current_course_credit === '' : false}
                onChange={(event) => this.props.handleChange({ current_course_credit: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                select
                label='選別'
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
                value={this.props.current_course_type}
                error={this.props.errorsubmitted ? this.props.current_course_type === '請選擇選別' : false}
                onChange={(event) => this.props.handleChange({ current_course_type: event.target.value })}
              >
                <MenuItem value={'請選擇選別'} style={{ height: '10px' }}>請選擇選別</MenuItem>
                <MenuItem value={'必修'} style={{ height: '10px' }}>必修</MenuItem>
                <MenuItem value={'選修'} style={{ height: '10px' }}>選修</MenuItem>
                <MenuItem value={'通識'} style={{ height: '10px' }}>通識</MenuItem>
                <MenuItem value={'外語'} style={{ height: '10px' }}>外語</MenuItem>
                <MenuItem value={'體育'} style={{ height: '10px' }}>體育</MenuItem>
                <MenuItem value={'大學部修研究所課程'} style={{ height: '10px' }}>大學部修研究所課程</MenuItem>
              </TextField>
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile
                fileChange={(file) => this.props.handleChange({ file: file })}
                error={this.props.errorsubmitted ? this.props.file === '' : false}
                file={this.props.file}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  class: state.Student.Credit.exemptCourse.class,
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
  current_course_type: state.Student.Credit.exemptCourse.current_course_type,
  file: state.Student.Credit.exemptCourse.file,
  errorsubmitted: state.Student.Credit.errorsubmitted
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => dispatch(exemptCourseChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExemptCourseForm))
