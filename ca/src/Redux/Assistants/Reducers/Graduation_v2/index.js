import { handleActions } from 'redux-actions'

const initialState = {
  students: [
  {
      "id": "0416001",
      "name": "吳允英",
      "program": "資A",
      "total": 95,
      "status": "0"
    },{
      "id": "0416002",
      "name": "鄭惠恩",
      "program": "資B",
      "total": 110,
      "status": "1"
    },{
      "id": "0416003",
      "name": "臧瑋婷",
      "program": "資A",
      "total": 128,
      "status": "2"
    },{
      "id": "0416004",
      "name": "張其枝",
      "program": "資B",
      "total": 88,
      "status": "0"
    },{
      "id": "0416005",
      "name": "謝淑惠",
      "program": "資A",
      "total": 116,
      "status": "1"
    },{
      "id": "0416201",
      "name": "郭雅柏",
      "program": "網多",
      "total": 128,
      "status": "2"
    },{
      "id": "0416202",
      "name": "李俊傑",
      "program": "網多",
      "total": 128,
      "status": "2"
    },{
      "id": "0416203",
      "name": "陳郁芷",
      "program": "網多",
      "total": 116,
      "status": "1"
    },{
      "id": "0416301",
      "name": "張慧茹",
      "program": "資電",
      "total": 128,
      "status": "2"
    },{
      "id": "0416302",
      "name": "李盛傑",
      "program": "資電",
      "total": 76,
      "status": "0"
    },{
      "id": "0416303",
      "name": "盛宇航",
      "program": "資電",
      "total": 92,
      "status": "0"
    },{
      "id": "0416304",
      "name": "蔣結明",
      "program": "資電",
      "total": 128,
      "status": "2"
    },{
      "id": "0416305",
      "name": "李又晨",
      "program": "資電",
      "total": 108,
      "status": "1"
    }
  ]
}
export default handleActions({
  STORE_GRADUATE_DETAIL: (state, action) => ({ ...state,
    students: state.students.map( (student, index) => index !== action.payload.index ? student : {...student,
      detail: action.payload.data
    })
  }),
  STORE_GRADUATE_LIST: (state, action) => ({ ...state,
    students: action.payload
  })
}, initialState)
