import { handleActions } from 'redux-actions'

const initialState = {
  compulsoryCourse: {
    apply_year: '',
    apply_semester: '',
    phone: '',
    department: '',
    teacher: '',
    original_course_name: '',
    original_course_code: '',
    course_name: '',
    course_code: '',
    course_type: '必修',
    credit: '',
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
    current_school: '交通大學',
    current_department: '資工系',
    original_graduation_credit: '',
    apply_year: 107,
    apply_semester: 2,
    original_course_year: 0,
    original_course_semester: 0,
    original_course_name: '',
    original_course_department: '',
    original_course_credit: '',
    original_course_score: '',
    current_course_code: '',
    current_course_name: '',
    current_course_credit: '',
    file: ''
  },
  exemptCourse: {
    phone: '',
    apply_year: 107,
    apply_semester: 1,
    original_course_year: 0,
    original_course_semester: 0,
    original_course_name: '',
    original_course_department: '',
    original_course_credit: '',
    original_course_score: '',
    current_course_code: '',
    current_course_name: '',
    current_course_credit: '',
    file: ''
  },
  creditInfo: {
    "compulsory_course": [],
    "english_course": [],
    "waive_course": []
  }
}

export default handleActions({
  COMPULSORY_COURSE_CHANGE: (state, action) => ({
    ...state,
    compulsoryCourse: {
      ...state.compulsoryCourse,
      ...action.payload
    }
  }),
  ENGLISH_COURSE_CHANGE: (state, action) => ({
    ...state,
    englishCourse: {
      ...state.englishCourse,
      ...action.payload
    }
  }),
  WAIVE_COURSE_CHANGE: (state, action) => ({
    ...state,
    waiveCourse: {
      ...state.waiveCourse,
      ...action.payload
    }
  }),
  EXEMPT_COURSE_CHANGE: (state, action) => ({
    ...state,
    exemptCourse: {
      ...state.exemptCourse,
      ...action.payload
    }
  }),
  STORE_CREDIT_INFO: (state, action) => ({
    ...state,
    creditInfo: action.payload
  }),
  RESET_COURSE: (state, action) => ({
    ...state,
    compulsoryCourse: initialState.compulsoryCourse,
    englishCourse: initialState.englishCourse,
    waiveCourse: initialState.waiveCourse,
    exemptCourse: initialState.exemptCourse
  })
}, initialState)
