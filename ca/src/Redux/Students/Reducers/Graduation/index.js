import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  printdata: [],
  check: 0,
  englishCheck: false,
  status: 'IDLE',
  overview: {}
}

export default handleActions({
  FETCH_DONE: (state) => ({ ...state, status: 'DONE' }),
  FETCH_START: (state) => ({ ...state, status: 'START' }),
  SHOW_GRAD_PRINT: (state, action) => ({ ...state, printdata: action.payload }),
  SHOW_GRAD_ENGLISH_TEST_CHECK: (state, action) => ({ ...state, englishCheck: action.payload }),
  SHOW_GRAD_CHECK: (state, action) => ({ ...state, check: action.payload }),
  STORE_GRADUATION_COURSE: (state, action) => {
    let newdata = action.payload
    let newoverview = { ...newdata[newdata.length - 1] }
    newdata.length = newdata.length - 1
    return {
      ...state,
      data: [...newdata],
      overview: { ...newoverview },
      status: 'DONE'
    }
  },
  UPDATE_COURSE: (state, action) => {
    let newdata = state.data
    let indexRef = action.payload
    let indexFrom = newdata.findIndex(x => { return x.title === indexRef.from })
    let indexEnd = newdata.findIndex(x => { return x.title === indexRef.end })
    let indexCourse = newdata[indexFrom].course.findIndex(x => { return x.cn === indexRef.course })
    let swap = { ...newdata[indexFrom].course[indexCourse] }
    newdata[indexEnd].course = [...newdata[indexEnd].course, { ...swap }]
    newdata[indexFrom].course.splice(indexCourse, 1)
    return {
      ...state,
      data: [...newdata]
    }
  }
}, initialState)
