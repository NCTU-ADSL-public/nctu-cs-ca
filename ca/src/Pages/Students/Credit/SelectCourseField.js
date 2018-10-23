import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

let items = []

/*
const bodyStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color: '#454545'
}

const titleStyle = {
  fontFamily: 'Noto Sans CJK TC',
  color: '#565656'
}
*/

const fontStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC'
}

const fontlabelStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC',
  color: '#a42926'
}
// failcourse:[
//   {
//     "cn":"線性代數",
//     "en":"Linear Algebra",
//     "score":57,
//     "grade":"D",
//     "pass":"不通過",
//     "year":103,
//     "semester":1,
//     "teacher":"易志偉"
//   }npm,
//   {
//     "cn":"服務學習(一)",
//     "en":"Service Learning I",
//     "score":null,
//     "grade":null,
//     "pass":"不通過",
//     "year":103,
//     "semester":2,
//     "teacher":"林正中"
//   },
//   {
//     "cn":"物件導向程式設計(英文授課)",
//     "en":"Object-Oriented Programming",
//     "score":47,
//     "grade":"E",
//     "pass":"不通過",
//     "year":103,
//     "semester":2,
//     "teacher":"荊宇泰"
//   }
// ]

export default class SelectCourseField extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getGradeStm = this.getGradeStm.bind(this)
    this.state = { valueFailure: 1 }
  }

  componentWillMount () {
    for (let i = 0; i < this.props.failcourse.length; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={this.props.failcourse[i].cn} />)
    }
  }

  handleChange (event, index, value) {
    this.setState({ valueFailure: value })
  }

  getGradeStm () {
    if (this.props.failcourse[this.state.valueFailure].score !== null) {
      return (
        <font color={'#a42926'}>因成績得分 {this.props.failcourse[this.state.valueFailure].score} 分未通過</font>
      )
    } else if (this.props.failcourse[this.state.valueFailure].grade !== null) {
      return (
        <font color={'#a42926'}>因等級評分 {this.props.failcourse[this.state.valueFailure].grade} 未通過</font>
      )
    } else {
      return <font color={'#a42926'}>未通過</font>
    }
  }

  render () {
    return (
      <div>
        學生於&nbsp;<font color={'#a42926'}>{this.props.failcourse[this.state.valueFailure].year}</font>&nbsp;學年度&nbsp;<font color={'#a42926'}>{this.props.failcourse[this.state.valueFailure].semester === 1 ? '上' : '下'}</font>&nbsp;學期，修習本系&nbsp;<font color={'#a42926'}>{this.props.failcourse[this.state.valueFailure].teacher}</font>&nbsp;老師所授之課程&nbsp;
        <SelectField
          value={this.state.valueFailure}
          onChange={this.handleChange}
          autoWidth
          maxHeight={200}
          labelStyle={fontlabelStyle}
          menuStyle={fontlabelStyle}
          selectedMenuItemStyle={fontlabelStyle}
          listStyle={fontStyle}
          menuItemStyle={fontStyle}
        >
          {items}
        </SelectField>
        &nbsp;&nbsp;，{this.getGradeStm()}，故需重修此必修課。

      </div>
    )
  }
}
