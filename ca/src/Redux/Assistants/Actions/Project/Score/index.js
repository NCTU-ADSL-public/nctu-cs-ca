import { createAction } from 'redux-actions'
import axios from 'axios'

export const set_semestor = createAction('SCORE_SET_SEMESTOR')
export const set_academic_year = createAction('SCORE_SET_ACADEMIC_YEAR')
export const set_first_second = createAction('SCORE_SET_FIRST_SECOND')
export const download_csv = createAction('SCORE_DOWNLOAD_CSV')

export const downloadCsv = post_item => dispatch => {
  axios.post('/assistants/ResearchGradeDownload', post_item).then( res => {
    console.log(res)
  })
}

export const setSemestor = value => dispatch => {
  dispatch(set_semestor(value))
}

export const setAcademicYear = value => dispatch => {
  dispatch(set_academic_year(value))
}

export const setFirstSecond = value => dispatch => {
  dispatch(set_first_second(value))
}
