import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import {TextField} from 'material-ui'

import './Table.css'

const styles = {
  tabColumn0: {
    cursor: 'pointer',
    //  background: '#ecfcf9',
    // border: '3px solid white',
  },
  tabColumn1: {
    cursor: 'pointer',
    //  background: '#f9f9f9',
    //  border: '3px solid white',
  },
  header: {
    cursor: 'pointer',
    fontSize: '1.2em',
    transition: '.5s'
  },
  headerB: {
    cursor: 'pointer',
    fontSize: '1.2em',
    fontWeight: 700,
    color: '#35916e',
    transition: '.5s'
  },
  table: {
    fontFamily: 'Noto Sans CJK TC',
    color: '#434343',
    tableLayout: 'auto'
  },
  colorGreen: {
    cursor: 'pointer',
    color: '#418166',
  },
  colorBrown: {
    cursor: 'pointer',
    color: '#816039',
  },
  colorRed: {
    cursor: 'pointer',
    backgroundColor: 'red',
    color: '#fff'
  },
}

export default class ListTable extends Component {

  constructor (props) {
    let NewItemList = []
    super(props)
    this.state = {
      fixedHeader: false,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 900,

      itemListRows: [],
      itemList: [],
      orderBy: 'sid',
    }

  }

  componentWillMount () {
    this.orderList(this.state.orderBy)
  }

  componentDidUpdate (NextProp, NextState) {
    if (NextProp.items !== this.props.items) {
      this.orderList(this.state.orderBy)
      //if(this.state.itemList.length !== 0) this.handleRowClick(0)
    }
  }

  orderList (orderBy) {

    if (this.props.items) {
      this.NewItemList = [].concat(this.props.items)
        .sort((a, b) => {
          if (orderBy === 'name')
            return a.sname.localeCompare(b.sname, 'zh-Hans-CN')
          else if (orderBy === 'sid')
            return a.student_id.localeCompare(b.student_id, 'zh-Hans-CN')
        })
    }

    let itemListRows = this.NewItemList
      .map((row, i) =>
        <TableRow key={i} style={row.failed && styles.colorRed}>
          <TableRowColumn style={styles.tabColumn0}>{row.student_id}</TableRowColumn>
          <TableRowColumn style={styles.tabColumn0}>{row.sname}</TableRowColumn>
        </TableRow>
      )

    this.setState({
      itemList: this.NewItemList,
      itemListRows,
      orderBy,
    })
  }

  handleRowClick = (row) => {
    this.props.choose(this.NewItemList[row].id)
  }

  render () {
    return (
        <Table
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onCellClick={this.handleRowClick}
          style={styles.table}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="2">
              <TextField
                hintText="請輸入學號或姓名已進行篩選"
                onChange={this.props.filter}
                style={{width:'80%'}}
              />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                <div style={this.state.orderBy === 'sid' ? styles.headerB : styles.header}
                     onClick={() => this.orderList('sid')}>
                  學號{this.state.orderBy === 'sid' ? '↓' : ''}
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <div style={this.state.orderBy === 'name' ? styles.headerB : styles.header}
                     onClick={() => this.orderList('name')}>
                  學生姓名{this.state.orderBy === 'name' ? '↓' : ''}
                </div>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.itemListRows}
          </TableBody>
        </Table>
    )
  }

}