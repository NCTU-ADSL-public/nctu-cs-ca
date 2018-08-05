import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')
export const set_input = createAction('TEACHER_SET_INPUT')
export const to_given_page = createAction('TEACHER_TO_GIVEN_PAGE')
export const set_sort_by = createAction('TEACHER_SET_SORT_BY')
export const toggle_desend = createAction('TEACHER_TOGGLE_DESEND')
export const set_semester = createAction('TEACHER_SET_SEMESTER')
export const set_academic_year = createAction('TEACHER_SET_ACADEMIC_YEAR')

export const fetchTeachers = () => dispatch => {
  axios.get('/assistants/project/ProResearchList').then( res => {
    dispatch(store_teachers(res.data))
  }).catch( err => {
    console.log(err)
  })
}

export const setInput = input => dispatch => {
  dispatch(set_input(input))
  dispatch(to_given_page(0))
}

export const toGivenPage = value => dispatch => {
  dispatch(to_given_page(value))
}

export const setSortBy = value => dispatch => {
  dispatch(set_sort_by(value))
  dispatch(to_given_page(0))
}

export const toggleDesend = () => dispatch => {
  dispatch(toggle_desend())
  dispatch(to_given_page(0))
}

export const setSemester = (value) => dispatch => {
  dispatch(set_semester(value))
}

export const setAcademicYear = (value) => dispatch => {
  dispatch(set_academic_year(value))
}
