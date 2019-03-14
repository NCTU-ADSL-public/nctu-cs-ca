
import React from 'react'
import { connect } from 'react-redux'
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
import { sendMailToProfessor, setMailStatus } from '../../../../Redux/Students/Actions/Professor'
import { getTimestamp } from '../../../../Utilities'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

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
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.state = {
      open: false,
      content: '',
      title: ''
    }
  }

  componentDidUpdate () {
    if (this.props.status === FETCHING_STATUS.DONE) {
      this.props.sendMailReset()
      this.handleDialogClose()
    }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  onChange (property, value) {
    this.setState({
      [property]: value
    })
  }

  handleSend () {
    if (!this.state.title) {
      window.alert('主旨請勿留白！')
      return
    }

    if (window.confirm('確定寄出？')) {
      this.props.sendMail({
        title: this.state.title,
        content: this.state.content,
        time: getTimestamp(),
        sender_email: this.props.studentIdcard.email,
        receiver_email: this.props.profile.email,
        teacher: this.props.profile.tname,
        name: this.props.studentIdcard.sname,
        id: this.props.studentIdcard.student_id
      })
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        {
          this.props.rwd
            ? <MenuItem className={classes.menuItem} onClick={this.handleDialogOpen}>
              <ListItemIcon className={classes.icon}>
                <Email />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='Send Email!' />
            </MenuItem>
            : <Tooltip title='Send email to professor!' placement='top' classes={{ tooltip: classes.tooltip }}>
              <IconButton
                onClick={this.handleDialogOpen}
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
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color='inherit' onClick={this.handleDialogClose} aria-label='Close'>
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
              onChange={(e) => this.onChange('title', e.target.value)}
              value={this.state.title}
            />
            <div style={{ height: '20px' }} />
            <CKEditor
              activeClass='p10'
              content={this.state.content}
              events={{ change: (e) => this.onChange('content', e.editor.getData()) }}
            />
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

const mapStateToProps = (state) => ({
  status: state.Student.Professor.status_mail
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMail: (payload) => dispatch(sendMailToProfessor(payload)),
  sendMailReset: () => dispatch(setMailStatus(FETCHING_STATUS.IDLE))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FullScreenDialog))
