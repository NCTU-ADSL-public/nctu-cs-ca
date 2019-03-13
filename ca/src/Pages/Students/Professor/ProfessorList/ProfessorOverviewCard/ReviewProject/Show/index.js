import './style.css'
import img from './1.jpg'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

class Show extends React.Component {
  render () {
    return (
      <div style={{ fontSize: '15px' }}>
        <div className=' hidden-md hidden-lg'>
          <img src={this.props.image !== undefined ? this.props.image : img} alt='Cinque Terre' className='img-responsive' />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5' style={{ marginTop: '5px' }}>
          <div className='row'>
            <p><i className='glyphicon glyphicon-file' /> 團隊報告: {this.props.file === '' ? '無' : <a target='_blank' rel='noopener noreferrer' href={this.props.file} style={{ cursor: 'pointer', marginTop: '5px' }}>點這裡</a>}</p>
          </div>
          <br />
          <div className='divide-horizontal row'>
            <div className='divide-horizontal-span'>
              <p >專題簡介</p>
            </div>
          </div>
          <section dangerouslySetInnerHTML={{ __html: this.props.show.intro }} style={{ minHeight: '500px' }} />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{ height: '100px' }} />
        <div className='hidden-xs hidden-sm col-md-6 col-lg-6' style={{ position: 'absolute', right: '0' }}>
          <img src={this.props.image !== undefined ? this.props.image : img} alt='Cinque Terre' className='show-img' />
        </div>
      </div>
    )
  }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Show)
