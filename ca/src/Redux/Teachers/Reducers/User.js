import {handleActions } from 'redux-actions'

const initalState = {
  type: 'teacher', // for Navbar
  idCard: {
    name: '資料錯誤',
    status: '',
    id: '001',
    mail:'test@gmail.com'
  }
}

export default handleActions({
  updateUserInfo: (state,action)=>({...state,idCard: action.payload})
},initalState)