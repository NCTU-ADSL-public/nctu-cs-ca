import { createAction } from 'redux-actions'
import axios from 'axios'

// DEFINE ALL ACTIONS FOR REDUCERS (FETCHING DATA IS DONE HERE)
export const UpdateApplyList = createAction('UPDATE_APPLY_LIST')
export const UpdateResearchList = createAction('UPDATE_RESEARCH_LIST')
export const UpdateResearchList1 = createAction('UPDATE_RESEARCH_LIST_1')
export const UpdateResearchList2 = createAction('UPDATE_RESEARCH_LIST_2')

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
  console.log('----- fetchResearchList ----')
  console.log('tid: ' + tid)
  console.log('sem: ' + sem)
  axios.post('/professors/research/list', {
    teacherId: tid,
    sem: sem
  }).then(res => {
    dispatch(UpdateResearchList(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchResearchList1 = (tid, year) => dispatch => {
  let sem = year + '-1'
  console.log('----- fetchResearchList ----')
  console.log('tid: ' + tid)
  console.log('sem: ' + sem)
  axios.post('/professors/research/list', {
    teacherId: tid,
    sem: sem
  }).then(res => {
    dispatch(UpdateResearchList1(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchResearchList2 = (tid, year) => dispatch => {
  let sem = year + '-2'
  console.log('----- fetchResearchList ----')
  console.log('tid: ' + tid)
  console.log('sem: ' + sem)
  axios.post('/professors/research/list', {
    teacherId: tid,
    sem: sem
  }).then(res => {
    dispatch(UpdateResearchList2(res.data))
  }).catch(err => {
    console.log(err)
  })
}
