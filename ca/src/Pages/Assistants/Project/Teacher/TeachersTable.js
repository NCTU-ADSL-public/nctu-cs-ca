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
import {yellow500, red500, green500, red900 } from 'material-ui/styles/colors';


const styles = {
  tableHeaderColumn: {
    fontSize: '25px'
  },
  tableRowColumn: {
    fontSize: '18px'
  },
  linearProgress: {
    display: 'inline-block',
    marginRight: '50px',
    width: '80%',
  }
}

const linearProgressColor = [green500, yellow500, red500, red900]

class TeachersTable extends React.Component {

  print = (index) => {
    console.log(index)
  }
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
            <TableHeaderColumn style = {{ ...styles.tableHeaderColumn, width: '120px' }} >姓名</TableHeaderColumn>
            <TableHeaderColumn style = {{ ...styles.tableHeaderColumn, width: '120px' }} >待審核</TableHeaderColumn>
            <TableHeaderColumn style = { styles.tableHeaderColumn } >已接受 (已接受人數/額滿人數)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox = { false }
          showRowHover = { true }
        >
        {/*onMouseUp={() => {alert('Click event on row')}}*/}
        { teachers.map( (teachers, index) => (
          <TableRow key = { index }>
            <TableRowColumn style = {{ ...styles.tableRowColumn, width: '120px' }} >
              { teachers.professor_name }
            </TableRowColumn>
            <TableRowColumn style = {{ ...styles.tableRowColumn, width: '120px' }} >
              <div style = {{ textAlign: 'center', margin: 'auto' }}>
                { teachers.pending_number }人
              </div>
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
    )
  }
}

export default TeachersTable
