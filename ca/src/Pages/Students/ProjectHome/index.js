import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import img from './goodwp.com-32744.jpg'

import RaisedButtonImage from './Components/UploadeImageButton'
import InfoEditor from "./Components/InfoEditor"

import PageWrapper from '../../../Components/PageWrapper'

export default class index extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      title:'NCTUCS BOT',
      link:'/ttt',
      introduce:'<h1>Hey</h1><br/><br/><br/><br/><br/>'
    }
  }

  fetchData(){
  }

  async componentWillMount(){
    await this.fetchData();
  }

  async componentWillReceiveProps(nextProps){
  }

  searchCallback = (item) => {
  }

  render () {

    return (
      <PageWrapper>
        <div className='container'>
          <div className='banner-wrapper'>
            <img
              alt='Banner with text'
              width='100%'
              src={img}
            />
          </div>
          <span className='event-title'>{ this.state.title }</span>
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
        <div className='fixed-menu fixed'>
          <div className='container'>
            <div className='pull-left'>
              <Link className='flat-link' to={this.state.link}>
                <button className='btn btn-primary nav-button' >
                  編輯
                </button>
              </Link>
              <button className='btn btn-danger nav-button' >
                刪除
              </button>
            </div> :
            <div> </div>
          </div>
          <RaisedButtonImage />
          <InfoEditor />
        </div>
      </PageWrapper>
    )
  }
}


