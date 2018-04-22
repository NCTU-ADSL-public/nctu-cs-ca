import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const fontStyle={
  verticalAlign: "default",
  fontSize: "1em",
  fontWeight: "300",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
}

const TableRowStyle={
  verticalAlign: "default",
  fontSize: "1em",
  fontWeight: "300",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
  color:'#454545'
}



const tableData = [
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
  {
    cos_cname: '資料庫系統概論',
    teacher: '彭文志',
    cos_time: '2EF',
    cos_code: 'DCP129',
  },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: true,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '100%',
    tableData:[]
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  }

  getTableRow = () => {
    if(this.props.action === 'mail'){
      return(
        <TableRow style={fontStyle}>
          <TableHeaderColumn tooltip="寄件者">寄件者</TableHeaderColumn>
          <TableHeaderColumn tooltip="主旨">主旨</TableHeaderColumn>
          <TableHeaderColumn tooltip="寄件時間">寄件時間</TableHeaderColumn>
        </TableRow>
      )
    }
    else if(this.props.action === 'sent'){
      return(
        <TableRow style={fontStyle}>
          <TableHeaderColumn tooltip="收件者">收件者</TableHeaderColumn>
          <TableHeaderColumn tooltip="主旨">主旨</TableHeaderColumn>
          <TableHeaderColumn tooltip="寄件時間">寄件時間</TableHeaderColumn>
        </TableRow>
      )
    }
  }
  getRowBody = () => {
    if(this.props.action === 'mail'){
      return(
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
          style={fontStyle}
        >
          {this.props.tableData.map( (row, index) => (
            <TableRow key={index}
                      style = {TableRowStyle}>
              <TableRowColumn>{row.sender}</TableRowColumn>
              <TableRowColumn>{row.title}</TableRowColumn>
              <TableRowColumn>{row.send_time}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      )
    }
    else if(this.props.action === 'sent'){
        return(
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
            style={fontStyle}
          >
            {this.props.tableData.map( (row, index) => (
              <TableRow key={index}
                        style = {TableRowStyle}>
                <TableRowColumn>{row.receiver}</TableRowColumn>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.send_time}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        )
      }
  }
  render() {
    return (
      <div style={fontStyle}>
        <MuiThemeProvider>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              {this.getTableRow()}
            </TableHeader>
              {this.getRowBody()}
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}