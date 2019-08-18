
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Postfile from './Postfile'
import { actions } from '../../../../Redux/Students/Actions/Credit'

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
    width: 200
  },
  textFieldLong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
})

class EnglishCourseForm extends React.Component {
  render () {
    const { classes, payload } = this.props

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h1 style={{color: 'black'}} >英授專業課程抵免單</h1>
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
                value={payload.class}
                onChange={(e) => this.props.updatePayload({ class: e.target.value })}
                error={this.props.error && payload.class === ''}
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
                value={payload.phone}
                onChange={(e) => this.props.updatePayload({ phone: e.target.value })}
                error={this.props.error && payload.phone === ''}
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
                value={payload.course_code}
                onChange={(e) => this.props.updatePayload({ course_code: e.target.value })}
                error={this.props.error && payload.course_code === ''}
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
                onChange={(e) => payload.updatePayload({ course_name: e.target.value })}
                error={this.props.error && payload.course_name === ''}
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
                value={payload.department}
                onChange={(e) => this.props.updatePayload({ department: e.target.value })}
                error={this.props.error && payload.department === ''}
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
                value={payload.teacher}
                onChange={(e) => this.props.updatePayload({ teacher: e.target.value })}
                error={this.props.error && payload.teacher === ''}
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
                value={payload.credit}
                onChange={(e) => this.props.updatePayload({ credit: e.target.value })}
                error={this.props.error && payload.credit === ''}
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
                multiline
                rowsMax='1'
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
                value={payload.reason}
                onChange={(e) => this.props.updatePayload({ reason: e.target.value })}
                error={this.props.error && payload.reason === ''}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile
                file={this.props.file}
                fileChange={(file) => this.props.updatePayload({ file: file })}
                error={this.props.error && payload.file === ''}
              />
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
            <h2 style={{color: 'black', fontSize: '20px'}} >英授專業課程抵免單</h2>
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
                    root: classes.label
                  },
                  shrink: true
                }}
                value={payload.class}
                onChange={(e) => this.props.updatePayload({ class: e.target.value })}
                error={this.props.error && payload.class === ''}
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
                value={payload.phone}
                onChange={(e) => this.props.updatePayload({ phone: e.target.value })}
                error={this.props.error && payload.phone === ''}
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
                value={payload.course_code}
                onChange={(e) => this.props.updatePayload({ course_code: e.target.value })}
                error={this.props.error && payload.course_code === ''}
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
                value={payload.course_name}
                onChange={(e) => this.props.updatePayload({ course_name: e.target.value })}
                error={this.props.error && payload.course_name === ''}
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
                value={payload.department}
                onChange={(e) => this.props.updatePayload({ department: e.target.value })}
                error={this.props.error && payload.department === ''}
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
                value={payload.teacher}
                onChange={(e) => this.props.updatePayload({ teacher: e.target.value })}
                error={this.props.error && payload.teacher === ''}
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
                value={payload.credit}
                onChange={(e) => this.props.updatePayload({ credit: e.target.value })}
                error={this.props.error && payload.credit === ''}
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
                multiline
                rowsMax='1'
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
                value={payload.reason}
                onChange={(e) => this.props.updatePayload({ reason: e.target.value })}
                error={this.props.error && payload.reason === ''}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <Postfile
                file={payload.file}
                fileChange={(file) => this.props.updatePayload({ file: file })}
                error={this.props.error && payload.file === ''}
              />
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
  payload: state.Student.Credit.englishCourse,
  error: state.Student.Credit.form.error
})

const mapDispatchToProps = (dispatch) => ({
  updatePayload: (payload) => dispatch(actions.credit.englishCourse.store(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnglishCourseForm))
