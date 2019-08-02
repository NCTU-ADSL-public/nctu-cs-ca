
import { handleActions } from 'redux-actions'
// import { FETCHING_STATUS } from '../../../../Utilities/constant'

const initialState = {
  detail: {
    data: [],
    overview: {}
  },
  english: {
    check: 0
  },
  getReview: {
    check: 0,
    generalCourseSelect: 0,
    professionalField: 0
  },
  sendReview: {
  },
  moveCourse: {
    targets: [],
    success: false
  },
  assistant: {
    idCard: {},
    using: false
  }
}

export default handleActions({
  GRADUATION: {
    DETAIL: {
      STORE: (state, action) => {
        let newData = [ ...action.payload ]
        let newOverview = { ...newData[newData.length - 1] }
        newData.length = newData.length - 1

        return ({ ...state, detail: {
          data: newData,
          overview: newOverview
        }})
      }
    },
    ENGLISH: {
      STORE: (state, action) => ({ ...state, english: {
        ...state.english,
        check: action.payload
      }})
    },
    GET_REVIRW: {
      STORE: (state, action) => ({ ...state, getReview: {
        ...state.getReview,
        check: action.payload.check.state,
        generalCourseSelect: action.payload.general_course.type,
        professionalField: action.payload.professional_field
      }})
    },
    SEND_REVIRW: {
      STORE: (state, action) => ({ ...state, getReview: {
        ...state.getReview,
        check: action.payload.check.state,
        generalCourseSelect: action.payload.general_course.type
      }})
    },
    MOVE_COURSE: {
      STORE: (state, action) => ({ ...state, moveCourse: {
        ...state.moveCourse,
        targets: action.payload
      }}),
      SET_SUCCESS: (state, action) => ({ ...state, moveCourse: {
        ...state.moveCourse,
        successs: action.payload
      }})
    },
    ASSISTANT: {
      STORE: (state, action) => ({ ...state, assistant: {
        ...state.assistant,
        idCard: action.payload,
        using: true
      }})
    }
  }
}, initialState)
