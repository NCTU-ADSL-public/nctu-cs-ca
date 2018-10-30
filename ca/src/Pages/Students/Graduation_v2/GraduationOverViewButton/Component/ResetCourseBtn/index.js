import React from 'react'
import axios from 'axios'
// MUI
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
// REDUX
import { connect } from 'react-redux'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { fetchGraduationCourse } from '../../../../../../Redux/Students/Actions/Graduation'

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
  resetCourse () {
    console.log('============ ResetCourseBtn resetCourse ==============')
    axios.post('/students/graduate/reset', {
      student_id: this.props.studentIdcard.student_id
    }).then(res => {
      console.log('┌---- RESPONSE ----')
      console.log(res)
      console.log('└------------------')
      let inter = 250
      while (inter < 500000) {
        setTimeout(
          () => {
            console.log('----- fetchGraduationCourse! ----')
            this.props.fetchGraduationCourse()
          }, inter)
        inter *= 2
      }
    }).catch(err => {
      console.log(err)
    })
    console.log('===========================================')
  }
  render () {
    const { classes } = this.props
    return (
      <MenuItem className={classes.menuItem} onClick={() => this.resetCourse()}>
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
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
  fetchGraduationCourse: () => dispatch(fetchGraduationCourse())
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
