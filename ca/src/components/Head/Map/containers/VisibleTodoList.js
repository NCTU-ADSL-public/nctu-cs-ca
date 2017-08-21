import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import CourseMapItemList from '../MapComponents/CourseMapItemList'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return CourseMapItemList;
        default:
            return CourseMapItemList;
    }
}

const mapStateToProps = (state) => {
    return {
        courseMapItems: getVisibleTodos(state.CourseMapItemList, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseMapItemList)

export default VisibleTodoList