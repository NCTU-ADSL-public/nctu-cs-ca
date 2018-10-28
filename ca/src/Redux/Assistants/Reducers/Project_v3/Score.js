import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  csvData: [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
  ]
}
export default handleActions({
  STORE_SCORES: (state, action) => ({ ...state,
    scores: action.payload
  }),
  STORE_SCORE_CSV_DATA: (state, action) => {
    return ({ ...state,
      csvData: action.payload
    })
  }
}, initialState)
