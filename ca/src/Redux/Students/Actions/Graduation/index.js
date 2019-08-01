
import { createActions } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

const actions = createActions({
  GRADUATION: {
    DETAIL: {
      STORE: null
    },
    ENGLISH: {
      STORE: null
    },
    GET_REVIRW: {
      STORE: null
    },
    SEND_REVIRW: {
      STORE: null
    },
    ASSISTANT: {
      STORE: null
    }
  }
})

export default actions

const getCourseDetail = (payload) => dispatch => {
  axios
    .post('/students/graduate/detail', payload)
    .then(res => {
      dispatch(actions.graduation.detail.store(res.data))
    })
    .catch(err => {
      dispatch(actions.graduation.detail.store(FakeData.GraduationItems_Revised))
      console.log(err)
  })
}

export const getGraduationInfo = (payload = null) => dispatch => {
  axios
    .get('/students/graduate/check')
    .then(res => {
      let newPayload
      if (res.data.check.state !== 0 || payload === null) {
        newPayload = { professional_field: res.data.professional_field }
      }
      else {
        newPayload = { ...payload }
      }

      dispatch(getCourseDetail(newPayload))
      dispatch(actions.graduation.getReview.store({ ...res.data, ...newPayload }))
    })
    .catch(err => {
      let newPayload = { ...payload, check: { state: 0 } }
      dispatch(getCourseDetail(newPayload))
      console.log(err)
    })

  axios
    .get('/students/graduate/english')
    .then(res => {
      dispatch(actions.graduation.english.store(res.data.check.state))
    })
    .catch(err => {
      console.log(err)
    })
}

export const getGraduationInfoAssistantVersion = (id, sname, program, field) => dispatch => {
  axios
    .get('/assistants/graduate/detail', {
      params: {
        student_id: id,
        professional_field: 2
      }
    })
    .then(res => {
      dispatch(actions.graduation.detail.store(res.data))
    })
    .catch(err => {
      dispatch(actions.graduation.detail.store(FakeData.GraduationItems_Revised))
      console.log(err)
    })

  axios
    .get('/assistants/graduate/check', {
      params: {
        student_id: id
      }
    })
    .then(res => {
      dispatch(actions.graduation.getReview.store(res.data))
    })
    .catch(err => {
      console.log(err)
    })

  axios
    .get('/assistants/graduate/english', {
      params: {
        student_id: id
      }
    })
    .then(res => {
      dispatch(actions.graduation.english.store(res.data.check.state))
    })
    .catch(err => {
      console.log(err)
    })
  dispatch(actions.graduation.assistant.store({ id, sname, program }))
}

export const reviewSubmit = (payload) => dispatch => {
  axios
    .post('/students/graduate/check', payload)
    .then(res => {
      dispatch(actions.graduation.sendReview.store(res.data))
    })
    .catch(err => {
      console.log(err)
    })
}

// export const changeCourse = (from, end, course) => dispatch => {
//   let object = { from, end, course }
//   dispatch(updateCourse(object))
// }

// export const filterInput = value => dispatch => {
//   dispatch(filterinput(value))
// }

// export const fetchLegalMoveTarget = (cn, code, type, id) => dispatch => {
//   axios.post('/students/graduate/legalMoveTarget', {
//     cn: cn, // 中文課名
//     code: code, // 課號
//     type: type,
//     studentId: id
//   }).then(res => {
//     let payload = { targets: res.data, cn, code, type }
//     dispatch(storeLegalMoveTarget(payload))
//   }).catch(err => {
//     console.log(err)
//   })
// }
