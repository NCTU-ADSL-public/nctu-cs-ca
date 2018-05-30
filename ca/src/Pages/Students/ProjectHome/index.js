import React from 'react'
import Show from './Show/index'
import Edit from './Edit'
import axios from 'axios'
import firebase from 'firebase'
import PageWrapper from '../../../Components/PageWrapper'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-backspace'

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

const styles = {
  largeIcon: {
    width: 40,
    height: 40
  },
  large: {
    width: 100,
    height: 100,
    padding: 30
  }
}

export default class index extends React.Component {
  constructor (props) {
    super(props)
    this.changeState = this.changeState.bind(this)
  }

  state = {
    project: this.props.project,
    file:'',
    image:'',
    state: 'show'
  }

  async componentWillMount () {
    await this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    let _this = this
    if(this.state.project.research_title !== nextProps.project.research_title)
      _this.fetchData()
  }

  fetchData () {
    let _this = this
    _this.setState({
      image: '',
      file: '',
    })
    let directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.props.project.tname + '/' + this.props.project.research_title + '/image/image.jpg'
    let pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      _this.setState({
        image: url
      })
    })
    directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.props.project.tname + '/' + this.props.project.research_title + '/file/file.pdf'
    pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      _this.setState({
        file: url
      })
    })
  }

  changeState () {
    let state = this.state.state === 'edit' ? 'show' : 'edit'
    let _this = this
    if (state === 'show') {
      setTimeout(function () {
        _this.fetchData()
      }, 1000)
    }
    this.setState({
      state: state
    })
  }

  render () {
    return (
      <PageWrapper>

        <IconButton
          iconStyle={styles.largeIcon}
          style={styles.large}
          onClick={this.state.state === 'edit' ? this.changeState : this.props.propsClick}
        >
          <ActionHome />
        </IconButton>
        <div style={{marginTop: '-100px'}}>
          {this.state.state === 'edit' ? <Edit project={this.state.project} studentProfile={this.props.studentProfile} onclick={this.changeState} show={this.state.Show} /> : <Show onclick={this.changeState} studentProfile={this.props.studentProfile} show={this.props.project}  image={this.state.image} file={this.state.file} />}
        </div>
      </PageWrapper>
    )
  }
}
