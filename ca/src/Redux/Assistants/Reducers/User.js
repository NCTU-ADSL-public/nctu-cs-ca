import {handleActions } from 'redux-actions'

const initalState = {
  type: 'assistant', // for Navbar
  idCard: {
    name: '小翠',
    prog: '助理',
    grad: '',
    id: 'T1234'
  }
}

export default handleActions({
  updateUserInfo: (state,action)=>({...state,idCard: action.payload})
},initalState)
