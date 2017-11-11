import React from 'react'
import './GradTable.css'

import GradSubject from './GradSubject'

class GradCategory extends React.Component {
    state = {
        name: this.props.name,
        subjects: this.props.subjects
    }
    render(){

        let subjects = this.state.subjects;
        for (let i = 0; i < subjects.length; i++) {
            // score
            if (this.state.name == '藝文賞析' || subjects[i].cn == '導師時間' || (this.state.name=='服務學習'&&subjects[i].originalCredit==0))
                if (subjects[i].complete == true)
                    subjects[i].score = '通過';
                else
                    subjects[i].score = '未過';

            // comment
            if (this.state.name=='通識')
                subjects[i].comment = subjects[i].dimension+'向度 ';
            else
                subjects[i].comment = '';

            // 抵免
            if (subjects[i].reason=="notCS") {
                subjects[i].comment += '此為外系課程，必須申請過抵免才能算通過。';
                subjects[i].score = '';
            } else if (subjects[i].reason=="free1") {
                subjects[i].comment += '已抵免';
                subjects[i].score = '抵免';
            } else if (subjects[i].reason=="free2") {
                subjects[i].comment += '免修課程';
                subjects[i].score = '';
            } else if (subjects[i].reason=="now") {
                subjects[i].comment += '當期課程';
                subjects[i].score = '';
            }

            // 未修
            if ((subjects[i].score==null || subjects[i].score==-1) && subjects[i].complete==false) {
                this.state.subjects[i].realCredit = '　';
                this.state.subjects[i].originalCredit = '　';
            }

        }

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
                        name={subject.cn + ' ' + subject.en + ((subject.english==true)? ' [英語授課]': '')}
                        credit={subject.originalCredit}
                        realCredit={subject.realCredit}
                        score={this.state.name=='藝文賞析'? (subject.complete==true)? '通過': '未過': subject.score}
                        semester={subject.semester}
                        year={subject.year}
                        comment={subject.comment}
                    />
                )}
            </tbody>
        );
    }
}

export default GradCategory;