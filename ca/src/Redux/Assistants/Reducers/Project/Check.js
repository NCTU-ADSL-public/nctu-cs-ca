import { handleActions } from 'redux-actions'

const initialState = {
    checks: [{
      id: "0616014",
      name: "楊",
      semester: '107-2',
      first_second: "1",
      research_title: "test"
    },{
      id: "0616015",
      name: "楊",
      semester: '107-2',
      first_second: "2",
      research_title: "test"
    },{
      id: "0616014",
      name: "楊",
      semester: '107-2',
      first_second: "3",
      research_title: "test"
    }],
    input: ''
}

export default handleActions({
    CHECK_HANDLE_CHANGE: (state, action) => ({ 
      ...state,
      ...action.payload
    }),

}, initialState)
