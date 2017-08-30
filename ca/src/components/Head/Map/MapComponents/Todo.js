import React, { PropTypes } from 'react'
import './Map.css';

import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
}
//
// const Example = () =>(
//     <div className="example">
//         <ReactHoverObserver {...{
//             className: 'example__observer',
//             onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
//                 if (e.target.className === 'example__child') {
//                     unsetIsHovering();
//                 } else {
//                     setIsHovering();
//                 }
//             }
//         }}>
//             <div className="example__child">
//                 passive
//             </div>
//             <Label />
//         </ReactHoverObserver>
//     </div>
// );
//
// const Label = ({ isHovering = false }) => (
//     <div className="example__label">
//         Is Hovering: { isHovering ? 'true' : 'false' }
//     </div>
// );

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
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo