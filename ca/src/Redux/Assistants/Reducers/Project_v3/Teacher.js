import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "semester": "107-1",
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A",
                            "first_second": "1"
                        }
                    ]
                },
                {
                    "semester": "107-2",
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A",
                            "first_second": "2"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				        {
                    "semester": "106-2",
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電",
                            "first_second": "1"
                        }
                    ]
                }

			]
        }
    },
    {
        "professor_name": "黃國源",
        "accepted": {
            "projects": []
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊穎",
        "accepted": {
            "projects": [
                {
                    "semester": "107-2",
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3",
                            "first_second": "1"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B",
                            "first_second": "2"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A",
                            "first_second": "1"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    }
  ]
}
export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload
  })
}, initialState)
