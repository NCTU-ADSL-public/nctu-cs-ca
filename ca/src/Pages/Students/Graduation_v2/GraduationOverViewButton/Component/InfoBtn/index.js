import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Assignment from '@material-ui/icons/Assignment'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { connect } from 'react-redux'
import { fetchProfessors } from '../../../../../../Redux/Students/Actions/Professor'
import AnimatedProgress from '../../../../../../Components/AnimatedProgress'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

const limitcount = 7

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    marginBottom: '10px',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  tooltip: {
    fontSize: '12px'
  },
  flex: {
    flex: 1
  },
  appBar: {
    backgroundColor: '#7c7c7c',
    color: '#FFF'
  },
  button: {
    backgroundColor: '#7c7c7c',
    color: '#FFF'
  }
})

class Index extends React.Component {

  state={
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes, fullScreen } = this.props
    return (
      <div>
        {this.props.rwd
          ? <MenuItem onClick={this.handleClickOpen}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText inset primary={`寄送專題申請！`} />
          </MenuItem>
          : <Button onClick={this.handleClickOpen} variant='contained' color='default' className={classes.button} size='large' fullWidth>
            <Assignment className={classes.icon} />
             畢業預審資訊
          </Button>
        }
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          maxWidth={false}
          fullScreen={fullScreen}
        >
          <DialogTitle id='alert-dialog-slide-title' disableTypography>
            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography variant='title' color='inherit' className={classes.flex} style={{fontSize: '15px'}} >
                  畢業資訊
                </Typography>
                <Button style={{fontSize: '12px'}} color='inherit' onClick={this.handleClose} className='pull-right'>
                  離開
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className='dialog-content-height' style={{marginTop: '50px'}} >
            <div className='col-md-12'>
              <div className="green"> </div><div className="text">已通過</div>
              <div className="red"> </div><div  className="text">未通過</div>
              <div className="gray"> </div><div  className="text">未修課</div>
              <div className="yellow"> </div><div  className="text">未抵免課程</div>
              <div className="purple"> </div><div  className="text">免修或抵免課程</div>
              <div className="blue"> </div><div  className="text">當期課程</div>
            </div>
            <div className='col-md-12 well' style={{marginTop: '5px', clear: 'both'}}>
              <div>是否已考過英檢：</div>
              <div>畢業預審是否已送交助理審核：</div>
            </div>
            <div className="overview hidden-xs hidden-sm">
              <div className="overview-course col-md-4" >
                <div className="showcourseoverview">共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.compulsory}</font>/{this.props.overview.compulse_require}&nbsp;學分<br/><AnimatedProgress value={this.props.overview.compulsory/this.props.overview.compulse_require*100}/></div>
                <div className="showcourseoverview">服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.service}</font>/{this.props.overview.service_require}&nbsp;門<br/><AnimatedProgress value={this.props.overview.service/this.props.overview.service_require*100}/></div>
                <div className="showcourseoverview">英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.english}</font>/{this.props.overview.english_require}&nbsp;門<br/><AnimatedProgress value={this.props.overview.english/this.props.overview.english_require*100}/></div>
                <div className="showcourseoverview">其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.other}</font>/{this.props.overview.other_require}&nbsp;學分<br/><AnimatedProgress value={this.props.overview.other/this.props.overview.other_require*100}/></div>
              </div>
              <div className="overview-course col-md-4" >
                <div className="showcourseoverview">藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.art}</font>/{this.props.overview.art_require}&nbsp;門<br/><AnimatedProgress value={this.props.overview.art/this.props.overview.art_require*100}/></div>
                <div className="showcourseoverview">通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.general}</font>/{this.props.overview.general_require}&nbsp;學分<br/><AnimatedProgress value={this.props.overview.general/this.props.overview.general_require*100}/></div>
                <div className="showcourseoverview">體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.pe}</font>/{this.props.overview.pe_require}&nbsp;門<br/><AnimatedProgress value={this.props.overview.pe/this.props.overview.pe_require*100}/></div>
              </div>
              <div className="overview-course col-md-4" >
                <div className="showcourseoverview">外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;語&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.language}</font>/{this.props.overview.language_require}&nbsp;學分<br/><AnimatedProgress value={this.props.overview.language/this.props.overview.language_require*100}/></div>
                <div className="showcourseoverview">專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.props.overview.pro}</font>/{this.props.overview.pro_require}&nbsp;學分<br/><AnimatedProgress value={this.props.overview.pro/this.props.overview.pro_require*100}/></div>
                <div className="showcourseoverview">抵免研究所課程<font size={5} color='#338d68'>&nbsp;{this.props.overview.graduate}</font>&nbsp;學分<br/></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

function TransitionUp (props) {
  return <Slide {...props} direction='up' />
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.overview
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Index)))
