import React from 'react'
import index from '../../Resources/index+.png'
import './Home.css'
import Snow from 'react-snow-effect'

const img = index
const data = ['丹尼', '丹尼丹尼', '丹尼丹尼丹尼']
class Home extends React.Component {
  render () {
    return (
      <div >
        <Snow />
        <img src={img} className='image' alt='' />
      </div>
    )
  }
}

export default Home
