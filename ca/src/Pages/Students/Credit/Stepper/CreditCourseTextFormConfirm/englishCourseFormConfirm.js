import React from 'react'
import TextField from '@material-ui/core/TextField'
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
            InputProps={{ readOnly: true }}
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
            InputProps={{ readOnly: true }}
            multiline
            fullWidth
            rows={1}
          />
        </div>
        擬修&nbsp;
        <TextField
          id='department'
          style={{ width: '100px' }}
          defaultValue={this.props.department}
          InputProps={{ readOnly: true }}
        />
        &nbsp;系&nbsp;&nbsp;&nbsp;
        <TextField
          id='teacher'
          style={{ width: '100px' }}
          defaultValue={this.props.teacher}
          InputProps={{ readOnly: true }}
        />
        &nbsp;老師所授之
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-12'>
            課號：
            <TextField
              id='course_code'
              style={{ width: '150px' }}
              defaultValue={this.props.course_code}
              InputProps={{ readOnly: true }}
            />
          </div>
          <div className='col-lg-3 col-md-4 col-12'>
            課名：
            <TextField
              id='course_name'
              style={{ width: '180px' }}
              defaultValue={this.props.course_name}
              InputProps={{ readOnly: true }}
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
  year: state.Student.Credit.englishCourse.year,
  semester: state.Student.Credit.englishCourse.semester,
  department: state.Student.Credit.englishCourse.department,  // 原課程的depart
  teacher: state.Student.Credit.englishCourse.teacher,      // 原課程teacher
  course_name: state.Student.Credit.englishCourse.course_name,
  course_code: state.Student.Credit.englishCourse.course_code,
  reason: state.Student.Credit.englishCourse.reason,
  phone: state.Student.Credit.englishCourse.phone
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EnglishCourseFormConfirm)
