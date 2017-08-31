import React, { PropTypes } from 'react'
import './Map.css';

import ReactHoverObserver from 'react-hover-observer';

const Todo = ({ onClick, pre_flag, cosCame }) => (
                <div className="course">
                    <ReactHoverObserver {...{
                        onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
                            if (e.target.className === 'course-btn') {
                                unsetIsHovering();
                            } else {
                                setIsHovering();
                            }
                        }
                    }}>
                        <div className="course-btn"
                             style={{
                                 background: pre_flag ? '#61070d' : '#616161'
                             }}
                             onClick={onClick}>
                            {cosCame}
                        </div>
                    </ReactHoverObserver>
                </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo