import { handleActions } from 'redux-actions'

const initialState = {
    checks: [{
      id: "0616014",
      name: "楊",
      first_second: "1"
    },{
      id: "0616015",
      name: "楊",
      first_second: "2"
    },{
      id: "0616014",
      name: "楊",
      first_second: "3"
    }],
    input: ''
}

export default handleActions({
    CHECK_HANDLE_CHANGE: (state, action) => ({ 
      ...state,
      ...action.payload
    }),

}, initialState)
