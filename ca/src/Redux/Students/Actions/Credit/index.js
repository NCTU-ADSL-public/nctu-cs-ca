
import { createAction } from 'redux-actions'
import axios from 'axios'
// import FakeData from '../../../../Resources/FakeData'

export const compulsoryCourseChange = createAction('COMPULSORY_COURSE_CHANGE')
export const englishCourseChange = createAction('ENGLISH_COURSE_CHANGE')
export const waiveCourseChange = createAction('WAIVE_COURSE_CHANGE')
export const exemptCourseChange = createAction('EXEMPT_COURSE_CHANGE')
export const setDeleteStatus = createAction('SET_DELETE_STATUS')
export const setEditStatus = createAction('SET_EDIT_STATUS')
export const storeCreditInfo = createAction('STORE_CREDIT_INFO')
export const resetCourse = createAction('RESET_COURSE')
export const errorSubmit = createAction('ERROR_SUBMIT')

export const sendWaiveCourse = (payload) => dispatch => {
  axios.post('/students//offsetApply/createWaive', payload)
    .then(res => { window.alert('送出成功') })
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendExemptCourse = (payload) => dispatch => {
  axios.post('/students//offsetApply/createExempt', payload)
    .then(res => { window.alert('送出成功') })
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendCompulsoryCourse = (payload) => dispatch => {
  axios.post('/students/offsetApply/createCompulsory', payload)
    .then(res => { window.alert('送出成功') })
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendEnglishCourse = (payload) => dispatch => {
  axios.post('/students/offsetApply/createEnglish', payload)
    .then(res => { window.alert('送出成功') })
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const deleteCredit = (payload) => dispatch => {
  dispatch(setDeleteStatus({ status: 'fetching' }))
  axios.post('/students//offsetApply/delete', payload)
    .then(res => {
      window.alert('刪除成功')
      dispatch(setDeleteStatus({ status: 'success' }))
    })
    .catch(err => {
      window.alert('刪除失敗，請檢查連線是否穩定。')
      dispatch(setDeleteStatus({ status: 'error' }))
      console.log(err)
    })
}

export const editCredit = (payload) => dispatch => {
  dispatch(setEditStatus({ status: 'fetching' }))
  axios.post('/students//offsetApply/edit', payload)
    .then(res => {
      window.alert('編輯成功')
      dispatch(setEditStatus({ status: 'success' }))
    })
    .catch(err => {
      window.alert('編輯失敗，請檢查連線是否穩定。')
      dispatch(setEditStatus({ status: 'error' }))
      console.log(err)
    })
}

export const getCreditInfo = () => dispatch => {
  axios.get('/students/offsetApply/list').then(res => {
    dispatch(storeCreditInfo(res.data))
  }).catch(err => {
    // dispatch(storeCreditInfo(FakeData.Credit))
    console.log(err)
  })
}

export const senderrorSubmit = (payload) => dispatch => {
  dispatch(errorSubmit(payload))
}
