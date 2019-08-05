import { handleActions } from 'redux-actions'

const initialState = {
  input: '',
  grade: '',
  students: [{"student_id":"0116249","graduate_status":"0","total_credit":"88","en_course":"1","pro":"0","other":"0","net":[],"media":[],"old_total":"2","old_contemp":"0","old_culture":"0","old_history":"0","old_citizen":"0","old_group":"0","old_science":"0","new_total":"4","new_core_total":"6","new_core_society":"2","new_core_humanity":"2","new_basic":"0","new_cross":"6","en_total":"0","en_basic":"4","en_advanced":"4","pe":"0","service":"0","art":"0","mentor":"0","sname":"周欣馨","program":"網多","submit_status":0,"submit_type":0,"en_status":0,"net_media":null,"compulse":[],"current":[]},
  {"student_id":"0216011","graduate_status":"0","total_credit":"82","en_course":"1","pro":"3","other":"8","net":["計算機網路概論"],"media":[],"old_total":"2","old_contemp":"0","old_culture":"0","old_history":"2","old_citizen":"0","old_group":"0","old_science":"0","new_total":"4","new_core_total":"0","new_core_society":"0","new_core_humanity":"0","new_basic":"0","new_cross":"6","en_total":"0","en_basic":"4","en_advanced":"2","pe":"0","service":"0","art":"1","mentor":"0","sname":"劉宇宸","program":"資工A","submit_status":0,"submit_type":0,"en_status":0,"net_media":null,"compulse":["微積分(二)","正規語言概論","演算法概論","計算機組織","離散數學"],"current":[]},{"student_id":"0216098","graduate_status":"0","total_credit":"112","en_course":"1","pro":"0","other":"0","net":["計算機網路概論"],"media":[],"old_total":"0","old_contemp":"0","old_culture":"0","old_history":"0","old_citizen":"0","old_group":"0","old_science":"0","new_total":"0","new_core_total":"0","new_core_society":"0","new_core_humanity":"0","new_basic":"0","new_cross":"6","en_total":"0","en_basic":"4","en_advanced":"0","pe":"0","service":"0","art":"0","mentor":"0","sname":"歐嘉恒","program":"資工B","submit_status":0,"submit_type":0,"en_status":"3","net_media":"0","compulse":["資料結構"],"current":["資訊工程專題(二)","離散數學"]},
  ],
  page: 0,
  dataPerPage: 20
}

export default handleActions({
  STATUS_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  })
}, initialState)
