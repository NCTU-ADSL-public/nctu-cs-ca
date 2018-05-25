/* eslint-disable handle-callback-err */

import React from 'react'
import { LabeledInput } from './FormUtils'
import CKEditor from 'react-ckeditor-component'
import firebase from 'firebase'
import './style.css'
import axios from 'axios'

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

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.state = {
      title: this.props.show.title,
      link: this.props.show.url,
      ckeditorContent: this.props.show.introduce,
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
    if (_this.refs.title.value !== '') {
      event.preventDefault()
      axios.post('/students/editProject', {
        student_id: _this.props.studentProfile.student_id,
        tname: _this.props.project.tname,
        research_title: _this.props.show.title,
        new_title: _this.refs.title.value,
        new_link: _this.refs.url.value,
        new_intro: _this.state.ckeditorContent
      }).then(res => {
      }).catch(err => {
        console.log(err)
      })

      if (this.state.image !== 'no') {
        storageRef.child(this.props.show.title + '/image/').delete().then(function () {
        }).catch(function (error) {
          // Uh-oh, an error occurred!
        })

        let file = this.state.image
        let uploadTask = storageRef.child(this.props.show.title + '/image/' + file.name).put(file)
        uploadTask.on('state_changed', function (snapshot) {
          // 觀察狀態變化，例如：progress, pause, and resume

          // 取得檔案上傳狀態，並用數字顯示

          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'

              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'

              console.log('Upload is running')
              break
          }
        }, function (error) {
          // Handle unsuccessful uploads
          console.log(error)
        }, function () {
          // Handle successful uploads on complete

          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          let downloadURL = uploadTask.snapshot.downloadURL
          _this.props.onclick()
        })
      } else if (this.state.file !== 'no') {
        storageRef.child(this.props.show.title + '/file/').delete().then(function () {
        }).catch(function (error) {
          // Uh-oh, an error occurred!
        })

        let file = this.state.file
        let uploadTask = storageRef.child(this.props.show.title + '/file/' + file.name).put(file)
        uploadTask.on('state_changed', function (snapshot) {
          // 觀察狀態變化，例如：progress, pause, and resume

          // 取得檔案上傳狀態，並用數字顯示
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'

              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'

              console.log('Upload is running')
              break
          }
        }, function (error) {
          // Handle unsuccessful uploads
          console.log(error)
        }, function () {
          // Handle successful uploads on complete

          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          let downloadURL = uploadTask.snapshot.downloadURL
          _this.props.onclick()
        })
      } else {
        _this.props.onclick()
      }
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
      <div className='container bg-white'>
        <div className='row'>
          <div className='col-md-12 offset-1'>
            <h1 className='title offset-1'>
              編輯專題主頁
            </h1>
            <br />
            <br />
            <form>
              <LabeledInput label='圖片'>
                <div className='upload-btn-wrapper'>
                  <button className='btn' style={{cursor: 'pointer'}}> 上傳圖片</button>
                  <input accept='image/*' type='file' hidden onChange={(e) => this.handleImageChange(e.target.files[0])} />
                  <div className='text-center clickable upload-picture' >
                    點選以上傳,建議800x400以達最佳效果(需小於2MB)
                  </div>
                </div>
              </LabeledInput>
              <LabeledInput label='報告'>
                <div className='upload-btn-wrapper'>
                  <button className='btn' style={{cursor: 'pointer'}}> 上傳報告</button>
                  <input type='file' hidden onChange={(e) => this.handleFileChange(e.target.files[0])} />
                </div>
              </LabeledInput>
              <LabeledInput label='主題'>
                <div className='input-group'>
                  <input ref='title' className='form-control' placeholder='必填' type='text' value={this.state.title} required />
                </div>
              </LabeledInput>
              <LabeledInput label='團隊網站'>
                <input ref='url' className='form-control' placeholder='選填' type='text' value={this.state.url} />
              </LabeledInput>
              <LabeledInput label='簡介'>
                <div >
                  <CKEditor style={{height: '50vh'}} activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
                </div>
              </LabeledInput>
              <div className='col-12 text-right'>
                <button type='submit' className='btn btn-success btn-large' onClick={this.handleSubmit}>送出</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

// export default Edit
export default Edit
