import React, { PropTypes } from 'react'
import './Map.css';

import ReactHoverObserver from 'react-hover-observer';


const Todo = ({ onHoverChanged, pre_flag, cosCame }) => (
    <div className="course">
        <ReactHoverObserver {...{
            className:"course-btn",
            style:{
                background: pre_flag ? '#61070d' : '#616161'
            },
            onHoverChanged:onHoverChanged,
        }}>
            {cosCame}
        </ReactHoverObserver>
    </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo