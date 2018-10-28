import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_graduate_detail = createAction('STORE_GRADUATE_DETAIL')
export const clear_students = createAction('CLEAR_STUDENTS')
export const store_graduate_state = createAction('STORE_GRADUATE_STATE')
export const set_graduate_state = createAction('SET_GRADUATE_STATE')

export const fetchGraduateList = (post_item) => dispatch => {
  axios.post('/assistants/graduate/gradeStudent', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(clear_students())
    // setTimeout(() => {
    res.data.map(student => dispatch(fetchDetail(student.student_id)))
    // }, 1000)
  }).catch(err => {
    console.log(err)
    console.log('POST_Item')
    console.log(post_item)
  })
}

export const fetchDetail = student_id => dispatch => {
  axios.get('/assistants/graduate/glist', {
    params: {
      student_id: student_id
    }
  }).then(res => {
    console.log('Fetching')
    console.log('GET_id')
    console.log(student_id)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(store_graduate_detail(res.data))
    dispatch(fetchGraudateState(student_id))
  }).catch(err => {
    console.log(err)
    console.log('GET_id')
    console.log(student_id)
  })
}

export const fetchGraudateState = student_id => dispatch => {
  axios.get('/assistants/graduate/check', {
    params: {
      student_id: student_id
    }
  }).then(res => {
    console.log('Fetching')
    console.log('GET_id')
    console.log(student_id)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(store_graduate_state({ data: res.data, student_id: student_id }))
  }).catch(err => {
    console.log(err)
    console.log('GET_id')
    console.log(student_id)
  })
}

export const setGradutateState = post_item => dispatch => {
  axios.post('/assistants/graduate/check', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(set_graduate_state(post_item))
  }).catch( err => {
    console.log(err)
    console.log("POST_Item")
    console.log(post_item)
    dispatch(set_graduate_state(post_item))
  })
}
