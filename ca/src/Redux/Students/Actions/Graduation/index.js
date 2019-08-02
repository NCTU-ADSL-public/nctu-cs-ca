
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
    GET_REVIEW: {
      STORE: null
    },
    SEND_REVIEW: {
      STORE: null
    },
    MOVE_COURSE: {
      STORE: null,
      SET_SUCCESS: null
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

export const getMoveTargets = (payload) => dispatch => {
  axios
    .post('/students/graduate/legalMoveTarget', payload)
    .then(res => {
      dispatch(actions.graduation.moveCourse.store(res.data))
    })
    .catch(err => {
      console.log(err)
    })
}

export const moveCourse = (payload) => dispatch => {
  axios
    .post('/students/graduate/moveCourse', payload)
    .then(res => {
      dispatch(actions.graduation.moveCourse.setSuccess(true))
    })
    .catch(err => {
      console.log(err)
    })
}

export const calculateCredit = (payload) => dispatch => {
  axios
    .post('/students/graduate/summaryList', payload)
    .then(res => {
    })
    .catch(err => {
      console.log(err)
    })
}
