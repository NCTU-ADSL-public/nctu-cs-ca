
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
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

class CompulsoryCourseFormConfirm extends React.Component {
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
              <TextInputDefault
                label='修課學年度'
                value={payload.course_year}
              />
              <TextInputDefault
                label='修課學期'
                value={['', '上', '下', '暑'][payload.course_semester]}
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.original_course_code}
              />
              <TextInputDefault
                label='科目名稱'
                value={payload.original_course_name}
              />
              <TextInputDefault
                label='學分'
                value={payload.original_course_credit}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因（請擇一選擇）</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup value={payload.reason.type}>
                  <FormControlLabel
                    disabled
                    value='被當'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        必修課程需重修，然因
                        <LongInputDefault
                          label=''
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                        />
                        <br />不可抗拒之理由，需修習外系課程以抵本系必修課程
                        <font color='red'>(請於檔案上傳部分附上成績單)</font>
                      </div>
                    }
                  />
                  <FormControlLabel
                    disabled
                    value='其他'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        其他原因：
                        <LongInputDefault
                          label=''
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                        />
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              檔案：{'need change'}
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
              <TextInputDefault
                label='修課學年度'
                value={payload.course_year}
                mobile
              />
              <TextInputDefault
                label='修課學期'
                value={['', '上', '下', '暑'][payload.course_semester]}
                mobile
              />
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInputDefault
                label='永久課號'
                value={payload.original_course_code}
                mobile
              />
              <TextInputDefault
                label='科目名稱'
                value={payload.original_course_name}
                mobile
              />
              <TextInputDefault
                label='學分'
                value={payload.original_course_credit}
                mobile
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因（請擇一選擇）</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={payload.reason.type}
                >
                  <FormControlLabel
                    disabled
                    value='被當'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px', margin: '15px' }}>
                        必修課程需重修，然因
                        <LongInputDefault
                          label=''
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                          mobile
                        />
                        <div style={{ margin: '5px' }}>
                          不可抗拒之理由，需修習外系課程以抵本系必修課程
                        </div>
                        <span style={{ margin: '5px', color: 'red' }}>(請於檔案上傳部分附上成績單)</span>
                      </div>
                    }
                  />
                  <FormControlLabel
                    disabled
                    value='其他'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px', margin: '15px' }}>
                        其他原因：
                        <LongInputDefault
                          label=''
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                          mobile
                        />
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div style={{ height: '50px' }} />

            <h2>課程綱要或課程資料上傳</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              檔案：{'need change'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  payload: state.Student.Credit.compulsoryCourse
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompulsoryCourseFormConfirm))
