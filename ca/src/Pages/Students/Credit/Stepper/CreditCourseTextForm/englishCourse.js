
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
  labelMb: {
    fontSize: '18px'
  },
  menu: {
    width: 150,
    fontSize: '20px'
  },
  menuMb: {
    width: 150,
    fontSize: '18px'
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
  render () {
    const { classes } = this.props
    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
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
                label='手機'
                margin='normal'
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
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

            <div style={{ height: '50px' }} />

            <h2>擬修課程資訊</h2>
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
                value={this.props.course_code}
                error={this.props.errorsubmitted ? this.props.course_code === '' : false}
                onChange={(event) => this.props.handleChange({ course_code: event.target.value })}
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
                value={this.props.course_name}
                error={this.props.errorsubmitted ? this.props.course_name === '' : false}
                onChange={(event) => this.props.handleChange({ course_name: event.target.value })}
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
                error={this.props.errorsubmitted ? this.props.department === '' : false}
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
                error={this.props.errorsubmitted ? this.props.teacher === '' : false}
                onChange={(event) => this.props.handleChange({ teacher: event.target.value })}
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
                value={this.props.credit}
                error={this.props.errorsubmitted ? this.props.credit === '' : false}
                onChange={(event) => this.props.handleChange({ credit: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label=''
                placeholder='理由詳述'
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
                error={this.props.errorsubmitted ? this.props.reason === '' : false}
                onChange={(event) => this.props.handleChange({ reason: event.target.value })}
                multiline
                rowsMax='1'
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile fileChange={(file) => this.props.handleChange({ file: file })} error={this.props.errorsubmitted ? this.props.file === '' : false} />
            </div>

            <div style={{ height: '50px' }} />

            <div style={{ fontSize: '20px' }}>
              事宜：擬修習外系英文授課專業課程，並申請為本系畢業學分規定之「畢業前須通過1門本系開授或認可之英文授課專業課程」。
              <br /><br />
              說明：本系大學部畢業學分規定:畢業前須通過1門本系開授或認可 之英文授課專業課程。(99學年度(含)以後入學者適用)
              <br /><br />
            </div>
          </div>
        </div>

        {/* For mobile screen */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
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
                label='班別'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                error={this.props.errorsubmitted ? this.props.program === '' : false}
                InputProps={{ readOnly: true }}
                defaultValue={this.props.studentIdcard.program}
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
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
                value={this.props.phone}
                onChange={(event) => this.props.handleChange({ phone: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>擬修課程資訊</h2>
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
                error={this.props.errorsubmitted ? this.props.course_code === '' : false}
                value={this.props.course_code}
                onChange={(event) => this.props.handleChange({ course_code: event.target.value })}
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
                error={this.props.errorsubmitted ? this.props.course_name === '' : false}
                value={this.props.course_name}
                onChange={(event) => this.props.handleChange({ course_name: event.target.value })}
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
                error={this.props.errorsubmitted ? this.props.department === '' : false}
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
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                error={this.props.errorsubmitted ? this.props.teacher === '' : false}
                value={this.props.teacher}
                onChange={(event) => this.props.handleChange({ teacher: event.target.value })}
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
                error={this.props.errorsubmitted ? this.props.credit === '' : false}
                value={this.props.credit}
                onChange={(event) => this.props.handleChange({ credit: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label=''
                placeholder='理由詳述'
                margin='normal'
                className={classes.textFieldLong}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                InputProps={{
                  classes: {
                    root: classes.input
                  }
                }}
                error={this.props.errorsubmitted ? this.props.reason === '' : false}
                value={this.props.reason}
                onChange={(event) => this.props.handleChange({ reason: event.target.value })}
                multiline
                rowsMax='1'
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile fileChange={(file) => this.props.handleChange({ file: file })} error={this.props.errorsubmitted ? this.props.file === '' : false} />
            </div>

            <div style={{ height: '50px' }} />

            <div style={{ fontSize: '20px' }}>
              事宜：擬修習外系英文授課專業課程，並申請為本系畢業學分規定之「畢業前須通過1門本系開授或認可之英文授課專業課程」。
              <br /><br />
              說明：本系大學部畢業學分規定:畢業前須通過1門本系開授或認可 之英文授課專業課程。(99學年度(含)以後入學者適用)
              <br /><br />
            </div>
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
  department: state.Student.Credit.englishCourse.department,
  teacher: state.Student.Credit.englishCourse.teacher,
  credit: state.Student.Credit.englishCourse.credit,
  course_name: state.Student.Credit.englishCourse.course_name,
  course_code: state.Student.Credit.englishCourse.course_code,
  reason: state.Student.Credit.englishCourse.reason,
  phone: state.Student.Credit.englishCourse.phone,
  file: state.Student.Credit.englishCourse.file,
  errorsubmitted: state.Student.Credit.errorsubmitted
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => { dispatch(englishCourseChange(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnglishCourseForm))
