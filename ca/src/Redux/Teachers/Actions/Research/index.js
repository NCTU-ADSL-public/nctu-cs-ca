import { createAction } from 'redux-actions'
import axios from 'axios'

// DEFINE ALL ACTIONS FOR REDUCERS (FETCHING DATA IS DONE HERE)
export const UpdateApplyList = createAction('UPDATE_APPLY_LIST')

export const ChangeTeacher = (payload) => dispatch => {
  axios.post('/professors/research/setReplace', payload)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      window.confirm('刪除失敗，請檢察網路連線')
      console.log(err)
    })
}

export const fetchResearchApplyList = (tid) => dispatch => {
  console.log('---------- FETCH RESEARCH APPLY LIST ---------------')
  axios.get('/professors/researchApply/list', {
    id: tid
  }).then(res => {
    dispatch(UpdateApplyList(res.data))
    /*
    this.setState({
      applyList: res.data,
      loading: false
    })
    */
  }).catch(err => {
    console.log(err)
  })

}
