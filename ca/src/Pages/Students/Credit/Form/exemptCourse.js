
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

class ExemptCourseForm extends React.Component {
  render () {
    const { classes, payload } = this.props
    const sid = this.props.studentIdcard.student_id
    const { sname, program, grade } = this.props.studentIdcard
    const classDetail = `資工系${program}${grade}`

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h1 style={{color: 'black'}} >課程免修單</h1>
            <Divider />
            <div style={{ color: 'red', fontSize: '20px' }}>
              若申請兩門抵一門(例如：「計算機概論」+「程式設計」抵免「計算機概論與程式設計」)，請將兩門課程分成兩個申請單填寫
            </div>

            <h2>基本資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='申請人'
                value={sname}
              />
              <TextInputDefault
                label='學號'
                value={sid}
              />
              <TextInput
                label='系所/年級/班別'
                value={classDetail}
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

            <h2>已修習課程資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='課程名稱'
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

            <h2>申請免修課程資料</h2>
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
                label='課程名稱'
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
                handleChange={(value) => this.props.updatePayload({ file: value })}
                error={this.props.error && payload.file === ''}
              />
            </div>
          </div>
        </div>

        {/* For mobile screen */}
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h2 style={{color: 'black', fontSize: '20px'}} >課程免修單</h2>
            <Divider />
            <div style={{ color: 'red', fontSize: '16px' }}>
              若申請兩門抵一門(例如：「計算機概論」+「程式設計」抵免「計算機概論與程式設計」)，請將兩門課程分成兩個申請單填寫
            </div>

            <h2>基本資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='申請人'
                value={sname}
                mobile
              />
              <TextInputDefault
                label='學號'
                value={sid}
                mobile
              />
              <TextInput
                label='系所/年級/班別'
                value={classDetail}
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

            <h2>已修習課程資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='課程名稱'
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

            <h2>申請免修課程資料</h2>
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
                label='課程名稱'
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
                handleChange={(value) => this.props.updatePayload({ file: value })}
                error={this.props.error && payload.file === ''}
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
  payload: state.Student.Credit.exemptCourse,
  error: state.Student.Credit.form.error
})

const mapDispatchToProps = (dispatch) => ({
  updatePayload: (payload) => dispatch(actions.credit.exemptCourse.store(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExemptCourseForm))
