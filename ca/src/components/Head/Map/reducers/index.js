import { combineReducers } from 'redux'
import courseMapItems from './courseMapItem'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    courseMapItems,
    visibilityFilter
})

export default todoApp;