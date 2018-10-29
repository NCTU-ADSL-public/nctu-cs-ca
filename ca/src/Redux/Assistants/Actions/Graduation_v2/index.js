import { createAction } from 'redux-actions'
import axios from 'axios'

export const set_graduate_state = createAction('SET_GRADUATE_STATE')
export const store_student = createAction('STORE_STUDENT')
export const store_student_csv_data = createAction('STORE_STUDENT_CSV_DATA')

export const triggerUpdateData = () => dispatch => {
  ['一', '二', '三', '四'].map( title => {
    axios.post('/assistants/graduate/gradeStudent', { grade: title }).then(res => {
      res.data.map( student => {
        setTimeout(function(){
          axios.get('/assistants/graduate/glist', {
            params: {
              student_id: student.student_id
            }
          })
        }, 500);
      })
    })
  })
}

export const fetchStudent = grade => dispatch => {
  axios.post('/assistants/graduate/studentList', { grade }).then( res => {
    dispatch(store_student(res.data))
  })
  // axios.post('assistants/graduate/graduateListDownload', { grade }).then( res => {
  //   let data = res.data
  //   let csvArr = []
  //   console.log(data)
  //   csvArr.push(['學號', '姓名', '班級', '在學學期數', '累積學分數', '不計學分數', '畢業條件', '必修科目', '專業選修', '其他選修', '通識', '外語', '本學期必過課程'])
  //   for (let i = 0; i < data.length; i++) {
  //     csvArr.push([data[i].tname, data[i].sname, data[i].student_id, data[i].score, data[i].comment])
  //   }
  //   dispatch(store_student_csv_data(res.data))
  // })
}

export const setGradutateState = post_item => dispatch => {
  axios.post('/assistants/graduate/check', post_item).then(res => {
    console.log('Fetching')
    console.log('POST_Item')
    console.log(post_item)
    console.log('RES DATA')
    console.log(res.data)
    dispatch(set_graduate_state(post_item))
  }).catch( err => {
    console.log(err)
    console.log("POST_Item")
    console.log(post_item)
  })
}
