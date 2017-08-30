import React, { PropTypes } from 'react'
import './Map.css';

import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
};
{/*<ReactHover*/}
    {/*options={optionsCursorTrueWithMargin}>*/}
    {/*<ReactHover.Trigger>*/}
        {/*<div className="course">*/}
            {/*<div className="course-btn"*/}
                 {/*style={{*/}
                     {/*background: pre_flag ? '#61070d' : '#616161'*/}
                 {/*}}*/}
                 {/*onClick={onClick}>*/}
                {/*{cosCame}*/}
            {/*</div>*/}
        {/*</div>*/}
    {/*</ReactHover.Trigger>*/}
    {/*<ReactHover.Hover>*/}
        {/*<h1> I am hover HTML </h1>*/}
    {/*</ReactHover.Hover>*/}
{/*</ReactHover>*/}

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