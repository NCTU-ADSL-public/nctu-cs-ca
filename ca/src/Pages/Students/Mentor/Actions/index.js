import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const fetchProfessorsStart = createAction('FETCH_PROFESSORS_START')
export const fetchProfessorsDone = createAction('FETCH_PROFESSORS_DONE')
export const storeProfessors = createAction('STORE_PROFESSORS')
export const filterinput = createAction('FILTER_INPUT')
export const storeImage = createAction('STORE_IMAGE')

export const fetchProfessors = (page = 1) => dispatch => {
  dispatch(fetchProfessorsStart)
  axios.get('/students/ProInfo')
    .then(res => {
      dispatch(storeProfessors(res.data))
      dispatch(fetchProfessorsDone())
    })
    .catch(error => {
      console.log(error)
      dispatch(storeProfessors(FakeData.ProjectNum))
      dispatch(fetchProfessorsDone())
    })
}

export const storeProfessorsImage = (url, tname) => dispatch => {
  let object = {url, tname}
  dispatch(storeImage(object))
}

export const filterInput = value => dispatch => {
  dispatch(filterinput(value))
}
