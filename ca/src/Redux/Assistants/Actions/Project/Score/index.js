import { createAction } from 'redux-actions'
import axios from 'axios'

export const set_semestor = createAction('SCORE_SET_SEMESTOR')
export const set_academic_year = createAction('SCORE_SET_ACADEMIC_YEAR')
export const set_first_second = createAction('SCORE_SET_FIRST_SECOND')
export const download_csv = createAction('SCORE_DOWNLOAD_CSV')
export const toggle_desend = createAction('SCORE_TOGGLE_DESEND')
export const set_sort_by = createAction('SCORE_SET_SORT_BY')
export const to_given_page = createAction('SCORE_TO_GIVEN_PAGE')
export const store_score = createAction('STORE_SCORE')

export const downloadCsv = post_item => dispatch => {
  axios.post('/assistants/ResearchGradeDownload', post_item).then( res => {
    console.log(res)
  })
}

export const fetchScore = post_item => dispatch => {
  axios.post('/assistants/ResearchGradeList', post_item).then( res => {
    console.log(res)
    // dispatch(store_score(res.data))
  }).catch( err => {
    console.log(err)
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

export const toggleDesend = () => dispatch => {
  dispatch(toggle_desend())
  dispatch(to_given_page(0))
}

export const setSortBy = (value) => dispatch => {
  dispatch(set_sort_by(value))
  dispatch(to_given_page(0))
}

export const toGivenPage = (value) => dispatch => {
  dispatch(to_given_page(value))
}
