import { createAction } from 'redux-actions'
import axios from 'axios'

export const status_handle_change = createAction('GRADUATION_STATUS_HANDLE_CHANGE');

export const statusHandleChange = (payload) => dispatch => {
  dispatch(status_handle_change(payload));
}

export const fetchStatus = (payload) => dispatch => {
  axios.post('/assistants/graduate/studentList', payload).then(res => {
    dispatch(status_handle_change({
      students: res.data
    })) 
  })
}