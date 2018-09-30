import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Edit from './index'
import { updateProject } from '../../../../../Redux/Students/Actions/ProjectList'
import { connect } from 'react-redux'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'

const styles = {
  appBar: {
    position: 'relative',
    background: '#795548'
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  },
  flex: {
    flex: 1
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
}

class AlertDialog extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    const { fullScreen, classes } = this.props
    return (
      <div>
        <Button onClick={this.handleClickOpen} style={{ fontSize: '12px' }} color='inherit'>編輯</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullScreen={fullScreen}
          maxWidth={false}
          fullWidth
        >
          <DialogTitle id='alert-dialog-title' style={{ background: '#5D4037', padding: '0' }}>

            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                  編輯專題主頁
                </Typography>
                <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleClose}>
                  取消
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            <Edit project={this.props.project} onClose={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  update_project: (intro) => dispatch(updateProject(intro, ownProps.data.research_title, ownProps.data.semester))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(AlertDialog)))
