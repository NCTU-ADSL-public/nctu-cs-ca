import React from 'react'
import Course from './Course'
import './Graduation.css'
let id = 0
const CourseList = ({ items, selection, handleClick}) => (
    <div style={{
        padding: '11px 0 120px 0',
        height: '100px',
        width: '1300px'}}>
        {items.map(item =>
            <Course
                key={id++}
                cosCame={item.cn}
                completed={item.complete}
                selection={selection}
                goard={item.goard}
                handleClick={handleClick}
                score={item.score}
                reason={item.reason}
                grade={item.grade}
                english={item.english}
                realCredit={item.realCredit}
            />
        )}
    </div>
)

export default CourseList
