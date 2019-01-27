import React from 'react'
import Dog from './dog.jpg'

class Index extends React.Component {

  state = {
    LoginMessage_state: '0',
  }

  componentWillMount () {
    let keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }

  render () {
    return (
      <div className="container">
        <div className='col-12 text-center' style={{fontSize: '40px'}}>
          <div style={{marginBottom:'100px'}}>抵免表單管理</div>
          <div className='row'>
            <div className='col-sm-12 col-md-6' style={{fontSize: '20px'}}>
              <img id="dino-img" src={Dog} alt='' />
              <div>
                表單狀態
              </div>
            </div>
            <div className='col-sm-12 col-md-6' style={{fontSize: '20px'}}>
              <img id="dino-img" src={Dog} alt='' />
              <div>
                抵免申請
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
