import React from 'react'

import FadeIn from 'react-fade-in'
import { Grid, Row, Glyphicon, Image } from 'react-bootstrap'
import pic from '../../../../Resources/defalt.jpg'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ProfileSendmail from './ProdileExtend/ProfileSendmail'
import ProfileSendProjectAgree from './ProdileExtend/ProfileSendProjectAgree'
import firebase from 'firebase'
import Loading from '../../../../Components/Loading'

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

const fontStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC'
}

const styles = {
  row: {
    textAlign: 'center',
    marginTop: '2vh',
    color: '#5f6f75',
    width: '45vw',
    height: '74vh',
    overflow: 'scroll',
    backgroundColor: '#F5F5F5'
  },
  pic: {
    width: 250,
    marginRight: '-135',
    padding: 5
  },
  name: {
    fontSize: '3em',
    padding: 5
  },
  item: {
    fontSize: '1.2em',
    padding: 2,
    fontWeight: 300
  }
}

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: ''
    }
  }

  fetchData () {
    let _this = this
    let directory = this.props.profile.photo
    console.log(this.props.profile)
    if (directory !== '') {
      let pathReference = storageRef.child(directory)
      pathReference.getDownloadURL().then(url => {
        _this.setState({
          photo: url
        })
      })
    }
  }

  componentWillMount () {
    let directory = this.props.profile.photo
    let _this = this
    console.log(this.props.teacher)
    _this.setState({
      photo: ''
    })
    if (directory !== '') {
      let pathReference = storageRef.child(directory)
      pathReference.getDownloadURL().then(url => {
        _this.setState({
          photo: url
        })
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    let directory = nextProps.profile.photo
    let _this = this
    console.log(nextProps.teacher)
    _this.setState({
      photo: ''
    })
    if (directory !== '') {
      let pathReference = storageRef.child(directory)
      pathReference.getDownloadURL().then(url => {
        _this.setState({
          photo: url
        })
      }).catch(function (error) {
        _this.setState({
          photo: pic
        })
        // Uh-oh, an error occurred!
      })
    }
  }

  render () {
    return (
      <MuiThemeProvider>
        <Card style={styles.row} >
          <CardText>
            <FadeIn>
              <div style={fontStyle}>
                <div style={{float: 'right'}}>
                  <ProfileSendmail profile={this.props.profile} studentIdcard={this.props.studentIdcard} />
                  <ProfileSendProjectAgree name={this.props.profile.name} studentIdcard={this.props.studentIdcard} />
                </div>
                <Image style={styles.pic} src={this.props.profile.photo === '' ? pic : this.state.photo} circle />
                <div style={styles.name}> {this.props.profile.name} </div>
                <div style={styles.item}><Glyphicon glyph='earphone' /> #{this.props.profile.phone} </div>
                <div style={styles.item}> {this.props.profile.email} </div>
                <div style={styles.item}> {this.props.profile.expertise} </div>
                <div style={styles.item}> {this.props.profile.info} </div>
              </div>
            </FadeIn>
          </CardText>
        </Card>
      </MuiThemeProvider>
      // <Grid>
      // <Row style={styles.row}>
      //   </Row>
      // </Grid>
    )
  }
}

export default Profile
