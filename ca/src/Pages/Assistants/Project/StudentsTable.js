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
          { students.map( (item, index) => (
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

export default StudentsTable
