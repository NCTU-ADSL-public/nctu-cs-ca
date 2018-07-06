import { connect } from 'react-redux'
import { handleCoursedata } from '../actions'
import { setThisbutton } from '../actions'
import TodoList from '../MapComponents/TodoList'

const getVisibleTodos = (todos, filter, grad, sem) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos.filter(t => (t.grade === grad && t.semester === sem))
    case 'SHOW_COMPLETED':
      return todos.filter(t => (t.grade === grad && t.semester === sem))
    case 'SHOW_ACTIVE':
      return todos.filter(t => (t.grade === grad && t.semester === sem))
    default:
      return false
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter, ownProps.grad, ownProps.sem),
    active: ownProps.cosCame === state.setThisbutton
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (suggest, cosCame) => {
      dispatch(handleCoursedata(suggest))
      dispatch(setThisbutton(cosCame))
    }
  }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList
