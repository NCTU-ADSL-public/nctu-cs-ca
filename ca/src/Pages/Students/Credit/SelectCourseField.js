import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'

let items = []

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
//   },
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
  state = {
    value: 1,
  };

  componentWillMount () {

    for (let i = 0; i < this.props.failcourse.length; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={this.props.failcourse[i].cn} />);
    }

  }

  handleChange = (event, index, value) => {
    this.setState({value});
  }

  getGradeStm = () => {
    if(this.props.failcourse[this.state.value].score!==null){
      return(
        `因成績得分 ${this.props.failcourse[this.state.value].score} 分`
      )
    }
    else if(this.props.failcourse[this.state.value].grade!==null){
      return(
        `因等級評分 ${this.props.failcourse[this.state.value].grade} `
      )
    }
    else{
      return "因"
    }
  }

  render() {
    return (
      <div>
        1. 學生於&nbsp;<font color={"#a42926"}>{this.props.failcourse[this.state.value].year}</font>&nbsp;學年度&nbsp;<font color={"#a42926"}>{this.props.failcourse[this.state.value].semester===1?"上":"下"}</font>&nbsp;學期，修習本系&nbsp;<font color={"#a42926"}>{this.props.failcourse[this.state.value].teacher}</font>&nbsp;老師所授之課程&nbsp;
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
        >
          {items}
        </SelectField>
        &nbsp;，{this.getGradeStm()}未通過，故需重修此必修課。

      </div>
    );
  }
}