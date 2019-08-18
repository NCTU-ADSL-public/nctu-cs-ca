
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import {
  TextInput,
  TextInputDefault,
  LongInput,
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

class CompulsoryCourseForm extends React.Component {
  render () {
    const { classes, payload } = this.props

    return (
      <div>
        {/* For PC screen */}
        <div className='hidden-xs'>
          <div className={classes.container}>
            <h1 style={{color: 'black'}} >本系必修課程抵免單</h1>
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
              <TextInput
                label='修課學年度'
                type='number'
                value={payload.course_year}
                handleChange={(value) => this.props.updatePayload({ course_year: value })}
                error={this.props.error && payload.course_year === ''}
              />
              <SelectInput
                label='修課學期'
                value={payload.course_semester}
                handleChange={(value) => this.props.updatePayload({ course_semester: value })}
                error={this.props.error && payload.course_semester === 0}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
              </SelectInput>
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.original_course_code}
                handleChange={(value) => this.props.updatePayload({ original_course_code: value })}
                error={this.props.error && payload.original_course_code === ''}
              />
              <TextInput
                label='課程名稱'
                value={payload.original_course_name}
                handleChange={(value) => this.props.updatePayload({ original_course_name: value })}
                error={this.props.error && payload.original_course_name === ''}
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.original_course_credit}
                handleChange={(value) => this.props.updatePayload({ original_course_credit: value })}
                error={this.props.error && payload.original_course_credit === ''}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因（請擇一選擇）</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={payload.reason.type}
                  onChange={(e) => this.props.updatePayload({
                    reason: {
                      type: e.target.value,
                      content: ''
                    }
                  })}
                >
                  <FormControlLabel
                    value='被當'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        必修課程需重修，然因
                        <LongInput
                          label=''
                          placeholder='理由詳述'
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                          handleChange={(value) => this.props.updatePayload({
                            reason: {
                              ...payload.reason,
                              content: value
                            }
                          })}
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '其他'}
                        />
                        <br />不可抗拒之理由，需修習外系課程以抵本系必修課程
                        <font color='red'>(請於檔案上傳部分附上成績單)</font>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value='其他'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        其他原因：
                        <LongInput
                          label=''
                          placeholder='理由詳述'
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                          handleChange={(value) => this.props.updatePayload({
                            reason: {
                              ...payload.reason,
                              content: value
                            }
                          })}
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '被當'}
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
            <h2 style={{color: 'black', fontSize: '20px'}} >本系必修課程抵免單</h2>
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
              <TextInput
                label='修課學年度'
                type='number'
                value={payload.course_year}
                handleChange={(value) => this.props.updatePayload({ course_year: value })}
                error={this.props.error && payload.course_year === ''}
                mobile
              />
              <SelectInput
                label='修課學期'
                value={payload.course_semester}
                handleChange={(value) => this.props.updatePayload({ course_semester: value })}
                error={this.props.error && payload.course_semester === 0}
                mobile
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
              </SelectInput>
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextInput
                label='永久課號'
                placeholder='例：DCP1183'
                value={payload.original_course_code}
                handleChange={(value) => this.props.updatePayload({ original_course_code: value })}
                error={this.props.error && payload.original_course_code === ''}
                mobile
              />
              <TextInput
                label='課程名稱'
                value={payload.original_course_name}
                handleChange={(value) => this.props.updatePayload({ original_course_name: value })}
                error={this.props.error && payload.original_course_name === ''}
                mobile
              />
              <TextInput
                label='學分'
                type='number'
                value={payload.original_course_credit}
                handleChange={(value) => this.props.updatePayload({ original_course_credit: value })}
                error={this.props.error && payload.original_course_credit === ''}
                mobile
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={payload.reason.type}
                  onChange={(e) => this.props.updatePayload({
                    reason: {
                      type: e.target.value,
                      content: ''
                    }
                  })}
                >
                  <FormControlLabel
                    value='被當'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        必修課程需重修，然因
                        <LongInput
                          label=''
                          placeholder='理由詳述'
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                          handleChange={(value) => this.props.updatePayload({
                            reason: {
                              ...payload.reason,
                              content: value
                            }
                          })}
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '其他'}
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
                    value='其他'
                    control={<Radio />}
                    label={
                      <div style={{ fontSize: '16px' }}>
                        其他原因：
                        <LongInput
                          label=''
                          placeholder='理由詳述'
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                          handleChange={(value) => this.props.updatePayload({
                            reason: {
                              ...payload.reason,
                              content: value
                            }
                          })}
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '被當'}
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
  payload: state.Student.Credit.compulsoryCourse,
  error: state.Student.Credit.form.error
})

const mapDispatchToProps = (dispatch) => ({
  updatePayload: (payload) => dispatch(actions.credit.compulsoryCourse.store(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompulsoryCourseForm))
