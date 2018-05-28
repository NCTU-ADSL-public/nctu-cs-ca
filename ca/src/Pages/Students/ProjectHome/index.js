import React from 'react'
import Show from './Show/index'
import Edit from './Edit'
import axios from 'axios'
import firebase from 'firebase'
import PageWrapper from '../../../Components/PageWrapper'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-backspace'

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
    this.state = {
      project: this.props.project,
      Show: {
        title: this.props.project.research_title,
        teacher: this.props.project.tname,
        url: '',
        introduce: ''
      },
      state: 'show'
    }
  }

  async componentWillMount () {
    await this.fetchData()
    console.log(this.state.project.research_title)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchData()
  }

  fetchData () {
    let _this = this
    axios.post('/students/projectPage', {
      student_id: _this.props.studentProfile.student_id
    })
      .then(res => {
        let data = res.data
        let data_
        for (let i = 0; i < data.length; i++) {
          if (data[i].research_title === _this.state.project.research_title) { data_ = data[i] }
        }
        console.log(data_)
        console.log(_this.state.project.research_title)
        _this.setState({
          Show: {
            url: data_.link,
            title: data_.research_title,
            introduce: data_.intro
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    let directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.state.Show.teacher + '/' + this.state.Show.title + '/image/image.jpg'
    let pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      _this.setState({
        Show: {
          ..._this.state.Show,
          image: url
        }
      })
    })
    directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.state.Show.teacher + '/' + this.state.Show.title + '/file/file.pdf'
    pathReference = storageRef.child(directory)
    pathReference.getDownloadURL().then(url => {
      _this.setState({
        Show: {
          ..._this.state.Show,
          file: url
        }
      })
    })
  }

  changeState () {
    let state = this.state.state === 'edit' ? 'show' : 'edit'
    if (state === 'show') {
      this.fetchData()
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
          {this.state.state === 'edit' ? <Edit project={this.state.project} studentProfile={this.props.studentProfile} onclick={this.changeState} show={this.state.Show} /> : <Show onclick={this.changeState} studentProfile={this.props.studentProfile} show={this.state.Show} />}
        </div>
      </PageWrapper>
    )
  }
}
