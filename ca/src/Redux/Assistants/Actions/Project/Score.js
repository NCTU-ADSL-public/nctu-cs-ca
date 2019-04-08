import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_scores = createAction('STORE_SCORES')
export const set_scores = createAction('SET_SCORES')
export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')

export const fetchScores = (post_item) => dispatch => {
  axios.post('/assistants/research/gradeList', post_item).then(res => {
    dispatch(store_scores(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const setScores = payload => dispatch => {
  axios.post('/assistants/research/setScore', payload).then( res => {
    dispatch(set_scores(payload))
  }).catch( err => {
    console.log(err)
  })
}

export const downloadCsv = req => dispatch => {
  // let data = [{'tname': '蕭子健', 'student_id': '0216098', 'score': '80', 'sname': '歐嘉恒', 'comment': '', 'status': '1'}, {'tname': '莊榮宏', 'student_id': '0216330', 'score': '', 'sname': '葉信華', 'comment': '', 'status': '1'}]
  // let csvArr = []
  // for (let i = 0; i < data.length; i++) {
  //   csvArr.push([data[i].tname, data[i].sname, data[i].student_id, data[i].score, data[i].comment])
  // }
  dispatch(storeScoreCsvDataStart())
  axios.post('/assistants/research/gradeDownload', req).then(res => {
    let data = res.data
    let csvArr = []
    csvArr.push(['專題名稱', '老師', '姓名', '學號', '成績', '評語'])
    for (let i = 0; i < data.length; i++) {
      csvArr.push([data[i].research_title, data[i].tname, data[i].sname, data[i].student_id, data[i].score, data[i].comment])
    }
    dispatch(storeScoreCsvData(csvArr))
    // const blob = new Blob([res.data], {type: 'text/plain'})
    // const link = document.createElement('a')
    // link.href = URL.createObjectURL(blob)
    // const filename = req.semester.substring(0, 3) + `學年度` + (req.semester[4] === '1' ? `上` : `下`) + `學期 資工專題(` + (req.first_second === '1' ? `一` : `二`) + `)`
    // link.download = `${filename}.csv` // 这里填保存成的文件名
    // link.click()
    // URL.revokeObjectURL(link.href)
  })
}
