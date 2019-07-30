import { createAction } from 'redux-actions'
import axios from 'axios'

// export const store_teachers = createAction('STORE_TEACHERS')
// export const update_add_status = createAction('UPDATE_ADD_STATUS')
// export const update_first_second = createAction('UPDATE_FIRST_SECOND')
// export const delete_research = createAction('DELETE_RESEARCH')
// export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
// export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


// export const fetchTeachers = (post_item) => dispatch => {
//   axios.post('/assistants/research/professorList', post_item).then(res => {
//     dispatch(store_teachers(res.data))
//   }).catch(err => {
//     console.log(err)
//   })
// }

export const check_handle_change = createAction('CHECK_HANDLE_CHANGE');

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
              professor_name: teacher.professor_name
            }))
          ))
        ).flat(2),
        ...second_res.data.map( teacher => 
          teacher.accepted.projects.map( project => (
            project.students.filter( student => 
              student.add_status === "0" 
            ).map( student => ({
              ...student,
              professor_name: teacher.professor_name
            }))
          ))
        ).flat(2),
        ...third_res.data.map( teacher => 
          teacher.accepted.projects.map( project => (
            project.students.filter( student => 
              student.add_status === "0" 
            ).map( student => ({
              ...student,
              professor_name: teacher.professor_name
            }))
          ))
        ).flat(2)
      ]
    }))
  })).catch( err => console.log(err) )
}