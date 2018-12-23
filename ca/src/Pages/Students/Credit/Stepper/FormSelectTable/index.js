import React, {Component} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class TableExampleControlled extends Component {
  constructor (props) {
    super(props)
    this.isSelected = this.isSelected.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.state = {
      selected: []
    }
  }

  isSelected (index) {
    return this.state.selected.indexOf(index) !== -1
  }

  handleRowSelection (selectedRows) {
    this.setState({
      selected: selectedRows
    })
    if (selectedRows[0] !== undefined) {
      // due to table lifecycle terminate, selectedRows[0] will become undefined
      this.props.selectCreditForm(selectedRows[0])
    }
  }

  render () {
    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>選擇表單內容</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow selected={this.isSelected(0)}>
            <TableRowColumn>必修課程未通過外系抵免</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(1)}>
            <TableRowColumn>轉系生抵免</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(2)}>
            <TableRowColumn>外系英文授課抵免</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
