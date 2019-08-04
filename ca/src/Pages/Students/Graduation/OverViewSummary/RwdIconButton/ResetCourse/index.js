
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import {
  actions,
  getGraduationInfo,
  resetCourse
} from '../../../../../../Redux/Students/Actions/Graduation'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit
  }
})

class Index extends React.Component {
  componentDidUpdate () {
    // 恢復成功後，重新拿課程資料並重置移動狀態
    if (this.props.success) {
      this.props.getGraduationInfo()
      this.props.resetCourseDone()
    }
  }

  handleClick () {
    this.props.resetCourse({
      student_id: this.props.studentIdcard.student_id
    })
  }

  render () {
    const { classes } = this.props
    return (
      <MenuItem onClick={() => this.handleClick()}>
        <ListItemIcon className={classes.icon}>
          <AutoRenewIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary='重置課程排列' />
      </MenuItem>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  success: state.Student.Graduation.resetCourse.success
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  resetCourse: (payload) => dispatch(resetCourse(payload)),
  resetCourseDone: () => dispatch(actions.graduation.resetCourse.setSuccess(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
