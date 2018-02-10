import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../../../node_modules/animate.css/animate.css'

const ThisStyle = {
}

export default class IndividualProgress extends React.Component {
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
    this.setState({completed: nextProps.grad})
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

  render () {
    if (this.state.completed >= 100) {
      return (
        <div className='animated'>
          <MuiThemeProvider>
            <LinearProgress
              color={'#00AEAE'}
              mode='determinate'
              style={ThisStyle}
              value={this.state.completed} />
          </MuiThemeProvider>
        </div>
      )
    } else {
      return (
        <MuiThemeProvider>
          <LinearProgress
            color='#d93a64'
            mode='determinate'
            style={ThisStyle}
            value={this.state.completed} />
        </MuiThemeProvider>
      )
    }
  }
}
