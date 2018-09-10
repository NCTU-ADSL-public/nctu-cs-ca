import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')

export const fetchTeachers = (post_item) => dispatch => {
  axios.post('/assistants/project/ProResearchList', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_teachers(res.data))
  }).catch( err => {
    console.log(err)
  })
}
