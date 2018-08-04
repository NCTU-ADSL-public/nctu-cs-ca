import {combineReducers} from 'redux'
import Student from './Student'
import Teacher from './Teacher'
import Score from './Score'

export default combineReducers({
  Student,
  Teacher,
  Score
})
