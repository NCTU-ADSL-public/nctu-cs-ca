import { handleActions } from 'redux-actions'

const initialState = {
  input: '',
}

export default handleActions({
  GRADUATION_CHECK_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  })
}, initialState)
