import React from 'react'
import TextField from 'material-ui/TextField'
import SelectCourseField from  './SelectCourseField'

// studentIdcard: {
//   sname: '資料錯誤',
//     student_id: '0000000',
//     program: '網多',
//     grade: "大三",
//     email: 'hihi@gmail.com',
// },
class TextForm extends React.Component {

  state={
    value:1,
    failcourse:[
      {
        "cn":"線性代數",
        "en":"Linear Algebra",
        "score":57,
        "grade":"D",
        "pass":"不通過",
        "year":103,
        "semester":1,
        "teacher":"易志偉"
      },
      {
        "cn":"服務學習(一)",
        "en":"Service Learning I",
        "score":null,
        "grade":null,
        "pass":"不通過",
        "year":103,
        "semester":2,
        "teacher":"林正中"
      },
      {
        "cn":"物件導向程式設計(英文授課)",
        "en":"Object-Oriented Programming",
        "score":47,
        "grade":"E",
        "pass":"不通過",
        "year":103,
        "semester":2,
        "teacher":"荊宇泰"
      }
    ]
  }

  handleFailCourseSelect = (value) =>{
    this.setState({
      value:value
    })
  }

  getTime = () => {
    let today=new Date();


    return (
      today.getFullYear()+'年'+

      (today.getMonth()+1)+'月'+

      today.getDate()+'日'
    )
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
        <br/>
        <br/>
        申請人聯絡電話：
        <TextField
          hintText="09XXXXXXXX"
        />&nbsp;
        申請日期：&nbsp;{this.getTime()}
        <br/>
        <br/>
        事宜：
        <br/>
        <br/>
        □ &nbsp;學生必修課程需重修，然因不可抗拒之理由，需修習外系所開課程，以抵本系必修
        課程
        <br/>
        <br/>
        <SelectCourseField failcourse={this.state.failcourse} />
        <br/>
        <br/>
        2.現因 <br/>
        <TextField
          hintText="某某理由"
          floatingLabelText="理由請詳填"
          multiLine={true}
          fullWidth={true}
          rows={2}
        /><br/>之理由，無法修習本系所開課程，擬修
        系 老師所授之 課號： 課名： 課
        <br/>註：1.課程內容需與本系課
        程一致。2. 須檢附用書書名及課程綱要）
        <br/>
        <br/>
        <br/>
        <br/>

        □ &nbsp;學生因其他理由，需修習外系所或本院研究所開設的課程，以抵本系必修課程
        <br/>
        <br/>現因 <br/>
        <TextField
          hintText="某某理由"
          floatingLabelText="理由請詳填"
          multiLine={true}
          fullWidth={true}
          rows={2}
        /><br/>之理由，無法修習本系所開課程，擬修
        系 老師所授之 課號： 課名： 課
        <br/>註：1.課程內容需與本系課
        程一致。2. 須檢附用書書名及課程綱要）
        <br/>
      </div>
    )
  }
}

export default TextForm