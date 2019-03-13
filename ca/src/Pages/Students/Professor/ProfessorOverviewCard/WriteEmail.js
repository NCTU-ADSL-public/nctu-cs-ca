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
import Button from '@material-ui/core/Button'
import axios from 'axios/index'

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  tooltip: {
    fontSize: '12px'
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
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.state = {
      open: false,
      ckeditorContent: '',
      title: ''
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

  handleTitleChange (event) {
    this.setState({
      title: event.target.value
    })
  }

  handleSend () {
    if (this.state.title === '') {
      window.alert('主旨請勿留白！')
      return
    }
    let r = window.confirm('確定寄出？')
    if (!r) return
    let _this = this
    let dt = new Date()
    let time = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + '  ' + dt.getHours() + ':' + dt.getMinutes()
    axios.post('/students/mail/sendtoteacher', {
      title: _this.state.title,
      content: _this.state.ckeditorContent,
      time: time,
      sender_email: _this.props.studentIdcard.email,
      receiver_email: _this.props.profile.email,
      teacher: _this.props.profile.tname,
      name: _this.props.studentIdcard.sname,
      id: _this.props.studentIdcard.student_id
    })
      .then(res => {
        this.handleClose()
      })
      .catch(err => {
        window.alert('寄送失敗！請檢查連線並再送出去一次')
        console.log(err)
      })
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        {this.props.rwd
          ? <MenuItem className={classes.menuItem} onClick={this.handleClickOpen}>
            <ListItemIcon className={classes.icon}>
              <Email />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary='Send Email!' />
          </MenuItem>
          : <Tooltip title='Send email to professor!' placement='top' classes={{ tooltip: classes.tooltip }}>
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
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
                寄信（信件將會寄送至教授交大信箱）
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='container'>
            <TextField
              id='full-width'
              label='主旨'
              InputLabelProps={{
                shrink: true
              }}
              placeholder='請勿留白'
              fullWidth
              margin='normal'
              className='write-email-title'
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <div style={{ height: '20px' }} />
            <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{ 'change': this.onChange }} />
            <div className='pull-right'>
              <Button variant='contained' color='primary' onClick={this.handleSend}>
                寄出！
              </Button>
            </div>
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
