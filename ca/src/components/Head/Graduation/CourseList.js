import React from 'react'
import Course from './Course'

const CourseList = ({ items, index }) => (
    <div>
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