import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  container: {
    margin: '3%'
  }
}

class LinearDeterminate extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className='row graduation-overview-card'>
          <div className='col-md-1.5 col-lg-1.5' style={{marginLeft: '20px'}}>
            {this.props.title}&nbsp;&nbsp;&nbsp;
            {this.props.complete}/{this.props.require}
          </div>
          <div className='col-md-6 col-lg-6' style={{color: '#00a152'}}>
            <LinearProgress variant='determinate' value={this.props.value} />
          </div>
        </div>
      </div>
    )
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinearDeterminate)
