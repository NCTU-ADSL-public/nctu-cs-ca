import React, { PropTypes } from 'react'
import './Map.css';

const Todo = ({ onClick, completed, text }) => (
    <div className="course-group course-group-1"
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo