import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_graduate_detail = createAction('STORE_GRADUATE_DETAIL')

export const fetchGraduateList = (post_item) => dispatch => {
  axios.post('/assistants/graduate/gradeStudent', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    // res.data.map( (student, index) => dispatch(fetchDetail( { student_id: student.student_id } )))
    dispatch(fetchDetail(/*res.data[0].student_id)*/'0616220'))
  }).catch( err => {
    console.log(err)
    console.log("POST_Item")
    console.log(post_item)
  })
}

export const fetchDetail = student_id => dispatch => {
  axios.get('/assistants/graduate/glist', {
    params: {
      student_id: student_id
    }
  }).then( res => {
    console.log("Fetching")
    console.log("GET_id")
    console.log(student_id)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_graduate_detail(res.data))
  }).catch( err => {
    console.log(err)
    console.log("GET_id")
    console.log(student_id)
  })
}
