import React from 'react'
import Todo from './Todo'
import './Map.css'
import PropTypes from 'prop-types'

const TodoList = ({ todos, onTodoClick }) => (
  <div>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
            />
        )}
  </div>
)

// TodoList.propTypes = {
//     todos: PropTypes.arrayOf(PropTypes.shape({
//         pre_flag: PropTypes.bool.isRequired,
//         completed: PropTypes.bool.isRequired,
//         cos_cname: PropTypes.string.isRequired
//     }).isRequired).isRequired,
//     onTodoClick: PropTypes.func.isRequired
// };

export default TodoList
