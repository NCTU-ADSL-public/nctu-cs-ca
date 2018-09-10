import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_scores = createAction('STORE_SCORES')

export const fetchScores = (post_item) => dispatch => {
  axios.post('/assistants/ResearchGradeList', post_item).then( res => {
    console.log("Fetching")
    console.log("POST_Item")
    console.log(post_item)
    console.log("RES DATA")
    console.log(res.data)
    dispatch(store_scores(res.data))
  }).catch( err => {
    console.log(err)
  })
}

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
