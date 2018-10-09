import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')
export const update_add_status = createAction('UPDATE_ADD_STATUS')
export const update_first_second = createAction('UPDATE_FIRST_SECOND')
export const delete_research = createAction('DELETE_RESEARCH')

export const fetchTeachers = (post_item) => dispatch => {
  axios.post('/assistants/project/ProResearchList', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(store_teachers(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const setAddStatus = (post_item) => dispatch => {
  axios.post('/assistants/SetAddStatus', post_item).then(res => {
    console.log('setAddStatus')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    if (res.data.signal === 1) {
      dispatch(update_add_status(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

      // dispatch(update_add_status(post_item.student_id))
  })
}

export const setFirstSecond = (post_item) => dispatch => {
  axios.patch('/assistants/SetFirstSecond', post_item).then(res => {
    console.log('setFirstSecond')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    if (res.data.signal === 1) {
      dispatch(update_first_second(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

      // dispatch(update_first_second(post_item.student_id))
  })
}

export const deteleResearch = (post_item) => dispatch => {
  axios.delete('/assistants/DeteleResearch', post_item).then(res => {
    console.log('deleteResearch')
    console.log('post_item')
    console.log(post_item)
    console.log('res data')
    console.log(res.data)
    if (res.data.signal === 1) {
      dispatch(delete_research(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)
    // dispatch(delete_research(post_item.student_id))
  })
}
