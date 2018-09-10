import { handleActions } from 'redux-actions'

// INITIALIZATIONS FOR REDUCERS, WHICH IS GOING TO TAKE ACTIONS
const initialState = {
  type: 'teacher', // for Navbar
  idCard: {
    name: '資料錯誤(教授)',
    status: '',
    id: '001',
    email: 'test@gmail.com'
  }
}

export default handleActions({
  UPDATE_USER_INFO: (state, action) => ({...state, idCard: action.payload})
}, initialState)
