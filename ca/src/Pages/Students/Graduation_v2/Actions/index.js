import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const storeGraduationCourse = createAction('STORE_GRADUATION_COURSE')
export const filterinput = createAction('FILTER_INPUT')
export const storeImage = createAction('STORE_IMAGE')
export const storeProfessorMentor = createAction('STORE_PROFESSOR_MENTOR')

export const fetchGraduationCourse = (page = 1) => dispatch => {
  axios.get('/students/graduate/revised').then(res => {
    dispatch(storeGraduationCourse(res.data))
  }).catch(err => {
    dispatch(storeGraduationCourse(FakeData.GraduationItems_Revised))
    console.log(err)
  })
}

export const storeProfessorsImage = (url, tname) => dispatch => {
  let object = {url, tname}
  dispatch(storeImage(object))
}

export const filterInput = value => dispatch => {
  dispatch(filterinput(value))
}
