import { handleActions } from 'redux-actions'

const initialState = {
  students: [],
  project_status_filter: [false, false, false],
  program_filter: [false, false, false, false, false, false],
  input: '',
  academic_year: 106,
  semestor: 1,
  page: 0,
  number_per_page: 10
}

export default handleActions({
  STORE_STUDENTS: (state, action) => ({ ...state, students: action.payload }),
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
  SET_INPUT: (state, action) => ({ ...state,
    input: action.payload
  }),
  SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  }),
  SET_SEMESTOR: (state, action) => ({ ...state,
    semestor: action.payload
  }),
  SET_NUMBER_PER_PAGE: (state, action) => ({ ...state,
    number_per_page: action.payload
  }),
  TO_GIVEN_PAGE: (state, action) => ({ ...state,
    page: action.payload
  })
}, initialState)
