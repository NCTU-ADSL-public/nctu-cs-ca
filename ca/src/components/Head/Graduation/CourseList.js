import React from 'react'
import Course from './Course'

export default TodoList = ({ item }) => (
    <div>
        {Courses.map(item =>
            <Course
                key={item.id}
            />
        )}
    </div>
);
