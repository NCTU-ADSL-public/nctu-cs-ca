import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import MailReader from './MailReader'


const fontStyle={
  verticalAlign: "default",
  fontSize: "1em",
  fontWeight: "300",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
}

const TableRowStyle={
  verticalAlign: "default",
  fontSize: "1.5em",
  fontWeight: "500",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
  color:'#454545',
  cursor: 'pointer'
}

export default class TableMail extends Component {
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
    open:false,
    mail:[{"mail_id":"0316201-2018-04-22 22:25:25-T9830",
      "title":"test3",
      "sender_id":"0316201",
      "receiver_id":"T9830",
      "read_bit":"0",
      "send_time":"2018-04-22 22:25:25",
      "sender":"王馨嫻","receiver":"吳育松",
      "content":"HeyHey"}],
    tableData:[],
  }

  handleMailReader = (index) => {
    let mail = this.props.tableData[index]
    let _this = this
    axios.post('/mail/content', {
      mail_id: mail.mail_id
    })
      .then(res => {
        _this.setState({
          open:true,
          mail:res.data
        })
      })
      .catch(err => {
        window.location.reload('/logout')
        console.log(err)
      })
  }

  handleClose = () => {
    this.setState({open: false});
  };

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
            onCellClick={(rowNumber )=>{this.handleMailReader(rowNumber )}}
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
        <MailReader open={this.state.open} handleClose={this.handleClose} data={this.state.mail[0]}/>
      </div>
    )
  }
}