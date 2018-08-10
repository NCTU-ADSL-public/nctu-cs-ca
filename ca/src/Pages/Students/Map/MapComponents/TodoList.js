import React from 'react'
import Todo from './Todo'
// import './Map.css'

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

export default TodoList
