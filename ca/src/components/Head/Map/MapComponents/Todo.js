import React, { PropTypes } from 'react'
import './Map.css';


const Todo = ({ onClick, pre_flag, cosCame }) => (
    <div className="course">
        <div className="course-btn"
             style={{
                 background: pre_flag ? '#61070d' : '#616161'
             }}
             onClick={onClick}>
            {cosCame}
        </div>
    </div>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
};

export default Todo