import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  filter_select: 'ALL',
  filter_string: '',
  status: 'IDLE',
  overview: {}
}

export default handleActions({
  STORE_GRADUATION_COURSE: (state, action) => {
    let newdata = action.payload
    let newoverview = {...newdata[newdata.length - 1]}
    newdata.length = newdata.length - 1
    console.log(newoverview)
    console.log(newdata)
    return {
      ...state,
      data: [...newdata],
      overview: {...newoverview}
    }
  },
  UPDATE_COURSE: (state, action) => {
    let newdata = state.data
    let indexRef = action.payload
    let indexFrom = newdata.findIndex(x => { return x.title === indexRef.from })
    let indexEnd = newdata.findIndex(x => { return x.title === indexRef.end })
    let indexCourse = newdata[indexFrom].course.findIndex(x => { return x.cn === indexRef.course })
    let swap = {...newdata[indexFrom].course[indexCourse]}
    newdata[indexEnd].course = [...newdata[indexEnd].course, {...swap}]
    console.log(newdata[indexEnd].course)
    newdata[indexFrom].course.splice(indexCourse, 1)
    return {
      ...state,
      data: [...newdata]
    }
  }
}, initialState)
