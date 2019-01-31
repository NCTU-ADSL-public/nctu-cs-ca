import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
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
  englishCourseReset,
  waiveCourseReset
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
    this.setState({ stepIndex: 0, selectFormIndex: -1, finished: false })
    this.props.englishCourseReset()
    this.props.waiveCourseReset()
  }

  handleNext () {
    const { stepIndex, selectFormIndex } = this.state

    if (stepIndex === 0 && selectFormIndex === -1) {
      window.alert('請選擇表單')
      return
    }

    else if (stepIndex === 1) {
      if (selectFormIndex === 0) {
        const { file, phone, reason, department, credit, course_type, course_code, course_name, course_code_old, course_name_old, teacher } = this.props.compulsoryCourse
        if (!(file.name && phone && reason && department && credit && course_type && course_code && course_name && course_code_old && course_name_old && teacher)) {
          window.alert('請確實填寫每個欄位!')
          return
        }
        this.setState({ file: file })
      }

      else if (selectFormIndex === 1) {
        const {
          phone, original_school, original_department,
          original_graduation_credit, apply_year,
          apply_semester, original_course_name, original_course_department,
          original_course_credit, original_course_score,
          current_course_code, current_course_credit
        } = this.props.waiveCourse
        if (
          !(phone && original_school && original_department &&
          original_graduation_credit && apply_year &&
          apply_semester && original_course_name && original_course_department &&
          original_course_credit && original_course_score &&
          current_course_code && current_course_credit)
        ) {
          console.log(this.props.waiveCourse)
          window.alert('請確實填寫每個欄位!')
          return
        }
      }

      else if (selectFormIndex === 2) {
        const { file, phone, reason, department, teacher, course_code, course_name } = this.props.englishCourse
        if (!(file.name && phone && reason && department && teacher && course_name && course_code)) {
          window.alert('請確實填寫每個欄位!')
          return
        }
        console.log(file.name)
        this.setState({ file: file })
      }
    }

    else if (stepIndex === 2) {
      let Today = new Date()
      let year = ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
      let semester = (((Today.getMonth() + 1) >= 8) || (Today.getMonth() + 1) === 1) ? '1' : '2'

      if (selectFormIndex === 0) {
        this.props.sendCompulsoryCourse({
          ...this.props.compulsoryCourse,
          apply_year: year,
          apply_semester: semester
        })
        this.handleUploadImage()
      }

      else if (selectFormIndex === 1) {

      }

      else if (selectFormIndex === 2) {
        this.props.sendEnglishCourse({
          ...this.props.englishCourse,
          apply_year: year,
          apply_semester: semester
        })
      }
    }

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
  }

  handleUploadImage () {
    let storageRef = firebase.storage().ref()
    let directory = 'credit/' + this.props.studentIdcard.student_id + '/' + this.state.file
    storageRef.child(directory).delete().then(function () {
    }).catch(function (error) {
      console.log(error)
    })

    let file = this.state.file
    let uploadTask = storageRef.child(directory).put(file)
    uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
      console.log(error)
    }, function () {
      // uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      // })
    })
  }

  handlePrev () {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
    else {
      this.props.history.push('/students/credit')
    }
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

  selectCreditForm (index) {
    this.setState({
      selectFormIndex: index
    })
  }

  render () {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }

    return (
      <div className='Credt-title-text'>
        <MuiThemeProvider>
          <div style={{ width: '100%', maxWidth: 1500, margin: 'auto' }}>
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
                  <div style={{ marginTop: 12 }}>
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
  englishCourse: state.Student.Credit.englishCourse,
  waiveCourse: state.Student.Credit.waiveCourse,
  compulsoryCourse: state.Student.Credit.compulsoryCourse
})

const mapDispatchToProps = (dispatch) => ({
  englishCourseReset: (payload) => dispatch(englishCourseReset(payload)),
  waiveCourseReset: (payload) => dispatch(waiveCourseReset(payload)),
  sendEnglishCourse: (payload) => dispatch(sendEnglishCourse(payload)),
  sendCompulsoryCourse: (payload) => dispatch(sendCompulsoryCourse(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper))
