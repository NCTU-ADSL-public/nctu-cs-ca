import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_graduate_detail = createAction('STORE_GRADUATE_DETAIL')
export const store_graduate_list = createAction('STORE_GRADUATE_LIST')

export const fetchGraduateList = (post_item) => dispatch => {
  axios.post('/assistants/graduate/gradeStudent', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_graduate_list(res.data))
    res.data.map( (student, index) => dispatch(fetchDetail( { id: student.id }, index) ))
  }).catch( err => {
    console.log(err)
  })
}

export const fetchDetail = (post_item, index) => dispatch => {
  axios.post('/assistants/graduate/glist', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_graduate_detail( {index, data: res.data} ))
  }).catch( err => {
    console.log(err)
  })
}
