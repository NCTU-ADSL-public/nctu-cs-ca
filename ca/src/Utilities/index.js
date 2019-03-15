
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

export {
  getYear,
  getSemester,
  getTimestamp
}
