
import React from 'react'
import { LabeledInput } from './FormUtils'
import CKEditor from 'react-ckeditor-component'
import './style.css'
import axios from 'axios'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      title: this.props.show.title,
      link: this.props.show.url,
      ckeditorContent: this.props.show.introduce
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
    if (_this.refs.title.title !== '') {
      event.preventDefault()
      axios.post('/students/editProject', {
        student_id: _this.props.studentProfile.student_id,
        tname: _this.props.project.tname,
        research_title: _this.props.show.title,
        new_title: _this.refs.title.value,
        new_link: _this.refs.url.value,
        new_intro: _this.state.ckeditorContent
      }).then(res => {
        this.props.onclick()
      }).catch(err => {
        console.log(err)
      })
    }
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
                <div className='upload-btn-wrapper' style={{cursor: 'pointer'}}>
                  <button className='btn'> 上傳圖片</button>
                  <input accept='image/*' type='file' hidden />
                  <div className='text-center clickable upload-picture' >
                    點選以上傳,建議800x400以達最佳效果(需小於2MB)
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


//export default Edit
export default Edit