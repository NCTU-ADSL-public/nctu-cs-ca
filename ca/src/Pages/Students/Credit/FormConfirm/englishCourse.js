
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  TextInputDefault,
  LongInputDefault
} from '../FormInput'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  }
})

class EnglishCourseFormConfirm extends React.Component {
  render () {
    const { classes, payload } = this.props

    return (
      <div>
        { /* For PC screen */ }
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h4 style={{ color: 'red' }}>確認無誤後送出</h4>

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
              <TextInputDefault
                label='系所/年級/班別'
                value={payload.class}
              />
              <TextInputDefault
                label='手機'
                value={payload.phone}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>擬修課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.course_code}
              />
              <TextInputDefault
                label='課程名稱'
                value={payload.course_name}
              />
              <TextInputDefault
                label='開課系所'
                value={payload.department}
              />
              <TextInputDefault
                label='授課老師'
                value={payload.teacher}
              />
              <TextInputDefault
                label='學分'
                value={payload.credit}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <LongInputDefault
                label=''
                value={payload.reason}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              檔案：{'need change'}
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

        { /* For mobile screen */ }
        <div className='hidden-sm hidden-md hidden-lg'>
          <div className={classes.container}>
            <h4 style={{ color: 'red' }}>確認無誤後送出</h4>

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
              <TextInputDefault
                label='系所/年級/班別'
                value={payload.class}
                mobile
              />
              <TextInputDefault
                label='手機'
                value={payload.phone}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>擬修課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.course_code}
                mobile
              />
              <TextInputDefault
                label='課程名稱'
                value={payload.course_name}
                mobile
              />
              <TextInputDefault
                label='開課系所'
                value={payload.department}
                mobile
              />
              <TextInputDefault
                label='授課老師'
                value={payload.teacher}
                mobile
              />
              <TextInputDefault
                label='學分'
                value={payload.credit}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <LongInputDefault
                label=''
                value={payload.reason}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              檔案：{'need change'}
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
  payload: state.Student.Credit.englishCourse
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnglishCourseFormConfirm))
