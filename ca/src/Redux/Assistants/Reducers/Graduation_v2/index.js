import { handleActions } from 'redux-actions'

const initialState = {
  students: [{
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
                "contemp": 1,
                "culture": 1,
                "history": 1,
                "citizen": 2,
                "group": 2,
                "science": 3,
            },
            "new": {
                "total": 2,
                "core": 3,
                "basic": 3,
                "cross": 4
            }
        },
        "lang": {
            "status": 0,
            "basic": 2,
            "advanced": 2
        },
        "pe": 3,
        "service": 3,
        "art": 3,
        "mentor": 3,
    }
}
  ]
}
export default handleActions({
  STORE_GRADUATE_DETAIL: (state, action) => ({ ...state,
    students: [...state.students, action.payload]
  })
}, initialState)
