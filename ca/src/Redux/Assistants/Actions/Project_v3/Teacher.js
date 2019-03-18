import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_teachers = createAction('STORE_TEACHERS')
export const update_add_status = createAction('UPDATE_ADD_STATUS')
export const update_first_second = createAction('UPDATE_FIRST_SECOND')
export const delete_research = createAction('DELETE_RESEARCH')
export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


export const fetchTeachers = (post_item) => dispatch => {
  axios.post('/assistants/project/ProResearchList', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(store_teachers(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const setAddStatus = (post_item) => dispatch => {
  axios.post('/assistants/SetAddStatus', post_item).then(res => {
    console.log('setAddStatus')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    if (res.data.signal === 1) {
      dispatch(update_add_status(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

    // dispatch(update_add_status(post_item.student_id))
  })
}

export const setFirstSecond = (post_item) => dispatch => {
  axios.patch('/assistants/SetFirstSecond', post_item).then(res => {
    console.log('setFirstSecond')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    if (res.data.signal === 1) {
      dispatch(update_first_second(post_item.student_id))
    }
  }).catch(err => {
    console.log(err)

    // dispatch(update_first_second(post_item.student_id))
  })
}

export const deteleResearch = (post_item) => dispatch => {
  axios.post('/assistants/DeleteResearch', post_item).then(res => {
    console.log('deleteResearch')
    console.log('post_item')
    console.log(post_item)
    console.log('res data')
    console.log(res.data)
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
  axios.post('/assistants/project/StudentResearchListDownload', req).then(res => {
    let data = res.data
    let csvArr = []
    console.log(data)
    csvArr.push(['專題名稱', '老師', '姓名', '學號', '成績', '評語'])
    for (let i = 0; i < data.length; i++) {
      csvArr.push([data[i].research_title, data[i].tname, data[i].sname, data[i].student_id, data[i].score, data[i].comment])
    }
    console.log(csvArr)
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