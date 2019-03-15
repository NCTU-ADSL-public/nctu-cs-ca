
import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import firebase from 'firebase'
import RwdIconButton from './RwdIconButton'
import { storeProfessorsImage } from '../../../../Redux/Students/Actions/Professor'
import pic from '../../../../Resources/defalt.jpg'
import './style.css'

let storageRef = firebase.storage().ref()

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      photo: props.data.photo,
      loading: props.data.photo === undefined
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleImageDownload = this.handleImageDownload.bind(this)
    this._isMounted = false
  }

  componentDidMount () {
    this._isMounted = true
    if (this.props.data.photo === undefined) {
      this.handleImageDownload()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleExpandClick () {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleImageDownload () {
    // 如果component已經unmount，則fetch到圖片後不要call setState，不然會造成錯誤
    let directory = this.props.data.path
    if (!directory) {
      if (this._isMounted) {
        this.setState({ loading: false, photo: '' })
      }
      return
    }

    storageRef
      .child(directory)
      .getDownloadURL()
      .then(url => {
        this.props.storeImage(url)
        if (this._isMounted) {
          this.setState({ loading: false, photo: url })
        }
      })
      .catch(error => {
        console.log(error)
        if (this._isMounted) {
          this.setState({ loading: false, photo: '' })
        }
        this.props.storeImage('')
      })
  }

  render () {
    const { classes } = this.props
    const photo = this.state.photo ? this.state.photo : pic
    return (
      <div className='group-btn-student'>
        <div className='row'>
          <div className='hidden-xs hidden-sm col-md-2 col-lg-2'>
            {
              this.state.loading || <Image className='pic' src={photo} />
            }
          </div>
          <div className='visible-xs visible-sm col-xs-2 col-sm-1'>
            {
              this.state.loading
                ? <CircularProgress />
                : <Avatar alt='picture' src={photo} className={classes.avatar} />
            }
          </div>

          <div className='row'>
            <div className='col-xs-8 col-sm-8 col-md-7 col-lg-7'>
              {
                this.props.isMentor
                  ? <Badge color='primary' badgeContent={'導師'}>
                    <div className='group-title'>{ this.props.data.tname }</div>
                  </Badge>
                  : <div className='group-title'>{ this.props.data.tname }</div>
              }
              <div className='hidden-xs hidden-sm'>
                <div className='group-year'>
                  已收專題人數（最多七人）：
                  { this.props.data.scount }
                  { this.props.data.scount >= 7 && <font color='#a52a2a'>（名額已滿）</font> }
                </div>
                <div className='group-year'>研究領域：{ this.props.data.expertise }</div>
                <div className='group-year'>Email：{ this.props.data.email }</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-9 col-sm-9 visible-xs visible-sm' style={{ marginTop: '10px' }}>
            <div className='group-year-rwd'>
              專題人數：
              { this.props.data.scount }
              { this.props.data.scount >= 7 && <font color='#a52a2a'>（名額已滿）</font> }
            </div>
            <div className='group-year-rwd'>研究領域：{ this.props.data.expertise }</div>
            <div className='group-year-rwd'>Email：{ this.props.data.email }</div>
          </div>
          <div className='col-xs-3 col-sm-3 icon-button-rwd'>
            <RwdIconButton profile={this.props.data} studentIdcard={this.props.studentIdcard} />
            <IconButton
              className={
                classnames(
                  classes.expand,
                  { [classes.expandOpen]: this.state.expanded }
                )
              }
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label='Show more'
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <div className='container'>
            <div className='row' style={{ marginTop: '5px' }}>
              <Divider />
              經歷：<br />
              { this.props.data.info === '' ? '尚無資料' : this.props.data.info }
              <div style={{ height: '50px' }} />
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  isMentor: state.Student.Professor.mentor === ownProps.data.tname
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  storeImage: (url) => dispatch(storeProfessorsImage(url, ownProps.data.tname))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
