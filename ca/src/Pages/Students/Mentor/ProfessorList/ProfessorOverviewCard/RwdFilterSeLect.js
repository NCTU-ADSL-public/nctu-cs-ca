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
import Tooltip from '@material-ui/core/Tooltip'
import Email from '@material-ui/icons/Email'
import CKEditor from 'react-ckeditor-component'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    ckeditorContent:''
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  onChange = (event) => {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.rwd
          ?
          <MenuItem className={classes.menuItem} onClick={this.handleClickOpen}>
            <ListItemIcon className={classes.icon}>
              <Email />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Send Email!" />
          </MenuItem>
          :
          <Tooltip title='Send email to professor!' placement='top' classes={classes.tooltip}>
            <IconButton
              onClick={this.handleClickOpen}
              aria-expanded={this.state.expanded}
              aria-label='Show more'
            >
              <Email />
            </IconButton>
          </Tooltip>
        }
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                寄信
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='container'>
            <TextField
              id="full-width"
              label="主旨"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="請勿留白"
              fullWidth
              margin="normal"
              className='write-email-title'
            />
            <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
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
