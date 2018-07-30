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
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'


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
  },
  flex: {
    flex: 1,
  },
  chip: {
    margin: '5px',
    fontSize: '18px'
  },
  progress: {
    backgroundColor: '#00a152'
  }
})

function Transition(props) {
  return <Grow {...props} />
}

class Index extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  render () {
    const { classes, rwd } = this.props
    if(rwd){
      return(
        <div>
          <div className='col-xs-6 col-sm-6'>
            <Chip
              avatar={<Avatar>{this.props.title[0]}</Avatar>}
              label={this.props.title}
              className={classes.chip}
              onClick={this.handleClickOpen}
            />
          </div>
          <Drawer
            anchor="top"
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Sound
                </Typography>
                <Button color="inherit" onClick={this.handleClose}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <div style={{}}>
            {this.props.title === '英文授課' ? '' : <CourseList items={this.props.data.course} />}
            </div>
          </Drawer>
        </div>
      )
    }
    return (
      <div className={classes.container}>
        <div className='row'>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className='hidden-xs hidden-sm col-md-3 col-lg-3' style={{ marginTop: '10px'}}>
                <LinearProgress classes={{barColorPrimary:classes.progress}} variant='determinate' value={this.props.value > 100 ? 100 : this.props.value} color={this.props.value >= 100 ? 'primary' : 'secondary'} />
              </div>
              <div className='col-md-5 col-lg-5' style={{marginLeft: '20px'}}>
                <div className={rwd ? classes.textRwd : classes.text}>
                  {this.props.title}（{this.props.isMen ? '門' : '學分'}）&nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <div className='col-md-1 col-lg-1'>
                <font color='#228b22' className={rwd ? classes.textRwd : classes.text}>{this.props.complete}</font>
              </div>
              <div className='col-md-2 col-lg-2'>
                <div className={classes.littletext}>/{this.props.require}</div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.props.title === '英文授課' ? '' : <CourseList items={this.props.data.course} />}
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
  data: state.all.data.filter(t => t.title === ownProps.title)[0]
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps)(withStyles(styles)(Index))
