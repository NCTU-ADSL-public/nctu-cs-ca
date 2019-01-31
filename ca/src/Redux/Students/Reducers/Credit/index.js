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
    reason: '',
    file: ''
  },
  englishCourse: {
    apply_year: '',
    apply_semester: '',
    phone: '',
    reason: '',
    department: '',
    teacher: '',
    course_code: '',
    course_name: '',
    file: ''
  },
  waiveCourse: {
    phone: '',
    original_school: '',
    original_department: '',
    current_school: '',
    current_department: '',
    original_graduation_credit: '',

    apply_year: 0,
    apply_semester: 0,
    original_course_name: '',
    original_course_department: '',
    original_course_credit: '',
    original_course_score: '',
    current_course_code: '',
    current_course_credit: ''
  },
  creditInfo: {}
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
  }),
  ENGLISH_COURSE_CREDIT_RESET: (state, action) => ({
    ...state,
    englishCourse: initialState.englishCourse
  }),
  WAIVE_COURSE_CHANGE: (state, action) => ({
    ...state,
    waiveCourse: {
      ...state.waiveCourse,
      ...action.payload
    }
  }),
  WAIVE_COURSE_RESET: (state, action) => ({
    ...state,
    waiveCourse: initialState.waiveCourse
  }),
  STORE_CREDIT_INFO: (state, action) => ({
    ...state,
    creditInfo: action.payload
  })
}, initialState)
