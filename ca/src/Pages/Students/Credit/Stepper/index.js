import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import scrollToComponent from 'react-scroll-to-component'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import { Chip } from '@material-ui/core'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircleProgress from './CircleProgress'
import FormSelectTable from '../FormSelectTable'
import WaiveCourseForm from '../Form/waiveCourse'
import ExemptCourseForm from '../Form/exemptCourse'
import CompulsoryCourseForm from '../Form/compulsoryCourse'
import EnglishCourseForm from '../Form/englishCourse'
import WaiveCourseFormConfirm from '../FormConfirm/waiveCourse'
import ExemptCourseFormConfirm from '../FormConfirm/exemptCourse'
import CompulsoryCourseFormConfirm from '../FormConfirm/compulsoryCourse'
import EnglishCourseFormConfirm from '../FormConfirm/englishCourse'
import {
  actions,
  sendWaiveCourse,
  sendExemptCourse,
  sendCompulsoryCourse,
  sendEnglishCourse,
  editCredit
} from '../../../../Redux/Students/Actions/Credit'
import { getSemester } from '../../../../Utilities'
import './style.css'


class HorizontalLinearStepper extends React.Component {
  constructor (props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.selectCreditForm = this.selectCreditForm.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.state = {
      finished: false,
      step: 0,
      formType: -1
    }
  }

  componentDidMount () {
    // 判斷是不是按下編輯後跳轉過來的
    if (this.props.location.state && this.props.location.state.edit) {
      // 直接跳過選取表單的步驟
      this.setState({
        step: 1,
        formType: this.props.location.state.index
      })
    }
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000 })
  }

  resetFormForNew () {
    // 回復為初始狀態，並清除每個表單的輸入
    this.setState({
      finished: false,
      step: 0,
      formType: -1
    })
    this.props.resetCourse()
  }

  resetFormForEdit () {
    this.props.resetCourse()
    this.props.history.push('/students/credit')
  }

  selectCreditForm (index) {
    this.setState({
      formType: index
    })
  }

  handlePrev () {
    const { step } = this.state
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000})
    if (step === 2) {
      this.setState({ step: step - 1 })
    } else if (step === 1) {
      this.props.resetCourse()
      this.props.setError(false)

      if (this.props.location.state && this.props.location.state.edit) {
        // 是編輯就跳回抵免首頁
        this.props.history.push('/students/credit')
      } else {
        // 是新增就跳回選取表單種類畫面
        this.setState({ step: step - 1 })
      }
    } else if (step === 0) {
      this.props.resetCourse()
      this.props.history.push('/students/credit')
    }
  }

  handleNext () {
    const { step, formType } = this.state
    scrollToComponent(this.Top, { offset: -20, align: 'top', duration: 1000})
    let foreverCodepattern = new RegExp('[a-zA-Z]+[0-9]+')

    if (step === 0 && formType === -1) {
      window.alert('請選擇表單')
      return
    }
    else if (step === 1) {
      if (formType === 0) {
        const {
          file, phone,
          original_school,original_department, original_graduation_credit,
          original_course_semester, original_course_year, original_course_name,
          original_course_department, original_course_credit, original_course_score,
          current_course_code, current_course_credit, current_course_name, current_course_type
        } = this.props.waiveCourse
        
        if (!(file && phone &&
              original_school && original_department && original_graduation_credit &&
              original_course_semester && original_course_year && original_course_name &&
              original_course_department && original_course_credit && original_course_score &&
              current_course_code && current_course_credit &&
              current_course_name && current_course_type !== '請選擇選別')) {
          window.alert('請確實填寫每個欄位!')
          this.props.setError(true)
          return
        }
        if (!current_course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        
        this.setState({ file: file })
      }
      else if (formType === 1) {
        const {
          file, phone,
          original_course_semester, original_course_year,
          original_course_name, original_course_department,
          original_course_credit, original_course_score,
          current_course_code, current_course_credit, current_course_name, current_course_type
        } = this.props.exemptCourse
        
        if (!(file && phone &&
              original_course_semester && original_course_year &&
              original_course_name && original_course_department &&
              original_course_credit && original_course_score &&
              current_course_code && current_course_credit &&
              current_course_name && current_course_type !== '請選擇選別')) {
          window.alert('請確實填寫每個欄位!')
          this.props.setError(true)
          return
        }
        if (!current_course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        
        this.setState({ file: file })
      }
      else if (formType === 2) {
        const {
          file, phone, reason, department, teacher, credit,
          course_year, course_semester, course_code, course_name,
          original_course_code, original_course_name, original_course_credit
        } = this.props.compulsoryCourse

        if (!(file && phone && reason.content && department && teacher && credit &&
              course_year && course_semester && course_code && course_name &&
              original_course_code && original_course_name && original_course_credit)) {
          window.alert('請確實填寫每個欄位!')
          this.props.setError(true)
          return
        }
        if (!course_code.match(foreverCodepattern) || !original_course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        
        this.setState({ file: file })
      }
      else if (formType === 3) {
        const {
          file, phone, reason, department, teacher, credit, course_code, course_name
        } = this.props.englishCourse
        
        if (!(file && phone && reason && department && teacher && credit &&
              course_name && course_code)) {
          window.alert('請確實填寫每個欄位!')
          this.props.setError(true)
          return
        }
        if (!course_code.match(foreverCodepattern)) {
          window.alert('請填寫”永久課號“!')
          return
        }
        
        this.setState({ file: file })
      }

      this.props.setError(false)
    }
    else if (step === 2) {
      const confirmMsg = [
        '確定送出「學分抵免單」?',
        '確定送出「課程免修單」?',
        '確定送出「本系必修課程抵免單」?',
        '確定送出「英授專業課程抵免單」?'
      ]
      if (window.confirm(confirmMsg[formType])) {
        this.handleUpload(formType)
      }
      else return
    }

    this.setState({
      step: step + 1,
      finished: step >= 2
    })
  }

  handleUpload (formType) {
    this.setState({ progressComplete: false })

    const isEdit = this.props.location.state && this.props.location.state.edit
    const today = new Date()
    const semester = getSemester()
    const time = {
      apply_year: semester.substr(0, 3),
      apply_semester: semester.substr(4, 5),
      apply_time: today.toLocaleString()
    }

    if (formType === 0) {
      const payload = { ...this.props.waiveCourse, ...time }
      isEdit
        ? this.props.editCredit({ ...payload, credit_type: 1 })
        : this.props.sendWaiveCourse(payload)
    }
    else if (formType === 1) {
      const payload = { ...this.props.exemptCourse, ...time }
      isEdit
        ? this.props.editCredit({ ...payload, credit_type: 2 })
        : this.props.sendExemptCourse(payload)
    }
    else if (formType === 2) {
      const payload = { ...this.props.compulsoryCourse, ...time }
      isEdit
        ? this.props.editCredit({ ...payload, credit_type: 3 })
        : this.props.sendCompulsoryCourse(payload)
    }
    else if (formType === 3) {
      const payload = { ...this.props.englishCourse, ...time }
      console.log(payload)
      isEdit
        ? this.props.editCredit({ ...payload, credit_type: 4 })
        : this.props.sendEnglishCourse(payload)
    }

    this.setState({ progressComplete: true })
  }

  getStepContent (step) {
    switch (step) {
      case 0:
        return <FormSelectTable selectCreditForm={this.selectCreditForm} />
      case 1: {
        switch (this.state.formType) {
          case 0:
            return <WaiveCourseForm />
          case 1:
            return <ExemptCourseForm />
          case 2:
            return <CompulsoryCourseForm />
          case 3:
            return <EnglishCourseForm />
          default:
            return null
        }
      }
      case 2: {
        switch (this.state.formType) {
          case 0:
            return <WaiveCourseFormConfirm />
          case 1:
            return <ExemptCourseFormConfirm />
          case 2:
            return <CompulsoryCourseFormConfirm />
          case 3:
            return <EnglishCourseFormConfirm />
          default:
            return null
        }
      }
      default:
        return null
    }
  }

  render () {
    const { finished, step } = this.state
    const contentStyle = { margin: '0 16px' }
    const styles = {
      chipActive: { background: '#4cc065', color: '#fafafa', fontSize: 14, fontWeight: 'bold' },
      chipDefault: { background: '#d8eadd', color: '#828282', fontSize: 14, fontWeight: 400 }
    }

    return (
      <div className='credit-text' ref={(div) => { this.Top = div }}>
        <MuiThemeProvider>
          <div style={{ width: '100%', maxWidth: 1500, margin: 'auto' }}>
            {/* For PC screen */}
            <div className='hidden-xs'>
              <Stepper activeStep={step}>
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

            {/* For mobile xs */}
            <div className='hidden-sm hidden-md hidden-lg'>
              <div style={{ margin: '5px 3px 20px 3px', display: 'flex', justifyContent: 'center' }}>
                <Chip
                  style={step === 0 ? styles.chipActive : styles.chipDefault}
                  label={<span>選擇抵免申請項目</span>}
                />
                <span className='glyphicon glyphicon-chevron-right' style={{ margin: '4px 3px 0 0', color: '#b2b2b2' }} />
                <Chip
                  style={step === 1 ? styles.chipActive : styles.chipDefault}
                  label={<span>填寫表單</span>}
                />
                <span className='glyphicon glyphicon-chevron-right' style={{ margin: '4px 3px 0 0', color: '#b2b2b2' }} />
                <Chip
                  style={step === 2 ? styles.chipActive : styles.chipDefault}
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
                    <div>{this.getStepContent(step)}</div>
                    <div style={{ marginTop: 12, height: 80 }}>
                      <RaisedButton
                        label={step === 2 ? '送出!' : '下一步'}
                        primary
                        onClick={this.handleNext}
                        style={{ marginRight: 12, float: 'right' }}
                      />
                      <FlatButton
                        label={
                          (step === 0) ||
                          (step === 1 && this.props.location.state && this.props.location.state.edit)
                            ? '返回' : '上一步'
                        }
                        onClick={this.handlePrev}
                        style={{ marginRight: 12, float: 'right' }}
                      />
                    </div>
                  </div>
              }
              {
                step === 0 &&
                <div className='instruction'>
                  各項申請流程說明如下：<br />
                  <div className='text-bold'>ㄧ、學分抵免申請：</div>
                  <ol>
                    <li>線上填寫抵免學分申請表，並上傳「原就讀學校歷年成績單或學分證明」，以外校(系)課程申請抵免者，另須上傳原就讀校系科目之課程綱要(教材用書、任課教師、授課內容、評分方式等說明)。</li>
                    <li>
                      <span>系統列印「抵免學分申請表」，併同「原就讀學校歷年成績單或學分證明</span>
                      <span className='text-bold text-underline'>正本</span>
                      <span>」繳交至系辦。</span>
                    </li>
                    <li>
                      抵免學分辦法請參閱本校
                      <a
                        className='text-underline'
                        href='https://aadm.nctu.edu.tw/rule/#registra'
                        target='_blank'
                        rel='noopener noreferrer'
                        alt=''
                      >
                        註冊組網頁
                      </a>
                    </li>
                  </ol>
                  <div className='text-bold'>二、課程免修申請：</div>
                  <ol>
                    <li>線上填寫課程免修申請單，並上傳「已修習科目之歷年成績單或學分證明」，以外校(系)課程申請免修者，另須上傳原就讀校系科目之課程綱要(教材用書、任課教師、授課內容、評分方式等說明)。</li>
                    <li>
                      <span>系統列印「課程免修申請單」，併同「已修習科目之歷年成績單或學分證明</span>
                      <span className='text-bold text-underline'>正本</span>
                      <span>」繳交至系辦。</span>
                    </li>
                    <li className='text-red'>註：自106學年度起入學者，若於「入學前」參加本系『程式能力鑑定』成績為5分(含)以上，得「於入學時」申請免修『計算機概論與程式設計』(無學分)。</li>
                  </ol>
                  <div className='text-bold'>三、外系所學分承認申請：</div>
                  <ol>
                    <li>
                      <div className='text-bold'>必修課程修習外系所課程申請：</div>
                      <span className='text-underline'>必修課程需重修，然因不可抗拒之理由，需修習外系所開授課程，以抵本系必修課程</span>
                      <span>：系統填寫申請表並上傳擬修課程之課程綱要，</span>
                      <span className='text-red'>以重修為理由申請者另須上傳成績單以玆證明</span>。
                    </li>
                    <li>
                      <div className='text-bold'>英授專業修習外系所課程申請：</div>
                      <span className='text-underline'>擬修習外系英文授課專業課程，並申請為本系畢業學分規定之「畢業前須通過1門本系開授或認可之英文授課專業課程」</span>
                      <span>：系統填寫申請表並上傳擬修課程之課程綱要。</span>
                    </li>
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
  resetCourse: () => dispatch(actions.credit.form.reset()),
  setError: (payload) => dispatch(actions.credit.form.setError(payload))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper))
