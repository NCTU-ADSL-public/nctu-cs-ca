import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  filter_select: 'ALL',
  filter_string: '',
  status: 'IDLE',
  mentor: '',
}

export default handleActions({
  FETCH_PROFESSORS_START: (state) => ({ ...state, status: 'FETCH' }),
  FETCH_PROFESSORS_DONE: (state) => ({ ...state, status: 'DONE' }),
  STORE_PROFESSORS: (state, action) => ({ ...state, data: action.payload }),
  FILTER_INPUT: (state, action) => ({ ...state, filter_string: action.payload }),
  STORE_IMAGE: (state, action) => {
    console.log(state)
  }
}, initialState)
