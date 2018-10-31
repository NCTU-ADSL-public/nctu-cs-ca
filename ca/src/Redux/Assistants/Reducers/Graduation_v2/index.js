import { handleActions } from 'redux-actions'

const initialState = {
  students: [/*{
    "student_id": "0416210",
    "sname": "王大明",
    "program": "資電",
    "total_credit": '',
    "eng_course": 0,
    "submit_status": 1,
    "graduate_status": 0,
    "pro": 1,
    "other": 1,
    "net": 0,
    "media": 1,
    "submit_type": 0,
    "old_total": 1,
    "old_contemp": 1,
    "old_culture": 1,
    "old_history": 1,
    "old_citizen": 1,
    "old_group": 1,
    "old_science": 1,
    "new_total": 1,
    "new_core_total": 1,
    "new_core_society": 1,
    "new_core_humanity": 1,
    "new_basic": 1,
    "new_cross": 1,
    "en_status": 1,
    "en_basic": 1,
    "en_advanced": 1,
    "pe": 1,
    "service": 1,
    "art": 1,
    "mentor": 1,
    "compulse": ["計算機", "組織", "電路"]
  }*/],
  students_csv_data: []
}
export default handleActions({
  SET_GRADUATE_STATE: (state, action) => ({ ...state,
    students: state.students.map( student => student.id !== action.payload.student_id ?
      student
      :
      { ...student,
        graduate_status: action.payload.graduate_submit
      }
    )
  }),
  STORE_STUDENT: (state, action) => ({ ...state,
    students: action.payload
  }),
  STORE_STUDENT_CSV_DATA: (state, action) => ({ ...state,
    students_csv_data: action.payload
  })
}, initialState)
