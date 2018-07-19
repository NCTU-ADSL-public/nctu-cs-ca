import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  filter_select: 'ALL',
  filter_string: '',
  status: 'IDLE',
  overview: {}
}

export default handleActions({
  STORE_GRADUATION_COURSE: (state, action) => {
    let newdata = action.payload
    let newoverview = {...newdata[newdata.length - 1]}
    newdata.length = newdata.length - 1
    console.log(newoverview)
    console.log(newdata)
    return {
      ...state,
      data: [...newdata],
      overview: {...newoverview}
    }
  }
}, initialState)
