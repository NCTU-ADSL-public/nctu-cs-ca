import React from 'react'
import { fetchStudents } from '../../../../Redux/Assistants/Actions/Project/index'

import { connect } from 'react-redux'

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  tableHeaderColumn: {
    fontSize: '25px'
  },
  tableRowColumn: {
    fontSize: '18px'
  },
}

const project_status_color = ['green', 'Gold', 'red']
const project_status_cn    = ['已申請教授', '待教授審核', '未申請教授']

class StudentsTable extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetch_students()
  }

  mapProgramStringToNumber = (program) => {
    switch (program) {
      case '資工A':
        return 0
      case '資工B':
        return 1
      case '網多':
        return 2
      case '資電':
        return 3
      case '電資學士班':
        return 4
      default:
        return 5
    }
  }

  filter = (students) => {
    const { project_status_filter, program_filter, input } = this.props
    return (
      students.filter( student => (
        project_status_filter[student.project.status] &&
        program_filter[this.mapProgramStringToNumber(student.student.program)] &&
        (
          input === '' ||
          student.student.id.toLowerCase().search(input.toLowerCase()) !== -1 ||
          student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
        )
      ))
    )
  }

  render() {
    const { students } = this.props
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
            <TableHeaderColumn style = { styles.tableHeaderColumn } >學號</TableHeaderColumn>
            <TableHeaderColumn style = { styles.tableHeaderColumn } >姓名</TableHeaderColumn>
            <TableHeaderColumn style = { styles.tableHeaderColumn } >組別</TableHeaderColumn>
            <TableHeaderColumn style = { styles.tableHeaderColumn } >專題狀況</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox = { false }
          showRowHover = { true }
        >
          { this.filter(students).map( (item, index) => (
            <TableRow key = { index }>
              <TableRowColumn style = { styles.tableRowColumn } >{ item.student.id }</TableRowColumn>
              <TableRowColumn style = { styles.tableRowColumn } >{ item.student.name }</TableRowColumn>
              <TableRowColumn style = { styles.tableRowColumn } >{ item.student.program }</TableRowColumn>
              <TableRowColumn style = {{ ...styles.tableRowColumn, color: project_status_color[item.project.status] }} >{ project_status_cn[item.project.status] }</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  students: state.Assistant.Project.students,
  project_status_filter: state.Assistant.Project.project_status_filter,
  program_filter: state.Assistant.Project.program_filter,
  input: state.Assistant.Project.input
})

const mapDispatchToProps = (dispatch) => ({
  fetch_students: () => dispatch(fetchStudents())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable)
