import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import CircularProgress from '@material-ui/core/CircularProgress'
import { GridTile } from 'material-ui/GridList'
import firebase from 'firebase'
import Show from './Show'
import Edit from './Edit/Edit'
import img from '../Image/1.jpg'
import img2 from '../Image/2.jpg'
import img3 from '../Image/rejection.jpg'
import {
  storeProjectsImage,
  storeProjectsFile,
  deleteProject
} from '../../../../Redux/Students/Actions/Project'

let storageRef = firebase.storage().ref()

const styles = {
  appBar: {
    position: 'relative',
    background: '#5D4037'
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
    color: '#fff',
    align: 'center'
  },
  gridStyle: {
    height: '270px',
    width: '480px',
    cursor: 'pointer',
    animationDuration: '1.5s',
    animationIterationCount: '1'
  },
  gridStyleRwd: {
    height: '162px',
    width: '288px',
    cursor: 'pointer',
    animationDuration: '1.5s',
    animationIterationCount: '1'
  }
}

const Transition = (props) => (
  <Grow {...props} />
)

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.fetchImage = this.fetchImage.bind(this)
    this.deleteData = this.deleteData.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.getString = this.getString.bind(this)
    this.getImage = this.getImage.bind(this)
    this.state = { open: false }
  }

  componentDidMount () {
    this.fetchImage()
  }

  fetchImage () {
    const { data } = this.props
    if (data.image && data.file) return

    let directory = `${data.semester}/${data.tname}/${data.research_title}/image/image.jpg`
    storageRef
      .child(directory)
      .getDownloadURL()
      .then(url => this.props.storeImage(url))
      .catch(error => {
        this.props.storeImage('')
        console.log(error)
      })

    directory = `${data.semester}/${data.tname}/${data.research_title}/file/file.pdf`
    storageRef
      .child(directory)
      .getDownloadURL()
      .then(url => this.props.storeFile(url))
      .catch(error => {
        this.props.storeImage('')
        console.log(error)
      })
  }

  deleteData () {
    if (window.confirm('如已知會過隊友再按確定。')) {
      const { data } = this.props
      this.props.deleteProject({
        research_title: data.research_title,
        tname: data.tname,
        first_second: data.first_second,
        semester: data.semester
      })
    }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  getString (status) {
    let content = status === '3'
      ? '很遺憾您的專題申請已被拒絕，知會隊友後請按右上角刪除已撤銷表單資料，謝謝！'
      : '如要收回申請請點選左上方收回鍵，欲收回前請先告知隊友！'

    return (
      <div className='container' style={{ marginTop: '10px', height: '300px' }}>
        { content }
      </div>
    )
  }

  getImage () {
    // 根據同意、申請中、拒絕來決定圖片
    switch (this.props.data.agree) {
      // 太舊的資料是書面申請 所以agree是undefined
      case undefined:
      case '1':
        return this.props.data.photo || img
      case '2':
        return img2
      case '3':
        return img3
      default:
        return img
    }
  }

  render () {
    const { classes, rwd, data } = this.props
    // 太舊的資料是書面申請 所以agree是undefined
    const isAgreed = (data.agree === '1' || data.agree === undefined)
    return (
      <div>
        <div className='col-xs-1' />
        <GridTile
          cols={1}
          rows={1}
          title={data.research_title}
          titleStyle={styles.titleStyle}
          titleBackground='linear-gradient(to top, rgba(62,39,35,0.7) 70%, rgba(62,39,35,0.3) 80%, rgba(62,39,35,0) 100%)'
          style={rwd ? styles.gridStyleRwd : styles.gridStyle}
          className='col-xs-10 col-sm-10 col-md-6 animated bounceIn'
          onClick={this.handleDialogOpen}
        >
          {
            data.photo === undefined || data.photo === 'loading'
              ? <CircularProgress className={classes.progress} />
              : <img className='img-responsive' src={this.getImage()} alt='' />
          }
        </GridTile>
        <Dialog
          fullScreen={isAgreed}
          open={this.state.open}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar >
              <IconButton color='inherit' onClick={this.handleDialogClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
                { data.research_title }
              </Typography>
              {
                isAgreed
                  ? <Edit project={data} />
                  : <Button
                    style={{ fontSize: '12px' }}
                    color='inherit'
                    onClick={(isAgreed) ? this.handleDialogClose : this.deleteData}
                  >
                    { data.agree === '3' ? '刪除' : '收回' }
                  </Button>
              }
            </Toolbar>
          </AppBar>
          {
            isAgreed
              ? <Show file={data.file} image={data.image} data={data} />
              : this.getString(data.agree)
          }
        </Dialog>
        <div className='col-xs-1' />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeImage: (url) => dispatch(storeProjectsImage(url, ownProps.data.research_title, ownProps.data.semester)),
  storeFile: (url) => dispatch(storeProjectsFile(url, ownProps.data.research_title, ownProps.data.semester)),
  deleteProject: (payload) => dispatch(deleteProject(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
