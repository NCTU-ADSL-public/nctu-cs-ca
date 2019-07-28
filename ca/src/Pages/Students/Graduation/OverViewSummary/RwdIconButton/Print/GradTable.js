
import React from 'react'
import './GradTable.css'

class GradSubject extends React.Component {
  render () {
    let realscore = Array(12).fill(null)
    realscore[this.props.year * 3 + this.props.semester - 3] = this.props.score

    return (
      <tr className={(this.props.name === ' ') ? 'bigger-row' : ''}>
        <td className='left-text'>{ this.props.name }</td>
        {
          realscore.map((score, index) =>(
            <td key={index}>{ score }</td>
          ))
        }
        <td>{ this.props.credit }</td>
        <td>{ this.props.realCredit }</td>
        <td className='left-text' style={{ paddingLeft: 5 }}>{ this.props.comment }</td>
      </tr>
    )
  }
}

class GradTable extends React.Component {
  render () {
    let { name, subjects } = this.props

    subjects.forEach((subject, index) => {
      // comment
      if (name.slice(0, 2) === '通識') {
        subject.comment = subject.dimension + ' '
        if (subject.comment.slice(0, 2) === '跨院') {
          subject.comment = '跨院基本素養'
        }
      } else if (name === '其他選修' && subject.type === '軍訓') {
        subject.comment = '此課程不採計為畢業預審學分'
      } else {
        subject.comment = ''
      }

      // 抵免
      if (subject.reason === 'notCS') {
        subject.comment += '此為外系課程，必須申請過抵免才能算通過。'
        subject.score = ''
      } else if (subject.reason === 'free1') {
        subject.comment += '已抵免'
        subject.score = '抵免'
      } else if (subject.reason === 'free2') {
        subject.comment += '免修課程'
      } else if (subject.reason === 'now') {
        subject.comment += '當期課程'
        subject.score = '　'
      } else if (subject.reason === 'english') {
        subject.comment += '加修(英檢未通過)'
      }

      if (subject.score === -1) { subject.score = '' }

      // score
      if (subject.score === null) {
        if (subject.grade === null) {
          subject.score = (subject.complete === true) ? 'P' : 'F'
        } else {
          subject.score = subject.grade
        }
      }

      // 未修
      if ((subject.score === null || subject.score === -1) &&
          subject.complete === false) {
        subject.realCredit = '　'
        subject.originalCredit += '　'
      }
    })

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

        {
          subjects.map((subject, index) => (
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
          ))
        }
        {
          name === '外語' &&
          <tr>
            <td className='bg-orange left-text' colSpan='17'>
              <span style={{ fontSize: '8pt', fontWeight: 'bold', color: '#0000FF' }}>
                ★英檢未通過者需加修並通過「英文進階課程」4學分或於畢業前自行報名並通過所列任ㄧ英文能力檢定考試與標準
              </span>
            </td>
          </tr>
        }
      </tbody>
    )
  }
}

export default GradTable
