import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PrintIcon from '@material-ui/icons/Print'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit * 2,
    width: '300px'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontSize: '40px',
    left: '33%',
    top: '15%',
    position: 'absolute',
    textAlign: 'center'
  }
})

class CircularStatic extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div >
        <div className={classes.text}>
          畢業<br />
          98/128
        </div>
        <CircularProgress
          className={classes.progress}
          variant='static'
          value={70}
          size={250}
        />
        <Button variant='contained' color='primary' className={classes.progress} size='large' fullWidth>
          <PrintIcon className={classes.icon} />
          列印
        </Button>
        <Button variant='contained' color='primary' className={classes.progress} size='large' fullWidth>
          <AssignmentIcon className={classes.icon} />
          傳送畢業預審給助理
        </Button>
        <Button variant='contained' color='primary' className={classes.progress} size='large' fullWidth>
          <EditIcon className={classes.icon} />
          編輯課程
        </Button>
      </div>
    )
  }
}

CircularStatic.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CircularStatic)
