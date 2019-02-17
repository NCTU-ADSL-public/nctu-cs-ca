import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import { Chip } from '@material-ui/core'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FormSelectTable from './FormSelectTable'
import WaiveCourseForm from './CreditCourseTextForm/waiveCourse'
import ExemptCourseForm from './CreditCourseTextForm/exemptCourse'
import CompulsoryCourseForm from './CreditCourseTextForm/compulsoryCourse'
import EnglishCourseForm from './CreditCourseTextForm/englishCourse'
import WaiveCourseFormConfirm from './CreditCourseTextFormConfirm/waiveCourse'
import ExemptCourseFormConfirm from './CreditCourseTextFormConfirm/exemptCourse'
import CompulsoryCourseFormConfirm from './CreditCourseTextFormConfirm/compulsoryCourse'
import EnglishCourseFormConfirm from './CreditCourseTextFormConfirm/englishCourse'
import {
  sendWaiveCourse,
  sendExemptCourse,
  sendCompulsoryCourse,
  sendEnglishCourse,
  editCredit,
  resetCourse,
  senderrorSubmit
} from '../../../../Redux/Students/Actions/Credit'
import './Stepper.css'
import firebase from 'firebase'
import CircleProgress from './Components/CircleProgress'
import scrollToComponent from 'react-scroll-to-component'

class HorizontalLinearStepper extends React.Component {
  constructor (props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.selectCreditForm = this.selectCreditForm.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this)
    this.state = {
      finished: false,
      stepIndex: 0,
      selectFormIndex: -1
    }
  }

  componentDidMount () {
    // 判斷是不是按下編輯後跳轉過來的
    if (this.props.location.state && this.props.location.state.edit) {
      // 直接跳過選取表單的步驟
      this.setState({
        stepIndex: 1,
        selectFormIndex: this.props.location.state.index
      })
    }
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000 })
  }

  resetFormForNew () {
    // 回復為初始狀態，並清除每個表單的輸入
    this.setState({
      finished: false,
      stepIndex: 0,
      selectFormIndex: -1
    })
    this.props.resetCourse()
  }

  resetFormForEdit () {
    this.props.resetCourse()
    this.props.history.push('/students/credit')
  }

  selectCreditForm (index) {
    this.setState({
      selectFormIndex: index
    })
  }

  handlePrev () {
    const { stepIndex } = this.state
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000})
    if (stepIndex === 2) {
      this.setState({ stepIndex: stepIndex - 1 })
    } else if (stepIndex === 1) {
      this.props.resetCourse()
      this.props.senderrorSubmit(false)
      this.setState({ stepIndex: stepIndex - 1 })
    } else if (stepIndex === 0) {
      this.props.resetCourse()
      this.props.history.push('/students/credit')
    }
  }

  handleNext () {
    const { stepIndex, selectFormIndex } = this.state
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000})
    let foreverCodepattern = new RegExp('[a-zA-Z]+[0-9]+')

    if (stepIndex === 0 && selectFormIndex === -1) {
      window.alert('請選擇表單')
      return
    } else if (stepIndex === 1) {
      if (selectFormIndex === 0) {
        const {
          file, phone, original_school, original_department,
          original_graduation_credit,
          original_course_semester, original_course_year,
          original_course_name, original_course_department,
          original_course_credit, original_course_score,
          current_course_code, current_course_credit, current_course_name, current_course_type
        } = this.props.waiveCourse
        if (!current_course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        if (
          // 因為syntax問題 所以class這樣寫
          !(file.name && this.props.waiveCourse.class && phone && original_school && original_department &&
          original_graduation_credit &&
          original_course_semester && original_course_year &&
          original_course_name && original_course_department &&
          original_course_credit && original_course_score &&
          current_course_code && current_course_credit && current_course_name && current_course_type !== '請選擇選別')
        ) {
          window.alert('請確實填寫每個欄位!')
          this.props.senderrorSubmit(true)
          return
        }
        this.setState({ file: file })
      } else if (selectFormIndex === 1) {
        const {
          file, phone,
          original_course_semester, original_course_year,
          original_course_name, original_course_department,
          original_course_credit, original_course_score,
          current_course_code, current_course_credit, current_course_name, current_course_type
        } = this.props.exemptCourse
        if (!current_course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        if (
          // 因為syntax問題 所以class這樣寫
          !(file.name && this.props.exemptCourse.class && phone &&
          original_course_semester && original_course_year &&
          original_course_name && original_course_department &&
          original_course_credit && original_course_score &&
          current_course_code && current_course_credit && current_course_name && current_course_type !== '請選擇選別')
        ) {
          window.alert('請確實填寫每個欄位!')
          this.props.senderrorSubmit(true)
          return
        }
        this.setState({ file: file })
      } else if (selectFormIndex === 2) {
        const {
          file, phone, reason, department, teacher, credit,
          course_year, course_semester, course_code, course_name,
          original_course_code, original_course_name, original_course_credit
        } = this.props.compulsoryCourse
        if (!course_code.match(foreverCodepattern) || !original_course_code.match(foreverCodepattern) ) {
          window.alert('請填寫”永久課號“!')
          return
        }
        if (
          !(file.name && phone && reason.content && department && teacher && credit &&
            course_year && course_semester && course_code && course_name &&
            original_course_code && original_course_name && original_course_credit)
        ) {
          window.alert('請確實填寫每個欄位!')
          this.props.senderrorSubmit(true)
          return
        }
        this.setState({ file: file })
      } else if (selectFormIndex === 3) {
        const { file, phone, reason, department, teacher, credit, course_code, course_name } = this.props.englishCourse
        if (!course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        if (!(file.name && phone && reason && department && teacher && credit && course_name && course_code)) {
          window.alert('請確實填寫每個欄位!')
          this.props.senderrorSubmit(true)
          return
        }
        this.setState({ file: file })
      }
      this.props.senderrorSubmit(false)
    } else if (stepIndex === 2) {
      if (selectFormIndex === 0) {
        if (window.confirm('確定送出「學分抵免單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      } else if (selectFormIndex === 1) {
        if (window.confirm('確定送出「課程免修單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      } else if (selectFormIndex === 2) {
        if (window.confirm('確定送出「本系必修課程抵免單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      } else if (selectFormIndex === 3) {
        if (window.confirm('確定送出「英授專業課程抵免單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      }
    }

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
  }

  handleUploadImage (selectFormIndex) {
    let storageRef = firebase.storage().ref()
    let Today = new Date()
    let year = ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
    let semester = (((Today.getMonth() + 1) >= 8) || (Today.getMonth() + 1) === 1) ? '1' : '2'
    let time = Today.getHours() + Today.getMinutes() + Today.getSeconds()
    let this_ = this
    let directory = 'credit/' + this.props.studentIdcard.student_id + '/' + time + '_' + this.state.file.name
    this.setState({ progressComplete: false })

    let file = this.state.file
    let uploadTask = storageRef.child(directory).put(file)
    uploadTask.on(
      'state_changed',
      function (snapshot) {
      },
      function (error) {
        console.log(error)
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL)
          this_.setState({ progressComplete: true })
          if (selectFormIndex === 0) {
            if (this_.props.location.state && this_.props.location.state.edit) {
              // 編輯
              this_.props.editCredit({
                ...this_.props.waiveCourse,
                credit_type: 1,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            } else {
              // 新增
              this_.props.sendWaiveCourse({
                ...this_.props.waiveCourse,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            }
          } else if (selectFormIndex === 1) {
            if (this_.props.location.state && this_.props.location.state.edit) {
              // 編輯
              this_.props.editCredit({
                ...this_.props.exemptCourse,
                credit_type: 2,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            } else {
              // 新增
              this_.props.sendExemptCourse({
                ...this_.props.exemptCourse,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            }
          } else if (selectFormIndex === 2) {
            if (this_.props.location.state && this_.props.location.state.edit) {
              // 編輯
              this_.props.editCredit({
                ...this_.props.compulsoryCourse,
                credit_type: 3,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            } else {
              // 新增
              this_.props.sendCompulsoryCourse({
                ...this_.props.compulsoryCourse,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            }
          } else if (selectFormIndex === 3) {
            if (this_.props.location.state && this_.props.location.state.edit) {
              // 編輯
              this_.props.editCredit({
                ...this_.props.englishCourse,
                credit_type: 4,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            } else {
              // 新增
              this_.props.sendEnglishCourse({
                ...this_.props.englishCourse,
                file: downloadURL,
                apply_year: year,
                apply_semester: semester
              })
            }
          }
        })
      }
    )
  }

  getStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<FormSelectTable selectCreditForm={this.selectCreditForm} />)
      case 1: {
        switch (this.state.selectFormIndex) {
          case 0:
            return (<WaiveCourseForm />)
          case 1:
            return (<ExemptCourseForm />)
          case 2:
            return (<CompulsoryCourseForm />)
          case 3:
            return (<EnglishCourseForm />)
          default:
            return ''
        }
      }
      case 2: {
        switch (this.state.selectFormIndex) {
          case 0:
            return (<WaiveCourseFormConfirm />)
          case 1:
            return (<ExemptCourseFormConfirm />)
          case 2:
            return (<CompulsoryCourseFormConfirm />)
          case 3:
            return (<EnglishCourseFormConfirm />)
          default:
            return ''
        }
      }
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }

  render () {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }
    const styles = {
      chipActive: { background: '#4cc065', color: '#fafafa', fontSize: 14, fontWeight: 'bold' },
      chipDefault: { background: '#d8eadd', color: '#828282', fontSize: 14, fontWeight: 400 }
    }

    return (
      <div className='Credt-title-text' ref={(div) => { this.Top = div }}>
        <MuiThemeProvider>
          <div style={{ width: '100%', maxWidth: 1500, margin: 'auto' }}>
            {/* For PC screen */}
            <div className='hidden-xs'>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>選擇抵免申請項目</StepLabel>
                </Step>
                <Step>
                  <StepLabel>填寫表單</StepLabel>
                </Step>
                <Step>
                  <StepLabel>確認送出</StepLabel>
                </Step>
              </Stepper>
            </div>
            {/* For mobile screen */}
            <div className='hidden-sm hidden-md hidden-lg'>
              <div style={{ margin: '5px 3px 20px 3px', display: 'flex', justifyContent: 'center' }}>
                <Chip
                  style={stepIndex === 0 ? styles.chipActive : styles.chipDefault}
                  label={<span>選擇抵免申請項目</span>}
                />
                <span className='glyphicon glyphicon-chevron-right' style={{ margin: '4px 3px 0 0', color: '#b2b2b2' }} />
                <Chip
                  style={stepIndex === 1 ? styles.chipActive : styles.chipDefault}
                  label={<span>填寫表單</span>}
                />
                <span className='glyphicon glyphicon-chevron-right' style={{ margin: '4px 3px 0 0', color: '#b2b2b2' }} />
                <Chip
                  style={stepIndex === 2 ? styles.chipActive : styles.chipDefault}
                  label={<span>確認送出</span>}
                />
              </div>
            </div>
            <div style={contentStyle}>
              {
                finished
                  ? <div style={{ textAlign: 'center' }}>
                    {
                      this.state.progressComplete
                        ? this.props.location.state && this.props.location.state.edit
                            ? <div>
                              <a
                                href='/'
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.resetFormForEdit()
                                }}
                              >
                                按此
                              </a> 回到抵免首頁
                            </div>
                            : <div>
                              <a
                                href='/'
                                onClick={(event) => {
                                  event.preventDefault()
                                  this.resetFormForNew()
                                }}
                              >
                                按此
                              </a> 回到表單首頁
                              <div style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                                若需申請多門課程抵免則繼續填寫表單
                              </div>
                            </div>
                        : <div>
                          檔案上傳中請稍候
                          <CircleProgress />
                        </div>
                    }
                  </div>
                  : <div>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div style={{ marginTop: 12, height: 80 }}>
                      <RaisedButton
                        label={stepIndex === 2 ? '送出!' : '下一步'}
                        primary
                        onClick={this.handleNext}
                        style={{ marginRight: 12, float: 'right' }}
                      />
                      <FlatButton
                        label={stepIndex === 0 ? '返回' : '上一步'}
                        onClick={this.handlePrev}
                        style={{ marginRight: 12, float: 'right' }}
                      />
                    </div>
                  </div>
              }
              {
                stepIndex === 0 &&
                <div style={{ fontSize: '20px' }}>
                  各項申請流程說明如下：<br /><br />
                  ㄧ、學分抵免申請：<br />
                  <ol>
                    <li>線上填寫抵免學分申請表，並上傳「原就讀學校歷年成績單或學分證明」，以外校(系)課程申請抵免者，另須上傳該課程之課程綱要(教材用書、任課教師、授課內容、評分方式等說明)。</li>
                    <li>繳交「抵免學分申請表」與「原就讀學校歷年成績單或學分證明正本」至系辦。</li>
                    <li>
                      抵免學分辦法請參閱本校
                      <a
                        href='https://aadm.nctu.edu.tw/rule/#registra'
                        alt=''
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        註冊組網頁
                      </a>
                    </li>
                  </ol>
                  二、課程免修申請：<br />
                  <ol>
                    <li>線上填寫課程免修申請單，並上傳「已修習科目之歷年成績單或學分證明」，以外校(系)課程申請免修者，另須上傳該課程之課程綱要(教材用書、任課教師、授課內容、評分方式等說明)。</li>
                    <li>繳交「課程免修申請單」與「原就讀學校歷年成績單或學分證明正本」至系辦。</li>
                  </ol>
                  三、外系所學分承認申請：<br />
                  <ol>
                    <li>必修課程需重修，然因不可抗拒之理由，需修習外系所開授課程，以抵本系必修課程：系統填寫申請表並上傳擬修課程之課程綱要，以重修為理由申請者另須上傳成績單。</li>
                    <li>擬修習外系英文授課專業課程，並申請為本系畢業學分規定之「畢業前須通過1門本系開授或認可之英文授課專業課程」：系統填寫申請表並上傳擬修課程之課程綱要。</li>
                  </ol>
                </div>
              }
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  waiveCourse: state.Student.Credit.waiveCourse,
  exemptCourse: state.Student.Credit.exemptCourse,
  compulsoryCourse: state.Student.Credit.compulsoryCourse,
  englishCourse: state.Student.Credit.englishCourse
})

const mapDispatchToProps = (dispatch) => ({
  sendWaiveCourse: (payload) => dispatch(sendWaiveCourse(payload)),
  sendExemptCourse: (payload) => dispatch(sendExemptCourse(payload)),
  sendCompulsoryCourse: (payload) => dispatch(sendCompulsoryCourse(payload)),
  sendEnglishCourse: (payload) => dispatch(sendEnglishCourse(payload)),
  editCredit: (payload) => dispatch(editCredit(payload)),
  resetCourse: () => dispatch(resetCourse()),
  senderrorSubmit: (payload) => dispatch(senderrorSubmit(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper))
