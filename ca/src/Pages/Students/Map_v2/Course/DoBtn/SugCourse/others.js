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
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '100%',
    tableData:tableData
  };

  componentWillMount () {
    let _this = this
    axios.get('/students/courses/recommend').then(res => {
      _this.setState({
        tableData:res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }


  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

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
              <TableRow>
                <TableHeaderColumn tooltip="按推薦優先順序排列課程">順序</TableHeaderColumn>
                <TableHeaderColumn tooltip="課程名稱">課程</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.state.tableData.map( (row, index) => (
                <TableRow key={index}
                          style = {TableRowStyle}>
                  <TableRowColumn>{index+1}</TableRowColumn>
                  <TableRowColumn>{row.cos_cname}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}