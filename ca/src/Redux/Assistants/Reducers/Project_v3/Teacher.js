import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [
    {
        "professor_name": "黃俊穎",
        "accepted": {
            "projects": [
                {
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        },
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        },
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        },
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                },
                {
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                },
                {
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                },
                {
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                },
                {
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
                    "title": "Design and Implement Binary Fuzzing based on LibFuzzer",
                    "students": [
                        {
                            "id": "0410022",
                            "name": "趙偉捷",
                            "program": "電資學士班3"
                        },
                        {
                            "id": "0416002",
                            "name": "陳憶賢",
                            "program": "資工系資工組3B"
                        },
                        {
                            "id": "0416077",
                            "name": "林思辰",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": []
        }
    },
    {
        "professor_name": "黃俊龍",
        "accepted": {
            "projects": [
                {
                    "title": "區塊鏈系統研發服務與產業應用",
                    "students": [
                        {
                            "id": "0416047",
                            "name": "王傳鈞",
                            "program": "資工系資工組3A"
                        }
                    ]
                }
            ]
        },
        "pending": {
            "projects": [
				{
                    "title": "333",
                    "students": [
                        {
                            "id": "0416004",
                            "name": "郭羽喬",
                            "program": "資電"
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
    }
  ]
}
export default handleActions({
  STORE_TEACHERS: (state, action) => ({ ...state,
    teachers: action.payload
  })
}, initialState)
