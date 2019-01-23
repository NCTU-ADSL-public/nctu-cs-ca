import React from 'react'
import './GradTable.css'

import GradCategory from './GradCategory'

class PrintForm extends React.Component {
  render () {
    let generalCatTitle = ['外語', '通識(舊制)', '通識(新制)', '體育', '服務學習', '藝文賞析']
    let depCat = []
    let generalCat = []
    this.props.courseCategoryArray.forEach((item, i) => {
      if (generalCatTitle.indexOf(item.title) !== -1) {
        // Sort general course by 向度
        if (item.title.slice(0, 2) === '通識') {
          item.course.sort(function (a, b) {
            if (a.dimension < b.dimension) return -1
            if (a.dimension > b.dimension) return 1
            return 0
          })

          if (this.props.reviewCheck === 0) {
            generalCat.push(item)
          } else {
            if (this.props.generalCourseSelect === 0 && item.title === '通識(舊制)') {
              generalCat.push(item)
            }
            if (this.props.generalCourseSelect === 1 && item.title === '通識(新制)') {
              generalCat.push(item)
            }
          }
        } else {
          generalCat.push(item)
        }
      } else if (item.require !== 0) {
        depCat.push(item)
      }
    })

    let programName = ''
    if (this.props.assis) {
      switch (this.props.idCard.program) {
        case '資工':
          programName = '資訊工程組'
          break
        case '網多':
          programName = '網路與多媒體工程組'
          break
        case '資電':
          programName = '資電工程組'
          break
        default:
          break
      }
    } else {
      switch (this.props.profile.program) {
        case '資工A':
        case '資工B':
          programName = '資訊工程組'
          break
        case '網多':
          programName = '網路與多媒體工程組'
          break
        case '資電':
          programName = '資電工程組'
          break
        default:
          break
      }
    }

    return (
      <table className='default-text default-table' style={{ width: '100%' }}>
        <colgroup>
          <col className='col0' />
          <col className='col1' />
          <col className='col2' />
          <col className='col3' />
          <col className='col4' />
          <col className='col5' />
          <col className='col6' />
          <col className='col7' />
          <col className='col8' />
          <col className='col9' />
          <col className='col10' />
          <col className='col11' />
          <col className='col12' />
          <col className='col13' />
          <col className='col14' />
          <col className='col15' />
          <col className='col16' />
        </colgroup>

        <tbody>
          <tr className='borderLess'>
            <td colSpan='17' style={{ fontSize: '16pt', fontWeight: 'bold', height: '1.5em', color: '#000000' }}>
              104學年度--{programName}
            </td>
          </tr>
          <tr className='borderLess left-text'>
            <td colSpan='17' style={{ fontSize: '10pt', fontWeight: 'bold', height: '2.5em' }}>
              {this.props.assis
                ? <div width='100%'>
                  <div className='personal-info'>學號：{this.props.idCard.id}</div>
                  <div className='personal-info'>姓名：{this.props.idCard.sname}</div>
                </div>
                : <div width='100%'>
                  <div className='personal-info'>學號：{this.props.profile.student_id}</div>
                  <div className='personal-info'>姓名：{this.props.profile.sname}</div>
                </div>}
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td className='bg-green left-text' colSpan='17' style={{ fontSize: '10pt', fontWeight: 'bold', height: '24pt' }}>
              <span>一、本系專業科目(畢業前須通過</span>
              <span style={{ color: '#FF0000' }}>1</span>
              <span>門本系開授或認可之英文授課專業課程)</span>
            </td>
          </tr>
        </tbody>

        {depCat.map((category, index) =>
          <GradCategory
            key={index}
            subjects={category.course}
            name={category.title}
          />
        )}

        <tbody>
          <tr>
            <td className='bg-yellow left-text' colSpan='17' style={{ fontSize: '10pt', fontWeight: 'bold', height: '24pt' }}>
              <span>二、校訂共同科目</span>
            </td>
          </tr>
        </tbody>

        {generalCat.map((category, index) =>
          <GradCategory
            key={index}
            subjects={category.course}
            name={category.title}
            graduationCheckEnglishTest={this.props.graduationCheckEnglishTest}
          />
        )}
      </table>
    )
  }
}

export default PrintForm
