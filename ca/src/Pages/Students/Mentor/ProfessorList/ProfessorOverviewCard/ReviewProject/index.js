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
import List from '@material-ui/icons/List'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FakeData from './FakeData'
import Card from './Card'
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

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false,
      data: FakeData
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  componentDidMount () {
    axios.post('/students/project/ResearchInfoOfPro', {
      teacher_id: this.props.profile.teacher_id
    })
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
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
              <List />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary='查看教授過去專題' />
          </MenuItem>
          : <Tooltip title='查看教授過去專題' placement='top' classes={{ tooltip: classes.tooltip }}>
            <IconButton
              onClick={this.handleClickOpen}
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
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
                查看教授專題
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='container'>
            {
              this.state.data.map(t =>
                <Card data={t} profile={this.props.profile} key={t.research_title} />)
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

export default withStyles(styles)(Index)
