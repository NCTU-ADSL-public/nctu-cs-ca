import React from 'react'

import { fetchStudents, toGivenPage } from '../../../../Redux/Assistants/Actions/Project/index'
import { connect } from 'react-redux'

import FontIcon from 'material-ui/FontIcon';

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
  paginationIcon: {
    fontSize: '40px',
    color: '#808080',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  paginationIcon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  paginationText: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    fontSize: '20px',
    color: '#808080'
  }
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
    const {
      project_status_filter,
      program_filter,
      input,
    } = this.props
    return (
      students.filter( (student) => (
        input === ''
        || student.student.id.toLowerCase().search(input.toLowerCase()) !== -1
        || student.student.name.toLowerCase().search(input.toLowerCase()) !== -1
      )).filter( (student) => (
        !project_status_filter.reduce( (all_false, project_status) => all_false || project_status, false)
        || project_status_filter[student.project.status]
      )).filter( (student) => (
        !program_filter.reduce( (all_false, program) => all_false || program, false)
        || program_filter[this.mapProgramStringToNumber(student.student.program)]
      ))
    )
  }

  render() {
    const {
      students,
      page,
      to_given_page
    } = this.props
    return (
      <div>
        <Table
          height = '55vh'
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
            { this.filter(students)
                .slice(page * 10, (page + 1) * 10)
                .map( (item, index) => (
                  <TableRow key = { index }>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.id }</TableRowColumn>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.name }</TableRowColumn>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.program }</TableRowColumn>
                    <TableRowColumn style = {{ ...styles.tableRowColumn, color: project_status_color[item.project.status] }} >{ project_status_cn[item.project.status] }</TableRowColumn>
                  </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style = {{ margin: '20px', textAlign: 'center' }} >
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => to_given_page(0) }
            style = { styles.paginationIcon }
          >
            first_page
          </FontIcon>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => page !== 0 && to_given_page(page - 1) }
            style = { styles.paginationIcon }
          >
            chevron_left
          </FontIcon>
          <span style = { styles.paginationText }>{ page + 1 }/{ Math.max(Math.ceil(this.filter(students).length / 10), 1) }</span>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => page !== Math.max(Math.ceil(this.filter(students).length / 10), 1) - 1 && to_given_page(page + 1) }
            style = { styles.paginationIcon }
          >
            chevron_right
          </FontIcon>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => to_given_page(Math.max(Math.ceil(this.filter(students).length / 10), 1) - 1) }
            style = { styles.paginationIcon }
          >
            last_page
          </FontIcon>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  students: state.Assistant.Project.students,
  project_status_filter: state.Assistant.Project.project_status_filter,
  program_filter: state.Assistant.Project.program_filter,
  input: state.Assistant.Project.input,
  page: state.Assistant.Project.page
})

const mapDispatchToProps = (dispatch) => ({
  fetch_students: () => dispatch(fetchStudents()),
  to_given_page: (value) => dispatch(toGivenPage(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable)
