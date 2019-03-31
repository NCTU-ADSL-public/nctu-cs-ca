import React from 'react'
import { LabeledInput } from '../../../../../../Components/FormUtils/index'
import CKEditor from 'react-ckeditor-component'
import './style.css'

const Form = props => (
  <div className='col-xs-12 col-sm-12 col-md-12' style={{ marginTop: '10px' }}>
    <form>
      <LabeledInput label='圖片'>
        <div className='upload-btn-wrapper'>
          <input
            ref={props.imageRef}
            accept='image/*'
            type='file'
            hidden
            onChange={(e) => props.updateImage(e.target.files[0])}
          />
          <div className='text-center clickable upload-picture' onClick={() => props.imageRef.current.click()}>
            { props.image ? props.image.name : '點選以上傳,建議800x400以達最佳效果(需小於2MB)' }
          </div>
        </div>
      </LabeledInput>

      <LabeledInput label='報告'>
        <div className='upload-btn-wrapper'>
          <input
            ref={props.fileRef}
            type='file'
            hidden
            onChange={(e) => props.updateFile(e.target.files[0])}
          />
          <div className='text-center clickable upload-picture' onClick={() => props.fileRef.current.click()}>
            { props.file ? props.file.name : '點選以上傳,限上傳PDF檔案' }
          </div>
        </div>
      </LabeledInput>

      <LabeledInput label='主題'>
        <div className='input-group'>
          <input
            className='form-control'
            placeholder='必填'
            type='text'
            defaultValue={props.new_title}
            readOnly
          />
          <div style={{ color: 'red' }}>(如需更改題目請聯絡教授以更改)</div>
        </div>
      </LabeledInput>

      <LabeledInput label='簡介'>
        <CKEditor
          style={{ height: '50vh' }}
          activeClass='p10'
          content={props.new_intro}
          events={{ change: (e) => props.updateIntro(e.editor.getData()) }}
        />
      </LabeledInput>

      <div className='justify-content-center pull-right'>
        <button
          // type='submit'
          style={{ margin: '2px', backgroundColor: '#795548', borderColor: '#795548' }}
          className='btn btn-success btn-large'
          onClick={props.handleSubmit}
        >
          儲存
        </button>
      </div>
    </form>
  </div>
)

export default Form
