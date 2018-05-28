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
    console.log(Number(this.props.studentProfile.student_id[1]) + 102)
    console.log(this.props.studentProfile)
  }

  onChange (event) {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  async handleSubmit (event) {
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
        window.location.reload('/logout')
      })

      if (this.state.image !== 'no') {
        let directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.props.show.teacher + '/' + this.props.show.title + '/image/'
        storageRef.child(directory).delete().then(function () {
        }).catch(function (error) {
          // Uh-oh, an error occurred!
        })

        let file = this.state.image
        let uploadTask = storageRef.child(directory + 'image.jpg').put(file)
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
          console.log(error)
        }, function () {
          if (_this.state.file === 'no') {
            _this.props.onclick()
          }
        })
      }
      if (this.state.file !== 'no') {
        let directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.props.show.teacher + '/' + this.props.show.title + '/file/'
        storageRef.child(directory).delete().then(function () {
        }).catch(function (error) {
        })

        let file = this.state.file
        let uploadTask = storageRef.child(directory + 'file.pdf').put(file)
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
          console.log(error)
        }, function () {
          _this.props.onclick()
        })
      } else if ((_this.state.image === 'no')) {
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
            <h1 className='title offset-1' >
              編輯專題主頁
            </h1>
            <div className='divide-horizontal'>
            </div>
            <form>
              <LabeledInput label='圖片'>
                <div className='upload-btn-wrapper'>
                  <button className='btn' style={{cursor: 'pointer'}}> 上傳圖片</button>
                  <input accept='image/*' type='file' hidden onChange={(e) => this.handleImageChange(e.target.files[0])} />
                  {this.state.image === 'no' ? '' : this.state.image.name}
                  <div className='text-center clickable upload-picture' >
                    點選以上傳,建議800x400以達最佳效果(需小於2MB)
                  </div>
                </div>
              </LabeledInput>
              <LabeledInput label='報告'>
                <div className='upload-btn-wrapper'>
                  <button accept='application/pdf' className='btn' style={{cursor: 'pointer'}}> 上傳報告</button>
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
