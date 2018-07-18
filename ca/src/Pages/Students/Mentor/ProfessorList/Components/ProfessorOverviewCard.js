import React from 'react'
import { Image } from 'react-bootstrap'
import Collapse from '@material-ui/core/Collapse'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import pic from '../../../../../Resources/defalt.jpg'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import RwdIconButton from './RwdIconButton'
import WriteEmail from './WriteEmail'
import SendProjectAgree from './SendProjectAgree'
import './index.css'
import firebase from 'firebase'
import { storeProfessorsImage } from '../../Actions'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazy-load'

let config = {
  apiKey: 'AIzaSyAFVgUFaZk23prpVeXTkFvXdUhSXy5xzNU',
  authDomain: 'nctu-csca.firebaseapp.com',
  databaseURL: 'https://nctu-csca.firebaseio.com',
  projectId: 'nctu-csca',
  storageBucket: 'nctu-csca.appspot.com',
  serviceAccount: '../../../../Resources/nctu-csca-firebase-admins.json',
  messagingSenderId: '612862784976'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
  let auth = firebase.auth()
  auth.signInWithEmailAndPassword('nctucsca@gmail.com', 'axc3262757')
}
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
    zIndex: 0
  }
})

class ProfessorOverviewCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      photo: props.profile.photo,
      loading: props.profile.photo === undefined
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleImageDounLoad = this.handleImageDounLoad.bind(this)
    if (props.profile.photo === undefined) { this.handleImageDounLoad() }
  }

  handleExpandClick () {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleImageDounLoad () {
    let directory = this.props.profile.path
    if (this.props.profile.path === '') {
      directory = 'professors/T555.jpg'
    }
    let pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      this.props.store_image(url)
      this.setState({
        loading: false,
        photo: url
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        loading: false,
        photo: ''
      })
      this.props.store_image('')
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div className='group-btn'>
        <LazyLoad>
          <div>
            <div className='row'>
              <div className='hidden-xs hidden-sm col-md-3 col-lg-3'>
                {this.state.loading ? <CircularProgress /> : <Image className='pic' src={this.state.photo === '' ? pic : this.state.photo} />}
              </div>
              <div className='visible-xs visible-sm col-xs-2 col-sm-1'>
                {this.state.loading ? <CircularProgress /> : <Avatar alt='picture' src={this.state.photo === '' ? pic : this.state.photo} className={classes.avatar} />}
              </div>
              <div className='row'>
                <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                  {this.props.isMentor
                    ? <Badge color='primary' badgeContent={'導師'} className={classes.margin}>
                      <div className='group-title'>{this.props.profile.tname}</div>
                    </Badge>
                    : <div className='group-title'>{this.props.profile.tname}</div>}
                  <div className='hidden-xs hidden-sm'>
                    <div className='group-year' >已收專題人數（最多七人）：{this.props.profile.scount}{this.props.profile.scount > 6 ? <font color='#a52a2a' >（名額已滿）</font> : ''}</div>
                    <div className='group-year' >研究領域：{this.props.profile.expertise}</div>
                    <div className='group-year' >Email：{this.props.profile.email}</div>
                  </div>
                </div>
                <div className='hidden-xs hidden-sm icon-button'>
                  <div className='col-md-1 col-lg-1 icon-button_'>
                    <WriteEmail profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
                  </div>
                  <div className='col-md-1 col-lg-1 icon-button_'>
                    <SendProjectAgree profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
                  </div>
                  <div className='col-md-1 col-lg-1  icon-button_'>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label='Show more'
                >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='visible-xs visible-sm'>
                <div className='col-xs-9 col-sm-9' style={{marginTop: '10px'}}>
                  <div className='group-year-rwd' >專題人數：{this.props.profile.scount}{this.props.profile.scount > 6 ? <font color='#a52a2a' >（名額已滿）</font> : ''}</div>
                  <div className='group-year-rwd' >研究領域：{this.props.profile.expertise}</div>
                  <div className='group-year-rwd' >Email：{this.props.profile.email}</div>
                </div>
                <div className='col-xs-3 col-sm-3 icon-button-rwd'>
                  <RwdIconButton profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label='Show more'
              >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
              <div className='container'>
                <div className='row' style={{marginTop: '5px'}}>
                  <Divider />
              經歷：<br />
                  {this.props.profile.info === '' ? '尚無資料' : this.props.profile.info}
                  <div style={{height: '50px'}} />
                </div>
              </div>
            </Collapse>
          </div>
        </LazyLoad>
      </div>
    )
  }
}

ProfessorOverviewCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  isMentor: state.all.mentor === ownProps.profile.tname
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  store_image: (url) => dispatch(storeProfessorsImage(url, ownProps.profile.tname))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfessorOverviewCard))
