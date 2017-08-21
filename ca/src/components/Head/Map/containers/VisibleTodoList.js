import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import CourseMapItemList from '../MapComponents/CourseMapItemList';
import { createStore } from 'redux';
import todoApp from '../reducers';

let store = createStore(todoApp);

const getVisibleTodos = (courseMapItems, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return courseMapItems;
    }
};

const mapStateToProps = (state) => {
    return {
        courseMapItems: getVisibleTodos(state.courseMapItems, state.visibilityFilter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            // dispatch(toggleTodo(id))
        }
    }
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseMapItemList);

export default VisibleTodoList