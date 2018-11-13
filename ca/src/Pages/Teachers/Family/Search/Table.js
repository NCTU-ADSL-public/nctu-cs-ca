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
  colorBlue: {
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: '#3949AB'
  },
  colorRed: {
    cursor: 'pointer',
    backgroundColor: '#F50057',
    color: '#fff'
  },
}

export default class ListTable extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fixedHeader: false,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
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
    this.orderList = this.orderList.bind(this)
  }

  componentWillMount () {
    this.orderList(this.state.orderBy)
  }

  // for filter
  componentDidUpdate (NextProp, NextState) {
    if (NextProp.items !== this.props.items) {
      this.orderList(this.state.orderBy)
    }
  }

  orderList (orderBy) {
    if (this.props.items) {
      this.NewItemList = [].concat(this.props.items)
        .sort((a, b) => {
          if (orderBy === 'name'){
            if(a.recent_failed === true){
              if(b.recent_failed === true)
                return a.sname.localeCompare(b.sname, 'zh-Hant-TW')
              else
                return -1
            }
            else{
              if(b.recent_failed === true)
                return 1
              else
                return a.sname.localeCompare(b.sname, 'zh-Hant-TW')
            }
          }  
          else if (orderBy === 'sid'){
            if(a.recent_failed === true){
              if(b.recent_failed === true)
                return a.student_id.localeCompare(b.student_id, 'zh-Hant-TW')
              else
                return -1
            }
            else{
              if(b.recent_failed === true)
                return 1
              else
                return a.student_id.localeCompare(b.student_id, 'zh-Hant-TW')
            }
          }
          else
            return -1
        })
    }

    this.setState({
      itemList: this.NewItemList,
      orderBy
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
                hintText="請輸入學號或姓名以進行篩選"
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
            {this.state.itemList
              .map((row, i) =>
                <TableRow key={i} style={row.recent_failed ? styles.colorRed : styles.colorBlue}>
                  <TableRowColumn style={styles.tabColumn0}>{row.student_id}</TableRowColumn>
                  <TableRowColumn style={styles.tabColumn0}>{row.sname}</TableRowColumn>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
    )
  }

}