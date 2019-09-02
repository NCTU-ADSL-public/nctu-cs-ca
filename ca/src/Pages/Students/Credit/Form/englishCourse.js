
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Postfile from './Postfile'
import {
  TextInput,
  TextInputDefault,
  LongInput
} from '../FormInput'
import { actions } from '../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  }
})

class EnglishCourseForm extends React.Component {
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
            <h1 style={{color: 'black'}} >英授專業課程抵免單</h1>
            <Divider />

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

            <h2>擬修課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.course_code}
                handleChange={(value) => this.props.updatePayload({ course_code: value })}
                error={this.props.error && payload.course_code === ''}
              />
              <TextInput
                label='課程名稱'
                value={payload.course_name}
                handleChange={(value) => this.props.updatePayload({ course_name: value })}
                error={this.props.error && payload.course_name === ''}
              />
              <TextInput
                label='開課系所'
                value={payload.department}
                handleChange={(value) => this.props.updatePayload({ department: value })}
                error={this.props.error && payload.department === ''}
              />
              <TextInput
                label='授課老師'
                value={payload.teacher}
                handleChange={(value) => this.props.updatePayload({ teacher: value })}
                error={this.props.error && payload.teacher === ''}
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.credit}
                handleChange={(value) => this.props.updatePayload({ credit: value })}
                error={this.props.error && payload.credit === ''}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <LongInput
                label=''
                placeholder='理由詳述'
                value={payload.reason}
                handleChange={(value) => this.props.updatePayload({ reason: value })}
                error={this.props.error && payload.reason === ''}
              />
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

            <h2>擬修課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.course_code}
                handleChange={(value) => this.props.updatePayload({ course_code: value })}
                error={this.props.error && payload.course_code === ''}
                mobile
              />
              <TextInput
                label='課程名稱'
                value={payload.course_name}
                handleChange={(value) => this.props.updatePayload({ course_name: value })}
                error={this.props.error && payload.course_name === ''}
                mobile
              />
              <TextInput
                label='開課系所'
                value={payload.department}
                handleChange={(value) => this.props.updatePayload({ department: value })}
                error={this.props.error && payload.department === ''}
                mobile
              />
              <TextInput
                label='授課老師'
                value={payload.teacher}
                handleChange={(value) => this.props.updatePayload({ teacher: value })}
                error={this.props.error && payload.teacher === ''}
                mobile
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.credit}
                handleChange={(value) => this.props.updatePayload({ credit: value })}
                error={this.props.error && payload.credit === ''}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <LongInput
                label=''
                placeholder='理由詳述'
                value={payload.reason}
                handleChange={(value) => this.props.updatePayload({ reason: value })}
                error={this.props.error && payload.reason === ''}
                mobile
              />
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
