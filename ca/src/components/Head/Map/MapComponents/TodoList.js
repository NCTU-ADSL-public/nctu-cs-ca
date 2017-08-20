import React, { PropTypes } from 'react'
import CourseMapItem from './CourseMapItem'

const CourseMapItemList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo =>
            <CourseMapItem
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
)

CourseMapItemList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default CourseMapItemList