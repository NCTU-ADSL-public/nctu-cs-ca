import React from 'react'
import TextField from 'material-ui/TextField'
import Postfile from './Postfile'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { courseCreditChange } from '../../../../../Redux/Students/Actions/Credit'
import SelectType from './SlectType'

let items = []

class TextForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleFailCourseSelect = this.handleFailCourseSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getTime = this.getTime.bind(this)
    this.getGradeStm = this.getGradeStm.bind(this)
    this.state = {
      valueFailure: 1,
      value: 1,
      failcourse: [
        {
          'cn': '線性代數',
          'en': 'Linear Algebra',
          'score': 57,
          'grade': 'D',
          'pass': '不通過',
          'year': 103,
          'semester': 1,
          'teacher': '易志偉'
        },
        {
          'cn': '服務學習(一)',
          'en': 'Service Learning I',
          'score': null,
          'grade': null,
          'pass': '不通過',
          'year': 103,
          'semester': 2,
          'teacher': '林正中'
        },
        {
          'cn': '物件導向程式設計(英文授課)',
          'en': 'Object-Oriented Programming',
          'score': 47,
          'grade': 'E',
          'pass': '不通過',
          'year': 103,
          'semester': 2,
          'teacher': '荊宇泰'
        }
      ]
    }
  }

  componentWillMount () {
    for (let i = 0; i < this.state.failcourse.length; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={this.state.failcourse[i].cn} />)
    }
  }

  handleFailCourseSelect (value) {
    this.setState({
      value: value
    })
  }

  handleChange (event, index, value) {
    this.setState({valueFailure: value})
  }

  getTime () {
    let today = new Date()

    return (
      today.getFullYear() + '年' +

      (today.getMonth() + 1) + '月' +

      today.getDate() + '日'
    )
  }

  getGradeStm () {
    if (this.state.failcourse[this.state.valueFailure].score !== null) {
      return (
        <font color={'#a42926'}>因成績得分 {this.state.failcourse[this.state.valueFailure].score} 分未通過</font>
      )
    } else if (this.state.failcourse[this.state.valueFailure].grade !== null) {
      return (
        <font color={'#a42926'}>因等級評分 {this.state.failcourse[this.state.valueFailure].grade} 未通過</font>
      )
    } else {
      return <font color={'#a42926'}>未通過</font>
    }
  }

  render () {
    return (
      <div>
         班別:&nbsp;&nbsp;
         {this.props.studentIdcard.program}&nbsp;
         學號:&nbsp;&nbsp;
         {this.props.studentIdcard.student_id}
         &nbsp;&nbsp;&nbsp;&nbsp;申請人 &nbsp;&nbsp;&nbsp;
         {this.props.studentIdcard.sname}
        <br />
        <br />
        <br />
        <div className='row'>
          <div className='col-md-5'>
            申請人聯絡電話：
            <TextField
              value={this.props.phone}
              type='number'
              onChange={(event) => this.props.courseCreditChange('phone', event.target.value)}
              hintText='09XXXXXXXX'
            />&nbsp;
          </div>
          <div className='col-md-5'>
            申請日期：&nbsp;{this.getTime()}
          </div>
        </div>
        <br />
        <br />
        {/* 事宜： */}
        {/* <br /> */}
        {/* <br /> */}
        {/* 學生必修課程需重修，然因不可抗拒之理由，需修習外系所開課程以抵本系必修課程學生於&nbsp;<font color={'#a42926'}>{this.state.failcourse[this.state.valueFailure].year}</font>&nbsp;學年度&nbsp;<font color={'#a42926'}>{this.state.failcourse[this.state.valueFailure].semester === 1 ? '上' : '下'}</font>&nbsp;學期，修習本系&nbsp;<font color={'#a42926'}>{this.state.failcourse[this.state.valueFailure].teacher}</font>&nbsp;老師所授之課程&nbsp; */}
        {/* &nbsp;&nbsp; */}
        {/* <SelectField */}
        {/* value={this.state.valueFailure} */}
        {/* onChange={this.handleChange} */}
        {/* autoWidth */}
        {/* maxHeight={200} */}
        {/* labelStyle={fontlabelStyle} */}
        {/* menuStyle={fontlabelStyle} */}
        {/* selectedMenuItemStyle={fontlabelStyle} */}
        {/* listStyle={fontStyle} */}
        {/* menuItemStyle={fontStyle} */}
        {/* style={{ top: '20' }} */}
        {/* > */}
        {/* {items} */}
        {/* </SelectField> */}
        {/* &nbsp;&nbsp;，{this.getGradeStm()}，故需重修此必修課。 */}
        {/* <br /> */}
        {/* <br /> */}
        現因 :<br />
        <TextField
          hintText='某某理由'
          floatingLabelText='理由請詳填'
          value={this.props.reason}
          onChange={(event) => this.props.courseCreditChange('reason', event.target.value)}
          multiLine
          fullWidth
          rows={1}
        /><br />之理由，無法修習本系所開課程，擬修
        <br />
        <TextField
          hintText='某某'
          style={{ width: '100px' }}
          value={this.props.department}
          onChange={(event) => this.props.courseCreditChange('department', event.target.value)}
        />
        &nbsp;系&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          hintText='某某'
          style={{ width: '100px' }}
          value={this.props.teacher}
          onChange={(event) => this.props.courseCreditChange('teacher', event.target.value)}
        />&nbsp;
        老師&nbsp;&nbsp;&nbsp;&nbsp;所授之 &nbsp;&nbsp;課號：
        <TextField
          hintText='DCPXX'
          floatingLabelText='請填寫永久課號'
          style={{ width: '150px' }}
          value={this.props.course_code}
          onChange={(event) => this.props.courseCreditChange('course_code', event.target.value)}
        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        課名：
        <TextField
          hintText='某某'
          style={{ width: '200px' }}
          value={this.props.course_name}
          onChange={(event) => this.props.courseCreditChange('course_name', event.target.value)}
        />
        課
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          hintText=''
          style={{ width: '50px' }}
          value={this.props.credit}
          onChange={(event) => this.props.courseCreditChange('credit', event.target.value)}
        />
        學分
        <br />
        作為系內<SelectType />&nbsp;&nbsp;課程，以抵免系內之
        課號：
        <TextField
          hintText='DCPXX'
          style={{ width: '150px' }}
          floatingLabelText='請填寫永久課號'
          value={this.props.course_code_old}
          onChange={(event) => this.props.courseCreditChange('course_code_old', event.target.value)}
        />&nbsp;&nbsp;&nbsp;
        課名：
        <TextField
          hintText='某某'
          style={{ width: '200px' }}
          value={this.props.course_name_old}
          onChange={(event) => this.props.courseCreditChange('course_name_old', event.target.value)}
        />
        課
        <br />
        <br />
        註：1.課程內容需與本系課
        程一致。2. 須檢附用書書名及課程綱要）
        <br />
        <br />
        <Postfile />
        <br />
        <br />
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
  credit: state.Student.Credit.courseCreditChange.credit,          // 可能需要(新課程的credit)
  reason: state.Student.Credit.courseCreditChange.reason,
  phone: state.Student.Credit.courseCreditChange.phone
})

const mapDispatchToProps = (dispatch) => ({
  courseCreditChange: (type, value) => {
    dispatch(courseCreditChange(type, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TextForm)
