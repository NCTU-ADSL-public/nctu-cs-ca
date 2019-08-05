
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PrintIcon from '@material-ui/icons/Print'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'

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
  printGradTable (fileName) {
    let original = document.title
    if (fileName !== null) { document.title = fileName }
    window.print()
    document.title = original
    return true
  }

  render () {
    const { classes, rwd } = this.props
    const sid = this.props.studentIdcard.student_id
    if (rwd) {
      return (
        <MenuItem onClick={() => this.printGradTable('105學年度畢業預審表-' + sid)}>
          <ListItemIcon className={classes.icon}>
            <PrintIcon />
          </ListItemIcon>
          <ListItemText inset primary='列印預審文件' />
        </MenuItem>
      )
    }
    return (
      <div>
        <Button
          variant='contained'
          color='default'
          className={classes.button}
          size='large'
          fullWidth
          onClick={() => this.printGradTable('105學年度畢業預審表-' + sid)}
        >
          <PrintIcon className={classes.icon} />
          列印預審文件
        </Button>
      </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
