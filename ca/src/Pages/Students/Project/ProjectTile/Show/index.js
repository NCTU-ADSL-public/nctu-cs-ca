
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import './style.css'
import img from './1.jpg'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  progress: {
    position: 'relative',
    color: '#5D4037'
  }
})

class Show extends React.Component {
  constructor (props) {
    super(props)
    this.getFile = this.getFile.bind(this)
  }

  getFile () {
    const { file } = this.props.data
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
    const { classes, data } = this.props
    // 太舊的資料是書面申請 所以agree是undefined
    const isAgreed = (data.agree === '1' || data.agree === undefined)
    const projectImg = (data.photo !== '' || data.photo === 'loading') ? data.photo : img
    return (
      <div className='container' style={{ fontSize: '15px', marginTop: '20px' }}>
        <div className='hidden-md hidden-lg'>
          {
            isAgreed
              ? <CircularProgress className={classes.progress} />
              : <img src={projectImg} alt='waiting for loading' className='img-responsive' />
          }
          <p><i className='glyphicon glyphicon-file' />團隊報告: { this.getFile() }</p>
          <p><i className='glyphicon glyphicon-user' />指導教授: { data.tname }</p>
          <p><i className='glyphicon glyphicon-pencil' />年度: { data.semester }</p>
          <p><i className='glyphicon glyphicon-bullhorn' />分數: { data.score }</p>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5' style={{ marginTop: '5px' }}>
          <br />
          <div className='divide-horizontal row'>
            <div className='divide-horizontal-span'>
              <p>專題簡介</p>
            </div>
          </div>
          <section dangerouslySetInnerHTML={{ __html: data.intro }} style={{ minHeight: '500px' }} />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{ height: '100px' }} />
        <div className='hidden-xs hidden-sm col-md-6 col-lg-6' style={{ position: 'absolute', right: '0' }}>
          {
            isAgreed
              ? <CircularProgress className={classes.progress} />
              : <img src={projectImg} alt='waiting for loading' className='img-responsive' />
          }
          <p><i className='glyphicon glyphicon-file' />團隊報告: { this.getFile() }</p>
          <p><i className='glyphicon glyphicon-user' />指導教授: { data.tname }</p>
          <p><i className='glyphicon glyphicon-pencil' />年度: { data.semester }</p>
          <p><i className='glyphicon glyphicon-bullhorn' />分數: { data.score }</p>
        </div>
      </div>
    )
  }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Show)
