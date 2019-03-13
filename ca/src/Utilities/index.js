
// 回傳學期字串(e.g. 107-1)
function getSemester () {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  return ((year - 1912) + (month >= 8 ? 1 : 0)) + '-' + (month >= 8 ? '1' : '2')
}

export {
  getSemester
}
