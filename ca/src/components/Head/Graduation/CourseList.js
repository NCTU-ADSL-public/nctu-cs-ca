import React from 'react'
import Course from './Course'

const CourseList = ({ items, selection }) => (
    <div id="course-button">
        {items.map(item =>
            <Course
                key={item.id}
                cosCame={item.cn}
                completed={item.complete}
                selection={selection}
                goard={item.goard}
            />
        )}
    </div>
);

export default CourseList;