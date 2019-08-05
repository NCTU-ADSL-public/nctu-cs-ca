import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [],
  input: '',
  year: '',
  semester: '',
  first_second: ''
}

export default handleActions({
  PROJECT_STATUS_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  })
}, {
  ...initialState,
  teachers: initialState.teachers.map( teacher => {
    return {
      ...teacher,
      gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
        return sum + project.students.filter( student => student.status === "1" ).length
      }, 0)
    }
  })
})
