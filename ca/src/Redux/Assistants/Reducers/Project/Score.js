import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  first_second: 1,
  academic_year: 106,
  semester: 2,
  sort_by: 'id',
  desend: true,
  page: 0,
  input: ''
}

export default handleActions({
  SCORE_SET_SEMESTER: (state, action) => ({ ...state,
    semester: action.payload
  }),
  SCORE_SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  }),
  SCORE_SET_FIRST_SECOND: (state, action) => ({ ...state,
    first_second: action.payload
  }),
  SCORE_SET_SORT_BY: (state, action) => ({ ...state,
    sort_by: action.payload,
    desend: true
  }),
  SCORE_TOGGLE_DESEND: (state) => ({ ...state,
    desend: !state.desend
  }),
  SCORE_TO_GIVEN_PAGE: (state, action) => ({ ...state,
    page: action.payload
  }),
  STORE_SCORE: (state, action) => ({ ...state,
    scores: action.payload
  }),
  SCORE_SET_INPUT: (state, action) => ({ ...state,
    input: action.payload
  })
}, initialState)
