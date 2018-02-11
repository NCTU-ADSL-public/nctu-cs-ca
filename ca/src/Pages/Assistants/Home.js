import React from 'react'
import index from '../../Resources/DSC03961.png'

const img = index

class Home extends React.Component {
  render () {
    return (
      <div >
        <img src={img} width='100%' style={{margin: '-150px 0 0 0'}} alt='' />
      </div>
    )
  }
}

export default Home
