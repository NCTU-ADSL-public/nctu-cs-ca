import React from 'react'
import './form.css'

class ExemptCourse extends React.Component {
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ marginRight: '3.1pt', textAlign: 'center', fontSize: '14pt' }}>
          <span style={{ letterSpacing: '2pt' }}>國立交通大學抵免學分申請表</span>
        </div>
        <div style={{ marginTop: '6pt', marginRight: '3.1pt', fontSize: '10pt' }}>
          系所<span>/</span>年級<span>/</span>班別：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          學號：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp; </span>
          姓名：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp; </span>
          手機：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        </div>
        <div style={{ marginTop: '6pt', marginRight: '3.1pt', fontSize: '10pt' }}>
          原就讀學校：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp; </span>
          系所科別：<span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          <span>&nbsp;&nbsp; </span>
          原就讀學系所科畢業應修學分數不得少於
          <span style={{ textDecoration: 'underline' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          學分<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          申請日期：<span>&nbsp;&nbsp; </span>年<span>&nbsp;&nbsp; </span>月<span>&nbsp;&nbsp;&nbsp; </span>日
        </div>
        <div style={{ textAlign: 'center' }}>
          <table className='course-form' cellSpacing='0' cellPadding='0' style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto', borderCollapse: 'collapse', fontSize: '8pt' }}>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td rowSpan='3' style={{ width: '17.1pt', fontSize: '10pt', textAlign: 'center' }}>
                  <div>編</div>
                  <div>號</div>
                </td>
                <td colSpan='7' style={{ width: '309.2pt' }}>原就讀學校科目學分成績</td>
                <td colSpan='5' style={{ width: '261.2pt' }}>抵免本校之科目學分</td>
                <td colSpan='4' style={{ width: '187.9pt' }}>審 核 意 見</td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td rowSpan='2' style={{ width: '153.2pt' }}>
                  <div><span style={{ fontSize: '10pt' }}>科目</span>(請依擬列抵免修之優先順序填寫)</div>
                </td>
                <td rowSpan='2' style={{ width: '21.2pt' }}>
                  <div>修課</div>
                  <div>年級</div>
                </td>
                <td rowSpan='2' style={{ width: '57.2pt' }}>開課系所</td>
                <td colSpan='2' style={{ width: '33.2pt' }}>上學期</td>
                <td colSpan='2' style={{ width: '33.2pt' }}>下學期</td>
                <td colSpan='2' rowSpan='2' style={{ width: '219.2pt', fontSize: '10pt' }}>永久課號(請務必填寫) / 科 目 名 稱</td>
                <td colSpan='2' style={{ width: '21.2pt' }}>學分</td>
                <td rowSpan='2' style={{ width: '15.2pt' }}>
                  <div>選</div>
                  <div>別</div>
                </td>
                <td colSpan='2' rowSpan='2' style={{ width: '138.25pt' }}>
                  <div>系所 / 教學中心</div>
                  <div>逐欄勾選意見並簽章</div>
                </td>
                <td colSpan='2' rowSpan='2' style={{ width: '46.85pt', fontSize: '10pt' }}>註冊組</td>
              </tr>
              <tr style={{ textAlign: 'center' }}>
                <td style={{ width: '15.2pt', fontSize: '7pt' }}>學分</td>
                <td style={{ width: '15.2pt', fontSize: '7pt' }}>成績</td>
                <td style={{ width: '15.2pt', fontSize: '7pt' }}>學分</td>
                <td style={{ width: '15.2pt', fontSize: '7pt' }}>成績</td>
                <td style={{ width: '9.2pt' }}>上</td>
                <td style={{ width: '9.2pt' }}>下</td>
              </tr>
              <tr style={{ height: '32pt' }}>
                <td style={{ width: '17.1pt', textAlign: 'center', fontSize: '10pt' }}>1</td>
                <td style={{ width: '153.2pt' }} />
                <td style={{ width: '21.2pt' }} />
                <td style={{ width: '57.2pt' }} />
                <td style={{ width: '15.2pt' }} />
                <td style={{ width: '15.2pt' }} />
                <td style={{ width: '15.2pt' }} />
                <td style={{ width: '15.2pt' }} />
                <td colSpan='2' style={{ width: '219.2pt' }} />
                <td style={{ width: '9.2pt' }} />
                <td style={{ width: '9.2pt' }} />
                <td style={{ width: '15.2pt' }} />
                <td colSpan='2' style={{ width: '138.25pt', textAlign: 'left' }}>
                  <div style={{ marginLeft: '5pt', marginBottom: '5pt' }}>□不同意</div>
                  <div style={{ marginLeft: '5pt', marginTop: '5pt' }}>
                    <span>□同意</span>
                    <span className='underline w-2em' />
                    <span style={{ fontSize: '6pt' }}>學分</span>
                  </div>
                </td>
                <td colSpan='2' style={{ width: '46.85pt', textAlign: 'left' }}>
                  <div style={{ marginLeft: '5pt', marginBottom: '5pt' }}>複核</div>
                  <div style={{ marginLeft: '5pt', marginTop: '5pt' }}>
                    <span className='underline w-2em' />
                    <span style={{ fontSize: '6pt' }}>學分</span>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '19.1pt' }}>
                <td colSpan='8' style={{ width: '329.1pt', verticalAlign: 'top', textAlign: 'left' }}>
                  <div style={{ fontSize: '12pt' }}>
                    系所初審准予抵免本頁合計<span className='underline w-2em' />科，
                    <span className='underline w-2em' />學分。
                  </div>
                </td>
                <td colSpan='9' style={{ width: '451.9pt', verticalAlign: 'top', textAlign: 'left' }}>
                  <div style={{ fontSize: '12pt' }}>
                    教務處複審准予抵免本頁小計
                    <span className='underline w-2em' />科，
                    <span className='underline w-2em' />學分，全部合計
                    <span className='underline w-2em' />科，
                    <span className='underline w-2em' />學分。
                  </div>
                </td>
              </tr>
              <tr style={{ height: '49.85pt' }}>
                <td colSpan='2' style={{ width: '173.1pt', verticalAlign: 'top', textAlign: 'left' }}>系所助理簽章：</td>
                <td colSpan='6' style={{ width: '153.2pt', verticalAlign: 'top', textAlign: 'left' }}>系所主管簽核：</td>
                <td style={{ width: '148.75pt', verticalAlign: 'top', textAlign: 'left' }}>承辦人簽章：</td>
                <td colSpan='5' style={{ width: '148.75pt', verticalAlign: 'top', textAlign: 'left' }}>註冊組組長簽章：</td>
                <td colSpan='3' style={{ width: '148.8pt', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0 }}>教務長簽核：</div>
                  <div style={{ position: 'absolute', bottom: 0, left: '3pt', fontSize: '10pt' }}>□依授權由註冊組組長代行</div>
                </td>
              </tr>
              <tr style={{ height: '0pt', visibility: 'hidden' }}>
                <td style={{ width: '19.9pt' }} />
                <td style={{ width: '156pt' }} />
                <td style={{ width: '24pt' }} />
                <td style={{ width: '60pt' }} />
                <td style={{ width: '18pt' }} />
                <td style={{ width: '18pt' }} />
                <td style={{ width: '18pt' }} />
                <td style={{ width: '18pt' }} />
                <td style={{ width: '151.55pt' }} />
                <td style={{ width: '70.45pt' }} />
                <td style={{ width: '12pt' }} />
                <td style={{ width: '12pt' }} />
                <td style={{ width: '18pt' }} />
                <td style={{ width: '39.1pt' }} />
                <td style={{ width: '101.95pt' }} />
                <td style={{ width: '49.35pt' }} />
                <td style={{ width: '0.3pt' }} />
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: '4pt' }}><span>&nbsp;</span></div>
        <div
          style={{ marginLeft: '6pt', fontSize: '10pt' }}>備註：1.申請件請附原就讀學校歷年成績單或學分證明，先經教學單位審核及系所初審，再送註冊組複核。核定後，承辦人影印本表加蓋職名章交申請人留存。
        </div>
        <div style={{ marginLeft: '36pt', fontSize: '10pt' }}>2.非本校本系所畢業生申請抵免研究所學分，須在註冊組索取表格洽原就讀學校出具「研究所學分證明」隨申請件提出。</div>
        <div style={{ marginLeft: '36pt', fontSize: '10pt' }}>3.請參考「國立交通大學學生抵免學分辦法」。</div>
        <div style={{ marginLeft: '36pt', fontSize: '10pt' }}>4.課程通過抵免，若已加選此課程，請學生務必於1週內<span
          style={{ textDecoration: 'underline' }}>至課務組辦理逾期退選</span>。
        </div>
        <div style={{ fontSize: '10pt', position: 'absolute', bottom: 0, right: 0, textAlign: 'right' }}>
          <div>107.12版</div>
          <div>保存年限：5年</div>
          <div>表單編號：110-4-011A-01</div>
        </div>
      </div>
    )
  }
}

export default ExemptCourse
