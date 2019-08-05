import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


const styles = theme => ({
    
})

class Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    return (
        <div>Check</div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Check))