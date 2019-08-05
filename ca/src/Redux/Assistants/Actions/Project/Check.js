import { createAction } from 'redux-actions'
import axios from 'axios'

export const check_handle_change = createAction('PROJECT_CHECK_HANDLE_CHANGE');
export const check_delete = createAction('CHECK_DELETE')

export const checkHandleChange = (payload) => dispatch => {
  dispatch(check_handle_change(payload));
}

export const fetchCheck = (payload) => dispatch => {
  axios.all([
    axios.post('/assistants/research/professorList', {
      ...payload,
      first_second: "1"
    }),
    axios.post('/assistants/research/professorList', {
      ...payload,
      first_second: "2"
    }),
    axios.post('/assistants/research/professorList', {
      ...payload,
      first_second: "3"
    })
  ]).then(axios.spread((first_res, second_res, third_res) => {
    dispatch(check_handle_change({
      checks: [
        ...first_res.data.map( teacher => 
          teacher.accepted.projects.map( project => (
            project.students.filter( student => 
              student.add_status === "0" 
            ).map( student => ({
              ...student,
              professor_name: teacher.professor_name,
              research_title: project.title,
              semester: payload.year + '-' + payload.semester
            }))
          ))
        ).flat(2),
        ...second_res.data.map( teacher => 
          teacher.accepted.projects.map( project => (
            project.students.filter( student => 
              student.add_status === "0" 
            ).map( student => ({
              ...student,
              professor_name: teacher.professor_name,
              research_title: project.title,
              semester: payload.year + '-' + payload.semester
            }))
          ))
        ).flat(2),
        ...third_res.data.map( teacher => 
          teacher.accepted.projects.map( project => (
            project.students.filter( student => 
              student.add_status === "0" 
            ).map( student => ({
              ...student,
              professor_name: teacher.professor_name,
              research_title: project.title,
              semester: payload.year + '-' + payload.semester
            }))
          ))
        ).flat(2)
      ]
    }))
  })).catch( err => console.log(err) )
}

export const agreeCheck = (payload) => dispatch => {
  axios.all([
    axios.post('/assistants/research/setAddStatus', payload),
    axios.post('/assistants/research/setFirstSecond', payload)
  ]).then(axios.spread((first_res, second_res) => {
    dispatch(check_delete(payload.student_id))
    window.confirm("加選成功")
  })).catch(err => 
    window.confirm("加選失敗，請檢查網路是否建立連線")
  )
}

export const rejectCheck = (payload) => dispatch => {
  axios.post('/assistants/research/delete', payload).then( res => {
    dispatch(check_delete(payload.student_id))
    window.confirm("退選成功")
  }).catch(err => 
    window.confirm("退選失敗，請檢查網路是否建立連線")
  )
}