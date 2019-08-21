import { handleActions } from 'redux-actions'

const initialState = {
  type: 'student', // for Navbar
  studentIdcard: {
    sname: '資料錯誤',
    student_id: '0416000',
    program: '資工',
    grade: '大三',
    email: 'hihi@gmail.com',
    status: 'w'
  },
  FooterColor: '#6C6C6C'
}

export default handleActions({
  UPDATE_USER_INFO: (state, action) => ({ ...state, studentIdcard: { ...action.payload } }),
  CHANGE_FOOTER_COLOR: (state, action) => {
    return ({ ...state, FooterColor: action.payload })
  },
  STUDENT_UPDATE_IDCARD: (state, action) => {
    return ({ ...state, 
      studentIdCard: {
        ...state.studentIdCard,
        sname: '助理端測試學生帳號',
        student_id: '0416000'
      }
    })
  }
}, initialState)
