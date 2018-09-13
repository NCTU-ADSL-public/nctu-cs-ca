import { handleActions } from 'redux-actions'

const initialState = {
  teachers: []
}
export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload
  })
}, initialState)
