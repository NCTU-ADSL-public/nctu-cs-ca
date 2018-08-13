import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const storeGraduationCourse = createAction('STORE_GRADUATION_COURSE')
export const filterinput = createAction('FILTER_INPUT')
export const storeGradPrint = createAction('SHOW_GRAD_PRINT')
export const storeGradCheck = createAction('SHOW_GRAD_CHECK')
export const storeGradEnglishTestCheck = createAction('SHOW_GRAD_ENGLISH_TEST_CHECK')
export const updateCourse = createAction('UPDATE_COURSE')
export const fetchDone = createAction('FETCH_DONE')

export const fetchGraduationCourse = (page = 1) => dispatch => {
  axios.get('/students/graduate/revised').then(res => {
    dispatch(storeGraduationCourse(res.data))
  }).catch(err => {
    dispatch(storeGraduationCourse(FakeData.GraduationItems_Revised))
    console.log(err)
  })
  axios.get('/students/graduate/print').then(res => {
    dispatch(storeGradPrint(res.data))
  }).catch(err => {
    dispatch(storeGradPrint(FakeData.PrintData))
    console.log(err)
  })

  axios.get('/students/graduate/check').then(res => {
    dispatch(storeGradCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })
  axios.get('/students/graduate/english').then(res => {
    dispatch(storeGradEnglishTestCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })

}

export const changeCourse = (from, end, course) => dispatch => {
  let object = {from, end, course}
  dispatch(updateCourse(object))
}

export const filterInput = value => dispatch => {
  dispatch(filterinput(value))
}
