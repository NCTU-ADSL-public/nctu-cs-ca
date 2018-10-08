import React from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FormSelectTable from './FormSelectTable'
import TextForm from './CreditCourseTextForm'
import CreditCourseTextFormConfirm from './CreditCourseTextFormConfirm'
import axios from 'axios'
import { connect } from 'react-redux'
import { courseCreditChange } from '../../../../Redux/Students/Actions/Credit'

class HorizontalLinearStepper extends React.Component {
  constructor (props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.state = {
      finished: false,
      stepIndex: 0
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

      axios.post('/student/credit/course/form', {
        studentIdcard: this.props.studentIdcard.student_id,
        year: year,
        semester: semester,
        department: this.props.department,  // 原課程的depart
        teacher: this.props.teacher,      // 原課程teacher
        course_name_old: this.props.course_name_old,   // 可能需要
        course_code_old: this.props.course_code_old,   // 可能需要
        course_name: this.props.course_name,
        course_code: this.props.course_code,
        credit: this.props.credit,          // 可能需要(新課程的credit)
        reason: this.props.reason,
        course_type: this.props.course_type,
        phone: this.props.phone
      })
        .then(res => {
          alert('送出成功')
        })
        .catch(err => {
          // window.location.replace("/logout ");
          alert('送出失敗，請檢查連線是否穩定。')
          console.log(err)
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
        return (
          <FormSelectTable />
        )
      case 1:
        return (
          <TextForm />
        )
      case 2:
        return (
          <CreditCourseTextFormConfirm />
        )
      default:
        return 'You\'re a long way from home sonny jim!'
    }
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
                href='#'
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
              <p>{this.getStepContent(stepIndex)}</p>
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
  year: state.Student.Credit.courseCreditChange.year,
  semester: state.Student.Credit.courseCreditChange.semester,
  department: state.Student.Credit.courseCreditChange.department,  // 原課程的depart
  teacher: state.Student.Credit.courseCreditChange.teacher,      // 原課程teacher
  course_name_old: state.Student.Credit.courseCreditChange.course_name_old,   // 可能需要
  course_code_old: state.Student.Credit.courseCreditChange.course_code_old,   // 可能需要
  course_name: state.Student.Credit.courseCreditChange.course_name,
  course_code: state.Student.Credit.courseCreditChange.course_code,
  course_type: state.Student.Credit.courseCreditChange.course_type,
  credit: state.Student.Credit.courseCreditChange.credit,          // 可能需要(新課程的credit)
  reason: state.Student.Credit.courseCreditChange.reason,
  phone: state.Student.Credit.courseCreditChange.phone,
  cos_type: state.Student.Credit.courseCreditChange.cos_type
})

const mapDispatchToProps = (dispatch) => ({
  courseCreditChange: (type, value) => {
    dispatch(courseCreditChange(type, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper)
