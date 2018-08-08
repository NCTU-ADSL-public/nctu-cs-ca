import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_students = createAction('STORE_STUDENTS')
export const toggle_project_status_filter  = createAction('TOGGLE_PROJECT_STATUS_FILTER')
export const toggle_program_filter  = createAction('TOGGLE_PROGRAM_FILTER')
export const set_input = createAction('STUDENT_SET_INPUT')
export const set_academic_year = createAction('STUDENT_SET_ACADEMIC_YEAR')
export const set_semester = createAction('STUDENT_SET_SEMESTER')
export const to_given_page = createAction('STUDENT_TO_GIVEN_PAGE')
export const toggle_desend = createAction('STUDENT_TOGGLE_DESEND')
export const set_sort_by = createAction('STUDENT_SET_SORT_BY')

export const fetchStudents = () => dispatch => {
  axios.get('/assistants/project/StudentResearchList').then( res => {
    dispatch(store_students(res.data))
  }).catch( err => {
    console.log(err)
  })
}

export const toggleProjectStatusFilter = index => dispatch => {
  dispatch(toggle_project_status_filter(index))
  dispatch(to_given_page(0))
}

export const toggleProgramFilter = index => dispatch => {
  dispatch(toggle_program_filter(index))
  dispatch(to_given_page(0))
}

export const setInput = input => dispatch => {
  dispatch(set_input(input))
  dispatch(to_given_page(0))
}

export const setAcademicYear = value => dispatch => {
  dispatch(set_academic_year(value))
}

export const setSemester = value => dispatch => {
  dispatch(set_semester(value))
}

export const toGivenPage = (value) => dispatch => {
  dispatch(to_given_page(value))
}

export const toggleDesend = () => dispatch => {
  dispatch(toggle_desend())
  dispatch(to_given_page(0))
}

export const setSortBy = (value) => dispatch => {
  dispatch(set_sort_by(value))
  dispatch(to_given_page(0))
}
