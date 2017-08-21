import React, { PropTypes } from 'react';
import CourseMapItem from './CourseMapItem';
import './Map.css';

const CourseMapItemList = ({ coursemapitems, onTodoClick }) => (
    <div className="up-session">
        <div className="course-group course-group-1">
            {coursemapitems.map(courseMapItem =>
                <CourseMapItem
                    key={coursemapitem.id}
                    {...coursemapitem}
                    onClick={() => onTodoClick(coursemapitem.id)}
                />
            )}
        </div>
    </div>
)

CourseMapItemList.propTypes = {
    coursemapitems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        cos_cname: PropTypes.string.isRequired,
        grade: PropTypes.string.isRequired,
        semester: PropTypes.string.isRequired,
        suggest: PropTypes.string.isRequired,
        pre: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default CourseMapItemList