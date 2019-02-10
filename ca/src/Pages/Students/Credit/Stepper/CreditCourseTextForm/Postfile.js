import React from 'react'
// import axios from 'axios'
import input from 'react-bootstrap'
// import firebase from 'firebase'
import { compulsoryCourseChange, englishCourseChange, waiveCourseChange } from '../../../../../Redux/Students/Actions/Credit'
import { connect } from 'react-redux'

class Postfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageURL: ''
    }

    //this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleFileChange (e) {
    console.log(e)
    this.setState({
      file: e
    })
    this.props.fileChange(e)
  }

  render () {
    return (
      <form onSubmit={this.handleUploadImage}>
        請合併為一個PDF檔案
        <input type='file' hidden onChange={(e) => this.handleFileChange(e.target.files[0])} />
        <br />
        {/* <div> */}
        {/* <button>Upload</button> */}
        {/* </div> */}
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  courseFile: state.Student.Credit.compulsoryCourse.file,
  englishFile: state.Student.Credit.englishCourse.file,
  waiveFile: state.Student.Credit.waiveCourse.file
})
const mapDispatchToProps = (dispatch) => ({
  englishCourseChange: (payload) => { dispatch(englishCourseChange(payload)) },
  compulsoryCourseChange: (payload) => { dispatch(compulsoryCourseChange(payload)) },
  waiveCourseChange: (payload) => { dispatch(waiveCourseChange(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Postfile)
