import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const ThisStyle = {
  float: 'left',
  transform: 'rotate(-90deg)'
}

export default class OverCircularProgress extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      completed: 0
    }
  }

  componentDidMount () {
    this.timer = setTimeout(() => this.progress(2), 100)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  progress (completed) {
    if (completed > this.props.grad) {
      this.setState({completed: this.props.grad})
    } else {
      this.setState({completed})
      const diff = 1 * 10
      this.timer = setTimeout(() => this.progress(completed + diff), 200)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({completed: nextProps.grad})
  }
  render () {
    return (
      <MuiThemeProvider>
        <CircularProgress
          mode='determinate'
          size={150}
          color={this.state.completed >= 100 ? '#00AEAE' : '#d93a64'}
          style={ThisStyle}
          thickness={7}
          value={this.state.completed}
        />
      </MuiThemeProvider>
    )
  }
}
