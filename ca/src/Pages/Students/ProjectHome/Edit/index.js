
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
      title:'NCTUCS BOT',
      link:'/ttt',
      introduce:'<h1>Hey</h1><br/><br/><br/><br/><br/>'
    }
  }

  onChange (event) {
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  componentWillMount () {
    this.setState({
      ckeditorContent: 'this.props.event.content'
    })
  }

  handleSubmit (event) {
    let _this = this

    if (_this.state.title !== '') {
      event.preventDefault()
      axios.post('/students/ProjectEdit', {
        title: _this.refs.title.value,
        url: _this.refs.url.value,
        content: _this.state.ckeditorContent
      }).then(res => {
      }).catch(err => {
        console.log(err)
      })

    }
  }

  render () {
    return (
      <div className='container bg-white'>
        <div className='row'>
          <div className='col-md-9 offset-1'>
            <h1 className='title offset-1'>
              編輯專題主頁
            </h1>
            <form>
              <LabeledInput label='圖片'>
                <input accept='image/*' type='file' hidden />
                <div className='text-center clickable upload-picture' >
                  點選以上傳,建議800x400以達最佳效果(需小於2MB)
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
                <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
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