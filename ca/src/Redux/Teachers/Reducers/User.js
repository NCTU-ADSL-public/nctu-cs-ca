import {handleActions } from 'redux-actions'

const initalState = {
  type: 'teacher', // for Navbar
  idCard: {
    name: '資料錯誤',
    status: '',
    id: ''
  }
}

export default handleActions({
  updateUserInfo: (state,action)=>({...state,idCard: action.payload})
},initalState)