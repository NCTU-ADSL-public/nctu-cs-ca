import { handleActions } from 'redux-actions'

const initialState = {
  scores: []
}
export default handleActions({
  STORE_SCORES: (state, action) => ({ ...state,
    scores: action.payload
  })
}, initialState)
