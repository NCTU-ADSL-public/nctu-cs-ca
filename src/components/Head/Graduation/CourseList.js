import React from 'react'
import Course from './Course'
import './Graduation.css'

const CourseList = ({ items, selection , handleClick}) => (
    <div className="course-button">
        {items.map(item =>
            <Course
                key={item.id}
                cosCame={item.cn}
                completed={item.complete}
                selection={selection}
                goard={item.goard}
                handleClick={handleClick}
                score={item.score}
                reason={item.reason}
            />
        )}
    </div>
);

export default CourseList;