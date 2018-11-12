import React from 'react'
import './GradTable.css'

import GradSubject from './GradSubject'

class GradCategory extends React.Component {
  render () {
    let { name, subjects } = this.props
    for (let i = 0; i < subjects.length; i++) {
      // comment
      if (name.slice(0, 2) === '通識') {
        subjects[i].comment = subjects[i].dimension + ' '
        if (subjects[i].comment.slice(0, 2) === '跨院') {
          subjects[i].comment = '跨院基本素養'
        }
      } else if (name === '其他選修' && subjects[i].type === '軍訓') {
        subjects[i].comment = '此課程不採計為畢業預審學分'
      } else {
        subjects[i].comment = ''
      }

      // 抵免
      if (subjects[i].reason === 'notCS') {
        subjects[i].comment += '此為外系課程，必須申請過抵免才能算通過。'
        subjects[i].score = ''
      } else if (subjects[i].reason === 'free1') {
        subjects[i].comment += '已抵免'
        subjects[i].score = '抵免'
      } else if (subjects[i].reason === 'free2') {
        subjects[i].comment += '免修課程'
      } else if (subjects[i].reason === 'now') {
        subjects[i].comment += '當期課程'
        subjects[i].score = '　'
      } else if (subjects[i].reason === 'english') {
        subjects[i].comment += '加修(英檢未通過)'
      }

      if (subjects[i].score === -1) { subjects[i].score = '' }

      // score
      if (subjects[i].score === null) {
        if (subjects[i].grade === null) {
          subjects[i].score = (subjects[i].complete === true) ? 'P' : 'F'
        }
        else {
          subjects[i].score = subjects[i].grade
        }
      }

      // 未修
      if ((subjects[i].score === null || subjects[i].score === -1) && subjects[i].complete === false) {
        subjects[i].realCredit = '　'
        subjects[i].originalCredit += '　'
      }
    }

    return (
      <tbody>
        <tr>
          <td className='title-text' rowSpan={subjects.length + 1 + (name === '外語')}>{name}</td>
          <td className='title-text'>科目名稱</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>學前</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>1上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>1下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>1暑</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>2上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>2下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>2暑</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>3上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>3下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>3暑</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>4上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>4下</td>
          <td style={{ fontSize: '6pt', fontWeight: 'bold' }}>課程<br />學分</td>
          <td style={{ fontSize: '6pt', fontWeight: 'bold' }}>實得<br />學分</td>
          <td className='title-text'>備註</td>
        </tr>

        {subjects.map((subject, index) =>
          <GradSubject
            key={index}
            name={subject.cn + ' ' + subject.en}
            credit={subject.originalCredit}
            realCredit={subject.realCredit}
            score={subject.score}
            semester={subject.semester}
            year={subject.year}
            comment={subject.comment + ((subject.english === true) ? ' 英文授課' : '')}
          />
        )}
        {name === '外語' &&
        <tr>
          <td className='bg-orange left-text' colSpan='17'>
            <span style={{ fontSize: '8pt', fontWeight: 'bold', color: '#0000FF' }}>★英檢未通過者需加修並通過「英文進階課程」4學分或於畢業前自行報名並通過所列任ㄧ英文能力檢定考試與標準</span>
          </td>
        </tr>
        }
      </tbody>
    )
  }
}

export default GradCategory
