
import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Postfile from './Postfile'
import { compulsoryCourseChange } from '../../../../Redux/Students/Actions/Credit'

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
  input: {
    fontSize: '16px'
  },
  menu: {
    width: 150,
    fontSize: '20px'
  },
  menuMb: {
    width: 150,
    fontSize: '18px'
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
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class CompulsoryCourseForm extends React.Component {
  render () {
    const { classes } = this.props
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
                value={this.props.class}
                error={this.props.errorsubmitted ? this.props.class === '' : false}
                onChange={(event) => this.props.handleChange({ class: event.target.value })}
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
                value={this.props.phone}
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
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
                error={this.props.errorsubmitted ? this.props.department === '' : false}
                value={this.props.department}
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
              <TextField
                label='修課學年度'
                type='number'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
                value={this.props.course_year}
                error={this.props.errorsubmitted ? this.props.course_year === '' : false}
                onChange={(event) => this.props.handleChange({ course_year: event.target.value })}
              />
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
                value={this.props.course_semester}
                error={this.props.errorsubmitted ? this.props.course_semester === '' : false}
                onChange={(event) => this.props.handleChange({ course_semester: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
              </TextField>
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
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
                value={this.props.original_course_code}
                error={this.props.errorsubmitted ? this.props.original_course_code === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_code: event.target.value })}
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
                value={this.props.original_course_name}
                error={this.props.errorsubmitted ? this.props.original_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
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
                value={this.props.original_course_credit}
                error={this.props.errorsubmitted ? this.props.original_course_credit === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因（請擇一選擇）</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={this.props.reason.type}
                  onChange={(event) => this.props.handleChange({
                    reason: {
                      type: event.target.value,
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
                          disabled={this.props.reason.type === '其他'}
                          error={this.props.errorsubmitted ? this.props.reason.content === '' : false}
                          value={this.props.reason.type === '被當' ? this.props.reason.content : ''}
                          onChange={(event) => this.props.handleChange({
                            reason: {
                              ...this.props.reason,
                              content: event.target.value
                            }
                          })}
                          multiline
                          rowsMax='1'
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
                          error={this.props.errorsubmitted ? this.props.reason.content === '' : false}
                          disabled={this.props.reason.type === '被當'}
                          value={this.props.reason.type === '其他' ? this.props.reason.content : ''}
                          onChange={(event) => this.props.handleChange({
                            reason: {
                              ...this.props.reason,
                              content: event.target.value
                            }
                          })}
                          multiline
                          rowsMax='1'
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
                fileChange={(file) => this.props.handleChange({ file: file })}
                error={this.props.errorsubmitted ? this.props.file === '' : false}
                file={this.props.file}
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
                value={this.props.class}
                error={this.props.errorsubmitted ? this.props.class === '' : false}
                onChange={(event) => this.props.handleChange({ class: event.target.value })}
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
                value={this.props.phone}
                error={this.props.errorsubmitted ? this.props.phone === '' : false}
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
                value={this.props.course_code}
                error={this.props.errorsubmitted ? this.props.course_code === '' : false}
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
                value={this.props.course_name}
                error={this.props.errorsubmitted ? this.props.course_name === '' : false}
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
                value={this.props.department}
                error={this.props.errorsubmitted ? this.props.department === '' : false}
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
                value={this.props.teacher}
                error={this.props.errorsubmitted ? this.props.teacher === '' : false}
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
                value={this.props.credit}
                error={this.props.errorsubmitted ? this.props.credit === '' : false}
                onChange={(event) => this.props.handleChange({ credit: event.target.value })}
              />
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='修課學年度'
                type='number'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.course_year}
                error={this.props.errorsubmitted ? this.props.course_year === '' : false}
                onChange={(event) => this.props.handleChange({ course_year: event.target.value })}
              />
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
                    root: classes.label
                  },
                  shrink: true
                }}
                margin='normal'
                value={this.props.course_semester}
                error={this.props.errorsubmitted ? this.props.course_semester === '' : false}
                onChange={(event) => this.props.handleChange({ course_semester: event.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
              </TextField>
            </div>

            <div style={{ height: '50px' }} />

            <h2>欲抵免之本系課程資訊</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <TextField
                style={{ width: 'calc( 100% - 24px )' }}
                label='永久課號'
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelMb
                  },
                  shrink: true
                }}
                value={this.props.original_course_code}
                error={this.props.errorsubmitted ? this.props.original_course_code === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_code: event.target.value })}
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
                value={this.props.original_course_name}
                error={this.props.errorsubmitted ? this.props.original_course_name === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_name: event.target.value })}
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
                value={this.props.original_course_credit}
                error={this.props.errorsubmitted ? this.props.original_course_credit === '' : false}
                onChange={(event) => this.props.handleChange({ original_course_credit: event.target.value })}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={this.props.reason.type}
                  onChange={(event) => this.props.handleChange({
                    reason: {
                      type: event.target.value,
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
                        <TextField
                          style={{ width: 'calc( 100% - 24px )' }}
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
                          error={this.props.errorsubmitted ? this.props.reason.content === '' : false}
                          disabled={this.props.reason.type === '其他'}
                          value={this.props.reason.type === '被當' ? this.props.reason.content : ''}
                          onChange={(event) => this.props.handleChange({
                            reason: {
                              ...this.props.reason,
                              content: event.target.value
                            }
                          })}
                          multiline
                          rowsMax='1'
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
                        <TextField
                          style={{ width: 'calc( 100% - 24px )' }}
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
                          error={this.props.errorsubmitted ? this.props.reason.content === '' : false}
                          disabled={this.props.reason.type === '被當'}
                          value={this.props.reason.type === '其他' ? this.props.reason.content : ''}
                          onChange={(event) => this.props.handleChange({
                            reason: {
                              ...this.props.reason,
                              content: event.target.value
                            }
                          })}
                          multiline
                          rowsMax='1'
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
                fileChange={(file) => this.props.handleChange({ file: file })}
                error={this.props.errorsubmitted ? this.props.file === '' : false}
                file={this.props.file}
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
  class: state.Student.Credit.compulsoryCourse.class,
  year: state.Student.Credit.compulsoryCourse.year,
  semester: state.Student.Credit.compulsoryCourse.semester,
  department: state.Student.Credit.compulsoryCourse.department,
  teacher: state.Student.Credit.compulsoryCourse.teacher,
  credit: state.Student.Credit.compulsoryCourse.credit,
  original_course_name: state.Student.Credit.compulsoryCourse.original_course_name,
  original_course_code: state.Student.Credit.compulsoryCourse.original_course_code,
  original_course_credit: state.Student.Credit.compulsoryCourse.original_course_credit,
  course_year: state.Student.Credit.compulsoryCourse.course_year,
  course_semester: state.Student.Credit.compulsoryCourse.course_semester,
  course_name: state.Student.Credit.compulsoryCourse.course_name,
  course_code: state.Student.Credit.compulsoryCourse.course_code,
  reason: state.Student.Credit.compulsoryCourse.reason,
  phone: state.Student.Credit.compulsoryCourse.phone,
  file: state.Student.Credit.compulsoryCourse.file,
  errorsubmitted: state.Student.Credit.errorsubmitted
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: (payload) => { dispatch(compulsoryCourseChange(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompulsoryCourseForm))
