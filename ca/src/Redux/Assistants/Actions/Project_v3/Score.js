import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_scores = createAction('STORE_SCORES')

export const fetchScores = (post_item) => dispatch => {
  axios.post('/assistants/ResearchGradeList', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_scores(res.data))
  }).catch( err => {
    console.log(err)
  })
}
