import React from 'react'
// import Button from '@material-ui/core/Button'
// import Dialog from '@material-ui/core/Dialog'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import SugCourse from './SugCourse'
// import SugCourseRwd from './SugCourse/others'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { withStyles } from '@material-ui/core/styles/index'
import { connect } from 'react-redux'
import { ShowCourseOrSug } from '../../../../../Redux/Students/Actions/Map'

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#5f9191'
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  },
  button: {
    background: '#7c7c7c',
    color: '#ffffff',
    fontSize: '0.8em'
  },
  flex: {
    flex: 1
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
})

class AlertDialog extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    //const { rwddisplay, rwd, fullScreen, classes } = this.props
    return (
      <div style={{ margin: '5px 0 5px 0' }}>
        {/*
        <Button variant='contained' color='default' className={classes.button} size='large' fullWidth onClick={rwd ? this.props.ShowCourseOrSug : this.handleClickOpen}>
          {rwd ? rwddisplay === 'map' ? '課程地圖' : '推薦選課' : '推薦選課'}
        </Button>
        {/*<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth={false}
        >
          <AppBar className={classes.appBar} >
            <Toolbar >
              <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                推薦選課(依據您過去修課，我們為您推薦以下課程)
              </Typography>
              <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleClose}>
                離開
              </Button>
            </Toolbar>
          </AppBar>
          {fullScreen ? <SugCourseRwd /> : <SugCourse />}
        </Dialog> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rwddisplay: state.Student.Map.rwddisplay
})
const mapDispatchToProps = (dispatch) => ({
  ShowCourseOrSug: () => dispatch(ShowCourseOrSug())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(AlertDialog)))
