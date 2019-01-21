import React from 'react'
import { Link } from 'react-router-dom'
import img0 from '../../../Resources/index01.jpg'
import img1 from '../../../Resources/index02.png'
import img2 from '../../../Resources/index03.png'
import img3 from '../../../Resources/index04.png'
import './Home.css'

class Mentor extends React.Component {
  render () {
    return (
      <div className='home-image-adjust'>
        <Link to='/students/grad'>
          <img alt='' src={img2} className='image' />
        </Link>
        <Link to='/students/map'>
          <img alt='' src={img0} className='image' />
        </Link>
        <img alt='' src={img1} className='image' />
        <img alt='' src={img3} className='image' />
      </div>
    )
  }
}

export default Mentor
