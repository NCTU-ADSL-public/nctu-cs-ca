import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import FilterSelect from '../FilterSelect'
import Note from '@material-ui/icons/FilterList'
import './index.css'

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
}

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class FullScreenDialog extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      open: false,
      ckeditorContent: ''
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  onChange (event) {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div>

        <Button fullWidth variant='contained' color='primary' onClick={this.handleClickOpen} className={classes.button}>
          <Note color='primary' />
          &nbsp;篩選項目
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
                篩選項目
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='rwd-filter-select'>
            <FilterSelect />
          </div>
        </Dialog>
      </div>
    )
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FullScreenDialog)
