import { handleActions } from 'redux-actions'

const initialState = {
  scores: [
    {
        "professor_name": "蕭子健",
        "student": {
            "id": "0216098",
            "name": "歐嘉恒",
            "score": 80,
            "comment": ""
        }
    },
    {
        "professor_name": "蕭子健",
        "student": {
            "id": "0216099",
            "name": "歐嘉",
            "score": 90,
            "comment": "好棒窩"
        }
    },
    {
        "professor_name": "莊榮宏",
        "student": {
            "id": "0216330",
            "name": "葉信華",
            "score": null,
            "comment": null
        }
    }
  ]
}
export default handleActions({
  STORE_SCORES: (state, action) => ({ ...state,
    scores: action.payload
  })
}, initialState)
