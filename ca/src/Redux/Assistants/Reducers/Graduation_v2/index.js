import { handleActions } from 'redux-actions'

const initialState = {
  students: []
}
export default handleActions({
  STORE_GRADUATE_DETAIL: (state, action) => ({ ...state,
    students: action.payload
  })
}, initialState)
