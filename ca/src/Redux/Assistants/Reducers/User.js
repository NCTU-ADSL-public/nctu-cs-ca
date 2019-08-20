import {handleActions } from 'redux-actions'

const initalState = {
  type: 'assistant', // for Navbar
  idCard: {
    name: '小翠',
    prog: '助理',
    grad: '',
    id: 'T1234',
    email: 'xxx@gmail.com'
  },
  superMode: false
}

export default handleActions({
  UPDATE_USER_INFO: (state, action) => ({...state, idCard: action.payload}),
  ON_SUPER_MODE: (state, action) => ({ ...state, superMode: true })
}, initalState)
