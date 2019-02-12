
import { createAction } from 'redux-actions'
import axios from 'axios'

export const compulsoryCourseChange = createAction('COMPULSORY_COURSE_CHANGE')
export const englishCourseChange = createAction('ENGLISH_COURSE_CHANGE')
export const waiveCourseChange = createAction('WAIVE_COURSE_CHANGE')
export const exemptCourseChange = createAction('EXEMPT_COURSE_CHANGE')
export const storeCreditInfo = createAction('STORE_CREDIT_INFO')
export const resetCourse = createAction('RESET_COURSE')

export const sendCompulsoryCourse = (payload) => dispatch => {
  console.log(payload)
  axios.post('/students/credit/compulsoryCourse', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendEnglishCourse = (payload) => dispatch => {
  axios.post('/students/credit/englishCourse', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendWaiveCourse = (payload) => dispatch => {
  axios.post('/students/credit/waiveCourse', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}


export const sendExemptCourse = (payload) => dispatch => {
  axios.post('/students/credit/exemptCourse', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const getCreditInfo = () => dispatch => {
  axios.get('/students/credit/all').then(res => {
    dispatch(storeCreditInfo(res.data))
  }).catch(err => {
    console.log(err)
  })
}
