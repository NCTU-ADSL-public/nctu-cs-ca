
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TextInputDefault } from '../FormInput'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  }
})

class WaiveCourseFormConfirm extends React.Component {
  render () {
    const { classes, payload } = this.props

    return (
      <div>
        {/* For PC screen */}
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

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='原就讀學校'
                value={payload.original_school}
              />
              <TextInputDefault
                label='原就讀系所科別'
                value={payload.original_department}
              />
              <TextInputDefault
                label='原就讀校系畢業學分數'
                value={payload.original_graduation_credit}
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='科目名稱'
                value={payload.original_course_name}
              />
              <TextInputDefault
                label='開課系所'
                value={payload.original_course_department}
              />
              <TextInputDefault
                label='修課年級'
                value={['', '一', '二', '三', '四'][payload.original_course_year]}
              />
              <TextInputDefault
                label='修課學期'
                value={['', '上', '下', '暑'][payload.original_course_semester]}
              />
              <TextInputDefault
                label='學分'
                value={payload.original_course_credit}
              />
              <TextInputDefault
                label='成績'
                value={payload.original_course_score}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.current_course_code}
              />
              <TextInputDefault
                label='科目名稱'
                value={payload.current_course_name}
              />
              <TextInputDefault
                label='學分'
                value={payload.current_course_credit}
              />
              <TextInputDefault
                label='選別'
                value={payload.current_course_type}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <a href={payload.file} download={`${this.props.studentIdcard.student_id}_學分抵免.pdf`}>
                檔案下載
              </a>
            </div>
          </div>
        </div>

        {/* For mobile screen */}
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

            <h2>原就讀學校及科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='原就讀學校'
                value={payload.original_school}
                mobile
              />
              <TextInputDefault
                label='原就讀系所科別'
                value={payload.original_department}
                mobile
              />
              <TextInputDefault
                label='原就讀校系畢業學分數'
                value={payload.original_graduation_credit}
                mobile
              />
            </div>

            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='科目名稱'
                value={payload.original_course_name}
                mobile
              />
              <TextInputDefault
                label='開課系所'
                value={payload.original_course_department}
                mobile
              />
              <TextInputDefault
                label='修課年級'
                value={['', '一', '二', '三', '四'][payload.original_course_year]}
                mobile
              />
              <TextInputDefault
                label='修課學期'
                value={['', '上', '下', '暑'][payload.original_course_semester]}
                mobile
              />
              <TextInputDefault
                label='學分'
                value={payload.original_course_credit}
                mobile
              />
              <TextInputDefault
                label='成績'
                value={payload.original_course_score}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>抵免本校之科目資料</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.current_course_code}
                mobile
              />
              <TextInputDefault
                label='科目名稱'
                value={payload.current_course_name}
                mobile
              />
              <TextInputDefault
                label='學分'
                value={payload.current_course_credit}
                mobile
              />
              <TextInputDefault
                label='選別'
                value={payload.current_course_type}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <a href={payload.file} download={`${this.props.studentIdcard.student_id}_學分抵免.pdf`}>
                檔案下載
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  payload: state.Student.Credit.waiveCourse
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaiveCourseFormConfirm))
