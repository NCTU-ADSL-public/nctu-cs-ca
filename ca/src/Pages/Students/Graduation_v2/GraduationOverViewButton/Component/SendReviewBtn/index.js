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
import Select from '@material-ui/core/Select'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import PrintForm from '../PrintBtn/PrintForm'
import { reviewSubmit } from '../../../../../../Redux/Students/Actions/Graduation/'

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#3db586'
  },
  flex: {
    flex: 1
  },
  select: {
    fontSize: 20
  },
  button: {
    margin: '20px 0 20px 0',
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      open: false,
      generalCourse: {
        type: 0
      }
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

  handleChange (e) {
    this.setState({
      generalCourse: {
        type: e.target.value
      }
    })
  }

  handleSubmit () {
    if (window.confirm('確定送出預審嗎?')) {
      this.props.reviewSubmit({
        general_course: {
          type: this.state.generalCourse.type
        }
      })
      this.handleClose()
    }
  }

  render () {
    const { classes } = this.props
    console.log(this.props.reviewData)
    return (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleOpen}>
          <ListItemIcon className={classes.icon}>
            <CheckIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary='送出預審' />
        </MenuItem>
        <Dialog
          fullScreen={this.props.fullScreen}
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
            <form className='text-center' style={{ marginTop: '30px', fontSize: '20px' }}>
              <label style={{ marginRight: '10px' }}>請選擇採用的通識制度</label>
              <Select
                native
                disabled={this.props.reviewCheck !== 0}
                className={classes.select}
                value={this.state.generalCourse.type}
                onChange={this.handleChange}
              >
                <option value={0}>舊制</option>
                <option value={1}>新制</option>
              </Select>
              <br />
              <Button
                disabled={this.props.reviewCheck !== 0}
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={this.handleSubmit}
              >
                確認送出
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  reviewData: state.Student.Graduation.data,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.englishCheck,
  reviewCheck: state.Student.Graduation.check
})

const mapDispatchToProps = (dispatch) => ({
  reviewSubmit: (payload) => dispatch(reviewSubmit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
