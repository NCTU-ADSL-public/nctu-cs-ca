import React from 'react'
import {Badge} from 'react-bootstrap'

let style = {
  borderRadius: '16px',
  fontSize: 14,
  height: '32px',
  lineHeight: '32px',
  fontWeight: 400,
  userSelect: 'none',
  margin: '6px',
  padding: '0px 12px',
  cursor: 'pointer'
}

class CABadge extends React.Component {
  render () {
    const color = this.props.color || '#fff'
    const bgColor = this.props.bgColor || '#777'
    style = {
      ...style,
      color: color,
      background: bgColor
    }
    return (
      <Badge style={style}>
        {this.props.children}
      </Badge>
    )
  }
}

export default CABadge
