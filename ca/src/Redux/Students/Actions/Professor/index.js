import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

export const setStatus = createAction('SET_STATUS')
export const setMailStatus = createAction('SET_MAIL_STATUS')
export const storeProfessors = createAction('STORE_PROFESSORS')
export const storePastProjects = createAction('STORE_PAST_PROJECTS')
export const filterinput = createAction('FILTER_INPUT')
export const storeImage = createAction('STORE_IMAGE')
export const storeProfessorMentor = createAction('STORE_PROFESSOR_MENTOR')
export const changePage = createAction('CHANGE_PAGE')
export const storeResearchStatus = createAction('STORE_RESEARCH_STATUS')
export const ChangeProjectNumber = createAction('CHANGE_PROJECT_NUMBER')

export const fetchProfessors = (page = 1) => dispatch => {
  dispatch(setStatus(FETCHING_STATUS.FETCHING))
  axios.get('/students/ProInfo')
    .then(res => {
      dispatch(storeProfessors(res.data))
      dispatch(setStatus(FETCHING_STATUS.DONE))
    })
    .catch(error => {
      console.log(error)
      dispatch(storeProfessors(FakeData.ProjectNum))
      dispatch(setStatus(FETCHING_STATUS.DONE))
    })

  axios.get('/students/mentorInfo')
    .then(res => {
      dispatch(storeProfessorMentor(res.data))
      dispatch(setStatus(FETCHING_STATUS.DONE))
    })
    .catch(error => {
      console.log(error)
      dispatch(storeProfessorMentor([{ 'tname': '張立平' }]))
      dispatch(setStatus(FETCHING_STATUS.DONE))
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
  axios.post('/students/project/ResearchInfoOfPro', payload)
    .then(res => {
      dispatch(storePastProjects(res.data))
    })
    .catch(err => {
      dispatch(storePastProjects(FakeData.ProfessorProject))
      console.log(err)
    })
}

export const storeProfessorsImage = (url, tname) => dispatch => {
  let object = { url, tname }
  dispatch(storeImage(object))
}

export const filterInput = value => dispatch => {
  dispatch(filterinput(value))
}

export const changeProjectNumber = value => dispatch => {
  dispatch(ChangeProjectNumber(value))
}

export const changepage = value => dispatch => {
  dispatch(changePage(value))
}
