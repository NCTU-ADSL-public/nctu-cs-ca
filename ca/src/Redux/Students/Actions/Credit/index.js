
import { createActions } from 'redux-actions'
import axios from 'axios'
import { FETCHING_STATUS } from '../../../../Utilities/constant'
import FakeData from '../../../../Resources/FakeData'

export const actions = createActions({
  CREDIT: {
    LIST: {
      STORE: null
    },
    WAIVE_COURSE: {
      STORE: null
    },
    EXEMPT_COURSE: {
      STORE: null
    },
    COMPULSORY_COURSE: {
      STORE: null
    },
    ENGLISH_COURSE: {
      STORE: null
    },
    EDIT: {
      SET_STATUS: null
    },
    DELETE: {
      SET_STATUS: null
    },
    FORM: {
      RESET: null,
      SET_ERROR: null
    }
  }
})

export const getCreditList = () => dispatch => {
  axios
    .get('/students/offsetApply/list')
    .then(res => dispatch(actions.credit.list.store(res.data)))
    .catch(err => {
      dispatch(actions.credit.list.store(FakeData.Credit))
      console.log(err)
    })
}

export const sendWaiveCourse = (payload) => dispatch => {
  axios
    .post('/students/offsetApply/createWaive', payload)
    .then(res => window.alert('送出成功'))
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendExemptCourse = (payload) => dispatch => {
  axios
    .post('/students/offsetApply/createExempt', payload)
    .then(res => window.alert('送出成功'))
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendCompulsoryCourse = (payload) => dispatch => {
  axios
    .post('/students/offsetApply/createCompulsory', payload)
    .then(res => window.alert('送出成功'))
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const sendEnglishCourse = (payload) => dispatch => {
  axios
    .post('/students/offsetApply/createEnglish', payload)
    .then(res => window.alert('送出成功'))
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}

export const editCredit = (payload) => dispatch => {
  dispatch(actions.credit.edit.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .post('/students/offsetApply/edit', payload)
    .then(res => {
      window.alert('編輯成功')
      dispatch(actions.credit.edit.setStatus(FETCHING_STATUS.DONE))
    })
    .catch(err => {
      window.alert('編輯失敗，請檢查連線是否穩定。')
      dispatch(actions.credit.edit.setStatus(FETCHING_STATUS.FAIL))
      console.log(err)
    })
}

export const deleteCredit = (payload) => dispatch => {
  dispatch(actions.credit.delete.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .post('/students/offsetApply/delete', payload)
    .then(res => {
      window.alert('刪除成功')
      dispatch(actions.credit.delete.setStatus(FETCHING_STATUS.DONE))
    })
    .catch(err => {
      window.alert('刪除失敗，請檢查連線是否穩定。')
      dispatch(actions.credit.delete.setStatus(FETCHING_STATUS.FAIL))
      console.log(err)
    })
}
