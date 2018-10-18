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
          "compulse":["計算機組織", "資工專題(二)"],
          "pro": 3,
          "other": 2,
          "general": {
              "old": {
                  "total": 0,
                  "contemp": 0,
                  "culture": 0,
                  "history": 0,
                  "citizen": 0,
                  "group": 0,
                  "science": 0,
              },
              "new": {
                  "total": 0,
                  "core": 0,
                  "basic": 0,
                  "cross": 0
              }
          },
          "lang": {
              "status": 0,
              "basic": 0,
              "advanced": 0
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
    students: action.payload
  }),
  CLEAR_STUDENTS: (state, action) => ({ ...state,
    students: []
  })
}, initialState)
