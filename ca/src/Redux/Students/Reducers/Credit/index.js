import { handleActions } from 'redux-actions'

const initialState = {
  courseCreditChange: {
    student_id: '', // 可能需要
    year: '',
    phone: '',
    semester: '',
    department: '', // 原課程的depart
    teacher: '', // 原課程teacher
    course_name_old: '', // 可能需要
    course_code_old: '', // 可能需要
    course_name: '',
    course_code: '',
    course_type: '必修',
    credit: '', // 可能需要(新課程的credit)
    reason: ''
  },
  englishCourse: {
    apply_year: '',   
    apply_semester: '',
    phone: '',
    reason: '',
    department: '',
    teacher: '',
    course_code: '',
    course_name: ''
  }
}

export default handleActions({
  COURSE_CREDIT_CHANGE: (state, action) => ({
    ...state,
    courseCreditChange: {
      ...state.courseCreditChange,
      ...action.payload
    }
  }),
  ENGLISH_COURSE_CREDIT_CHANGE: (state, action) => ({
    ...state,
    englishCourse: {
      ...state.englishCourse,
      ...action.payload
    }
  })
}, initialState)
