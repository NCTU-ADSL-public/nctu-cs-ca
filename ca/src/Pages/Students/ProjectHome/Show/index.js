import './style.css'
import img from './19078_en_1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'

export default class Show extends React.Component {

  render () {
    return (
      <div className='container'>
        <div className=' col-md-12 offset-1'>
        <div className='banner-wrapper'>
          <Image
            alt='Banner with text'
            src={img}
            responsive
            rounded
          />
        </div>
        <div className='event-title'>{ this.props.show.title }</div>
        <div className='event-info-wrapper bg-white'>
          <div className='row'>
            <div className='col-7'>
              <p><i className='fa fa-share-alt' /> 團隊網站: <a target={this.props.show.url} style={{cursor: 'pointer'}}>{this.props.show.url}</a></p>
            </div>
          </div>
          <p style={{borderBottom: '1px solid #d2d2d2', paddingBottom: '12px'}}>專題簡介</p>
          <section dangerouslySetInnerHTML={{__html: this.props.show.introduce}} />
        </div>
        </div>
      </div>
    )
  }


}
