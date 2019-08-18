
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import {
  TextInput,
  TextInputDefault,
  SelectInput
} from '../FormInput'
import Postfile from './Postfile'
import { actions } from '../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
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
              <TextInputDefault
                label='申請人'
                value={this.props.studentIdcard.sname}
              />
              <TextInputDefault
                label='學號'
                value={this.props.studentIdcard.student_id}
              />
              <TextInput
                label='系所/年級/班別'
                placeholder='例：資工系資工組大一A班'
                value={payload.class}
                handleChange={(value) => this.props.updatePayload({ class: value })}
                error={this.props.error && payload.class === ''}
              />
              <TextInput
                label='手機'
                margin='normal'
                value={payload.phone}
                handleChange={(value) => this.props.updatePayload({ phone: value })}
                error={this.props.error && payload.phone === ''}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='原就讀學校'
                placeholder='非跨校抵免填交通大學'
                value={payload.original_school}
                handleChange={(value) => this.props.updatePayload({ original_school: value })}
                error={this.props.error && payload.original_school === ''}
              />
              <TextInput
                label='原就讀系所科別'
                value={payload.original_department}
                handleChange={(value) => this.props.updatePayload({ original_department: value })}
                error={this.props.error && payload.original_department === ''}
              />
              <TextInput
                label='原就讀校系畢業學分數'
                type='number'
                value={payload.original_graduation_credit}
                handleChange={(value) => this.props.updatePayload({ original_graduation_credit: value })}
                error={this.props.error && payload.original_graduation_credit === ''}
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextInput
                label='科目名稱'
                value={payload.original_course_name}
                handleChange={(value) => this.props.updatePayload({ original_course_name: value })}
                error={this.props.error && payload.original_course_name === ''}
              />
              <TextInput
                label='開課系所'
                value={payload.original_course_department}
                handleChange={(value) => this.props.updatePayload({ original_course_department: value })}
                error={this.props.error && payload.original_course_department === ''}
              />
              <SelectInput
                label='修課年級'
                value={payload.original_course_year}
                handleChange={(value) => this.props.updatePayload({ original_course_year: value })}
                error={this.props.error && payload.original_course_year === 0}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課年級</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>一</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>二</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>三</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>四</MenuItem>
              </SelectInput>
              <SelectInput
                label='修課學期'
                value={payload.original_course_semester}
                handleChange={(value) => this.props.updatePayload({ original_course_semester: value })}
                error={this.props.error && payload.original_course_semester === 0}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
              </SelectInput>
              <TextInput
                label='學分'
                type='number'
                value={payload.original_course_credit}
                handleChange={(value) => this.props.updatePayload({ original_course_credit: value })}
                error={this.props.error && payload.original_course_credit === ''}
              />
              <TextInput
                label='成績'
                placeholder='若無分數則填通過與否'
                value={payload.original_course_score}
                handleChange={(value) => this.props.updatePayload({ original_course_score: value })}
                error={this.props.error && payload.original_course_score === ''}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.current_course_code}
                handleChange={(value) => this.props.updatePayload({ current_course_code: value })}
                error={this.props.error && payload.current_course_code === ''}
              />
              <TextInput
                label='科目名稱'
                value={payload.current_course_name}
                handleChange={(value) => this.props.updatePayload({ current_course_name: value })}
                error={this.props.error && payload.current_course_name === ''}
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.current_course_credit}
                handleChange={(value) => this.props.updatePayload({ current_course_credit: value })}
                error={this.props.error && payload.current_course_credit === ''}
              />
              <SelectInput
                label='選別'
                value={payload.current_course_type}
                handleChange={(value) => this.props.updatePayload({ current_course_type: value })}
                error={this.props.error && payload.current_course_type === '請選擇選別'}
              >
                <MenuItem value={'請選擇選別'} style={{ height: '10px' }}>請選擇選別</MenuItem>
                <MenuItem value={'必修'} style={{ height: '10px' }}>必修</MenuItem>
                <MenuItem value={'選修'} style={{ height: '10px' }}>選修</MenuItem>
                <MenuItem value={'通識'} style={{ height: '10px' }}>通識</MenuItem>
                <MenuItem value={'外語'} style={{ height: '10px' }}>外語</MenuItem>
                <MenuItem value={'體育'} style={{ height: '10px' }}>體育</MenuItem>
                <MenuItem value={'大學部修研究所課程'} style={{ height: '10px' }}>大學部修研究所課程</MenuItem>
              </SelectInput>
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

        {/* For mobile & xs */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2 style={{color: 'black', fontSize: '20px'}} >學分抵免單</h2>
            <Divider />
            <div style={{ color: 'red', fontSize: '16px' }}>申請多門抵免需額外填寫另一張表單</div>

            <h2>基本資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='申請人'
                value={this.props.studentIdcard.sname}
                mobile
              />
              <TextInputDefault
                label='學號'
                value={this.props.studentIdcard.student_id}
                mobile
              />
              <TextInput
                label='系所/年級/班別'
                placeholder='例：資工系資工組大一A班'
                value={payload.class}
                handleChange={(value) => this.props.updatePayload({ class: value })}
                error={this.props.error && payload.class === ''}
                mobile
              />
              <TextInput
                label='手機'
                margin='normal'
                value={payload.phone}
                handleChange={(value) => this.props.updatePayload({ phone: value })}
                error={this.props.error && payload.phone === ''}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='原就讀學校'
                placeholder='非跨校抵免填交通大學'
                value={payload.original_school}
                handleChange={(value) => this.props.updatePayload({ original_school: value })}
                error={this.props.error && payload.original_school === ''}
                mobile
              />
              <TextInput
                label='原就讀系所科別'
                margin='normal'
                value={payload.original_department}
                handleChange={(value) => this.props.updatePayload({ original_department: value })}
                error={this.props.error && payload.original_department === ''}
                mobile
              />
              <TextInput
                label='原就讀校系畢業學分數'
                type='number'
                value={payload.original_graduation_credit}
                handleChange={(value) => this.props.updatePayload({ original_graduation_credit: value })}
                error={this.props.error && payload.original_graduation_credit === ''}
                mobile
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextInput
                label='科目名稱'
                value={payload.original_course_name}
                handleChange={(value) => this.props.updatePayload({ original_course_name: value })}
                error={this.props.error && payload.original_course_name === ''}
                mobile
              />
              <TextInput
                label='開課系所'
                value={payload.original_course_department}
                handleChange={(value) => this.props.updatePayload({ original_course_department: value })}
                error={this.props.error && payload.original_course_department === ''}
                mobile
              />
              <SelectInput
                label='修課年級'
                value={payload.original_course_year}
                handleChange={(value) => this.props.updatePayload({ original_course_year: value })}
                error={this.props.error && payload.original_course_year === 0}
                mobile
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課年級</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>一</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>二</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>三</MenuItem>
                <MenuItem value={4} style={{ height: '10px' }}>四</MenuItem>
              </SelectInput>
              <SelectInput
                label='修課學期'
                value={payload.original_course_semester}
                handleChange={(value) => this.props.updatePayload({ original_course_semester: value })}
                error={this.props.error && payload.original_course_semester === 0}
                mobile
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
              </SelectInput>
              <TextInput
                label='學分'
                type='number'
                value={payload.original_course_credit}
                handleChange={(value) => this.props.updatePayload({ original_course_credit: value })}
                error={this.props.error && payload.original_course_credit === ''}
                mobile
              />
              <TextInput
                label='成績'
                placeholder='若無分數則填通過與否'
                value={payload.original_course_score}
                handleChange={(value) => this.props.updatePayload({ original_course_score: value })}
                error={this.props.error && payload.original_course_score === ''}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.current_course_code}
                handleChange={(value) => this.props.updatePayload({ current_course_code: value })}
                error={this.props.error && payload.current_course_code === ''}
                mobile
              />
              <TextInput
                label='科目名稱'
                value={payload.current_course_name}
                handleChange={(value) => this.props.updatePayload({ current_course_name: value })}
                error={this.props.error && payload.current_course_name === ''}
                mobile
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.current_course_credit}
                handleChange={(value) => this.props.updatePayload({ current_course_credit: value })}
                error={this.props.error && payload.current_course_credit === ''}
                mobile
              />
              <SelectInput
                label='選別'
                value={payload.current_course_type}
                handleChange={(value) => this.props.updatePayload({ current_course_type: value })}
                error={this.props.error && payload.current_course_type === '請選擇選別'}
                mobile
              >
                <MenuItem value={'請選擇選別'} style={{ height: '10px' }}>請選擇選別</MenuItem>
                <MenuItem value={'必修'} style={{ height: '10px' }}>必修</MenuItem>
                <MenuItem value={'選修'} style={{ height: '10px' }}>選修</MenuItem>
                <MenuItem value={'通識'} style={{ height: '10px' }}>通識</MenuItem>
                <MenuItem value={'外語'} style={{ height: '10px' }}>外語</MenuItem>
                <MenuItem value={'體育'} style={{ height: '10px' }}>體育</MenuItem>
                <MenuItem value={'大學部修研究所課程'} style={{ height: '10px' }}>大學部修研究所課程</MenuItem>
              </SelectInput>
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
