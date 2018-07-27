import React from 'react'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import axios from 'axios'

const styles = {
  tableHeaderColumn: {
    fontSize: '25px'
  },
  tableRowColumn: {
    fontSize: '18px'
  },
}

const project_status_color = ['green', 'yellow', 'red', 'gray']
const project_status_cn    = ['已找到教授', '待教授審核', '未申請教授', '無資工專題']

class StudentsTable extends React.Component {

  constructor() {
    super();
    this.state = {
      students: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/students').then( res => {
      this.setState({
        students: res.data
      })
    })
  }

  render() {
    const { students } = this.state
    console.log(students)
    return (
      <Table
        height = '60vh'
        selectable = { false }
      >
        <TableHeader
          displaySelectAll = { false }
          adjustForCheckbox = { false }
        >
          <TableRow>
            <TableHeaderColumn tooltip = "依學號排序" style = { styles.tableHeaderColumn } >學號</TableHeaderColumn>
            <TableHeaderColumn tooltip = "依姓名排序" style = { styles.tableHeaderColumn } >姓名</TableHeaderColumn>
            <TableHeaderColumn tooltip = "依組別排序" style = { styles.tableHeaderColumn } >組別</TableHeaderColumn>
            <TableHeaderColumn tooltip = "依專題狀況排序" style = { styles.tableHeaderColumn } >專題狀況</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox = { false }
          showRowHover = { true }
        >
          { students.map( (student, index) => (
            <TableRow key = { index }>
              <TableRowColumn style = { styles.tableRowColumn } >{ student.student_id }</TableRowColumn>
              <TableRowColumn style = { styles.tableRowColumn } >{ student.sname }</TableRowColumn>
              <TableRowColumn style = { styles.tableRowColumn } >{ student.program }</TableRowColumn>
              <TableRowColumn style = {{ ...styles.tableRowColumn, color: project_status_color[student.project_status] }} >{ project_status_cn[student.project_status] }</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default StudentsTable
