import { handleActions } from 'redux-actions'

const initialState = {
  students: [
    {
      "id": "0416001",
      "name": "王大名",
      "program": "資A",
      "detail": {
          "total": 116,
          "status": 0,
          "compulse":[],
          "pro": 3,
          "other": 2,
          "general": {
              "old": {
                  "total": 12,
                  "contemp": 4,
                  "culture": 4,
                  "history": 4,
                  "citizen": 4,
                  "group": 4,
                  "science": 4,
              },
              "new": {
                  "total": 12,
                  "core": 0,
                  "basic": 0,
                  "cross": 3
              }
          },
          "lang": {
            "total" : 12,
              "status": 0,
              "basic_credit": 0,
              "advanced_course": 0
          },
          "pe": 0,
          "service": 0,
          "art": 0,
          "mentor": 0,
      }
  },
  {
    "id": "0416001",
    "name": "王大名",
    "program": "資A",
    "detail": {
        "total": 116,
        "status": 0,
        "compulse":[],
        "pro": 3,
        "other": 2,
        "general": {
            "old": {
                "total": 12,
                "contemp": 4,
                "culture": 4,
                "history": 4,
                "citizen": 4,
                "group": 4,
                "science": 4,
            },
            "new": {
                "total": 12,
                "core": 0,
                "basic": 0,
                "cross": 3
            }
        },
        "lang": {
          "total" : 12,
            "status": 0,
            "basic_credit": 0,
            "advanced_course": 0
        },
        "pe": 0,
        "service": 0,
        "art": 0,
        "mentor": 0,
    }
}
  ]
}
export default handleActions({
  STORE_GRADUATE_DETAIL: (state, action) => ({ ...state,
    students: [...state.students, action.payload]
  }),
  CLEAR_STUDENTS: (state, action) => ({ ...state,
    students: []
  }),
  STORE_GRADUATE_STATE: (state, action) => ({ ...state,
    students: state.students.map( student => student.id !== action.payload.student_id ?
      student
      :
      { ...student,
        graduate_status: action.payload.data.check.state
      }
    )
  })
}, initialState)
