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
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
  tableHeaderColumn: {
    fontSize: '25px'
  },
  tableRowColumn: {
    fontSize: '18px'
  },
  linearProgress: {
    display: 'inline-block',
    marginRight: '20px',
    width: '75%',
  }
}

class TeachersTable extends React.Component {
  render() {
    const { teachers } = this.props
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
            <TableHeaderColumn style = { styles.tableHeaderColumn }>姓名</TableHeaderColumn>
            <TableHeaderColumn style = { styles.tableHeaderColumn }>已收人數</TableHeaderColumn>
            <TableHeaderColumn style = {{ ...styles.tableHeaderColumn, width: '200px' }}>待審核人數</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox = { false }
          showRowHover = { true }
        >
        { teachers.map( (teachers, index) => (
            <TableRow key = { index } >
              <TableRowColumn style = { styles.tableRowColumn } >{ teachers.professor_name }</TableRowColumn>
              <TableRowColumn style = { styles.tableRowColumn } >
                <LinearProgress style = { styles.linearProgress } mode="determinate" value={ teachers.accepted_number * 100 / 7 } />
                  { teachers.accepted_number } / { Math.max(teachers.accepted_number, 7) }
              </TableRowColumn>
              <TableRowColumn style = {{ ...styles.tableRowColumn, width: '200px' }} >
                <div style = {{margin: '0 auto', width: '100%'}}>
                  { teachers.pending_number }
                </div>
              </TableRowColumn>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    )
  }
}

export default TeachersTable
