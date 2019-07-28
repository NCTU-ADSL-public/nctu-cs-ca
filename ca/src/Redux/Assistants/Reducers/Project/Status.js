import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [{
    "professor_name": "易志偉",
    "accept_status": "0",
    "pending_status": "0",
    "gradeCnt": 20,
    "accepted": {
      "projects": [
        {
          "title": "Train Machines by Machines",
          "students": [
            {
              "id": "0416054",
              "name": "莊紹平",
              "program": "資工系 資工組3B ",
              "semester": "107-1",
              "add_status": "0",
              "first_second": "3",
              "status": "1"
            }
          ]
        },
        {
          "title": "自動化深度學習伺服器佈署",
          "students": [
            {
              "id": "0416096",
              "name": "徐浚于",
              "program": "資工系資工組3B",
              "semester": "106-2",
              "add_status": "0",
              "first_second": "2",
              "status": "1"
            },
            {
              "id": "0416235",
              "name": "劉昱劭",
              "program": "資工系網多組3",
              "semester": "106-2",
              "add_status": "1",
              "first_second": "2",
              "status": "1"
            }
          ]
        },
        {
          "title": "深度學習熱度圖用於姿態判斷",
          "students": [
            {
              "id": "0416102",
              "name": "鄭子琳",
              "program": "資工系 資工組3B ",
              "semester": "107-1",
              "add_status": "1",
              "first_second": "2",
              "status": "1"
            },
            {
              "id": "0416104",
              "name": "李佩琪",
              "program": "資工系資工組3B",
              "semester": "107-1",
              "add_status": "1",
              "first_second": "2",
              "status": "1"
            }
          ]
        }
      ]
    },
    "pending": {
      "projects": [
        {
          "title": "摩托車",
          "students": [
            {
              "id": "0416202",
              "name": "黃柏閎",
              "program": "網多",
              "first_second": "1",
              "status": "1"
            }
          ]
        }
      ]
    }
  },{
    "professor_name": "易志偉",
    "accept_status": "0",
    "pending_status": "0",
    "gradeCnt": 5,
    "accepted": {
      "projects": []
    },
    "pending": {
      "projects": []
    }
  }],
  input: '',
  year: '',
  semester: '',
  first_second: ''
}

export default handleActions({
  STATUS_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  })
}, initialState)
