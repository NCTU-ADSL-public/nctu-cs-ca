import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')

export const fetchTeachers = () => dispatch => {
  // http://localhost:3001/teachers
  // /assistants/project/ProResearchList
  axios.get('http://localhost:3001/teachers').then( res => {
    dispatch(store_teachers(res.data))
  }).catch( err => {
    console.log(err)
  })
}

export const fetchScores = () => dispatch => {
  axios.get
}
