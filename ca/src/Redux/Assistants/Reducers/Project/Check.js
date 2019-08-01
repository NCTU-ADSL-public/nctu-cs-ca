import { handleActions } from 'redux-actions'

const initialState = {
    checks: [],
    input: ''
}

export default handleActions({
    CHECK_HANDLE_CHANGE: (state, action) => ({ 
      ...state,
      ...action.payload
    }),

}, initialState)
