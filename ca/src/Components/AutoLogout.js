import React from 'react'

const AutoLogout = WrappedClass =>
  class extends React.Component {
    constructor (props) {
      super(props)
      this.events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress'
      ]
      this.state = {
        logoutTime: 1000 * 60 * 15 // auto logout after do nothing 15 min
      }
      this.setTimer = this.setTimer.bind(this)
      this.clearTimer = this.clearTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
    componentDidMount () {
      if (window.location.pathname !== '/' && window.location.pathname !== '/logout') {
        this.events.forEach(
          event => window.addEventListener(event, this.resetTimer)
        )
        this.setTimer()
      }
    }
    setTimer () {
      this.timer = setTimeout(this.logout, this.state.logoutTime)
    }
    clearTimer () {
      clearTimeout(this.timer)
    }
    resetTimer () {
      this.clearTimer()
      this.setTimer()
    }

    logout () {
      window.location.assign('/logout')
    }
    render () {
      return (
        <WrappedClass {...this.props} />
      )
    }
  }

export default AutoLogout
