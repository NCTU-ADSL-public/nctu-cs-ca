
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

const initialState = {
  detail: {
    data: [],
    overview: {},
    status: FETCHING_STATUS.IDLE
  },
  english: {
    check: 0,
    status: FETCHING_STATUS.IDLE
  },
  getReview: {
    check: 0,
    generalCourseSelect: 0,
    professionalField: 0,
    status: FETCHING_STATUS.IDLE
  },
  sendReview: {
    status: FETCHING_STATUS.IDLE
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
    ASSISTANT: {
      STORE: (state, action) => ({ ...state, assistant: {
        ...state.assistant,
        idCard: action.payload,
        using: true
      }})
    }
  }
  
  // STORE_LEGAL_MOVE_TARGET: (state, action) => {
  //   let data = JSON.parse(JSON.stringify(state.data))
  //   let { targets, cn, code, type } = action.payload
  //   let typeId = data.findIndex(x => x.course.find(x => x.cn === cn && x.code === code && x.type === type))
  //   let courseId = data[typeId].course.findIndex(x => x.cn === cn && x.code === code && x.type === type)
  //   let newCourse = data[typeId].course[courseId]
  //   newCourse = { ...newCourse, moveTargets: targets }
  //   data[typeId].course[courseId] = newCourse
  //   //
  //   console.log('------------------- STORE_LEGAL_MOVE_TARGET ----------------------')
  //   console.log(data)
  //   //
  //   return {
  //     ...state,
  //     data
  //   }
  // },
  // UPDATE_COURSE: (state, action) => {
  //   let newdata = state.data
  //   let indexRef = action.payload
  //   let indexFrom = newdata.findIndex(x => { return x.title === indexRef.from })
  //   let indexEnd = newdata.findIndex(x => { return x.title === indexRef.end })
  //   let indexCourse = newdata[indexFrom].course.findIndex(x => { return x.cn === indexRef.course })
  //   let swap = { ...newdata[indexFrom].course[indexCourse] }
  //   newdata[indexEnd].course = [...newdata[indexEnd].course, { ...swap }]
  //   newdata[indexFrom].course.splice(indexCourse, 1)
  //   return {
  //     ...state,
  //     data: [...newdata]
  //   }
  // }
}, initialState)
