import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')

export const fetchTeachers = () => dispatch => {
  // http:/localhost:3001/teachers
  axios.get('/assistants/project/ProResearchList').then( res => {
    dispatch(store_teachers(res.data))
  }).catch( err => {
    console.log(err)
  })
}
