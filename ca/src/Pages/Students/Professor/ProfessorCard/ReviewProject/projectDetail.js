
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import './projectDetail.css'
import img from './1.jpg'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

class ProjectDetail extends React.Component {
  constructor (props) {
    super(props)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.getFile = this.getFile.bind(this)
    this.state = { open: false }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
  }

  getFile () {
    const { file } = this.props
    switch (file) {
      case '':
        return '無'
      case 'loading':
        return '上傳中...'
      default:
        return <a target='_blank' rel='noopener noreferrer' href={file} style={{ cursor: 'pointer' }}>點這裡</a>
    }
  }

  render () {
    const image = (this.props.image !== undefined) ? this.props.image : img
    return (
      <div>
        <Button onClick={this.handleDialogOpen}>Learn more...</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth
          maxWidth={false}
        >
          <DialogTitle id='alert-dialog-title'>{this.props.show.research_title}</DialogTitle>
          <DialogContent>
            <div className='container'>
              <div style={{ fontSize: '15px' }}>
                <div className=' hidden-md hidden-lg'>
                  <img src={image} alt='Cinque Terre' className='img-responsive' />
                </div>
                <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5' style={{ marginTop: '5px' }}>
                  <div className='row'>
                    <p><i className='glyphicon glyphicon-file' />團隊報告: { this.getFile() }</p>
                  </div>
                  <br />
                  <div className='divide-horizontal row'>
                    <div className='divide-horizontal-span'>
                      <p>專題簡介</p>
                    </div>
                  </div>
                  <section dangerouslySetInnerHTML={{ __html: this.props.show.intro }} style={{ minHeight: '500px' }} />
                </div>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{ height: '100px' }} />
                <div className='hidden-xs hidden-sm col-md-6 col-lg-6' style={{ position: 'absolute', right: '0' }}>
                  <img src={image} alt='Cinque Terre' className='show-img' />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color='primary'>
              EXIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ProjectDetail.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectDetail)
