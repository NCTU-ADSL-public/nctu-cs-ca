import React from 'react'
import index from '../../../Resources/index+.png'
import './Home.css'
import Snow from 'react-snow-effect'

const img = index
class Home extends React.Component {
  render () {
    return (
      <div >
        <img src={img} className='image' alt='' />
      </div>
    )
  }
}

export default Home
