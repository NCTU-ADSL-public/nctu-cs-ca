import { createAction } from 'redux-actions'
import axios from 'axios'

export const set_semester = createAction('SCORE_SET_SEMESTER')
export const set_academic_year = createAction('SCORE_SET_ACADEMIC_YEAR')
export const set_first_second = createAction('SCORE_SET_FIRST_SECOND')
export const download_csv = createAction('SCORE_DOWNLOAD_CSV')
export const toggle_desend = createAction('SCORE_TOGGLE_DESEND')
export const set_sort_by = createAction('SCORE_SET_SORT_BY')
export const to_given_page = createAction('SCORE_TO_GIVEN_PAGE')
export const store_score = createAction('STORE_SCORE')
export const set_input = createAction('SCORE_SET_INPUT')

export const downloadCsv = req => dispatch => {
  axios.post('/assistants/ResearchGradeDownload', req).then( res => {
    const blob = new Blob([res.data], {type: "text/plain"})
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    const filename = req.semester.substring(0, 3) + `學年度` + (req.semester[4] === "1" ? `上` : `下`) + `學期 資工專題(` + ( req.first_second === 1 ? `一` : `二` ) + `)`
    link.download = `${filename}.csv` // 这里填保存成的文件名
    link.click()
    URL.revokeObjectURL(link.href)
  })
}

export const fetchScore = req => dispatch => {
  axios.post('/assistants/ResearchGradeList', req).then( res => {
    dispatch(store_score(res.data))
  }).catch( err => {
    console.log(err)
  })
}

export const setSemester = value => dispatch => {
  dispatch(set_semester(value))
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

export const setInput = (value) => dispatch => {
  dispatch(set_input(value))
  dispatch(to_given_page(0))
}
