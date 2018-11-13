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

export default class CourseTable extends Component {

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
      orderBy: 'sem',
    }

  }

  static defaultProps = {
    items: [
      {
        unique_id: 'DCP9999',
        sem: '105下',
        cos_cname: '資料庫系統概論',
      },
    ]
  }

  componentWillMount () {
    this.orderList(this.state.orderBy)
  }

  componentDidUpdate (NextProp, NextState) {
    if (NextProp.items !== this.props.items) {
      this.orderList(this.state.orderBy)
      if(this.state.itemList.length !== 0) this.handleRowClick(0)
    }
  }

  orderList (orderBy) {
    let NewItemList = []

    if (this.props.items !== undefined) {
      NewItemList = [].concat(this.props.items)
        .sort((a, b) => {
          if (orderBy === 'name')
            return a.cos_cname.localeCompare(b.cos_cname, 'zh-Hans-CN')
          else if (orderBy === 'sem')
            return a.unique_id.localeCompare(b.unique_id, 'zh-Hans-CN')
          else 
            return -1
        })
    }

    let itemListRows = NewItemList
      .map((row, i) =>
        <TableRow key={i}>
          <TableRowColumn style={styles.tabColumn0}>{row.unique_id}</TableRowColumn>
          <TableRowColumn style={styles.tabColumn0}>{row.cos_cname}</TableRowColumn>
        </TableRow>
      )

    this.setState({
      itemList: NewItemList,
      itemListRows,
      orderBy,
    })
  }

  handleRowClick = (rowIndex) => {
    this.props.parentFunction(this.state.itemList[rowIndex])
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
              <TableHeaderColumn tooltip="學期">
                <div style={this.state.orderBy === 'sem' ? styles.headerB : styles.header}
                     onClick={() => this.orderList('sem')}>
                  學期{this.state.orderBy === 'sem' ? '↓' : ''}
                </div>
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="課程名稱">
                <div style={this.state.orderBy === 'name' ? styles.headerB : styles.header}
                     onClick={() => this.orderList('name')}>
                  課程名稱{this.state.orderBy === 'name' ? '↓' : ''}
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