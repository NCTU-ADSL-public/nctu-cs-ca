import React from 'react'
import IndividualCourse from './IndividualCourse'

const GraduationForm = ({ items, index }) => (
    <div>
        {items.map(item =>
            <IndividualCourse
                key={item.title}
                pass={item.course}
                title={item.title}
                credit={item.credit}
                total={item.total}
            />
        )}
    </div>
);

export default GraduationForm;