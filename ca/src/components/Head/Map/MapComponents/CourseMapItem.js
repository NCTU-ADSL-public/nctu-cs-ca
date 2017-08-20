import React, { PropTypes } from 'react';
import './Map.css';

const CourseMapItem = ({ onClick, cos_cname, grade, semester, suggest, pre}) => (

    <div onClick={onClick} className="course"><div className="course-btn">{cos_cname}</div></div>

)

CourseMapItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    cos_cname: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
    suggest: PropTypes.string.isRequired,
    pre: PropTypes.string.isRequired,
}

export default CourseMapItem