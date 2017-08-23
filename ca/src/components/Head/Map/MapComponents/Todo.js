import React, { PropTypes } from 'react'
import './Map.css';

const Todo = ({ onClick, completed, text }) => (
    <div className="course">
        <div className="course-btn"
             style={{
                 textDecoration: completed ? 'line-through' : 'none'
             }}
             onClick={onClick}>
            {text}
        </div>
    </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo