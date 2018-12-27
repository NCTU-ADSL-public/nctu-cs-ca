import React from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FormSelectTable from './FormSelectTable'
import TextForm from './CreditCourseTextForm/normalCourse'
import WaiveForm from './CreditCourseTextForm/waiveCourse'
import EnglishCourseForm from './CreditCourseTextForm/englishCourseForm'
import CreditCourseTextFormConfirm from './CreditCourseTextFormConfirm'
import EnglishCourseFormConfirm from './CreditCourseTextFormConfirm/englishCourseFormConfirm'
import { connect } from 'react-redux'
import { courseCreditChange, sendEnglishCourseCredit } from '../../../../Redux/Students/Actions/Credit'

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

  handleNext () {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
    if (stepIndex === 2) {
      let Today = new Date()
      let year = ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
      let semester = ((Today.getMonth() + 1) >= 8 ? '1' : '2')

      switch (this.state.selectFormIndex) {
        case 0:
          break
        case 1:
          break
        case 2:
          this.props.sendEnglishCourseCredit(this.props.englishCourse)
          break
        default:
          break
      }
    }

      if(this.state.selectFormIndex === -1) {
        alert('請選擇表單')
        this.setState({
          stepIndex: stepIndex,
          finished: stepIndex >= 2
        })
      }
    }

  handlePrev () {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
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
            return (<CreditCourseTextFormConfirm />)
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
                  this.setState({ stepIndex: 0, finished: false })
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
                  label='上一步'
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12, float: 'right' }}
                />
              </div>
            </div>
          )}
        </div>
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
  sendEnglishCourseCredit: (payload) => dispatch(sendEnglishCourseCredit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper)
