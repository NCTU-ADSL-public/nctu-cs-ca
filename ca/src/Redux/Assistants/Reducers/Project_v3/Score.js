import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  csvData: []
}
export default handleActions({
  STORE_SCORES: (state, action) => ({ ...state,
    scores: action.payload
  }),
  STORE_SCORE_CSV_DATA: (state, action) => ({ ...state,
    csvData: action.payload
  })
}, initialState)
