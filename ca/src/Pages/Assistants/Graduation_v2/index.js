import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import GraduationList from './GraduationList'

const styles = theme => ({
  container: {
    width: '70%',
    margin: '0 auto'
  }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

class index extends React.Component {

  render() {

    const { classes } = this.props

    return (
      <div className = { classes.container } >
        <GraduationList />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
