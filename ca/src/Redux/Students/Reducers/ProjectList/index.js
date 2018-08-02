import { handleActions } from 'redux-actions'

const initialState = {
  data: []
}

export default handleActions({
  STORE_PROJECTS: (state, action) => ({...state, data: [...action.payload]}),
  STORE_PROJECT_IMAGE: (state, action) => {
    let newdata = state.data
    let index = newdata.findIndex(x => { return x.research_title === action.payload.researchTitle && x.semester === action.payload.semester })
    newdata[index] = {...newdata[index], photo: action.payload.url}
    return {
      ...state,
      data: [...newdata]
    }
  },
  STORE_PROJECT_FILE: (state, action) => {
    let newdata = state.data
    let index = newdata.findIndex(x => { return x.research_title === action.payload.researchTitle && x.semester === action.payload.semester })
    newdata[index] = {...newdata[index], file: action.payload.url}
    return {
      ...state,
      data: [...newdata]
    }
  },
  UPDATE_PROJECT: (state, action) => {
    let newdata = state.data
    let index = newdata.findIndex(x => { return x.research_title === action.payload.researchTitle && x.semester === action.payload.semester })
    newdata[index] = {...newdata[index], intro: action.payload.intro}
    return {
      ...state,
      data: [...newdata]
    }
  }
}, initialState)
