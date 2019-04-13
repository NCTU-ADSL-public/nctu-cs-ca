import { createAction } from 'redux-actions'
import axios from 'axios'

// DEFINE ALL ACTIONS FOR REDUCERS (FETCHING DATA IS DONE HERE)
export const UpdateApplyList = createAction('UPDATE_APPLY_LIST')
export const UpdateResearchList = createAction('UPDATE_RESEARCH_LIST')

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
  axios.get('/professors/researchApply/list', {
    id: tid
  }).then(res => {
    dispatch(UpdateApplyList(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchResearchList = (tid, sem) => dispatch => {
  axios.post('/professors/research/list', {
    teacherId: tid,
    sem: sem
  }).then(res => {
    dispatch(UpdateResearchList(res.data))
  }).catch(err => {
    console.log(err)
  })
}
