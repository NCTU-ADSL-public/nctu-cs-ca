import { handleActions } from 'redux-actions'

const initialState = {
    checks: [],
    input: ''
}

export default handleActions({
    PROJECT_CHECK_HANDLE_CHANGE: (state, action) => ({ 
      ...state,
      ...action.payload
    }),
    CHECK_DELETE: (state, action) => ({
      ...state,
      checks: state.checks.filter( check => check.id != action.payload )
    })
}, initialState)
