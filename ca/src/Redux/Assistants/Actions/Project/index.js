import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_students = createAction('STORE_STUDENTS')
export const toggle_project_status_filter  = createAction('TOGGLE_PROJECT_STATUS_FILTER')
export const toggle_program_filter  = createAction('TOGGLE_PROGRAM_FILTER')
export const set_input = createAction('SET_INPUT')
export const set_academic_year = createAction('SET_ACADEMIC_YEAR')
export const set_semestor = createAction('SET_SEMESTOR')

export const fetchStudents = () => dispatch => {
  axios.get('/assistants/project/StudentResearchList').then( res => {
    dispatch(store_students(res.data))
  }).catch( err => {
    console.log(err)
  })
}

export const toggleProjectStatusFilter = index => dispatch => {
  dispatch(toggle_project_status_filter(index))
}

export const toggleProgramFilter = index => dispatch => {
  dispatch(toggle_program_filter(index))
}

export const setInput = input => dispatch => {
  dispatch(set_input(input))
}

export const setAcademicYear = value => dispatch => {
  dispatch(set_academic_year(value))
}

export const setSemestor = value => dispatch => {
  dispatch(set_semestor(value))
}
