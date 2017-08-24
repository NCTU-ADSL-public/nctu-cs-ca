import React, { PropTypes } from 'react'
import './Map.css';

const Todo = ({ onClick, completed, cosCame }) => (
    <div className="course">
        <div className="course-btn"
             style={{
                 textDecoration: completed ? 'line-through' : 'none'
             }}
             onClick={onClick}>
            {cosCame}
        </div>
    </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo