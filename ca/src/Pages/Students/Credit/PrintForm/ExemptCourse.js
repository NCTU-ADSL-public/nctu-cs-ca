import React from 'react'
import './form.css'

class ExemptCourse extends React.Component {
  render () {
    const exemptCourse = this.props.courses
    return (
      <div>
        <div style={{ marginBottom: '12pt', textAlign: 'center', fontSize: '16pt' }}>國立交通大學課程免修申請單</div>
        <div>
          <span>系所班：</span>
          <span className='underline w-8em' />
          <span className='field'>□學士班</span>
          <span className='field'>□碩士班</span>
          <span className='field'>□博士班</span>
        </div>
        <div style={{ marginTop: '5pt' }}>
          <span>學號：</span>
          <span className='underline w-8em' />
          <span className='field'>姓名：</span>
          <span className='underline w-8em' />
          <span className='field'>手機：</span>
          <span className='underline'>{exemptCourse[0].phone}</span>
          <span className='field'>申請日期：</span>
          <span className='underline w-2em' />
          <span>年</span>
          <span className='underline w-2em' />
          <span>月</span>
          <span className='underline w-2em' />
          <span>日</span>
        </div>
        <table className='course-form' cellSpacing='0' cellPadding='0' style={{ width: '100%', margin: '12pt auto', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td rowSpan='3' style={{ width: '15.15pt' }}>
                <div>編</div>
                <div>號</div>
              </td>
              <td colSpan='8' style={{ width: '331.1pt' }}>已修習科目學分成績</td>
              <td colSpan='4' style={{ width: '204.35pt' }}>申請免修之科目</td>
              <td rowSpan='3' style={{ width: '195pt' }}>
                <div>系所/教學中心</div>
                <div>逐欄勾選意見並簽章</div>
              </td>
            </tr>
            <tr>
              <td rowSpan='2' style={{ width: '128pt' }}>課程名稱</td>
              <td rowSpan='2' style={{ width: '33.2pt' }}>
                <div>修課</div>
                <div>年級</div>
              </td>
              <td colSpan='2' rowSpan='2' style={{ width: '57pt' }}>開課系所</td>
              <td colSpan='2' style={{ width: '50.5pt' }}>上學期</td>
              <td colSpan='2' style={{ width: '51.2pt' }}>下學期</td>
              <td rowSpan='2' style={{ width: '144.55pt' }}>永久課號(請務必填寫) / 科目名稱</td>
              <td rowSpan='2' style={{ width: '25.15pt' }}>學分</td>
              <td colSpan='2' rowSpan='2' style={{ width: '29.05pt' }}>
                <div>選</div>
                <div>別</div>
              </td>
            </tr>
            <tr>
              <td>學分</td>
              <td>成績</td>
              <td>學分</td>
              <td>成績</td>
            </tr>
            {
              exemptCourse &&
              exemptCourse.map((data, index) => (
                <tr key={index} style={{ height: '42.45pt' }}>
                  <td>{index+1}</td>
                  <td>{data.original_course_name}</td>
                  <td>{data.original_course_year}</td>
                  <td colSpan='2'>{data.original_course_department}</td>
                  <td>{data.original_course_semester === 1 && data.original_course_credit}</td>
                  <td>{data.original_course_semester === 1 && data.original_course_score}</td>
                  <td>{data.original_course_semester === 2 && data.original_course_credit}</td>
                  <td>{data.original_course_semester === 2 && data.original_course_score}</td>
                  <td>{data.current_course_code} / {data.current_course_name}</td>
                  <td>{data.current_course_credit}</td>
                  <td colSpan='2'>{data.current_course_type}</td>
                  <td style={{ textAlign: 'left' }}>
                    <div className='check-item'>□同意免修</div>
                    <div className='check-item'>□不同意免修</div>
                  </td>
                </tr>
              ))
            }
            <tr style={{ height: '42.45pt' }}>
              <td colSpan='9' style={{ textAlign: 'left' }}>
                系所初審准予免修合計<span className='underline w-2em' />科。
              </td>
              <td colSpan='5' style={{ textAlign: 'left' }}>
                教務處複審准予免修合計<span className='underline w-2em' />科。
              </td>
            </tr>
            <tr style={{ height: '42.45pt' }}>
              <td colSpan='4' style={{ width: '25%', textAlign: 'justify', verticalAlign: 'top' }}>系所助理簽章：</td>
              <td colSpan='5' style={{ width: '25%', textAlign: 'justify', verticalAlign: 'top' }}>系所主管簽核：</td>
              <td colSpan='3' style={{ width: '25%', textAlign: 'justify', verticalAlign: 'top' }}>承辦人簽章：</td>
              <td colSpan='2' style={{ width: '25%', textAlign: 'justify', verticalAlign: 'top' }}>註冊組組長簽章：</td>
            </tr>
          </tbody>
        </table>
        <div>說明：1. 申請免修之課程，為全校性共同必修課程或各系所必修、必選課程；於開學二週內提出申請。</div>
        <div style={{ textIndent: '3em' }}>2. 申請件請附已修習科目之歷年成績單或學分證明，先經教學單位或系所初審，再送註冊組複核。</div>
        <div style={{ textIndent: '3em' }}>3. 經申請核准免修之課程，在不變更畢業學分數原則下，得據以免修。若當學期已加選此課程，請學生務必於1週內至課務組辦理逾期退選。</div>
        <div style={{ textAlign: 'right' }}>107.01版</div>
      </div>
    )
  }
}

export default ExemptCourse
