import React from 'react'
import {
  setSortBy,
  toggleDesend,
  toGivenPage,
  fetchScore,
} from '../../../../Redux/Assistants/Actions/Project/Score/index'
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

class ScoreTable extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetch_score({
      semester: `${this.props.academic_year}-${this.props.semester}`,
      first_second: this.props.first_second
    })
  }

  filter = (scores) => {
    const {
      input
    } = this.props
    return scores.filter( (score) => (
      input === ''
      || score.student.id.toLowerCase().search(input.toLowerCase()) !== -1
      || score.student.name.toLowerCase().search(input.toLowerCase()) !== -1
      || score.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
    ))
  }

  render() {

    const {
      sort_by,
      desend,
      page,
      input,
      set_sort_by,
      toggle_desend,
      scores,
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
                  學生姓名 {sort_by === 'name' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'professor' ? toggle_desend() : set_sort_by('professor') }
                  style = { sort_by === 'professor' ? styles.sortSelected : styles.sortNotSelected }
                >
                  教授姓名 {sort_by === 'professor' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div
                  onClick = { () => sort_by === 'score' ? toggle_desend() : set_sort_by('score') }
                  style = { sort_by === 'score' ? styles.sortSelected : styles.sortNotSelected }
                >
                  成績 {sort_by === 'score' && ( desend ? '↓' : '↑') }
                </div>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox = { false }
            showRowHover = { true }
          >
            { this.filter(scores)
                .sort( (a, b) => {
                  if (sort_by === 'id') {
                    return (parseInt(a.student.id) - parseInt(b.student.id)) * (desend ? 1 : -1)
                  } else if (sort_by === 'name') {
                    return a.student.name.localeCompare(b.student.name, 'zh-Hans-CN') * (desend ? -1 : 1)
                  } else if (sort_by === 'professor') {
                    return a.professor_name.localeCompare(b.professor_name, 'zh-Hans-CN') * (desend ? -1 : 1)
                  } else if (sort_by === 'score') {
                    return ( a.student.score - b.student.score ) * (desend ? -1 : 1)
                  }
                })
                .slice(page * 10, (page + 1) * 10)
                .map( (item, index) => (
                  <TableRow key = { index }>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.id }</TableRowColumn>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.name }</TableRowColumn>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.professor_name }</TableRowColumn>
                    <TableRowColumn style = { styles.tableRowColumn } >{ item.student.score !== null ? item.student.score : '尚未評分' }</TableRowColumn>
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
          <span style = { styles.paginationText }>{ page + 1 }/{ Math.max(Math.ceil(this.filter(scores).length / 10), 1) }</span>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => page !== Math.max(Math.ceil(this.filter(scores).length / 10), 1) - 1 && to_given_page(page + 1) }
            style = { styles.paginationIcon }
          >
            chevron_right
          </FontIcon>
          <FontIcon
            className = "material-icons"
            color = '#808080'
            hoverColor = '#000000'
            onClick = { () => to_given_page(Math.max(Math.ceil(this.filter(scores).length / 10), 1) - 1) }
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
  desend        : state.Assistant.Project.Score.desend,
  sort_by       : state.Assistant.Project.Score.sort_by,
  page          : state.Assistant.Project.Score.page,
  scores        : state.Assistant.Project.Score.scores,
  first_second  : state.Assistant.Project.Score.first_second,
  academic_year : state.Assistant.Project.Score.academic_year,
  semester      : state.Assistant.Project.Score.semester,
  input      : state.Assistant.Project.Score.input
})

const mapDispatchToProps = (dispatch) => ({
  set_sort_by: (value) => dispatch(setSortBy(value)),
  toggle_desend: () => dispatch(toggleDesend()),
  to_given_page: (value) => dispatch(toGivenPage(value)),
  fetch_score: (post_item) => dispatch(fetchScore(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTable)
