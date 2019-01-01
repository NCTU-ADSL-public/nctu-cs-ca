import React from 'react'
import { connect } from 'react-redux'

class Footer extends React.Component {
  render () {
    return (
      <footer style={{backgroundColor: this.props.color, zIndex: 10}}>Copyright @2018 NCTUCS 交通大學資訊工程學系</footer>
    )
  }
}

const mapState = (state) => ({
  color: state.Student.User.FooterColor
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Footer)
