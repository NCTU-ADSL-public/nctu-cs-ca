import React from 'react'
import Course from './Course'

const CourseList = ({ items, index }) => (
    <div id="course-button">
        {items.map(item =>
            <Course
                key={item.cn}
                cosCame={item.cn}
                completed={item.complete}
                goard={item.goard}
            />
        )}
    </div>
);

export default CourseList;