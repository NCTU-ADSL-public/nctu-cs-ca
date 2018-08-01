import {combineReducers} from 'redux'
import User from './User'
import Professor from './Professor'
import ProjectList from './ProjectList'

export default combineReducers({
  User,
  Professor,
  ProjectList
})
