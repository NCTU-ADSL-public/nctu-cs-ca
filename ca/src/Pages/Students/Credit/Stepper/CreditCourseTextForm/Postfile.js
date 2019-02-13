import React from 'react'
import input from 'react-bootstrap'
// import firebase from 'firebase'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { compulsoryCourseChange, englishCourseChange, waiveCourseChange } from '../../../../../Redux/Students/Actions/Credit'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  text1: {
    fontSize: '18px',
    fontWeight: 'normal',
    display: 'inline'
  },
  text2: {
    fontSize: '14px',
    fontWeight: 'normal',
    marginLeft: '8px'
  }
})

class Postfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageURL: ''
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.fileRef = React.createRef()
  }

  handleFileChange (e) {
    console.log(e)
    this.props.fileChange(e)
  }

  render () {
    const { classes } = this.props
    return (
      <form onSubmit={this.handleUploadImage}>
        <div className='hidden-xs'>
          <label htmlFor='fileInput'>
            <Button
              variant='outlined'
              className={classes.button}
              onClick={() => this.fileRef.current.click()}
            >
              選擇檔案
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
            <div className={classes.text1}>{this.props.file ? this.props.file.name : '請合併為一個PDF檔案再上傳'}</div>
            <input
              style={{ display: 'none' }}
              ref={this.fileRef}
              type='file'
              id='fileInput'
              onChange={(e) => this.handleFileChange(e.target.files[0])}
            />
          </label>
        </div>
        <div className='visible-xs'>
          <label htmlFor='fileInput'>
            <Button
              size='small'
              variant='outlined'
              className={classes.button}
              onClick={() => this.fileRef.current.click()}
            >
              選擇檔案
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
            <div className={classes.text2}>{this.props.file ? this.props.file.name : '請合併為一個PDF檔案再上傳'}</div>
            <input
              style={{ display: 'none' }}
              ref={this.fileRef}
              type='file'
              id='fileInput'
              onChange={(e) => this.handleFileChange(e.target.files[0])}
            />
          </label>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Postfile))
