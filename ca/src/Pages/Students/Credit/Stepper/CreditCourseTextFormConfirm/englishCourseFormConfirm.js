import React from 'react'
import TextField from 'material-ui/TextField'
import Postfile from './Postfile'
import { connect } from 'react-redux'

class EnglishCourseFormConfirm extends React.Component {

  getTime () {
    let today = new Date()
    return (
      today.getFullYear() + '年' +
      (today.getMonth() + 1) + '月' +
      today.getDate() + '日'
    )
  }

  render () {
    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          班別:&nbsp;&nbsp;
          {this.props.studentIdcard.program}
        </div>
        <div style={{ marginBottom: '10px' }}>
          學號:&nbsp;&nbsp;
          {this.props.studentIdcard.student_id}
        </div>
        <div style={{ marginBottom: '10px' }}>
          申請人:&nbsp;&nbsp;
          {this.props.studentIdcard.sname}
        </div>
        <div style={{ marginBottom: '10px' }}>
          申請日期：&nbsp;
          {this.getTime()}
        </div>
        <div style={{ marginBottom: '10px' }}>
          聯絡電話：&nbsp;
          <TextField
            id='phone'
            style={{ width: '150px' }}
            defaultValue={this.props.phone}
            disabled
          />
        </div>
        <br />
        <div>
          事宜：<br />
          因故無法修習本系所開課程，擬修習外系英文授課專業課程，並申請為本系畢業學分規定之「畢業前須通過1門本系開授或認可之英文授課專業課程」。
        </div>
        <br />
        <div style={{ marginBottom: '10px' }}>
          原因：
          <TextField
            id='reason'
            defaultValue={this.props.reason}
            disabled
            multiLine
            fullWidth
            rows={1}
          />
        </div>
        擬修&nbsp;
        <TextField
          id='department'
          style={{ width: '100px' }}
          defaultValue={this.props.department}
          disabled
        />
        &nbsp;系&nbsp;&nbsp;&nbsp;
        <TextField
          id='teacher'
          style={{ width: '100px' }}
          defaultValue={this.props.teacher}
          disabled
        />
        &nbsp;老師所授之
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-12'>
            課號：
            <TextField
              id='course_code'
              style={{ width: '150px' }}
              defaultValue={this.props.course_code}
              disabled
            />
          </div>
          <div className='col-lg-3 col-md-4 col-12'>
            課名：
            <TextField
              id='course_name'
              style={{ width: '180px' }}
              defaultValue={this.props.course_name}
              disabled
            />
          </div>
        </div>
        <br />
        <br />
        註：<br />
        1.須檢附用書書名及課程綱要。<br />
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
  course_name: state.Student.Credit.courseCreditChange.course_name,
  course_code: state.Student.Credit.courseCreditChange.course_code,
  reason: state.Student.Credit.courseCreditChange.reason,
  phone: state.Student.Credit.courseCreditChange.phone
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EnglishCourseFormConfirm)
