import { createAction } from 'redux-actions'
import axios from 'axios'

// DEFINE ALL ACTIONS FOR REDUCERS (FETCHING DATA IS DONE HERE)
export const UpdateApplyList = createAction('UPDATE_APPLY_LIST')

export const ChangeTeacher = (payload) => dispatch => {
  axios.post('/professors/research/setReplace', payload)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      window.confirm('刪除失敗，請檢察網路連線')
      console.log(err)
    })
}


export const fetchResearchApplyList = (page = 1) => dispatch => {
  axios.get('/professors/researchApply/list', {
    id: this.props.idCard.teacher_id
  }).then(res => {
    console.log('---------- FETCH RESEARCH APPLY LIST ---------------')
    dispatch(UpdateApplyList(res.data))
    /*
    this.setState({
      applyList: res.data,
      loading: false
    })*/
  }).catch(err => {
    console.log(err)
  })

}
