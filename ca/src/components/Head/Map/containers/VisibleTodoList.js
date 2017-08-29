import { connect } from 'react-redux'
import { setPascos } from '../actions'
import TodoList from '../MapComponents/TodoList'

const getVisibleTodos = (todos, filter, grad, sem) => {
    console.log(grad);
    switch (filter) {
        case 'SHOW_ALL':
            return todos.filter(t => (t.grade===grad && t.semester===sem));
        case 'SHOW_COMPLETED':
            return todos.filter(t => (t.grade===grad && t.semester===sem && t.completed));
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter, ownProps.grad, ownProps.sem)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList