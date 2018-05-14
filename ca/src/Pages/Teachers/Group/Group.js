import React from 'react'

import GroupList from './GroupList'
import GroupApply from './GroupApply'

class Group extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <GroupApply idCard={this.props.idCard} />
        <GroupList idCard={this.props.idCard} />
      </div>
    )
  }
}
export default Group
