import React, { PropTypes } from 'react'
import Todo from './Todo'
import './Map.css';

const TodoList = ({ todos, onTodoClick }) => (
    <div>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.cosCame)}
            />
        )}
    </div>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList