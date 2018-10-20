import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/CheckBox'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import PrintForm from '../PrintBtn/PrintForm'

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#3db586'
  },
  flex: {
    flex: 1
  },
  button: {
    margin: '20px 0 20px 0',
    background: '#7c7c7c',
    color: '#ffffff'
  },
  icon: {
    marginRight: theme.spacing.unit
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false
    }
  }

  handleOpen () {
    this.setState({
      open: true
    })
  }

  handleClose () {
    this.setState({
      open: false
    })
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleOpen}>
          <ListItemIcon className={classes.icon}>
            <CheckIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary='送出預審' />
        </MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth='md'
        >
          <AppBar className={classes.appBar}>
            <Toolbar >
              <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                確認審查資料
              </Typography>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br />
          <DialogContent>
            <PrintForm
              profile={this.props.studentIdcard}
              graduationCheckEnglishTest={this.props.englishCheck}
              courseCategoryArray={this.props.reviewData}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  reviewData: state.Student.Graduation.data,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.englishCheck
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
