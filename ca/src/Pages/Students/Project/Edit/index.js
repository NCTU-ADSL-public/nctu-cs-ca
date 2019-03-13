import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import firebase from 'firebase'
import Form from '../Form'
import {
  editProject,
  storeProjectsImage,
  storeProjectsFile,
  storeProjectsIntro
} from '../../../../Redux/Students/Actions/Project'

let storageRef = firebase.storage().ref()

const styles = {
  appBar: {
    position: 'relative',
    background: '#795548'
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  },
  flex: {
    flex: 1,
    fontSize: '15px'
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
}

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      open: false,
      image: '',
      file: '',
      new_title: this.props.project.research_title, // 學生不能改題目
      new_intro: ''
    }
    this.imageRef = React.createRef()
    this.fileRef = React.createRef()
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  handleSubmit (event) {
    let _this = this
    const { project } = this.props
    event.preventDefault()

    this.props.editProject({
      student_id: this.props.studentProfile.student_id,
      tname: project.tname,
      semester: project.semester,
      first_second: project.first_second,
      research_title: project.research_title,
      new_title: project.research_title, // 學生不能改題目
      new_intro: this.state.new_intro
    })

    // 重新上傳圖片
    if (this.state.image) {
      let directory = `${project.semester}/${project.tname}/${project.research_title}/image/`
      storageRef
        .child(directory)
        .delete()
        .then(function () {})
        .catch((error) => console.log(error))

      let uploadTask = storageRef.child(directory + 'image.jpg').put(this.state.image)
      uploadTask.on(
        'state_changed',
        function (snapshot) {
          _this.props.storeImage('loading', project.research_title, project.semester)
        },
        function (error) {
          console.log(error)
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log(downloadURL)
            _this.props.storeImage(downloadURL, project.research_title, project.semester)
          })
        }
      )
    }

    // 重新上傳檔案
    if (this.state.file) {
      let directory = `${project.semester}/${project.tname}/${project.research_title}/file/`
      storageRef
        .child(directory)
        .delete()
        .then(function () {})
        .catch((error) => console.log(error))

      let uploadTask = storageRef.child(directory + 'file.pdf').put(this.state.file)
      uploadTask.on(
        'state_changed',
        function (snapshot) {
          _this.props.storeFile('loading', project.research_title, project.semester)
        },
        function (error) {
          console.log(error)
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            _this.props.storeFile(downloadURL, project.research_title, project.semester)
          })
        }
      )
    }
  }

  render () {
    const { fullScreen, classes } = this.props
    return (
      <div>
        <Button
          onClick={this.handleDialogOpen}
          style={{ fontSize: '12px' }}
          color='inherit'
        >
          編輯
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullScreen={fullScreen}
          maxWidth={false}
          fullWidth
        >
          <DialogTitle id='alert-dialog-title' style={{ background: '#5D4037', padding: '0' }}>
            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography variant='title' color='inherit' className={classes.flex}>
                  編輯專題主頁
                </Typography>
                <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleDialogClose}>
                  取消
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            <Form
              {...this.state}
              project={this.props.project}
              updateImage={(image) => this.setState({ image })}
              updateFile={(file) => this.setState({ file })}
              updateIntro={(intro) => this.setState({ new_intro: intro })}
              imageRef={this.imageRef}
              fileRef={this.fileRef}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  studentProfile: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  editProject: (payload) => dispatch(editProject(payload)),
  storeImage: (image) => dispatch(storeProjectsImage(image, ownProps.project.research_title, ownProps.project.semester)),
  storeFile: (file) => dispatch(storeProjectsFile(file, ownProps.project.research_title, ownProps.project.semester)),
  storeIntro: (intro) => dispatch(storeProjectsIntro(intro, ownProps.project.research_title, ownProps.project.semester))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Edit)))
