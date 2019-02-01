
import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const compulsoryCourseChange = createAction('COMPULSORY_COURSE_CHANGE')
export const englishCourseChange = createAction('ENGLISH_COURSE_CHANGE')
export const englishCourseReset = createAction('ENGLISH_COURSE_RESET')
export const waiveCourseChange = createAction('WAIVE_COURSE_CHANGE')
export const waiveCourseReset = createAction('WAIVE_COURSE_RESET')
export const storeCreditInfo = createAction('STORE_CREDIT_INFO')
export const resetCreditInfo = createAction('RESET_CREDIT_INFO')

export const sendEnglishCourse = (payload) => dispatch => {
  axios.post('/students/createEnglishOffsetApplyForm', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendCompulsoryCourse = (payload) => dispatch => {
  console.log(payload)
  axios.post('/students/credit/compulsoryCourse', payload)
    .then(res => { alert('送出成功') })
    .catch(err => {
      alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const getCreditInfo = () => dispatch => {
  axios.get('/students/credit').then(res => {
    dispatch(storeCreditInfo(res.data))
  }).catch(err => {
    dispatch(storeCreditInfo(FakeData.Credit))
    console.log(err)
  })
}
