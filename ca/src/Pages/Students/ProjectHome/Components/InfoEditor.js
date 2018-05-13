import CKEditor from 'react-ckeditor-component'
import React from 'react'

export default class InfoEditor extends React.Component {
  constructor (props) {
    super(props)
    this.updateContent = this.updateContent.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      content: 'content'
    }
  }

  updateContent (newContent) {
    this.setState({
      content: newContent
    })
  }

  onChange (evt) {
    console.log('onChange fired with event info: ', evt)
    let newContent = evt.editor.getData()
    this.setState({
      content: newContent
    })
  }

  onBlur (evt) {
    console.log('onBlur event called with event info: ', evt);
  }

  afterPaste (evt) {
    console.log('afterPaste event called with event info: ', evt);
  }

  render() {
    return (
      <CKEditor
        activeClass='p10'
        content={this.state.content}
        events={{
          'blur': this.onBlur,
          'afterPaste': this.afterPaste,
          'change': this.onChange
        }}
      />
    )
  }
}