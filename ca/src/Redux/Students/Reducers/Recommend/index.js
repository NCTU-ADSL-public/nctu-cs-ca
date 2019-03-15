import { handleActions } from 'redux-actions'

const initialState = {
  recommendCourses: [],
  popularCourses: []
}

export default handleActions({
  STORE_RECOMMEND_COURSES: (state, action) => ({ ...state, recommendCourses: action.payload }),
  STORE_POPULAR_COURSES: (state, action) => ({ ...state, popularCourses: action.payload }),
  UPDATE_RATING: (state, action) => {
    let index = action.payload
    let updated = [...state.recommendCourses]
    updated[index].rating = true
    return { ...state, recommendCourses: updated }
  }
}, initialState)
