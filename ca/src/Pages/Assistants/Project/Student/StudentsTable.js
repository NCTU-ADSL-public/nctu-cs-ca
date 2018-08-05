import React from 'react'

import {
  fetchStudents,
  toGivenPage,
  setSortBy,
  toggleDesend
} from '../../../../Redux/Assistants/Actions/Project/Student/index'
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
  tableRowColumn: {
    fontSize: '18px'
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
  },
  sortSelected: {
    color: 'rgb(0, 188, 212)',
    fontSize: '27px',
    transition: 'color 0.3s, font-size 0.3s',
  },
  sortNotSelected: {
    fontSize: '25px',
    transition: 'color 0.3s, font-size 0.3s'
  }
}

const project_status_color = ['green', 'Gold', 'red']
const project_status_cn    = ['已申請教授', '待教授審核', '未申請教授']

class StudentsTable extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetch_students()
    this.state = {
      open: false
    }
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
    return students.filter( (student) => (
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
  }

  render() {
    const {
      students,
      page,
      to_given_page,
      desend,
      sort_by,
      toggle_desend,
      set_sort_by
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
              <TableHeaderColumn >
                <div
                  onClick = { () => sort_by === 'id' ? toggle_desend() : set_sort_by('id') }
                  style = { sort_by === 'id' ? styles.sortSelected : styles.sortNotSelected }
                >
                  學號 {sort_by === 'id' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'name' ? toggle_desend() : set_sort_by('name') }
                  style = { sort_by === 'name' ? styles.sortSelected : styles.sortNotSelected }
                >
                  姓名 {sort_by === 'name' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'program' ? toggle_desend() : set_sort_by('program') }
                  style = { sort_by === 'program' ? styles.sortSelected : styles.sortNotSelected }
                >
                  組別 {sort_by === 'program' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'project_status' ? toggle_desend() : set_sort_by('project_status') }
                  style = { sort_by === 'project_status' ? styles.sortSelected : styles.sortNotSelected }
                >
                  專題狀況 {sort_by === 'project_status' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox = { false }
            showRowHover = { true }
          >
            { this.filter(students)
                .sort( (a, b) => {
                  if (sort_by === 'id') {
                    return (parseInt(a.student.id) - parseInt(b.student.id)) * (desend ? 1 : -1)
                  } else if (sort_by === 'name') {
                    return a.student.name.localeCompare(b.student.name, 'zh-Hans-CN') * (desend ? -1 : 1)
                  } else if (sort_by === 'program') {
                    return a.student.program.localeCompare(b.student.program, 'zh-Hans-CN') * (desend ? -1 : 1)
                  } else if (sort_by === 'project_status') {
                    return (a.project.status - b.project.status) * (desend ? -1 : 1)
                  }
                })
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
  students              : state.Assistant.Project.Student.students,
  project_status_filter : state.Assistant.Project.Student.project_status_filter,
  program_filter        : state.Assistant.Project.Student.program_filter,
  input                 : state.Assistant.Project.Student.input,
  page                  : state.Assistant.Project.Student.page,
  sort_by               : state.Assistant.Project.Student.sort_by,
  desend                : state.Assistant.Project.Student.desend
})

const mapDispatchToProps = (dispatch) => ({
  fetch_students: () => dispatch(fetchStudents()),
  to_given_page: (value) => dispatch(toGivenPage(value)),
  toggle_desend: () => dispatch(toggleDesend()),
  set_sort_by: (value) => dispatch(setSortBy(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable)
