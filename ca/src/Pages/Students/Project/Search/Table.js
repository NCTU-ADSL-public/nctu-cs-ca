import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

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
  },
  headerB: {
    cursor: 'pointer',
    fontSize: '1.5em',
    fontWeight: 700,
    color: '#35916e',
  },
  table: {
    fontFamily: 'Noto Sans CJK TC',
    color: '#434343',
    tableLayout: 'auto',
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
    color: '#c61234',
  },
}

export default class ListTable extends Component {

  constructor (props) {
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
      orderBy: 'name',
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
    let NewItemList = []

    if (this.props.items) {
      NewItemList = [].concat(this.props.items)
        .sort((a, b) => {
          if (orderBy === 'name')
            return a.tname.localeCompare(b.tname, 'zh-Hans-CN')
          else if (orderBy === 'sid')
            return a.scount.localeCompare(b.scount, 'zh-Hans-CN')
        })
    }

    let itemListRows = this.props.items
      .map((row, i) =>
        <TableRow key={i}>
          <TableRowColumn style={styles.tabColumn0}>{row.tname}</TableRowColumn>
          <TableRowColumn style={styles.tabColumn0}>{row.scount}</TableRowColumn>
        </TableRow>
      )

    this.setState({
      itemList: NewItemList,
      itemListRows,
      orderBy,
    })
  }

  handleRowClick = (rowIndex) => {
    //console.log(rowIndex)
    //console.log(this.state.itemList)
    this.props.parentFunction(this.state.itemList[rowIndex].tname)
  }

  render () {
    return (

      <div>

        <Table
          height={this.state.height}
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
              <TableHeaderColumn tooltip="教授">
                <div style={styles.header}>
                  教授
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="已收學生人數">
                <div style={ styles.header}>
                  已收學生人數
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


      </div>
    )
  }

}