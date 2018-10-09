import React from 'react'
import axios from 'axios'
import input from 'react-bootstrap'

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageURL: ''
    }

    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage (ev) {
    ev.preventDefault()

    let formData = new FormData() // formdata object

    formData.append('file', this.uploadInput.files[0])

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('./file', formData, config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    // const data = new FormData()
    // data.append('file', this.uploadInput.files[0])
    // fetch ('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: data
    // }).then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:8000/${body.file}` });
    //   })
    // })
  }

  render () {
    return (
      <form onSubmit={this.handleUploadImage}>
        <input ref={(ref) => { this.uploadInput = ref }} type='file' />
        <br />
        {/* <div> */}
        {/* <button>Upload</button> */}
        {/* </div> */}
      </form>
    )
  }
}

export default Main
