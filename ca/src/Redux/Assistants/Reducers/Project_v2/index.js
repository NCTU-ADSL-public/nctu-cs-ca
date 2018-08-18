import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [{
    "professor_name": "吳凱強",
    "accepted": {
      "projects": []
    },
    "pending": {
      "projects": []
    }
  }]
}

export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload.map( (teacher) => ({ ...teacher,
      accepted_number: teacher.accepted.projects.reduce( (accepted_number, project) => accepted_number + project.students.length, 0),
      pending_number: teacher.pending.projects.reduce( (pending_number, project) => pending_number + project.students.length, 0)
    }))
  }),
}, initialState)
