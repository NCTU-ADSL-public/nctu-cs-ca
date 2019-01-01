import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class AnimatedProgress extends React.Component {
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

  componentWillReceiveProps (nextProps) {
    this.setState({completed: nextProps.value})
  }

  progress (completed) {
    if (!isNaN(this.props.value)) this.setState({completed: Math.min(completed, this.props.value)})
    if (completed < this.props.value) {
      const diff = 1 * 10
      this.timer = setTimeout(() => this.progress(completed + diff), 200)
    }
  }

  render () {
    return (
      <MuiThemeProvider>
        <LinearProgress
          color={(this.state.completed >= 100) ? '#00AEAE' : '#d93a64'}
          mode='determinate'
          style={this.props.style}
          value={this.state.completed} />
      </MuiThemeProvider>
    )
  }
}
