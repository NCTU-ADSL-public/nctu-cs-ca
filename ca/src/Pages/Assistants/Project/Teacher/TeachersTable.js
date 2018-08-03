import React from 'react'

import {
  fetchTeachers,
  setSortBy,
  toggleDesend,
  toGivenPage
} from '../../../../Redux/Assistants/Actions/Project/Teacher/index'
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
import LinearProgress from 'material-ui/LinearProgress';
import {yellow500, red500, green500, red900 } from 'material-ui/styles/colors';


const styles = {
  tableRowColumn: {
    fontSize: '18px'
  },
  linearProgress: {
    display: 'inline-block',
    marginRight: '50px',
    width: '80%',
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

const linearProgressColor = [green500, yellow500, red500, red900]

class TeachersTable extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetch_teachers()
  }

  filter = (teachers) => {
    const {
      input
    } = this.props
    return (
      teachers.filter( (teacher) => (
        input === '' || teacher.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
      ))
    )
  }

  render() {
    const {
      teachers,
      sort_by,
      desend,
      page,
      set_sort_by,
      toggle_desend,
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
              <TableHeaderColumn style = {{ width: '10vw' }} >
                <div
                  onClick = { () => sort_by === 'name' ? toggle_desend() : set_sort_by('name') }
                  style = { sort_by === 'name' ? styles.sortSelected : styles.sortNotSelected }
                >
                  姓名 {sort_by === 'name' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn style = {{ width: '10vw' }} >
                <div
                  onClick = { () => sort_by === 'pending' ? toggle_desend() : set_sort_by('pending') }
                  style = { sort_by === 'pending' ? styles.sortSelected : styles.sortNotSelected }
                >
                  待審核 {sort_by === 'pending' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'accepted' ? toggle_desend() : set_sort_by('accepted') }
                  style = { sort_by === 'accepted' ? styles.sortSelected : styles.sortNotSelected }
                >
                  已接受 (已接受人數/額滿人數) {sort_by === 'accepted' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox = { false }
            showRowHover = { true }
          >
          {/*onMouseUp={() => {alert('Click event on row')}}*/}
          { this.filter(teachers)
              .sort( (a, b) => {
                if (sort_by === 'name') {
                  return a.professor_name.localeCompare(b.professor_name, 'zh-Hans-CN') * (desend ? -1 : 1)
                } else if (sort_by === 'pending') {
                  return (a.pending_number - b.pending_number) * (desend ? -1 : 1)
                } else if (sort_by === 'accepted') {
                  return (a.accepted_number - b.accepted_number) * (desend ? -1 : 1)
                }
              })
              .slice(page * 10, (page + 1) * 10)
              .map( (teachers, index) => (
              <TableRow key = { index }>
                <TableRowColumn style = {{ ...styles.tableRowColumn, width: '10vw' }} >
                  { teachers.professor_name }
                </TableRowColumn>
                <TableRowColumn style = {{ ...styles.tableRowColumn, width: '10vw' }} >
                    { teachers.pending_number }人
                </TableRowColumn>
                <TableRowColumn style = { styles.tableRowColumn } >
                  <LinearProgress
                    style = { styles.linearProgress }
                    color = { linearProgressColor[
                      Math.floor(teachers.accepted_number * 3 / Math.max(teachers.accepted_number, 7))
                    ]}
                    mode  = "determinate"
                    value = { teachers.accepted_number * 100 / 7 }
                  />
                  { teachers.accepted_number } / { Math.max(teachers.accepted_number, 7) }
                  <span style = {{fontSize: '10px'}} >(人)</span>
                </TableRowColumn>
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
          <span style = { styles.paginationText }>{ page + 1 }/{ Math.max(Math.ceil(this.filter(teachers).length / 10), 1) }</span>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => page !== Math.max(Math.ceil(this.filter(teachers).length / 10), 1) - 1 && to_given_page(page + 1) }
            style = { styles.paginationIcon }
          >
            chevron_right
          </FontIcon>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => to_given_page(Math.max(Math.ceil(this.filter(teachers).length / 10), 1) - 1) }
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
  teachers  : state.Assistant.Project.Teacher.teachers,
  sort_by   : state.Assistant.Project.Teacher.sort_by,
  desend    : state.Assistant.Project.Teacher.desend,
  page      : state.Assistant.Project.Teacher.page,
  input     : state.Assistant.Project.Teacher.input
})

const mapDispatchToProps = (dispatch) => ({
  fetch_teachers: () => dispatch(fetchTeachers()),
  set_sort_by: (value) => dispatch(setSortBy(value)),
  toggle_desend: () => dispatch(toggleDesend()),
  to_given_page: (value) => dispatch(toGivenPage(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeachersTable)
