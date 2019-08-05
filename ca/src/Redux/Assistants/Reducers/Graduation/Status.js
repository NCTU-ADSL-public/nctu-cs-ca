import { handleActions } from 'redux-actions'

const initialState = {
  input: '',
  grade: '',
  students: [],
  page: 0,
  dataPerPage: 20
}

export default handleActions({
  GRADUATION_STATUS_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  })
}, initialState)
