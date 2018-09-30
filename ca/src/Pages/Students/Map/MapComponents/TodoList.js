import React from 'react'
import Todo from './Todo'

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
