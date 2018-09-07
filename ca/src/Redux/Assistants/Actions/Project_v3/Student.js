import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_students = createAction('STORE_STUDENTS')

export const fetchStudents = (post_item) => dispatch => {
  axios.post('/assistants/project/StudentResearchList', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_students(res.data))
  }).catch( err => {
    console.log(err)
  })
}
