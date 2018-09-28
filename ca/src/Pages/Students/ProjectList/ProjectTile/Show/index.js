import './style.css'
import img from './1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'
import Vedios from './Vedio.json'

export default class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      link: Vedios.filter(t => t.title === this.props.show.research_title && t.link !== undefined && t.link !== '')[0]
    }
  }
  render () {
    return (
      <div className='container'>
        <div className=' col-md-12 offset-1'>
          <div className='banner-wrapper'>
            <Image
              alt='無圖片'
              width='1200' height='400'
              src={this.props.show.image !== 'undefined'
                ? this.props.image === '' ? this.props.show.image : this.props.image
                : img}
              responsive
              rounded
            />
          </div>
          <div className='event-title'>{ this.props.show.research_title }</div>
          <div className='event-info-wrapper bg-white'>
            <div className='row'>
              <div className='col-7'>
                <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.file === '' ? this.props.show.file : this.props.file} style={{ cursor: 'pointer' }}>點這裡</a></p>
                <p><i className='glyphicon glyphicon-user' /> 指導教授: {this.props.show.tname}</p>
                <p><i className='glyphicon glyphicon-pencil' /> 年度: {this.props.show.semester}</p>
                <p><i className='glyphicon glyphicon-bullhorn' /> 分數: {this.props.show.score}</p>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-7'>
                <p><i className='glyphicon glyphicon-film' /> 影片(由專題二教授拍攝): </p>
              </div>
            </div>
            {this.state.link !== undefined
              ? <iframe src={this.state.link.link} width='640' height='480' />
              : ''}
            <div className='divide-horizontal '>
              <div className='divide-horizontal-span'>
                <p >專題簡介</p>
              </div>
            </div>
            <section dangerouslySetInnerHTML={{ __html: this.props.show.intro }} />
            <div className='pull-right'>
              <button className='btn btn-primary nav-button' onClick={this.props.onclick}>
                編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
