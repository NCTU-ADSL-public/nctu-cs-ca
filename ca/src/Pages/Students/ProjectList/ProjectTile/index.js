import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Show from './Show_v2'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import { GridTile } from 'material-ui/GridList'
import img from '../Imgae/1.jpg'
import img2 from '../Imgae/2.jpg'
import img3 from '../Imgae/rejection.jpg'
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { storeProjectsImage, storeProjectsFile } from '../../../../Redux/Students/Actions/ProjectList'
import axios from 'axios/index'
import Edit from './Edit/Edit'

let config = {
  apiKey: 'AIzaSyC64Eitf77FqUAMjjPaG1_rk3Sr6pyttoo',
  authDomain: 'code-86ba4.firebaseapp.com',
  databaseURL: 'https://code-86ba4.firebaseio.com',
  projectId: 'code-86ba4',
  storageBucket: 'code-86ba4.appspot.com',
  messagingSenderId: '354539568437'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
let storageRef = firebase.storage().ref()

const styles = {
  appBar: {
    position: 'relative',
    background: '#5D4037',
  },
  progress: {
    position: 'relative',
    color: '#5D4037',
  },
  flex: {
    flex: 1,
  },
  titleStyle: {
    paddingTop: '1',
    color: '#fff',
    align: 'center'
  }
}

function Transition(props) {
  return <Grow {...props} />;
}

class Index extends React.Component {

  constructor (props) {
    super(props)
    this.fetchImage()
    this.state = {
      open: false,
    }
    this.deleteData = this.deleteData.bind(this)
  }

  fetchImage = () => {
    if(this.props.data.image !== undefined && this.props.data.file !== undefined)return
    let directory = this.props.data.semester + '/' + this.props.data.tname + '/' + this.props.data.research_title + '/image/image.jpg'
    console.log(directory)
    let pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      this.props.store_image(url)
    }).catch(error => {
      console.log(error)
      this.props.store_image('')
    })
    directory = this.props.data.semester + '/' + this.props.data.tname + '/' + this.props.data.research_title + '/file/file.pdf'
    pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      this.props.store_file(url)
    }).catch(error => {
      console.log(error)
      this.props.store_file('')
    })
  }

  deleteData (data)  {
    if (window.confirm('如已知會過隊友再按確定。')) {
      axios.post('/students/formDelete', {
        research_title: data.research_title,
        tname: data.tname,
        first_second: data.first_second,
        semester: data.semester
      })
        .then(res => {
          window.location.reload()
        })
        .catch(err => {
          window.confirm('網路連線失敗，請檢查連線後再按一次')
          console.log(err)
        })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  getString = (status) => {
    if(status === '3'){
      return (
        <div className='container' style={{marginTop: '10px', height: '300px'}}>
          很遺憾您的專題申請已被拒絕，知會隊友後請按左上角刪除已撤銷表單資料，謝謝！
        </div>
      )
    }
    return (
      <div className='container' style={{marginTop: '10px', height: '300px'}}>
        如要收回申請請點選左上方收回鍵，欲收回前請先告知隊友！
      </div>
    )
  }

  getImage = () => {
    if(this.props.data.agree === '1' || this.props.data.agree === undefined){
      if(this.props.data.photo === '')return img
      return this.props.data.photo
    }
    if(this.props.data.agree === '3')return img3
    return img2
  }

  render() {
    const { classes, rwd } = this.props
    return (
      <div>
        <div className='col-xs-1' />
        <GridTile
          cols={1}
          rows={1}
          title={this.props.data.research_title}
          titleStyle={styles.titleStyle}
          titleBackground='linear-gradient(to top, rgba(62,39,35,0.7) 70%,rgba(62,39,35,0.3) 80%,rgba(62,39,35,0) 100%)'
          style={{height: rwd?'162px':'270px', width: rwd?'288px':'480px', cursor: 'pointer', animationDuration: '1.5s', animationIterationCount: '1'}}
          className={`col-xs-10 col-sm-10 col-md-6 animated bounceIn`}
          onClick={this.handleClickOpen}
        >
          {(this.props.data.photo === undefined || this.props.data.photo === 'loading')
          ? <CircularProgress className={classes.progress}/>
          : <img className='img-responsive' src={ this.getImage() } /> }
          </GridTile>
        <Dialog
          fullScreen={this.props.data.agree === '1' || this.props.data.agree === undefined}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar} >
            <Toolbar >
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex} style={{fontSize: '15px'}} >
                {this.props.data.research_title}
              </Typography>
              {(this.props.data.agree === '1'|| this.props.data.agree === undefined)
                ?<Edit project={this.props.data}/>
                :<Button style={{fontSize: '12px'}} color="inherit" onClick={(this.props.data.agree === '1'|| this.props.data.agree === undefined)?this.handleClose:()=>this.deleteData(this.props.data)}>
                  {this.props.data.agree === '3'?'刪除':'收回'}
                </Button>}
            </Toolbar>
          </AppBar>
          {(this.props.data.agree === '1'|| this.props.data.agree === undefined)
            ? <Show file={this.props.data.file} image={this.props.data.image} show={this.props.data} />
            : this.getString(this.props.data.agree)}

        </Dialog>
        <div className='col-xs-1' />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  store_image: (url) => dispatch(storeProjectsImage(url, ownProps.data.research_title, ownProps.data.semester)),
  store_file: (url) => dispatch(storeProjectsFile(url, ownProps.data.research_title, ownProps.data.semester))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
