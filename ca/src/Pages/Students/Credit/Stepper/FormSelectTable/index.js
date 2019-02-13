import React, { Component } from 'react'
import {
  Table,
  TableBody,
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
        <TableBody>
          <TableRow selected={this.isSelected(0)}>
            <TableRowColumn>學分抵免</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(1)}>
            <TableRowColumn>課程免修</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(2)}>
            <TableRowColumn>
              本系必修課程抵免
              <div className='hidden-xs' style={{ color: 'red', display: 'inline' }}>(請於修習前提出申請)</div>
              <div className='visible-xs' style={{ color: 'red' }}>(請於修習前提出申請)</div>
            </TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(3)}>
            <TableRowColumn>
              英授專業課程抵免
              <div className='hidden-xs' style={{ color: 'red', display: 'inline' }}>(請於修習前提出申請)</div>
              <div className='visible-xs' style={{ color: 'red' }}>(請於修習前提出申請)</div>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
