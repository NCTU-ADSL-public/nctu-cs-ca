
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

const initialState = {
  list: {
    waive_course: [],
    exempt_course: [],
    compulsory_course: [],
    english_course: []
  },
  waiveCourse: {
    apply_year: 107,
    apply_semester: 2,
    apply_time: '',
    phone: '',
    original_school: '',
    original_department: '',
    original_graduation_credit: '',
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
    apply_year: 107,
    apply_semester: 1,
    apply_time: '',
    phone: '',
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
    apply_time: '',
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
    apply_time: '',
    phone: '',
    reason: '',
    department: '',
    teacher: '',
    credit: '',
    course_code: '',
    course_name: '',
    file: ''
  },
  delete: {
    status: FETCHING_STATUS.IDLE
  },
  edit: {
    status: FETCHING_STATUS.IDLE
  },
  form: {
    error: false
  }
}

export default handleActions({
  CREDIT: {
    LIST: {
      STORE: (state, action) => ({ ...state, list: action.payload })
    },
    WAIVE_COURSE: {
      STORE: (state, action) => ({ ...state, waiveCourse: {
        ...state.waiveCourse,
        ...action.payload
      }})
    },
    EXEMPT_COURSE: {
      STORE: (state, action) => ({ ...state, exemptCourse: {
        ...state.exemptCourse,
        ...action.payload
      }})
    },
    COMPULSORY_COURSE: {
      STORE: (state, action) => ({ ...state, compulsoryCourse: {
        ...state.compulsoryCourse,
        ...action.payload
      }})
    },
    ENGLISH_COURSE: {
      STORE: (state, action) => ({ ...state, englishCourse: {
        ...state.englishCourse,
        ...action.payload
      }})
    },
    EDIT: {
      SET_STATUS: (state, action) => ({ ...state, edit: {
        ...state.edit,
        status: action.payload
      }})
    },
    DELETE: {
      SET_STATUS: (state, action) => ({ ...state, delete: {
        ...state.delete,
        status: action.payload
      }})
    },
    FORM: {
      RESET: (state, action) => ({ ...state,
        waiveCourse: initialState.waiveCourse,
        exemptCourse: initialState.exemptCourse,
        compulsoryCourse: initialState.compulsoryCourse,
        englishCourse: initialState.englishCourse
      }),
      SET_ERROR: (state, action) => ({ ...state, form: {
        ...state.form,
        error: action.payload
      }})
    }
  }
}, initialState)
