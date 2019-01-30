import React from 'react'
import { withRouter } from 'react-router'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FormSelectTable from './FormSelectTable'
import TextForm from './CreditCourseTextForm/normalCourse'
import WaiveForm from './CreditCourseTextForm/waiveCourse'
import EnglishCourseForm from './CreditCourseTextForm/englishCourseForm'
import CreditCourseTextFormConfirm from './CreditCourseTextFormConfirm'
import EnglishCourseFormConfirm from './CreditCourseTextFormConfirm/englishCourseFormConfirm'
import WaiveCourseFormConfirm from './CreditCourseTextFormConfirm/waiveCourseFormConfirm'
import { connect } from 'react-redux'
import { courseCreditChange, englishCourseCreditChange, englishCourseCreditReset, sendEnglishCourseCredit } from '../../../../Redux/Students/Actions/Credit'
import './Stepper.css'

class HorizontalLinearStepper extends React.Component {
  constructor (props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.selectCreditForm = this.selectCreditForm.bind(this)
    this.state = {
      finished: false,
      stepIndex: 0,
      selectFormIndex: -1
    }
  }

  resetForm () {
    // 回復為初始狀態，並清除每個表單的輸入
    this.setState({ stepIndex: 0, selectFormIndex: -1, finished: false })
    this.props.englishCourseCreditReset()
  }

  handleNext () {
    const { stepIndex, selectFormIndex } = this.state

    if (stepIndex === 0 && selectFormIndex === -1) {
      window.alert('請選擇表單')
      return
    }
    else if (stepIndex === 1) {
      if (selectFormIndex === 2) {
        const { phone, reason, department, teacher, course_code, course_name } = this.props.englishCourse
        if (!(phone && reason && department && teacher && course_name && course_code)) {
          window.alert('請確實填寫每個欄位!')
          return
        }
      }
    }
    else if (stepIndex === 2) {
      let Today = new Date()
      let year = ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
      let semester = (((Today.getMonth() + 1) >= 8) || (Today.getMonth() + 1) === 1) ? '1' : '2'

      if (selectFormIndex === 0) {

      }
      else if (selectFormIndex === 1) {

      }
      else if (selectFormIndex === 2) {
        this.props.sendEnglishCourseCredit({
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
            return (<TextForm />)
          case 1:
            return (<WaiveForm />)
          case 2:
            return (<EnglishCourseForm />)
          default:
            return ''
        }
      }
      case 2: {
        switch (this.state.selectFormIndex) {
          case 0:
            return (<CreditCourseTextFormConfirm />)
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
  englishCourse: state.Student.Credit.englishCourse
})

const mapDispatchToProps = (dispatch) => ({
  courseCreditChange: (payload) => dispatch(courseCreditChange(payload)),
  englishCourseCreditChange: (payload) => dispatch(englishCourseCreditChange(payload)),
  englishCourseCreditReset: (payload) => dispatch(englishCourseCreditReset(payload)),
  sendEnglishCourseCredit: (payload) => dispatch(sendEnglishCourseCredit(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper))
