
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
import List from '@material-ui/icons/List'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ProjectCard from './projectCard'
import { getPastProjects } from '../../../../../Redux/Students/Actions/Professor'

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

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = { open: false }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  componentDidMount () {
    this.props.getPastProjects({
      teacher_id: this.props.profile.teacher_id
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        {
          this.props.rwd
            ? <MenuItem className={classes.menuItem} onClick={this.handleDialogOpen}>
              <ListItemIcon className={classes.icon}>
                <List />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='查看教授指導專題' />
            </MenuItem>
            : <Tooltip title='查看教授指導專題' placement='top' classes={{ tooltip: classes.tooltip }}>
              <IconButton
                onClick={this.handleDialogOpen}
                aria-expanded={this.state.expanded}
                aria-label='Show more'
              >
                <List />
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
                查看教授指導專題
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='container'>
            {
              this.props.pastProjects.map((research, index) => (
                <ProjectCard data={research} profile={this.props.profile} key={index} />
              ))
            }
          </div>
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  pastProjects: state.Student.Professor.past_projects
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getPastProjects: (payload) => dispatch(getPastProjects(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
