import React from 'react'
import GeneralCourse from './GeneralCourse'

class GeneeralCourseList extends React.Component{

    render(){
        const {courses} = this.props

        let generalCourseTypes = [{
            name: '當代',
            dimension: '通識',
            courses: []
        }, {
            name: '公民',
            dimension: '公民',
            courses: []
        }, {
            name: '群己',
            dimension: '群己',
            courses: []
        }, {
            name: '文化',
            dimension: '文化',
            courses: []
        }, {
            name: '歷史',
            dimension: '歷史',
            courses: []
        }, {
            name: '自然',
            dimension: '自然',
            courses: []
        }]

        courses.forEach(course => {
            let type = generalCourseTypes.find(type => course.dimension === type.dimension)
            if (type) type.courses.push(course)
        })

        return <div>
            {generalCourseTypes.map(type => (
                <GeneralCourse
                    cosCame={type.name}
                    completed={(type.courses.length > 0)}
                    items={type.courses}
                />
            ))}
        </div>
    }
}

export default GeneeralCourseList