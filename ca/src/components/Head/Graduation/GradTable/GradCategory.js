import React from 'react'
import './GradTable.css'

import GradSubject from './GradSubject'

class GradCategory extends React.Component {
    state = {
        name: this.props.name,
        subjects: this.props.subjects
    }
    render(){
        return(
            <tbody>
            <tr className='no-height'>
                <td className="cell-text" rowSpan={this.state.subjects.length+1} style={{
                    fontSize:'12pt',
                    fontWeight:'bold'
                }}>{this.state.name}</td>
            </tr>

            {this.state.subjects.map(subject =>
                <GradSubject
                    key={subject.name}
                    name={subject.cn + ' ' + subject.en}
                    credit={2}
                    score={subject.score}
                    semester={subject.semester}
                    year={subject.year}
                    comment={''}
                />
            )}
            </tbody>
        );
    }
}

export default GradCategory;