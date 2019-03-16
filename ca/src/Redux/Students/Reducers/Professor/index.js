
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

const initialState = {
  data: [],
  filter: {
    name: '',
    scount: 7
  },
  status: FETCHING_STATUS.IDLE,
  status_mail: FETCHING_STATUS.IDLE,
  mentor: '',
  past_projects: []
}

export default handleActions({
  SET_STATUS: (state, action) => ({ ...state, status: action.payload }),
  SET_MAIL_STATUS: (state, action) => ({ ...state, status_mail: action.payload }),
  STORE_PROFESSORS: (state, action) => ({ ...state, data: action.payload }),
  STORE_PROFESSOR_MENTOR: (state, action) => ({ ...state, mentor: action.payload[0].tname }),
  STORE_PAST_PROJECTS: (state, action) => ({ ...state, past_projects: action.payload }),
  UPDATE_FILTER: (state, action) => ({ ...state, filter: { ...state.filter, ...action.payload } }),
  STORE_IMAGE: (state, action) => {
    let newdata = state.data
    let index = newdata.findIndex(x => { return x.tname === action.payload.tname })
    newdata[index] = { ...newdata[index], photo: action.payload.url }
    return {
      ...state,
      data: [...newdata]
    }
  }
}, initialState)
