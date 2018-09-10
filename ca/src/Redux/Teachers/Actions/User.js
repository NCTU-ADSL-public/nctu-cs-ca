import {createAction} from 'redux-actions'
import axios from 'axios/index'

// DEFINE ALL ACTIONS FOR REDUCERS (FETCHING DATA IS DONE HERE)
export const UpdateUserInfo = createAction('UPDATE_USER_INFO')

export const fetchUser = (page = 1) => dispatch => {
  axios.get('/professors/profile').then(ProfileData => {
    let data = {...ProfileData.data[0]}
    console.log('UPDATE USER INFO: ', data)
    dispatch(UpdateUserInfo(data))
  }).catch(err => {
    console.log(err)
  })
}
