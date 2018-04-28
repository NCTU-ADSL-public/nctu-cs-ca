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
    width: 70,
    fontWeight: 500,
  },
  tabColumn1: {
    cursor: 'pointer',
    width: 300,
    color: '#848484',
    fontWeight: 200,
  },
  tabColumn2: {
    cursor: 'pointer',
    width: 60,
    fontWeight: 500,
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
    // tableLayout: 'auto',
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
      height: '500px',

      itemListRows: [],
      itemList: [],
    }

  }

  componentWillMount () {
    this.orderList()
  }

  componentDidMount () {
    window.setInterval( () => this.orderList(), 86400000)
  }

  componentDidUpdate (NextProp, NextState) {
    if (NextProp.items !== this.props.items) {
      this.orderList()
      if(this.state.itemList.length !== 0) this.handleRowClick(0)
    }
  }

  howMuchTimeAgo (time) {
    let ago = ( (Date.now() - new Date(time)) / 1000)
    if( ago < 60 ) return ( Math.floor(ago) + '秒前')
    ago /= 60
    if( ago < 60 ) return ( Math.floor(ago) + '分鐘前')
    ago /= 60
    if( ago < 24 ) return ( Math.floor(ago) + '小時前')
    ago /= 24
    if( ago < 7 ) return ( Math.floor(ago) + '天多前')
    ago /= 7
    if( ago < 4 ) return ( Math.floor(ago) + '週前左右')
    ago /= 4
    if( ago < 12 ) return ('大約' +  Math.floor(ago) + '個月前')
    return ('很久以前')
  }

  orderList () {
    console.log('YOYOYOYO')
    let NewItemList = []
    // sort list
    if (this.props.items) {
      NewItemList = [].concat(this.props.items)
        .sort((a, b) => {
            return b.send_time.localeCompare(a.send_time, 'zh-Hans-CN')
        })
    }
    // row items
    let itemListRows = NewItemList
      .map((row, i) =>{
        return (
          <TableRow key={i}>
            <TableRowColumn style={styles.tabColumn0}>{row.sender}</TableRowColumn>
            <TableRowColumn style={styles.tabColumn1}>{row.title}</TableRowColumn>
            <TableRowColumn style={styles.tabColumn2}>{this.howMuchTimeAgo(row.send_time)}</TableRowColumn>
          </TableRow>
        )}
      )

    this.setState({
      itemList: NewItemList,
      itemListRows,
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