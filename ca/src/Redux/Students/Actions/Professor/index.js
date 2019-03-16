
import { createAction } from 'redux-actions'
import axios from 'axios'
// import FakeData from '../../../../Resources/FakeData'
import { FETCHING_STATUS } from '../../../../Utilities/constant'
import { getYear } from '../../../../Utilities/'
import { getSemester } from '../../../../Utilities'

export const setStatus = createAction('SET_STATUS')
export const setMailStatus = createAction('SET_MAIL_STATUS')
export const storeProfessors = createAction('STORE_PROFESSORS')
export const storeProfessorMentor = createAction('STORE_PROFESSOR_MENTOR')
export const storePastProjects = createAction('STORE_PAST_PROJECTS')
export const updateFilter = createAction('UPDATE_FILTER')
export const storeImage = createAction('STORE_IMAGE')

export const fetchProfessors = () => dispatch => {
  dispatch(setStatus(FETCHING_STATUS.FETCHING))
  axios.get('/students/professorInfo/list', { params: { year: getYear() } })
    .then(res => {
      dispatch(storeProfessors(res.data))
      dispatch(setStatus(FETCHING_STATUS.DONE))
    })
    .catch(error => {
      console.log(error)
      // dispatch(storeProfessors(FakeData.ProfessorList))
      // dispatch(setStatus(FETCHING_STATUS.DONE))
    })

  axios.get('/students/professorInfo/getMentor')
    .then(res => {
      dispatch(storeProfessorMentor(res.data))
      dispatch(setStatus(FETCHING_STATUS.DONE))
    })
    .catch(error => {
      console.log(error)
      // dispatch(storeProfessorMentor([{ 'tname': '張立平' }]))
      // dispatch(setStatus(FETCHING_STATUS.DONE))
    })
}

export const sendMailToProfessor = (payload) => dispatch => {
  dispatch(setMailStatus(FETCHING_STATUS.FETCHING))
  axios.post('/students/mail/sendtoteacher', payload)
    .then(res => {
      dispatch(setMailStatus(FETCHING_STATUS.DONE))
    })
    .catch(err => {
      window.alert('寄送失敗！請檢查連線後再進行操作')
      console.log(err)
    })
}

export const getPastProjects = (payload) => dispatch => {
  axios.post('/students/professorInfo/pastResearch', payload)
    .then(res => {
      dispatch(storePastProjects(res.data))
    })
    .catch(err => {
      // dispatch(storePastProjects(FakeData.ProfessorProject))
      console.log(err)
    })
}

export const storeProfessorsImage = (url, tname) => dispatch => {
  let object = { url, tname }
  dispatch(storeImage(object))
}
export const sendProjectAgree = (payload) => dispatch => {
  let phones = []
  let emails = []
  let participants = []
  let first_second = []
  // 把成員資料放進payload的欄位
  payload.members.forEach((member, index) => {
    if (!member.id || !member.phone || !member.email) {
      window.alert('請填寫完整資訊')
      return
    }
    if (index === 0) { // 是自己
      participants.push(payload.student_id)
    } else {
      participants.push(member.id)
    }
    phones.push(member.phone)
    emails.push(member.email)
    if (member.first_second > 2 || member.first_second < 1) {
      window.alert('只能填寫專題一（1）或專題二（2），謝謝。')
      return
    }
    first_second.push(member.first_second)
  })

  axios.post('/students/project/ShowStudentResearchStatus', {
    participants: participants
  })
    .then(res => {
      res.data.forEach(data => {
        if (data.status === '4') {
          window.alert(`${data.student_id} 因 重複提交(當學期只能有一個專題/專題申請表) 申請失敗`)
        } else if (data.status === '5') {
          window.alert(`${data.student_id} 因 已修過專1專2 申請失敗`)
        }
      })

      let r = window.confirm('注意！如果您確定送出表單且教授也同意了，將代表您加簽 專題（一）或 專題（二） 課程，確定要送出表單嗎?')
      if (r) {
        axios.post('/students/research/create', {
          semester: getSemester(),
          student_num: participants.length,
          tname: payload.tname,
          teacher_id: payload.teacher_id,
          teacher_email: payload.teacher_email,
          first_second: first_second,
          research_title: payload.research_title,
          participants: participants,
          phones: phones,
          email: emails
        })
          .then(res => {
            if (res.data.signal === 1) {
              window.alert('申請成功，等候教授回覆')
            } else {
              window.alert('申請失敗，請重新送出，如成員中有人尚未申請專（一）請先修習專題（一）')
            }
          })
          .catch(err => {
            // window.location.replace("/logout ");
            window.alert('送出失敗，請檢查連線是否穩定。')
            console.log(err)
          })
      }
    })
    .catch(err => {
      window.alert('送出失敗，請檢查連線是否穩定。')
      console.log(err)
    })
}
