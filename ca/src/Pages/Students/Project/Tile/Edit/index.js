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
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Form from './Form/index'
import { base64encode } from '../../../../../Utilities'
import {
  editProject,
  storeProjectsImage,
  storeProjectsFile,
  changeProjectProfessor
} from '../../../../../Redux/Students/Actions/Project/index'

const ITEM_HEIGHT = 48

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
    this.handleChangeProfessor = this.handleChangeProfessor.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.updateImage = this.updateImage(this)
    this.updateFile = this.updateFile(this)
    this.state = {
      open: false,
      image: '',
      file: '',
      new_title: this.props.project.research_title, // 學生不能改題目
      new_intro: this.props.project.intro,
      anchorEl: null
    }
    this.imageRef = React.createRef()
    this.fileRef = React.createRef()
  }

  handleChangeProfessor () {
    let id = this.props.studentProfile.student_id
    let replacePro = (this.props.project.replace_pro === 1 ? 0 : 1)
    if (replacePro && window.confirm('按確定以傳送通知給老師，如老師同意更換專題將可以重新申請專題。')) {
      this.props.changeProjectProfessor(id)
    }
    if (!replacePro && window.confirm('按確定以收回專題更換申請。')) {
      this.props.changeProjectProfessor(id)
    }
  }
  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
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
    }, () => this.handleDialogClose())

    // this.props.storeImage(this.state.image)
    // this.props.storeFile(this.state.file)

    base64encode(this.state.image)
      .then(encoded => {
        _this.props.storeImage(encoded)
        _this.setState({ image: encoded })
      })
      .catch(err => console.log(err))

    base64encode(this.state.file)
      .then(encoded => {
        _this.props.storeFile(encoded)
        _this.setState({ file: encoded })
      })
      .catch(err => console.log(err))
    // 重新上傳圖片
    // if (this.state.image) {
    //   let directory = `${project.semester}/${project.tname}/${project.research_title}/image/`
    //   storageRef
    //     .child(directory)
    //     .delete()
    //     .then(function () {})
    //     .catch((error) => console.log(error))

    //   let uploadTask = storageRef.child(directory + 'image.jpg').put(this.state.image)
    //   uploadTask.on(
    //     'state_changed',
    //     function (snapshot) {
    //       _this.props.storeImage('loading', project.research_title, project.semester)
    //     },
    //     function (error) {
    //       console.log(error)
    //     },
    //     function () {
    //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //         console.log(downloadURL)
    //         _this.props.storeImage(downloadURL, project.research_title, project.semester)
    //       })
    //     }
    //   )
    // }

    // 重新上傳檔案
    // if (this.state.file) {
    //   let directory = `${project.semester}/${project.tname}/${project.research_title}/file/`
    //   storageRef
    //     .child(directory)
    //     .delete()
    //     .then(function () {})
    //     .catch((error) => console.log(error))

    //   let uploadTask = storageRef.child(directory + 'file.pdf').put(this.state.file)
    //   uploadTask.on(
    //     'state_changed',
    //     function (snapshot) {
    //       _this.props.storeFile('loading', project.research_title, project.semester)
    //     },
    //     function (error) {
    //       console.log(error)
    //     },
    //     function () {
    //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //         _this.props.storeFile(downloadURL, project.research_title, project.semester)
    //       })
    //     }
    //   )
    // }
  }
  updateImage (file) {
    let _this = this
    base64encode(file)
      .then(encoded => {
        _this.props.storeImage(encoded)
        _this.setState({ image: encoded })
      })
      .catch(err => console.log(err))
  }

  updateFile (file) {
    let _this = this
    base64encode(file)
      .then(encoded => {
        _this.storeFile(encoded)
        _this.setState({ file: encoded })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { fullScreen, classes } = this.props
    const { anchorEl } = this.state
    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
          style={{color: 'white'}}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
              fontSize: '20px'
            }
          }}
        >
          <MenuItem
            style={{ fontSize: '20px' }}
            onClick={this.handleChangeProfessor}>
            <ListItemText inset primary={this.props.project.replace_pro === 1 ? '收回申請更換教授' : '申請更換教授'} />
          </MenuItem>
          <MenuItem
            onClick={this.handleDialogOpen}>
            <ListItemText style={{ fontSize: '12px' }} inset primary={'編輯'} />
          </MenuItem>
          {/*<Button*/}
            {/*style={{ fontSize: '12px', width: '80px' }}*/}
            {/*color='inherit'*/}
            {/*>*/}
            {/**/}
          {/*</Button>*/}
          {/*<Button*/}
            {/*onClick={this.handleDialogOpen}*/}
            {/*style={{ fontSize: '12px' }}*/}
            {/*color='inherit'*/}
          {/*>*/}
            {/*編輯*/}
          {/*</Button>*/}
        </Menu>

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
              handleSubmit={(e) => this.handleSubmit(e)}
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
  editProject: (payload, handleClose) => dispatch(editProject(payload, handleClose)),
  storeImage: (image) => dispatch(storeProjectsImage(image, ownProps.project.research_title, ownProps.project.semester)),
  storeFile: (file) => dispatch(storeProjectsFile(file, ownProps.project.research_title, ownProps.project.semester)),
  changeProjectProfessor: (id, replace_pro) => dispatch(changeProjectProfessor({
    student_id: id,
    semester: ownProps.project.semester,
    research_title: ownProps.project.research_title,
    replace_pro: ownProps.project.replace_pro === 1 ? 0 : 1,
    tname: ownProps.project.tname
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Edit)))
