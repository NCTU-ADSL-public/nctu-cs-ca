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
    const { classes } = this.props
    return (
      <div className='container' style={{fontSize: '15px', marginTop: '20px'}}>
        <div className='hidden-md hidden-lg'>
          <img src={this.props.show.photo !== '' ? this.props.show.photo : img} alt='Cinque Terre' className='img-responsive' />
          <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a target='_blank' rel='noopener noreferrer' href={this.props.file === '' ? '' : this.props.file} style={{cursor: 'pointer'}}>點這裡</a></p>
          <p><i className='glyphicon glyphicon-user' /> 指導教授: {this.props.show.tname}</p>
          <p><i className='glyphicon glyphicon-pencil' /> 年度: {this.props.show.semester}</p>
          <p><i className='glyphicon glyphicon-bullhorn' /> 分數: {this.props.show.score}</p>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5' style={{marginTop: '5px'}}>
          <br />
          <div className='divide-horizontal row'>
            <div className='divide-horizontal-span'>
              <p >專題簡介</p>
            </div>
          </div>
          <section dangerouslySetInnerHTML={{__html: this.props.show.intro}} style={{minHeight: '500px'}} />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{height: '100px'}} />
        <div className='hidden-xs hidden-sm col-md-6 col-lg-6' style={{position: 'absolute', right: '0'}}>
          <img src={this.props.show.photo !== '' ? this.props.show.photo : img} alt='Cinque Terre' className='show-img' />
          <p><i className='glyphicon glyphicon-file' /> 團隊報告: {this.props.show.file === '' ? '無' : <a target='_blank' rel='noopener noreferrer' href={this.props.show.file} style={{cursor: 'pointer'}}>點這裡</a>}</p>
          <p><i className='glyphicon glyphicon-user' /> 指導教授: {this.props.show.tname}</p>
          <p><i className='glyphicon glyphicon-pencil' /> 年度: {this.props.show.semester}</p>
          <p><i className='glyphicon glyphicon-bullhorn' /> 分數: {this.props.show.score}</p>
        </div>
      </div>
    )
  }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Show)
