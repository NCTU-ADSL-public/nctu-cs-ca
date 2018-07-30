import './style.css'
import img from './1.jpg'
import React from 'react'
import Divider from '@material-ui/core/Divider'

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
    zIndex: 100
  },
  large: {
    width: 100,
    height: 100,
    padding: 30
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export default class Show extends React.Component {
  render () {
    return (
      <div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <img src={this.props.image !== undefined ? this.props.image : img} className='img-responsive' alt='Cinque Terre' />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <div className='row'>
            <div className='col-7'>
              {/* <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.file === '' ? this.props.show.file : this.props.file} style={{cursor: 'pointer'}}>點這裡</a></p> */}
            </div>
          </div>
          <br />
          <div className='divide-horizontal '>
            <div className='divide-horizontal-span'>
              <p >專題簡介</p>
            </div>
          </div>
          <section dangerouslySetInnerHTML={{__html: this.props.show.intro}} />
        </div>
      </div>
    )
  }
}
