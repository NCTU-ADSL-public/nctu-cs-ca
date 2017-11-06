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
                <tr>
                    <td className="title-text" rowSpan={this.state.subjects.length+1}>{this.state.name}</td>
                    <td className='title-text'>科目名稱</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>1上</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>1下</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>2上</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>2下</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>3上</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>3下</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>4上</td>
                    <td style={{fontSize: '8pt', fontWeight:'bold'}}>4下</td>
                    <td style={{fontSize: '6pt', fontWeight:'bold'}}>應修<br/>學分</td>
                    <td style={{fontSize: '6pt', fontWeight:'bold'}}>實得<br/>學分</td>
                    <td className='title-text'>備註</td>
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