import { handleActions } from 'redux-actions'

// INITIALIZATIONS FOR REDUCERS, WHICH IS GOING TO TAKE ACTIONS
const initialState = {
  applyList: [
    { research_title: '...',
      status: 0,
      year: '...-...',
      first_second: '...',
      participants: [
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        }
      ]
    },
    { research_title: '...',
      status: 0,
      year: '...-...',
      first_second: '...',
      participants: [
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        }
      ]
    }
  ],
  research1: {
    cs_number: 0,
    other_number: 0,
    current_accept: 0,
    groups: [
      {
        research_title: '洨敬白布雞使喚唷際甘草精華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-2'
      },
      {
        research_title: '洨敬白布雞使喚華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-1'
      },
      {
        research_title: '...',
        participants: [
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '...'
      }
    ]
  },
  research2: {
    cs_number: 0,
    other_number: 0,
    current_accept: 0,
    groups: [
      {
        research_title: '洨敬白布雞使喚唷際甘草精華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-2'
      },
      {
        research_title: '洨敬白布雞使喚華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-1'
      },
      {
        research_title: '...',
        participants: [
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '...'
      }
    ]
  },
  research: {
    cs_number: 0,
    other_number: 0,
    current_accept: 0,
    groups: [
      {
        research_title: '洨敬白布雞使喚唷際甘草精華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-2'
      },
      {
        research_title: '洨敬白布雞使喚華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-1'
      },
      {
        research_title: '...',
        participants: [
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '...'
      }
    ]
  }
}

export default handleActions({
  UPDATE_APPLY_LIST: (state, action) => {
    console.log('UPDATE_APPLY_LIST ACTION: ', {...state, applyList: [...action.payload]})
    return ({...state, applyList: [...action.payload]})
  },
  UPDATE_RESEARCH_LIST: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research: {...action.payload} })
  },
  UPDATE_RESEARCH_LIST_1: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST_1 ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research1: {...action.payload} })
  },
  UPDATE_RESEARCH_LIST_2: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST_2 ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research2: {...action.payload} })
  }
}, initialState)
