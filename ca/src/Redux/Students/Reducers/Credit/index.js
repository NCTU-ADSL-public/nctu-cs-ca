import { handleActions } from 'redux-actions'

const initialState = {
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
  creditInfo: {
    "waive_course": [
    {
      "phone": "0912345678",
      "original_school": "清華大學",
      "original_department": "資工系",
      "current_school": "交通大學",
      "current_department": "資工系",
      "original_graduation_credit": 128,
      "apply_year": 106,
      "apply_semester": 2,
      "original_course_year": "二",
      "original_course_semester": "下",
      "original_course_name": "機率",
      "original_course_department": "資工系",
      "original_course_credit": 3,
      "original_course_score": 80,
      "current_course_code": "EC4313",
      "current_course_name": "機率",
      "current_course_credit": 3,
      "file": "https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0416000%2F%5Bobject%20File%5D?alt=media&token=a784f690-62a1-4465-8e21-bbe36e9194d1",
      "status": 0
    }
  ],
  "exempt_course": [
    {
      "phone": "0912345678",
      "apply_year": 106,
      "apply_semester": 2,
      "original_course_year": "二",
      "original_course_semester": "下",
      "original_course_name": "機率",
      "original_course_department": "資工系",
      "original_course_credit": 3,
      "original_course_score": 80,
      "current_course_code": "EC4313",
      "current_course_name": "機率",
      "current_course_credit": 3,
      "file": "https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0416000%2F%5Bobject%20File%5D?alt=media&token=a784f690-62a1-4465-8e21-bbe36e9194d1",
      "status": 1
    }
  ],
  "compulsory_course": [
    {
      "apply_year": 107,
      "apply_semester": 1,
      "phone": "0912345678",
      "reason": "系上課很糞",
      "department": "電機",
      "teacher": "高榮鴻",
      "course_code": "UEE2104",
      "course_name": "機率(英文班)",
      "original_course_code": "UEE2104",
      "original_course_name": "機率(英文班)",
      "credit": 3,
      "file": "https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0416000%2F%5Bobject%20File%5D?alt=media&token=a784f690-62a1-4465-8e21-bbe36e9194d1",
      "status": 1
    }
  ],
  "english_course": [
    {
      "apply_year": 107,
      "apply_semester": 1,
      "phone": "0912345678",
      "reason": "系上課很糞",
      "department": "電機",
      "teacher": "高榮鴻",
      "course_code": "UEE2104",
      "course_name": "機率(英文班)",
      "file": "https://firebasestorage.googleapis.com/v0/b/nctu-csca.appspot.com/o/credit%2F0416000%2F%5Bobject%20File%5D?alt=media&token=a784f690-62a1-4465-8e21-bbe36e9194d1",
      "status": 2
    }
  ]
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
  })
}, initialState)
