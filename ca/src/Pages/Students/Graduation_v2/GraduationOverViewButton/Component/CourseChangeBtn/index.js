import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { withStyles } from '@material-ui/core/styles/index'
import Trello from './Trello'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#3db586'
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  },
  button: {
    background: '#7c7c7c',
    color: '#ffffff',
    fontSize: '0.8em'
  },
  flex: {
    flex: 1
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
})

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
      <div style={{ margin: '5px 0 5px 0' }}>

        <MenuItem className={classes.menuItem} onClick={this.handleClickOpen} disabled>
          <ListItemIcon className={classes.icon} >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary='課程排序' />
        </MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth={false}
          fullWidth={fullScreen}
        >
          <AppBar className={classes.appBar} >
            <Toolbar >
              <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                課程排序
              </Typography>
              <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleClose}>
                離開
              </Button>
            </Toolbar>
          </AppBar>
          <MuiThemeProvider>
            <Trello />
          </MuiThemeProvider>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(withMobileDialog()(AlertDialog))
