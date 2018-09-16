import { handleActions } from 'redux-actions'

const initialState = {
  teachers: []
}

export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload
  }),
  UPDATE_ADD_STATUS: (state, action) => ({ ...state,
    teachers: state.teachers.map( teacher => ({ ...teacher,
      accepted: { ...teacher.accepted,
        projects: teacher.accepted.projects.map( project => ({ ...project,
          students: project.students.map( student => ({...student,
            add_status: student.id === action.payload ? "1" : student.add_status
          }))
        }))
      }
    }))
  })
}, initialState)
