
import { createAction } from 'redux-actions'
import axios from 'axios'

export const courseCreditChange = createAction('COURSE_CREDIT_CHANGE')
export const englishCourseCreditChange = createAction('ENGLISH_COURSE_CREDIT_CHANGE')
export const englishCourseCreditReset = createAction('ENGLISH_COURSE_CREDIT_RESET')
export const waiveCourseChange = createAction('WAIVE_COURSE_CHANGE')
export const waiveCourseReset = createAction('WAIVE_COURSE_RESET')

export const sendEnglishCourseCredit = (payload) => dispatch => {
  console.log(payload)
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
