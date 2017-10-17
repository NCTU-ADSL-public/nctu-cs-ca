import React from 'react'
import Course from './Course'

const CourseList = ({ items, index }) => (
    <div id="course-button">
        {items.map(item =>
            <Course
                key={item.id}
                cosCame={item.cosCame}
                completed={item.completed}
                goard={item.goard}
            />
        )}
    </div>
);

export default CourseList;