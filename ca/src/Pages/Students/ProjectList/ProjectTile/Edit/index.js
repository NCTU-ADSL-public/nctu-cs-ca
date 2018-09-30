import React from 'react'
import { LabeledInput } from './FormUtils/index'
import CKEditor from 'react-ckeditor-component'
import firebase from 'firebase'
import './style.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateProject, storeProjectsImage, storeProjectsFile } from '../../../../../Redux/Students/Actions/ProjectList'

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

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.state = {
      title: this.props.project.research_title,
      link: this.props.project.link,
      ckeditorContent: this.props.project.intro,
      image: 'no',
      file: 'no'
    }
  }

  onChange (event) {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  handleSubmit (event) {
    let _this = this
    event.preventDefault()
    axios.post('/students/editProject', {
      student_id: _this.props.studentProfile.student_id,
      tname: _this.props.project.tname,
      semester: _this.props.project.semester,
      first_second: _this.props.project.first_second,
      research_title: _this.props.project.research_title,
      new_title: _this.props.project.research_title,
      new_intro: _this.state.ckeditorContent
    }).then(res => {
      this.props.update_project(_this.state.ckeditorContent, _this.props.project.research_title, _this.props.project.semester)
      this.props.onClose()
    }).catch(err => {
      // this.props.update_project(_this.state.ckeditorContent, _this.props.project.research_title, _this.props.project.semester)
      window.alert('儲存失敗，請檢察網路連線')
      // this.props.onClose()
      console.log(err)
    })

    if (this.state.image !== 'no') {
      let directory = this.props.project.semester + '/' + this.props.project.tname + '/' + this.props.project.research_title + '/image/'
      storageRef.child(directory).delete().then(function () {
      }).catch(function (error) {
        console.log(error)
      })

      let file = this.state.image

      let uploadTask = storageRef.child(directory + 'image.jpg').put(file)
      uploadTask.on('state_changed', function (snapshot) {
        _this.props.store_projects_image('loading', _this.props.project.research_title, _this.props.project.semester)
      }, function (error) {
        console.log(error)
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL)
          _this.props.store_projects_image(downloadURL, _this.props.project.research_title, _this.props.project.semester)
        })
      })
    }
    if (this.state.file !== 'no') {
      let directory = this.props.project.semester + '/' + this.props.project.tname + '/' + this.props.project.research_title + '/file/'
      storageRef.child(directory).delete().then(function () {
      }).catch(function (error) {
        console.log(error)
      })

      let file = this.state.file
      let uploadTask = storageRef.child(directory + 'file.pdf').put(file)
      uploadTask.on('state_changed', function (snapshot) {
        _this.props.store_projects_file('loading', _this.props.project.research_title, _this.props.project.semester)
      }, function (error) {
        console.log(error)
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          _this.props.store_projects_file(downloadURL, _this.props.project.research_title, _this.props.project.semester)
        })
      })
    }
  }

  handleImageChange (e) {
    console.log(e)

    this.setState({
      image: e
    })
  }

  handleFileChange (e) {
    console.log(e)
    this.setState({
      file: e
    })
  }

  render () {
    return (
      <div>
        <div >
          <div className='col-xs-12 col-sm-12 col-md-12' style={{ marginTop: '10px' }}>
            <form>
              <LabeledInput label='圖片'>
                <div className='upload-btn-wrapper'>
                  <button className='btn' style={{ cursor: 'pointer' }}> 上傳圖片</button>
                  <input accept='image/*' type='file' hidden onChange={(e) => this.handleImageChange(e.target.files[0])} />
                  {this.state.image === 'no' ? '' : this.state.image.name}
                  <div className='text-center clickable upload-picture' >
                    點選以上傳,建議800x400以達最佳效果(需小於2MB)
                  </div>
                </div>
              </LabeledInput>
              <LabeledInput label='報告'>
                <div className='upload-btn-wrapper'>
                  <button accept='application/pdf' className='btn' style={{ cursor: 'pointer' }}> 上傳報告</button>
                  <input type='file' hidden onChange={(e) => this.handleFileChange(e.target.files[0])} />
                  {this.state.file === 'no' ? '' : this.state.file.name}
                  <div className='text-center clickable upload-picture' >
                    限上傳PDF檔案
                  </div>
                </div>
              </LabeledInput>
              <LabeledInput label='主題'>
                <div className='input-group'>
                  <input ref='title' className='form-control' placeholder='必填' type='text' value={this.state.title} required />
                    (如需更改題目請聯絡教授以更改)
                </div>
              </LabeledInput>
              <LabeledInput label='簡介'>
                <CKEditor style={{ height: '50vh' }} activeClass='p10' content={this.state.ckeditorContent} events={{ 'change': this.onChange }} />

              </LabeledInput>
              <div className='justify-content-center pull-right'>
                <button type='submit' style={{ margin: '2px', backgroundColor: '#795548', borderColor: '#795548' }} className='btn btn-success btn-large' onClick={this.handleSubmit}>儲存</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  studentProfile: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  update_project: (intro) => dispatch(updateProject(intro, ownProps.project.research_title, ownProps.project.semester)),
  store_projects_image: (image) => dispatch(storeProjectsImage(image, ownProps.project.research_title, ownProps.project.semester)),
  store_projects_file: (file) => dispatch(storeProjectsFile(file, ownProps.project.research_title, ownProps.project.semester))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
