import './style.css'
import img from './19078_en_1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'

export default class Show extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      title:'NCTUCS BOT',
      link:'/ttt',
      introduce:'<h1>Hey</h1><br/><br/><br/><br/><br/>'
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='banner-wrapper'>
          <Image
            alt='Banner with text'
            src={img}
            responsive
            rounded
          />
        </div>
        <h1 className='event-title'>{ this.state.title }</h1>
        <div className='event-info-wrapper bg-white'>
          <div className='row'>
            <div className='col-7'>
              <p><i className='fa fa-share-alt' /> 團隊網站: <a target='blank'>點這裡</a></p>
            </div>
          </div>
          <div className='divide-horizontal'>
            <span>專題簡介</span>
          </div>
          <section dangerouslySetInnerHTML={{__html: this.state.introduce}} />
        </div>

      </div>
    )
  }


}
