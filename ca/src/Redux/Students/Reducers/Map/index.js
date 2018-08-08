import { handleActions } from 'redux-actions'

const initialState = {
  CourseMap: [],
  CoursePass: []
}

export default handleActions({
  STORE_COURSE_PASS: (state, action) => ({ ...state, CoursePass: action.payload }),
  STORE_COURSE: (state, action) => ({ ...state, CourseMap: action.payload })
}, initialState)
