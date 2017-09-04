import React, { PropTypes } from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ReactHoverObserver from 'react-hover-observer';

const Todo = ({ onClick, completed , pre_flag, cosCame }) => (
                <div className="course">
                    <ReactHoverObserver {...{
                        onMouseOver: ({ e, setIsHovering, unsetIsHovering }) =>
                            onClick

                    }}>
                        <MuiThemeProvider>
                            <div className="course-btn"
                                 style={{
                                     border: pre_flag ? 'solid 2px #611505':'',
                                 }}
                                 onClick={onClick}
                                        label={cosCame}>

                            </div>
                        </MuiThemeProvider>
                    </ReactHoverObserver>
                </div>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo