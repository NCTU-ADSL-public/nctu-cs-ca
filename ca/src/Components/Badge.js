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
  constructor (props) {
    super(props)
    this.state = {
      toggled: true
    }
  }

  toggle = () => {
    const newValue = !this.state.toggled
    this.setState({
      toggled: newValue
    })
    if (this.props.onToggle)
      this.props.onToggle(newValue)
  }

  render () {
    const color = this.props.color || '#fff'
    const bgColor = this.props.bgColor || '#777'
    style = {
      ...style,
      color: color,
      background: this.state.toggled ? bgColor : '#CCC'
    }
    return (
      <Badge style={style} onClick={this.toggle}>
        {this.props.children}
      </Badge>
    )
  }
}

export default CABadge
