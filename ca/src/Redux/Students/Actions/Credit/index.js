
import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const courseCreditChange = createAction('COURSE_CREDIT_CHANGE')
export const englishCourseCreditChange = createAction('ENGLISH_COURSE_CREDIT_CHANGE')
export const englishCourseCreditReset = createAction('ENGLISH_COURSE_CREDIT_RESET')
export const waiveCourseChange = createAction('WAIVE_COURSE_CHANGE')
export const waiveCourseReset = createAction('WAIVE_COURSE_RESET')
export const storeCreditInfo = createAction('STORE_CREDIT_INFO')

export const sendEnglishCourseCredit = (payload) => dispatch => {
  axios.post('/students/createEnglishOffsetApplyForm', payload)
    .then(res => {
      alert('送出成功')
    })
    .catch(err => {
      // window.location.replace("/logout ");
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
