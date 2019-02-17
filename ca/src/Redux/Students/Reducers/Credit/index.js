import { handleActions } from 'redux-actions'

const initialState = {
  errorsubmitted: false,
  waiveCourse: {
    class: '',
    phone: '',
    original_school: '',
    original_department: '',
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
    current_course_type: '請選擇選別',
    file: ''
  },
  exemptCourse: {
    class: '',
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
    current_course_type: '請選擇選別',
    file: ''
  },
  compulsoryCourse: {
    apply_year: '',
    apply_semester: '',
    phone: '',
    department: '',
    teacher: '',
    credit: '',
    original_course_name: '',
    original_course_code: '',
    original_course_credit: '',
    course_year: '',
    course_semester: 0,
    course_name: '',
    course_code: '',
    reason: {
      type: '被當',
      content: ''
    },
    file: ''
  },
  englishCourse: {
    apply_year: '',
    apply_semester: '',
    phone: '',
    reason: '',
    department: '',
    teacher: '',
    credit: '',
    course_code: '',
    course_name: '',
    file: ''
  },
  creditInfo: {
    waive_course: [],
    exempt_course: [],
    compulsory_course: [],
    english_course: []
  },
  delete: {
    status: 'idle'
  },
  edit: {
    status: 'idle'
  }
}

export default handleActions({
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
  SET_DELETE_STATUS: (state, action) => ({
    ...state,
    delete: {
      ...state.delete,
      ...action.payload
    }
  }),
  SET_EDIT_STATUS: (state, action) => ({
    ...state,
    edit: {
      ...state.edit,
      ...action.payload
    }
  }),
  STORE_CREDIT_INFO: (state, action) => ({
    ...state,
    creditInfo: action.payload
  }),
  RESET_COURSE: (state, action) => ({
    ...state,
    waiveCourse: initialState.waiveCourse,
    exemptCourse: initialState.exemptCourse,
    compulsoryCourse: initialState.compulsoryCourse,
    englishCourse: initialState.englishCourse
  }),
  ERROR_SUBMIT: (state, action) => ({
    ...state,
    errorsubmitted: action.payload
  })
}, initialState)
