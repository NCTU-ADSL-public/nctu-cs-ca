import React from 'react'
import PopoverButton from './PopoverButton'

const CourseList = (props) => {
  const { items, selection, rwd} = props
  const phyCourseNames = ['物理(一)', '物理(二)', '物理(一)榮譽班', '物理(二)榮譽班']

  const decideBtnFlash = (completed) => {
    return !(completed | selection)
  }

  const decideBtnBgColor = (completed, reason) => {
    let color = completed
            ? (reason === 'notCS')
                ? '#a29951'
                : (reason === 'free1'　|| reason === 'free2'　|| reason === 'english')
                    ? '#6A94A2'
                    : (reason === 'now')
                        ? '#ab6bd9'
                        : '#3db586'
            : selection
                ? (reason === 'now')
                    ? '#ab6bd9'
                    : 'gray'
                : (reason === 'now')
                    ? '#ab6bd9'
                    : '#d95467'
    return color
  }
  let id = 0
  return (
    <div >
      {items.map((item, key) =>
        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
          <PopoverButton
            key={id++}
            label={phyCourseNames.includes(item.cn) ? `${item.cn}  ${item.realCredit}學分` : item.cn}
            backgroundColor={decideBtnBgColor(item.complete, item.reason)}
            flash={decideBtnFlash(item.complete)}
            rwd={rwd}
                >
            <div>{item.cn}</div>
            <div>分數:&nbsp;{(item.score === -1) ? '-' : item.score}</div>
            <div>等級:&nbsp;{(item.grade === '0') ? '-' : item.grade}</div>
            <div>英文授課:&nbsp;{(item.english) ? '是' : '否'}</div>
            <div>實得學分:&nbsp;{item.realCredit}</div>
            <br />
            {(item.reason === 'notCS') ? <div>此為外系課程，必須申請過抵免才能算通過。</div> : <div />}
            {(item.reason === 'free1') ? <div>您已申請過抵免了。</div> : <div />}
            {(item.reason === 'free2') ? <div>免修課程。</div> : <div />}
            {(item.reason === 'english') ? <div>此為抵免英文檢定考試的課程。</div> : <div />}
            {(item.reason === 'now') ? <div>當期課程。</div> : <div />}
            {(item.reason === 'now' && item.complete) ? <div>已修過這堂課，目前正重複修課中。</div> : <div />}
          </PopoverButton>
        </div>
            )}
    </div>
  )
}

export default CourseList
