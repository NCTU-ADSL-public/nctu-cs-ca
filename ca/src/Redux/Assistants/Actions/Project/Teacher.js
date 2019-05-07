import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')
export const update_add_status = createAction('UPDATE_ADD_STATUS')
export const update_first_second = createAction('UPDATE_FIRST_SECOND')
export const delete_research = createAction('DELETE_RESEARCH')
export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


export const fetchTeachers = (post_item) => dispatch => {
  axios.post('/assistants/research/professorList', post_item).then(res => {
    dispatch(store_teachers(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const setAddStatus = (post_item) => dispatch => {
  axios.post('/assistants/research/setAddStatus', post_item).then(res => {
    if (res.data.signal === 1) {
      dispatch(update_add_status(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

    // dispatch(update_add_status(post_item.student_id))
  })
}

export const setFirstSecond = (post_item) => dispatch => {
  axios.patch('/assistants/research/setFirstSecond', post_item).then(res => {
    if (res.data.signal === 1) {
      dispatch(update_first_second(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

    // dispatch(update_first_second(post_item.student_id))
  })
}

export const deteleResearch = (post_item) => dispatch => {
  axios.post('/assistants/research/delete', post_item).then(res => {
    if (res.data.signal === 1) {
      dispatch(delete_research(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)
    // dispatch(delete_research(post_item.student_id))
  })
}

export const downloadCsv = req => dispatch => {
  // let data = [{'tname': '蕭子健', 'student_id': '0216098', 'score': '80', 'sname': '歐嘉恒', 'comment': '', 'status': '1'}, {'tname': '莊榮宏', 'student_id': '0216330', 'score': '', 'sname': '葉信華', 'comment': '', 'status': '1'}]
  // let csvArr = []
  // for (let i = 0; i < data.length; i++) {
  //   csvArr.push([data[i].tname, data[i].sname, data[i].student_id, data[i].score, data[i].comment])
  // }
  dispatch(storeScoreCsvDataStart())
  axios.post('/assistants/research/professorListDownload', req).then(res => {
    let data = res.data
    let csvArr = []
    csvArr.push(['學生學號', '學生姓名', '指導教授', '專題名稱', '專題級數'])
    for (let i = 0; i < data.length; i++) {
      csvArr.push([data[i].student_id, data[i].sname, data[i].tname, data[i].research_title, data[i].first_second])
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
