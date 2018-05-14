import React from 'react'
import Show from './Show/index'
import Edit from  './Edit'


import PageWrapper from '../../../Components/PageWrapper'

export default class index extends React.Component {

  constructor (props) {

    super(props);
    this.changeState = this.changeState.bind(this)
    this.state = {
      title:'NCTUCS BOT',
      link:'/ttt',
      introduce:'<h1>Hey</h1><br/><br/><br/><br/><br/>',
      state:'show'
    }
  }

  changeState () {
    let state =  this.state.state === 'edit'?'show':'edit'
    this.setState({
      state:state
    })
  }

  searchCallback = (item) => {
  }

  render () {

    return (
      <PageWrapper>
        {this.state.state === 'edit'?<Edit/>:<Show/>}

        <div className='fixed-menu fixed' style={{display:`${this.state.state === 'edit'?'none':''}`}}>
          <div className='container'>
            <div className='pull-right'>
              <button className='btn btn-primary nav-button' onClick={this.changeState}>
                {this.state.state === 'edit'?'送出':'編輯'}
              </button>
            </div>
            <div> </div>
          </div>
        </div>
      </PageWrapper>
    )
  }
}


