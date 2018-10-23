import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  filter_select: 'ALL',
  filter_string: '',
  status: 'IDLE',
  research_status: '1',
  mentor: '',
  project_number: '0',
  page: 1
}

export default handleActions({
  FETCH_PROFESSORS_START: (state) => ({ ...state, status: 'FETCH' }),
  FETCH_PROFESSORS_DONE: (state) => ({ ...state, status: 'DONE' }),
  STORE_PROFESSORS: (state, action) => ({ ...state, data: action.payload }),
  FILTER_INPUT: (state, action) => ({ ...state, filter_string: action.payload }),
  CHANGE_PAGE: (state, action) => ({ ...state, page: action.payload }),
  STORE_RESEARCH_STATUS: (state, action) => ({ ...state, research_status: action.payload }),
  STORE_PROFESSOR_MENTOR: (state, action) => ({ ...state, mentor: action.payload[0].tname }),
  CHANGE_PROJECT_NUMBER: (state, action) => ({ ...state, project_number: action.payload }),
  STORE_IMAGE: (state, action) => {
    let newdata = state.data
    let index = newdata.findIndex(x => { return x.tname === action.payload.tname })
    newdata[index] = { ...newdata[index], photo: action.payload.url }
    return {
      ...state,
      data: [...newdata]
    }
  }
}, initialState)
