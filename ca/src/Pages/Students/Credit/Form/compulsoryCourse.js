
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
                onChange={(e) => this.props.updataPayload({ class: e.target.value })}
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
                onChange={(e) => this.props.updataPayload({ phone: e.target.value })}
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
                error={this.props.error && payload.course_code === ''}
                onChange={(e) => this.props.updataPayload({ course_code: e.target.value })}
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
                value={payload.course_name}
                error={this.props.error && payload.course_name === ''}
                onChange={(e) => this.props.updataPayload({ course_name: e.target.value })}
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
                error={this.props.error && payload.department === ''}
                value={payload.department}
                onChange={(e) => this.props.updataPayload({ department: e.target.value })}
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
                error={this.props.error && payload.teacher === ''}
                onChange={(e) => this.props.updataPayload({ teacher: e.target.value })}
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
                error={this.props.error && payload.credit === ''}
                onChange={(e) => this.props.updataPayload({ credit: e.target.value })}
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
                value={payload.course_year}
                error={this.props.error && payload.course_year === ''}
                onChange={(e) => this.props.updataPayload({ course_year: e.target.value })}
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
                value={payload.course_semester}
                error={this.props.error && payload.course_semester === ''}
                onChange={(e) => this.props.updataPayload({ course_semester: e.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
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
                value={payload.original_course_code}
                error={this.props.error && payload.original_course_code === ''}
                onChange={(e) => this.props.updataPayload({ original_course_code: e.target.value })}
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
                value={payload.original_course_name}
                error={this.props.error && payload.original_course_name === ''}
                onChange={(e) => this.props.updataPayload({ original_course_name: e.target.value })}
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
                value={payload.original_course_credit}
                error={this.props.error && payload.original_course_credit === ''}
                onChange={(e) => this.props.updataPayload({ original_course_credit: e.target.value })}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因（請擇一選擇）</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={payload.reason.type}
                  onChange={(e) => this.props.updataPayload({
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
                          disabled={payload.reason.type === '其他'}
                          error={this.props.error && payload.reason.content === ''}
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                          onChange={(e) => this.props.updataPayload({
                            reason: {
                              ...payload.reason,
                              content: e.target.value
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
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '被當'}
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                          onChange={(e) => this.props.updataPayload({
                            reason: {
                              ...payload.reason,
                              content: e.target.value
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
                fileChange={(file) => this.props.updataPayload({ file: file })}
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
                error={this.props.error && payload.class === ''}
                onChange={(e) => this.props.updataPayload({ class: e.target.value })}
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
                onChange={(e) => this.props.updataPayload({ phone: e.target.value })}
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
                error={this.props.error && payload.course_code === ''}
                onChange={(e) => this.props.updataPayload({ course_code: e.target.value })}
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
                error={this.props.error && payload.course_name === ''}
                onChange={(e) => this.props.updataPayload({ course_name: e.target.value })}
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
                error={this.props.error && payload.department === ''}
                onChange={(e) => this.props.updataPayload({ department: e.target.value })}
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
                error={this.props.error && payload.teacher === ''}
                onChange={(e) => this.props.updataPayload({ teacher: e.target.value })}
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
                error={this.props.error && payload.credit === ''}
                onChange={(e) => this.props.updataPayload({ credit: e.target.value })}
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
                value={payload.course_year}
                error={this.props.error && payload.course_year === ''}
                onChange={(e) => this.props.updataPayload({ course_year: e.target.value })}
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
                value={payload.course_semester}
                error={this.props.error && payload.course_semester === ''}
                onChange={(e) => this.props.updataPayload({ course_semester: e.target.value })}
              >
                <MenuItem value={0} style={{ height: '10px' }}>請選擇修課學期</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>上</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>下</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>暑</MenuItem>
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
                value={payload.original_course_code}
                error={this.props.error && payload.original_course_code === ''}
                onChange={(e) => this.props.updataPayload({ original_course_code: e.target.value })}
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
                value={payload.original_course_name}
                error={this.props.error && payload.original_course_name === ''}
                onChange={(e) => this.props.updataPayload({ original_course_name: e.target.value })}
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
                value={payload.original_course_credit}
                error={this.props.error && payload.original_course_credit === ''}
                onChange={(e) => this.props.updataPayload({ original_course_credit: e.target.value })}
              />
            </div>

            <div style={{ height: '50px', clear: 'both' }} />

            <h2>申請原因</h2>
            <hr style={{ margin: '5px' }} />
            <div style={{ margin: '5px' }}>
              <FormControl component='fieldset'>
                <RadioGroup
                  value={payload.reason.type}
                  onChange={(e) => this.props.updataPayload({
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
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '其他'}
                          value={payload.reason.type === '被當' ? payload.reason.content : ''}
                          onChange={(e) => this.props.updataPayload({
                            reason: {
                              ...payload.reason,
                              content: e.target.value
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
                          error={this.props.error && payload.reason.content === ''}
                          disabled={payload.reason.type === '被當'}
                          value={payload.reason.type === '其他' ? payload.reason.content : ''}
                          onChange={(e) => this.props.updataPayload({
                            reason: {
                              ...payload.reason,
                              content: e.target.value
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
                fileChange={(file) => this.props.updataPayload({ file: file })}
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
  updataPayload: (payload) => dispatch(actions.credit.compulsoryCourse.store(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompulsoryCourseForm))
