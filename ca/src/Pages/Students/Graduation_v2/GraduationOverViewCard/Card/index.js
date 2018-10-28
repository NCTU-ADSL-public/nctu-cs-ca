import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../../Redux/Students/Actions/Professor/index'
import CourseList from './Components/CourseList'
import GeneralCourseList from './Components/GeneralCourseList'
import GeneralNewCourseList from './Components/GeneralNewCourseList'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'
import Dialog from '@material-ui/core/Dialog'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  },
  text: {
    fontSize: '20px'
  },
  textRwd: {
    fontSize: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  littletext: {
    fontSize: '15px'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#7c7c7c'
  },
  flex: {
    flex: 1
  },
  chip: {
    margin: '5px',
    fontSize: '18px'
  },
  progress: {
    backgroundColor: '#00a152'
  }
})

function Transition (props) {
  return <Grow {...props} />
}

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      open: false,
      expanded: true
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  handleChange () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { classes, rwd } = this.props
    if (this.props.data === undefined) return ''
    if (rwd) {
      return (
        <div>
          <div className='col-xs-6 col-sm-6 well'>
            <div style={{ fontSize: '0.8em' }} className='showcourseoverview' onClick={this.handleClickOpen}>{this.props.title}&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.complete}</font>/{this.props.require}&nbsp;學分<br /><AnimatedProgress value={this.props.value} /></div>
          </div>
          <Dialog
            anchor='right'
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
                  {this.props.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ padding: '15px' }}>
              {this.props.title === '通識(舊制)'
                ? <GeneralCourseList courses={this.props.data.course} rwd />
                : this.props.title === '通識(新制)'
                  ? <GeneralNewCourseList courses={this.props.data.course} overview={this.props.overview} rwd />
                  : <CourseList items={this.props.data.course} rwd />}
            </div>
          </Dialog>
        </div>
      )
    }
    return (
      <div className={classes.container}>
        <div className='row'>
          <ExpansionPanel expanded={this.state.expanded} onChange={this.handleChange}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className='hidden-xs hidden-sm col-md-3 col-lg-3' style={{ marginTop: '20px' }}>
                <LinearProgress classes={{ barColorPrimary: classes.progress }} variant='determinate' value={this.props.value > 100 ? 100 : this.props.value} color={this.props.value >= 100 ? 'primary' : 'secondary'} />
              </div>
              <div className='col-md-5 col-lg-5' style={{ marginLeft: '20px' }}>
                <div className={rwd ? classes.textRwd : classes.text}>
                  {this.props.title}&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.complete}</font>/{this.props.require}&nbsp;（{this.props.isMen ? '門' : '學分'}）&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.props.title === '通識(舊制)'
                ? <GeneralCourseList courses={this.props.data.course} title={this.props.title}/>
                : this.props.title === '通識(新制)'
                  ? <GeneralNewCourseList courses={this.props.data.course} overview={this.props.overview} title={this.props.title} />
                  : <CourseList items={this.props.data.course} title={this.props.title}/>}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: state.Student.Graduation.data.filter(t => t.title === ownProps.title)[0],
  overview: state.Student.Graduation.data.filter(t => t.title === ownProps.title)[0]
})

const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
