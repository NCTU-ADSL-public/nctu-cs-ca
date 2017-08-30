import React, { PropTypes } from 'react'
import './Map.css';

import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
};
{/*<div className="course">*/}
    {/*<ReactHover*/}
        {/*options={optionsCursorTrueWithMargin}>*/}
        {/*<ReactHover.Trigger>*/}
            {/*<div className="course-btn"*/}
                 {/*style={{*/}
                     {/*background: pre_flag ? '#61070d' : '#616161'*/}
                 {/*}}*/}
                 {/*onClick={onClick}>*/}
                {/*{cosCame}*/}
            {/*</div>*/}
        {/*</ReactHover.Trigger>*/}
        {/*<ReactHover.Hover>*/}
            {/*<h1> I am hover HTML </h1>*/}
        {/*</ReactHover.Hover>*/}
    {/*</ReactHover>*/}
{/*</div>*/}

const Todo = ({ onClick, pre_flag, cosCame }) => (
    <ReactHover
        options={optionsCursorTrueWithMargin}>
        <ReactHover.Trigger>
            <h1 style={{background: '#abbcf1', width: '200px'}}> Hover on me </h1>
        </ReactHover.Trigger>
        <ReactHover.Hover>
            <h1> I am hover HTML </h1>
        </ReactHover.Hover>
    </ReactHover>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
};

export default Todo