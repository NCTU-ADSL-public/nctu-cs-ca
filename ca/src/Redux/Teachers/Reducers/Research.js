import { handleActions } from 'redux-actions'

// INITIALIZATIONS FOR REDUCERS, WHICH IS GOING TO TAKE ACTIONS
const initialState = {
  applyList: [
    { research_title: '資料錯誤',
      status: 0,
      year: '107-1',
      first_second: '2',
      participants: [
        { student_id: '0399999',
          sname: '陳罐頭',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 1,
        },
        { student_id: '0391234',
          sname: '郭梁兒',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 1,
        },
        { student_id: '0391666',
          sname: '耿平',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 0,
        },
        { student_id: '0416014',
          sname: '王立洋',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 1,
        },
        { student_id: '0391444',
          sname: '俞阿杰',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 0,
        }
      ]
    },
    { research_title: '我的專題',
      status: 0,
      year: '107-1',
      first_second: '2',
      participants: [
        { student_id: '0416014',
          sname: '王立洋',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 1,
        }
      ]
    },
    { research_title: '資料錯誤',
      status: '2',
      year: '107-1',
      first_second: '2',
      participants: [
        { student_id: '0399997',
          sname: '陳乾頭',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 0,
        }
      ]
    },
    { research_title: '資料錯誤',
      status: '3',
      year: '107-1',
      first_second: '2',
      participants: [
        { student_id: '0399987',
          sname: '陳憨頭',
          email: 'danny021406@gmail.com',
          phone: '',
          first_second: '2',
          student_status: 1,
        }
      ]
    }
  ]
}

export default handleActions({
  UPDATE_APPLY_LIST: (state, action) => {
    console.log('UPDATE_APPLY_LIST ACTION: ', {...state, applyList: [...action.payload]})
    return ({...state, applyList: [...action.payload]})
  }
}, initialState)
