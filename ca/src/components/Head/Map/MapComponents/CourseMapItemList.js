import React, { PropTypes } from 'react';
import CourseMapItem from './CourseMapItem';
import './Map.css';

const CourseMapItemList = ({ courseMapItems, onTodoClick }) => (
    <div className="up-session">
        <div className="course-group course-group-1">
            {courseMapItems.map(courseMapItem =>
                <CourseMapItem
                    key={courseMapItem.id}
                    {...courseMapItem}
                    onClick={() => onTodoClick(courseMapItem.id)}
                />
            )}
        </div>
    </div>
)

CourseMapItemList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
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