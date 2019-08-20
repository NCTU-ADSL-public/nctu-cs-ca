
import React from 'react'
import input from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { base64encode } from '../../../../Utilities'

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
      filename: '請合併為一個PDF檔案再上傳'
    }
    this.fileRef = React.createRef()
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleFileChange (e) {
    const file = e.target.files[0]
    base64encode(file)
      .then(encoded => {
        this.props.handleChange(encoded)
        this.setState({ filename: file.name })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { classes } = this.props
    return (
      <form>
        <div className='hidden-xs'>
          <label htmlFor='fileInput'>
            <Button
              variant='outlined'
              className={classes.button}
              style={{ borderColor: this.props.error ? 'red' : 'black' }}
              onClick={() => this.fileRef.current.click()}
            >
              選擇檔案
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
            <div className={classes.text1}>{ this.state.filename }</div>
            <input
              style={{ display: 'none' }}
              ref={this.fileRef}
              type='file'
              accept='.pdf'
              id='fileInput'
              onChange={this.handleFileChange}
            />
          </label>
        </div>
        <div className='visible-xs'>
          <label htmlFor='fileInput'>
            <Button
              size='small'
              variant='outlined'
              className={classes.button}
              style={{ borderColor: this.props.error ? 'red' : 'black' }}
              onClick={() => this.fileRef.current.click()}
            >
              選擇檔案
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
            <div className={classes.text2}>{ this.state.filename }</div>
            <input
              style={{ display: 'none' }}
              ref={this.fileRef}
              type='file'
              accept='.pdf'
              id='fileInput'
              onChange={this.handleFileChange}
            />
          </label>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(Postfile)
