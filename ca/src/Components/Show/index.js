import './style.css'
import img from './1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'
import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAFVgUFaZk23prpVeXTkFvXdUhSXy5xzNU',
  authDomain: 'nctu-csca.firebaseapp.com',
  databaseURL: 'https://nctu-csca.firebaseio.com',
  projectId: 'nctu-csca',
  storageBucket: 'nctu-csca.appspot.com',
  serviceAccount: '../../../../Resources/nctu-csca-firebase-admins.json',
  messagingSenderId: '612862784976'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  let auth = firebase.auth()
  auth.signInWithEmailAndPassword('nctucsca@gmail.com', 'axc3262757')
}
let storageRef = firebase.storage().ref()

export default class Show extends React.Component {
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
                <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.file === '' ? this.props.show.file : this.props.file} style={{cursor: 'pointer'}}>點這裡</a></p>
                <p><i className='glyphicon glyphicon-user' /> 指導教授: {this.props.show.tname}</p>
                <p><i className='glyphicon glyphicon-bullhorn' /> 分數: {this.props.show.score}</p>
              </div>
            </div>
            <br />
            <div className='divide-horizontal '>
              <div className='divide-horizontal-span'>
                <p >專題簡介</p>
              </div>
            </div>
            <section dangerouslySetInnerHTML={{__html: this.props.show.intro}} />
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
