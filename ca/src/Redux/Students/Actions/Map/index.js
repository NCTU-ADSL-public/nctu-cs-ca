import axios from 'axios/index'
import { createAction } from 'redux-actions'
import defaultData from '../../../../Resources/FakeData'

export const storeCourse = createAction('STORE_COURSE')
export const storeCoursePass = createAction('STORE_COURSE_PASS')
export const ShowCourseCondition = createAction('SHOW_COURSE_CONDITION')
export const ShowCourseOrSug = createAction('SHOW_COURSE_OR_SUG')

export const fetchCourse = (page = 1) => dispatch => {
  axios.get('/students/courseMap').then(res => {
    dispatch(storeCourse(res.data))
  }).catch(err => {
    dispatch(storeCourse(defaultData.Course))
    console.log(err)
  })
}

export const fetchCoursePass = (page = 1) => dispatch => {
  axios.get('/students/coursePass').then(res => {
    dispatch(storeCoursePass(res.data))
  }).catch(err => {
    dispatch(storeCoursePass(defaultData.CoursePass))
    console.log(err)
  })
}

export const showCourseOrSug = (page = 1) => dispatch => {
  dispatch(ShowCourseOrSug())
}
