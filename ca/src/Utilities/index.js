
function getYear () {
  let today = new Date()
  let year = today.getFullYear()
  return `${(year - 1912)}`
}

// 回傳學期字串(e.g. 107-1)
function getSemester () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  return ((year - 1912) + (month >= 8 ? 1 : 0)) + '-' + (month >= 8 ? '1' : '2')
}

function getTimestamp () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  let hour = today.getHours()
  let minute = today.getMinutes()
  return year + '/' + month + '/' + date + '  ' + hour + ':' + minute
}

// 學生端畢業預審 - 決定普通課程的按鈕顏色
function courseBtnColor (completed, reason) {
  let color = completed
    ? (reason === 'notCS')
      ? '#a29951'
      : (reason === 'free1' || reason === 'free2' || reason === 'english')
        ? '#6A94A2'
        : (reason === 'now')
          ? '#ab6bd9'
          : '#3db586'
    : (reason === 'now')
      ? '#ab6bd9'
      : '#d95467'
  return color
}

// 學生端畢業預審 - 決定通識課程的按鈕顏色
function generalCourseBtnColor (courses) {
  if (courses.length === 0) {
    return '#d95467'
  } else if (courses.length === 1 && courses[0].reason === 'now') {
    return '#ab6bd9'
  } else {
    return '#3cab7d'
  }
}

export {
  getYear,
  getSemester,
  getTimestamp,
  courseBtnColor,
  generalCourseBtnColor
}
