import {combineReducers} from 'redux'
import User from './User'
import Professor from './Professor'
import ProjectList from './ProjectList'
import Map from './Map'

export default combineReducers({
  User,
  Professor,
  Map,
  ProjectList
})
