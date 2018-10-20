import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/CheckBox'
import Dialog from '@material-ui/core/Dialog'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import PrintForm from '../PrintBtn/PrintForm'

const styles = theme => ({
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
        >
          <PrintForm
            profile={this.props.studentIdcard}
            graduationCheckEnglishTest={this.props.englishCheck}
            courseCategoryArray={this.props.reviewData}
          />
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  reviewData: state.Student.Graduation.printdata,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.englishCheck
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
