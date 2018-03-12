import React from 'react'
import img0 from '../../../Resources/index01.jpg'
import img1 from '../../../Resources/index02.png'
import img2 from '../../../Resources/index03.png'
import img3 from '../../../Resources/index04.png'
import './Home.css'
// import Snow from 'react-snow-effect'

class Home extends React.Component {
  render () {
    return (
      <div >
        <img style={{cursor: 'pointer'}} src={img0} className='image' onClick={() => this.props.parentFunction(2)} />
        <img style={{cursor: 'pointer'}} src={img1} className='image' onClick={() => this.props.parentFunction(2)} />
        <img style={{cursor: 'pointer'}} src={img2} className='image' onClick={() => this.props.parentFunction(1)} />
        <img src={img3} className='image' />
      </div>
    )
  }
}

export default Home
