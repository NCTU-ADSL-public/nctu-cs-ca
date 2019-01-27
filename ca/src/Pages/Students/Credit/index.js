import React from 'react'
import { Link } from 'react-router-dom'
import Dog from '../../../Resources/dog.jpg'

class Index extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='col-12 text-center' style={{ fontSize: '40px' }}>
          <div style={{ marginBottom: '100px' }}>抵免表單管理</div>
          <div className='row'>
            <div className='col-sm-12 col-md-6' style={{ fontSize: '20px' }}>
              <Link to='/students/credit/status'>
                <img id='dino-img' src={Dog} alt='' />
                <div>表單狀態</div>
              </Link>
            </div>
            <div className='col-sm-12 col-md-6' style={{ fontSize: '20px' }}>
              <Link to='/students/credit/apply'>
                <img id='dino-img' src={Dog} alt='' />
                <div>抵免申請</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
