
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { actions } from '../../../../Redux/Students/Actions/Credit'
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
    fontSize: '18px'
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
    fontSize: '18px'
  }
})

class WaiveCourseForm extends React.Component {
  render () {
    const { classes, payload } = this.props

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h1 style={{color: 'black'}} >學分抵免單</h1>
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
                error={this.props.error && payload.class === ''}
                onChange={(event) => this.props.updatePayload({ class: event.target.value })}
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
                error={this.props.error && payload.phone === ''}
                onChange={(event) => this.props.updatePayload({ phone: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                label='原就讀學校'
                placeholder='非跨校抵免填交通大學'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={payload.original_school}
                error={this.props.error && payload.original_school === ''}
                onChange={(event) => this.props.updatePayload({ original_school: event.target.value })}
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
                value={payload.original_department}
                error={this.props.error && payload.original_department === ''}
                onChange={(event) => this.props.updatePayload({ original_department: event.target.value })}
              />
              <TextField
                label='原就讀校系畢業學分數'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={payload.original_graduation_credit}
                error={this.props.error && payload.original_graduation_credit === ''}
                onChange={(event) => this.props.updatePayload({ original_graduation_credit: event.target.value })}
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextField
                label='科目名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={payload.original_course_name}
                error={this.props.error && payload.original_course_name === ''}
                onChange={(event) => this.props.updatePayload({ original_course_name: event.target.value })}
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
                value={payload.original_course_department}
                error={this.props.error && payload.original_course_department === ''}
                onChange={(event) => this.props.updatePayload({ original_course_department: event.target.value })}
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
                value={payload.original_course_year}
                error={this.props.error && payload.original_course_year === 0}
                onChange={(event) => this.props.updatePayload({ original_course_year: event.target.value })}
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
                value={payload.original_course_semester}
                error={this.props.error && payload.original_course_semester === 0}
                onChange={(event) => this.props.updatePayload({ original_course_semester: event.target.value })}
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
                value={payload.original_course_credit}
                error={this.props.error && payload.original_course_credit === ''}
                onChange={(event) => this.props.updatePayload({ original_course_credit: event.target.value })}
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
                value={payload.original_course_score}
                error={this.props.error && payload.original_course_score === ''}
                onChange={(event) => this.props.updatePayload({ original_course_score: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
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
                value={payload.current_course_code}
                error={this.props.error && payload.current_course_code === ''}
                onChange={(event) => this.props.updatePayload({ current_course_code: event.target.value })}
              />
              <TextField
                label='科目名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={payload.current_course_name}
                error={this.props.error && payload.current_course_name === ''}
                onChange={(event) => this.props.updatePayload({ current_course_name: event.target.value })}
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
                value={payload.current_course_credit}
                error={this.props.error && payload.current_course_credit === ''}
                onChange={(event) => this.props.updatePayload({ current_course_credit: event.target.value })}
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
                value={payload.current_course_type}
                error={this.props.error && payload.current_course_type === '請選擇選別'}
                onChange={(event) => this.props.updatePayload({ current_course_type: event.target.value })}
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
                fileChange={(file) => this.props.updatePayload({ file: file })}
                error={this.props.error && payload.file === ''}
                file={payload.file}
              />
            </div>
          </div>
        </div>

        {/* For mobile screen */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2 style={{color: 'black', fontSize: '20px'}} >學分抵免單</h2>
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
                error={this.props.error && payload.class === ''}
                value={payload.class}
                onChange={(event) => this.props.updatePayload({ class: event.target.value })}
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
                error={this.props.error && payload.phone === ''}
                onChange={(event) => this.props.updatePayload({ phone: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='原就讀學校'
                placeholder='非跨校抵免填交通大學'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={payload.original_school}
                error={this.props.error && payload.original_school === ''}
                onChange={(event) => this.props.updatePayload({ original_school: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='原就讀系所科別'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                error={this.props.error && payload.original_department === ''}
                value={payload.original_department}
                onChange={(event) => this.props.updatePayload({ original_department: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='原就讀校系畢業學分數'
                margin='normal'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={payload.original_graduation_credit}
                error={this.props.error && payload.original_graduation_credit === ''}
                onChange={(event) => this.props.updatePayload({ original_graduation_credit: event.target.value })}
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='科目名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={payload.original_course_name}
                error={this.props.error && payload.original_course_name === ''}
                onChange={(event) => this.props.updatePayload({ original_course_name: event.target.value })}
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
                value={payload.original_course_department}
                error={this.props.error && payload.original_course_department === ''}
                onChange={(event) => this.props.updatePayload({ original_course_department: event.target.value })}
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
                error={this.props.error && payload.original_course_year === 0}
                value={payload.original_course_year}
                onChange={(event) => this.props.updatePayload({ original_course_year: event.target.value })}
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
                value={payload.original_course_semester}
                error={this.props.error && payload.original_course_semester === 0}
                onChange={(event) => this.props.updatePayload({ original_course_semester: event.target.value })}
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
                value={payload.original_course_credit}
                error={this.props.error && payload.original_course_credit === ''}
                onChange={(event) => this.props.updatePayload({ original_course_credit: event.target.value })}
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
                value={payload.original_course_score}
                error={this.props.error && payload.original_course_score === ''}
                onChange={(event) => this.props.updatePayload({ original_course_score: event.target.value })}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
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
                value={payload.current_course_code}
                error={this.props.error && payload.current_course_code === ''}
                onChange={(event) => this.props.updatePayload({ current_course_code: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='科目名稱'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={payload.current_course_name}
                error={this.props.error && payload.current_course_name === ''}
                onChange={(event) => this.props.updatePayload({ current_course_name: event.target.value })}
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
                value={payload.current_course_credit}
                error={this.props.error && payload.current_course_credit === ''}
                onChange={(event) => this.props.updatePayload({ current_course_credit: event.target.value })}
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
                value={payload.current_course_type}
                error={this.props.error && payload.current_course_type === '請選擇選別'}
                onChange={(event) => this.props.updatePayload({ current_course_type: event.target.value })}
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
                fileChange={(file) => this.props.updatePayload({ file: file })}
                error={this.props.error && payload.file === ''}
                file={payload.file}
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
  payload: state.Student.Credit.waiveCourse,
  error: state.Student.Credit.form.error
})

const mapDispatchToProps = (dispatch) => ({
  updatePayload: (payload) => dispatch(actions.credit.waiveCourse.store(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaiveCourseForm))
