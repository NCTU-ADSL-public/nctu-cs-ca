import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [],
  input: '',
  academic_year: 106,
  semester: 1,
  page: 0,
  number_per_page: 10,
  sort_by: 'name',
  desend: true
}

export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload.map( (teacher, index) => ({ ...teacher,
      id: index,
      accepted_number: teacher.accepted.projects.reduce( (accepted_number, project) => accepted_number + project.students.length, 0),
      pending_number: teacher.pending.projects.reduce( (pending_number, project) => pending_number + project.students.length, 0)
    }))
  }),
  TEACHER_SET_INPUT: (state, action) => ({ ...state,
    input: action.payload
  }),
  TEACHER_TO_GIVEN_PAGE: (state, action) => ({ ...state,
    page: action.payload
  }),
  TEACHER_SET_SORT_BY: (state, action) => ({ ...state,
    sort_by: action.payload,
    desend: true
  }),
  TEACHER_TOGGLE_DESEND: (state) => ({ ...state,
    desend: !state.desend
  }),
  TEACHER_SET_SEMESTER: (state, action) => ({ ...state,
    semester: action.payload
  }),
  TEACHER_SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  })
}, initialState)
