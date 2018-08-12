import { handleActions } from 'redux-actions'

const initialState = {
  CourseMap: [],
  CoursePass: [],
  CoursePrint: [],
  status: 'IDLE'
}

export default handleActions({
  STORE_COURSE_PASS: (state, action) => ({ ...state, CoursePass: action.payload }),
  STORE_COURSE: (state, action) => ({ ...state, CourseMap: action.payload }),
  SHOW_COURSE_CONDITION: (state) => {
    let newCourseMap = [...state.CourseMap]
    if (newCourseMap[0].completed !== undefined) {
      return ({...state, status: 'CONDITION'})
    }
    for (let i = 0; i < newCourseMap.length; ++i) {
      let flag = state.CoursePass.findIndex(t => newCourseMap[i].cos_cname === t.cos_cname)
      if (flag === -1) {
        newCourseMap[i] = {...newCourseMap[i], completed: false}
      } else {
        newCourseMap[i] = {...newCourseMap[i], completed: true}
      }
    }
    return ({...state, CourseMap: newCourseMap, status: 'CONDITION'})
  }
}, initialState)
