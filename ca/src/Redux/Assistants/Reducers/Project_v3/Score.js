import { handleActions } from 'redux-actions'

const initialState = {
  scores: []
  ,csvData: [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
  ],
  start: true
}
export default handleActions({
  STORE_SCORES: (state, action) => ({ ...state,
    scores: action.payload
  }),
  SET_SCORES: (state, action) => ({ ...state,
    scores: state.scores.map(score => ({ ...score,
      student: { ...score.student,
        score: score.student.id === action.payload.student_id ? action.payload.new_score : score.student.score,
        comment: score.student.id === action.payload.student_id ? action.payload.new_comment : score.student.comment
      }
    }))
  }),
  STORE_SCORE_CSV_DATA: (state, action) => {
    return ({ ...state,
      csvData: action.payload,
      start: false
    })
  },
  STORE_SCORE_CSV_DATA_START: (state, action) => {
    return ({ ...state,
      start: true
    })
  }
}, initialState)
