import { handleActions } from 'redux-actions'

const initialState = {
  students: [],
  project_status_filter: [false, false, false],
  program_filter: [false, false, false, false, false, false],
  input: '',
  academic_year: 106,
  semester: 1,
  page: 0,
  sort_by: 'id',
  desend: true
}

export default handleActions({
  STORE_STUDENTS: (state, action) => ({ ...state,
    students: action.payload
  }),
  TOGGLE_PROJECT_STATUS_FILTER: (state, action) => ({ ...state,
    project_status_filter: state.project_status_filter.map( (item, index) => {
        return action.payload === index ? !item : item
      })
  }),
  TOGGLE_PROGRAM_FILTER: (state, action) => ({ ...state,
    program_filter: state.program_filter.map( (item, index) => {
      return action.payload === index ? !item : item
    })
  }),
  STUDENT_SET_INPUT: (state, action) => ({ ...state,
    input: action.payload
  }),
  STUDENT_SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  }),
  STUDENT_SET_SEMESTER: (state, action) => ({ ...state,
    semester: action.payload
  }),
  STUDENT_SET_NUMBER_PER_PAGE: (state, action) => ({ ...state,
    number_per_page: action.payload
  }),
  STUDENT_TO_GIVEN_PAGE: (state, action) => ({ ...state,
    page: action.payload
  }),
  STUDENT_TOGGLE_DESEND: (state) => ({ ...state,
    desend: !state.desend
  }),
  STUDENT_SET_SORT_BY: (state, action) => ({ ...state,
    sort_by: action.payload,
    desend: true
  })
}, initialState)
