import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  input: ''
}

export default handleActions({
  SCORE_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  }),
}, initialState)
