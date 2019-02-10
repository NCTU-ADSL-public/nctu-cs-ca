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
import CompulsoryCourseForm from './CreditCourseTextForm/compulsoryCourse'
import WaiveCourseForm from './CreditCourseTextForm/waiveCourse'
import EnglishCourseForm from './CreditCourseTextForm/englishCourse'
import CompulsoryCourseFormConfirm from './CreditCourseTextFormConfirm/compulsoryCourse'
import EnglishCourseFormConfirm from './CreditCourseTextFormConfirm/englishCourse'
import WaiveCourseFormConfirm from './CreditCourseTextFormConfirm/waiveCourse'
import {
  sendCompulsoryCourse,
  sendEnglishCourse,
  sendWaiveCourse,
  resetCourse
} from '../../../../Redux/Students/Actions/Credit'
import './Stepper.css'
import firebase from 'firebase'

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

  resetForm () {
    // 回復為初始狀態，並清除每個表單的輸入
    this.setState({
      finished: false,
      stepIndex: 0,
      selectFormIndex: -1
    })
    this.props.resetCourse()
  }

  selectCreditForm (index) {
    this.setState({
      selectFormIndex: index
    })
  }

  handlePrev () {
    const { stepIndex } = this.state
    if (stepIndex === 2) {
      this.setState({ stepIndex: stepIndex - 1 })
    } else if (stepIndex === 1) {
      this.props.resetCourse()
      this.setState({ stepIndex: stepIndex - 1 })
    } else if (stepIndex === 0) {
      this.props.resetCourse()
      this.props.history.push('/students/credit')
    }
  }

  handleNext () {
    const { stepIndex, selectFormIndex } = this.state

    if (stepIndex === 0 && selectFormIndex === -1) {
      window.alert('請選擇表單')
      return
    } else if (stepIndex === 1) {
      if (selectFormIndex === 0) {
        const { file, phone, reason, department, credit, course_type, course_code, course_name, original_course_code, original_course_name, teacher } = this.props.compulsoryCourse
        if (!(file.name && phone && reason && department && credit && course_type && course_code && course_name && original_course_code && original_course_name && teacher)) {
          window.alert('請確實填寫每個欄位!')
          return
        }
        this.setState({ file: file })
      } else if (selectFormIndex === 1) {
        const {
          phone, original_school, original_department,
          original_graduation_credit, apply_year,
          apply_semester, original_course_name, original_course_department,
          original_course_credit, original_course_score,
          current_course_code, current_course_credit, file
        } = this.props.waiveCourse
        if (
          !(file.name && phone && original_school && original_department &&
          original_graduation_credit && apply_year &&
          apply_semester && original_course_name && original_course_department &&
          original_course_credit && original_course_score &&
          current_course_code && current_course_credit)
        ) {
          window.alert('請確實填寫每個欄位!')
          return
        }
        this.setState({ file: file })
      } else if (selectFormIndex === 2) {
        const { file, phone, reason, department, teacher, course_code, course_name } = this.props.englishCourse
        if (!(file.name && phone && reason && department && teacher && course_name && course_code)) {
          window.alert('請確實填寫每個欄位!')
          return
        }
        console.log(file.name)
        this.setState({ file: file })
      }
    } else if (stepIndex === 2) {
      if (selectFormIndex === 0) {
        if (window.confirm('確定送出「本系必修課程抵免單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      } else if (selectFormIndex === 1) {
        if (window.confirm('確定送出「學分抵免單」?')) {
          this.handleUploadImage(selectFormIndex)
        } else return
      } else if (selectFormIndex === 2) {
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
    let this_ = this
    let directory = 'credit/' + this.props.studentIdcard.student_id + '/' + this.state.file
    storageRef.child(directory).delete().then(function () {
    }).catch(function (error) {
      console.log(error)
    })

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
          if (selectFormIndex === 0) {
            this_.props.sendCompulsoryCourse({
              ...this_.props.compulsoryCourse,
              file: downloadURL,
              apply_year: year,
              apply_semester: semester
            })
          } else if (selectFormIndex === 1) {
            this_.props.sendWaiveCourse({
              ...this_.props.waiveCourse,
              file: downloadURL,
              apply_year: year,
              apply_semester: semester
            })
          } else if (selectFormIndex === 2) {
            this_.props.sendEnglishCourse({
              ...this_.props.englishCourse,
              file: downloadURL,
              apply_year: year,
              apply_semester: semester
            })
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
            return (<CompulsoryCourseForm />)
          case 1:
            return (<WaiveCourseForm />)
          case 2:
            return (<EnglishCourseForm />)
          default:
            return ''
        }
      }
      case 2: {
        switch (this.state.selectFormIndex) {
          case 0:
            return (<CompulsoryCourseFormConfirm />)
          case 1:
            return (<WaiveCourseFormConfirm />)
          case 2:
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
      <div className='Credt-title-text'>
        <MuiThemeProvider>
          <div style={{ width: '100%', maxWidth: 1500, margin: 'auto' }}>
            {/* For PC screen */}
            <div className='hidden-xs'>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>選取抵免表單</StepLabel>
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
                  label={<span>選取抵免表單</span>}
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
              {finished ? (
                <p>
                  <a
                    href='/'
                    onClick={(event) => {
                      event.preventDefault()
                      this.resetForm()
                    }}
                  >
                    按此
                  </a> 回到表單首頁
                </p>
              ) : (
                <div>
                  <div>{this.getStepContent(stepIndex)}</div>
                  <div style={{ marginTop: 12, height: 200 }}>
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
              )}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  compulsoryCourse: state.Student.Credit.compulsoryCourse,
  englishCourse: state.Student.Credit.englishCourse,
  waiveCourse: state.Student.Credit.waiveCourse
})

const mapDispatchToProps = (dispatch) => ({
  sendCompulsoryCourse: (payload) => dispatch(sendCompulsoryCourse(payload)),
  sendEnglishCourse: (payload) => dispatch(sendEnglishCourse(payload)),
  sendWaiveCourse: (payload) => dispatch(sendWaiveCourse(payload)),
  resetCourse: (payload) => dispatch(resetCourse(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper))
