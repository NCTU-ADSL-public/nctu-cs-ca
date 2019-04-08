import { handleActions } from 'redux-actions'

const initialState = {
  students: []
}

export default handleActions({
  STORE_STUDENTS: (state, action) => ({ ...state,
    students: action.payload
  })
}, initialState)
