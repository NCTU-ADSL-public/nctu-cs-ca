import React from 'react'
import {Table} from 'react-bootstrap'

import './Table.css'

class CATable extends React.Component {

  render () {
    return (
      <Table responsive striped bsClass='ca-table table'>
        {this.props.children}
      </Table>
    )
  }
}

export default CATable
