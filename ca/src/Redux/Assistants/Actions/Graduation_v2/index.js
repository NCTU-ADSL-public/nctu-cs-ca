import { createAction } from 'redux-actions'
import axios from 'axios'

export const set_graduate_state = createAction('SET_GRADUATE_STATE')
export const store_student = createAction('STORE_STUDENT')
export const store_student_csv_data = createAction('STORE_STUDENT_CSV_DATA')

export const triggerUpdateData = () => dispatch => {
  ['一', '二', '三', '四'].map(title => {
    axios.post('/assistants/graduate/gradeStudent', { grade: title }).then(res => {
      res.data.map(student => {
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
  axios.post('/assistants/graduate/graduateStudent', { grade }).then(res => {
    dispatch(store_student(res.data))
  })
  axios.post('/assistants/graduate/graduateListDownload', { grade }).then(res => {
    let data = res.data
    let csvArr = []
    console.log(data)
    csvArr.push([
      '學號',
      '姓名',
      '組別',
      '總學分',
      '有沒有英文授課專業課程',
      '預審狀態',
      '畢業狀態',
      '專業選修',
      '其他選修',
      '網路專業課程',
      '多媒體專業課程',
      '舊制或新制',
      '舊制通識 缺的總學分',
      '當代',
      '文化',
      '歷史',
      '公民',
      '群己',
      '自然',
      '新制通識 缺的總學分',
      '核心',
      '核心社會向度',
      '核心人文向度',
      '校基本素養',
      '跨院',
      '外語的狀態',
      '外語',
      '外語基礎',
      '外語進階(包含二外) ',
      '體育 ',
      '服務學習',
      '藝文護照',
      '導師時間',
      '必修缺課'
    ])
    for (let i = 0; i < data[0].length; i++) {
      let data_ = data[0][i][0]
      let compulse = ''
      for (let j = 0; j < data_.compulse.length; j++) {
        compulse += data_.compulse[j]
        compulse += ','
      }
      csvArr.push([
        data_.student_id,
        data_.sname,
        data_.program,
        data_.total_credit,
        data_.en_course,
        data_.submit_status,
        data_.graduate_status,
        data_.pro,
        data_.other,
        data_.net,
        data_.media,
        data_.submit_type === 1 ? '新制' : data[i].submit_type === 0 ? '舊制' : '',
        data_.old_total,
        data_.old_contemp,
        data_.old_culture,
        data_.old_history,
        data_.old_citizen,
        data_.old_group,
        data_.old_science,
        data_.new_total,
        data_.new_core_total,
        data_.new_core_society,
        data_.new_core_humanity,
        data_.new_basic,
        data_.new_cross,
        data_.en_status,
        data_.en_total,
        data_.en_basic,
        data_.en_advanced,
        data_.pe,
        data_.service,
        data_.art,
        data_.mentor,
        compulse
      ])
    }
    dispatch(store_student_csv_data(csvArr))
  })
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
