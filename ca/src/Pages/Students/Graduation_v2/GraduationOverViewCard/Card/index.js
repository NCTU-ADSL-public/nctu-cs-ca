import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  container: {
    margin: '1%',
    width: '60%'
  },
  text: {
    fontSize: '20px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

class LinearDeterminate extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className='row'>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className='col-md-1.5 col-lg-1.5' style={{marginLeft: '20px'}}>
                <div className={classes.text}>
                  {this.props.title}&nbsp;&nbsp;&nbsp;
                  {this.props.complete}/{this.props.require}
                </div>
              </div>
              <div className='col-md-3 col-lg-3' style={{color: '#00a152'}}>
                <LinearProgress variant='determinate' value={this.props.value} />
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </div>
      </div>
    )
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinearDeterminate)
