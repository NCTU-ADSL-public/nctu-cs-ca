import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
}

class RaisedButtonImage extends React.Component  {
  state = {selectedFile: null}

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
    console.log(event.target.files[0])
  }

  uploadHandler = () => {
    //const formData = new FormData()
    //formData.append('imgFile', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('/students/ProjectImage', {
      //formDatam
    }).then(res => {
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <RaisedButton
          label='Choose an Image'
          labelPosition='before'
          style={styles.button}
          onClick={this.uploadHandler}
          containerElement='label'>
          <input type='file' style={styles.exampleImageInput} onChange={this.fileChangedHandler} />
          <image src={this.state.selectedFile}/>
        </RaisedButton>
      </div>
    )
  }
}

export default RaisedButtonImage
