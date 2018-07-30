import { handleActions } from 'redux-actions'

const initalState = {
  type: 'student', // for Navbar
  studentIdcard: {
    sname: '資料錯誤',
    student_id: '0000000',
    program: '網多',
    grade: '大三',
    email: 'hihi@gmail.com'
  }
}

export default handleActions({
  updateUserInfo: (state, action) => ({...state, studentIdcard: action.payload})
}, initalState)
