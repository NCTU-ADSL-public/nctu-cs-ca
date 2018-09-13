import { handleActions } from 'redux-actions'

// INITIALIZATIONS FOR REDUCERS, WHICH IS GOING TO TAKE ACTIONS
const initialState = {
  type: 'teacher', // for Navbar
  idCard: {
    tname: '資料錯誤(教授)',
    status: '',
    teacher_id: '001',
    mail: 'test@gmail.com'
  }
}

export default handleActions({
  UPDATE_USER_INFO: (state, action) => {
    console.log('UPDATE_USER_INFO ACTION: ', {...state, idCard: {...action.payload}})
    return ({...state, idCard: {...action.payload}})
  }
}, initialState)
