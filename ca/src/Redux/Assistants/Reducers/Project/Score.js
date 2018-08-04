import { handleActions } from 'redux-actions'

const initialState = {
  first_second: 1,
  academic_year: 106,
  semestor: 2
}

export default handleActions({
  SCORE_SET_SEMESTOR: (state, action) => ({ ...state,
    semestor: action.payload
  }),
  SCORE_SET_ACADEMIC_YEAR: (state, action) => ({ ...state,
    academic_year: action.payload
  }),
  SCORE_SET_FIRST_SECOND: (state, action) => ({ ...state,
    first_second: action.payload
  })
}, initialState)
