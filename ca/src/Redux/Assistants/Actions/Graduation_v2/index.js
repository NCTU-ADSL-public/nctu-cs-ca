import { createAction } from 'redux-actions'
import axios from 'axios'
//import data_json from './Json'

export const set_graduate_state = createAction('SET_GRADUATE_STATE')
export const store_student = createAction('STORE_STUDENT')
export const store_student_csv_data = createAction('STORE_STUDENT_CSV_DATA')
export const fetach_start = createAction('FETCH_START')

export const triggerUpdateData = () => dispatch => {
  ['四'].forEach(title => {
    axios.post('/assistants/graduate/gradeStudent', { grade: title }).then(res => {
      res.data.forEach(student => {
        axios.get('/assistants/graduate/graduateList', {
          params: {
            student_id: student.student_id
          }
        })
      })
    })
  })
}

export const fetchStudent = grade => dispatch => {
  dispatch(fetach_start())
  axios.post('/assistants/graduate/graduateStudent', { grade }).then(res => {
    dispatch(store_student(res.data))
  })
  axios.post('/assistants/graduate/graduateListDownload', { grade }).then(res => {
    // let data = res.data
    // let csvArr = []
    // csvArr.push([
    //   '學號',
    //   '姓名',
    //   '組別',
    //   '總學分',
    //   '有沒有英文授課專業課程',
    //   '預審狀態',
    //   '畢業狀態',
    //   '專業選修',
    //   '其他選修',
    //   '網路專業課程',
    //   '多媒體專業課程',
    //   '舊制或新制',
    //   '舊制通識 缺的總學分',
    //   '當代',
    //   '文化',
    //   '歷史',
    //   '公民',
    //   '群己',
    //   '自然',
    //   '新制通識 缺的總學分',
    //   '核心',
    //   '核心社會向度',
    //   '核心人文向度',
    //   '校基本素養',
    //   '跨院',
    //   '外語的狀態',
    //   '外語',
    //   '外語基礎',
    //   '外語進階(包含二外) ',
    //   '體育 ',
    //   '服務學習',
    //   '藝文護照',
    //   '導師時間',
    //   '必修缺課'
    // ])
    // for (let i = 0; i < data.length; i++) {
    //   let data_ = data[i][0]
    //   let compulse = ''
    //   console.log(data_)
    //   if (data_ === undefined) continue
    //   for (let j = 0; j < data_.compulse.length; j++) {
    //     compulse += data_.compulse[j]
    //     compulse += ','
    //   }
    //   csvArr.push([
    //     data_.student_id,
    //     data_.sname,
    //     data_.program,
    //     data_.total_credit,
    //     data_.en_course === '1' ? '有' : data_.en_course === '0' ? '沒有' : '',
    //     data_.submit_status === '0' ? '未送審' : data_.submit_status === '1' ? '審核中' : data_.submit_status === '2' ? '已通過' : data_.submit_status === '3' ? '未通過' : '',
    //     data_.graduate_status === '0' ? '未符合' : data_.graduate_status === '1' ? '將符合' : data_.graduate_status === '2' ? '已符合' : '',
    //     data_.pro,
    //     data_.other,
    //     data_.net,
    //     data_.media,
    //     data_.submit_type === '1' ? '新制' : data_.submit_type === '0' ? '舊制' : '',
    //     data_.old_total,
    //     data_.old_contemp,
    //     data_.old_culture,
    //     data_.old_history,
    //     data_.old_citizen,
    //     data_.old_group,
    //     data_.old_science,
    //     data_.new_total,
    //     data_.new_core_total,
    //     data_.new_core_society,
    //     data_.new_core_humanity,
    //     data_.new_basic,
    //     data_.new_cross,
    //     data_.en_status === '0' ? '未通過' : data_.en_status === '1' ? '通過' : '',
    //     data_.en_total,
    //     data_.en_basic,
    //     data_.en_advanced,
    //     data_.pe,
    //     data_.service,
    //     data_.art,
    //     data_.mentor,
    //     compulse
    //   ])
    //   // console.log(csvArr[i])
    // }
    dispatch(store_student_csv_data(parseCsv(res.data)))
  })
  // dispatch(store_student_csv_data(parseCsv(data_json)))
}

export const setGradutateState = post_item => dispatch => {
  axios.post('/assistants/graduate/check', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(set_graduate_state(post_item))
  }).catch(err => {
    console.log(err)
    console.log('POST_Item')
    console.log(post_item)
  })
}

const parseCsv = (data) => {
  let csvArr = []
  csvArr.push([
    '學號',
    '組別',
    '預審狀態',
    '畢業狀態',
    '本學期必過課程',
    '尚缺課程或學分數'
  ])

  for (let i = 0; i < data.length; i++) {
    let data_ = data[i][0]
    if (data_ === undefined) continue
    let condition = ''
    let conditionIndex = 1
    let compulse = ''
    for (let j = 0; j < data_.compulse.length; j++) {
      compulse += data_.compulse[j]
      compulse += ','
    }
    if (compulse !== '') {
      compulse = compulse.substring(0, compulse.length - 1)
      condition += (conditionIndex + '. 共同必修缺' + compulse + '\r\n')
      conditionIndex++
    }
    if (data_.pro !== '0') {
      condition += (conditionIndex + '. 專業選修缺' + data_.pro + ' 學分\r\n')
      conditionIndex++
    }
    if (data_.other !== '0') {
      condition += (conditionIndex + '. 其他選修缺' + data_.other + ' 學分\r\n')
      conditionIndex++
    }
    if (data_.submit_type === '0') {
      if (parseInt(data_.old_total, 10) !== 0) {
        condition += (conditionIndex + '. 舊制通識缺' + parseInt(data_.old_total, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_contemp, 10) !== 0) {
        condition += (conditionIndex + '. 通識當代向度缺' + parseInt(data_.old_contemp, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_culture, 10) !== 0) {
        condition += (conditionIndex + '. 通識文化向度缺' + parseInt(data_.old_culture, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_history, 10) !== 0) {
        condition += (conditionIndex + '. 通識歷史向度缺' + parseInt(data_.old_history, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_citizen, 10) !== 0) {
        condition += (conditionIndex + '. 通識公民向度缺' + parseInt(data_.old_citizen, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_group, 10) !== 0) {
        condition += (conditionIndex + '. 通識群己向度缺' + parseInt(data_.old_group, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_science, 10) !== 0) {
        condition += (conditionIndex + '. 通識自然向度缺' + parseInt(data_.old_science, 10) + ' 學分\r\n')
        conditionIndex++
      }
    } else if (data_.submit_type === '1') {
      if (parseInt(data_.new_total, 10) !== 0) {
        condition += (conditionIndex + '. 新制通識缺' + parseInt(data_.new_total, 10) + ' 學分\r\n')
        conditionIndex++
      }

      if (parseInt(data_.new_core_total, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心向度缺' + parseInt(data_.new_core_total, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_core_society, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心社會向度缺' + parseInt(data_.new_core_society, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_core_humanity, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心人文向度缺' + parseInt(data_.new_core_humanity, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_basic, 10) !== 0) {
        condition += (conditionIndex + '. 通識校基本素養向度缺' + parseInt(data_.new_basic, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_cross, 10) !== 0) {
        condition += (conditionIndex + '. 通識跨院向度缺' + parseInt(data_.new_cross, 10) + ' 學分\r\n')
        conditionIndex++
      }
    }
    if (data_.en_status === '0') {
      condition += (conditionIndex + '. 未通過英語測驗\r\n')
      conditionIndex++
    }
    if (parseInt(data_.pe, 10) !== 0) {
      condition += (conditionIndex + '. 體育缺' + parseInt(data_.pe, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.service, 10) !== 0) {
      condition += (conditionIndex + '. 服務學習缺' + parseInt(data_.service, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.art, 10) !== 0) {
      condition += (conditionIndex + '. 藝文賞析缺' + parseInt(data_.art, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.mentor, 10) !== 0) {
      condition += (conditionIndex + '. 導師時間缺' + parseInt(data_.mentor, 10) + ' 門\r\n')
      conditionIndex++
    }
    csvArr.push([
      data_.student_id,
      data_.program,
      data_.submit_status === '0' ? '未送審' : data_.submit_status === '1' ? '審核中' : data_.submit_status === '2' ? '已通過' : data_.submit_status === '3' ? '未通過' : '',
      data_.graduate_status === '0' ? '未符合' : data_.graduate_status === '1' ? '將符合' : data_.graduate_status === '2' ? '已符合' : '',
      compulse,
      condition
    ])
    // console.log(csvArr[i])
  }
  return csvArr
}
