import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')
export const update_add_status = createAction('UPDATE_ADD_STATUS')

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

export const setAddStatus = (post_item) => dispatch => {
  axios.post('/assistants/SetAddStatus', post_item).then( res => {
    console.log('setAddStatus');
    console.log('POST_Item')
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
  }).catch( err => {
    console.log(err)
  })
}
export const updateAddStatus = (id) => dispatch => {
  dispatch(update_add_status)
}
