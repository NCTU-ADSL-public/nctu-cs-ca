
import { createAction } from 'redux-actions'
import axios from 'axios'

export const storeProjects = createAction('STORE_PROJECTS')
export const storeProjectImage = createAction('STORE_PROJECT_IMAGE')
export const storeProjectFile = createAction('STORE_PROJECT_FILE')
export const storeProjectIntro = createAction('STORE_PROJECT_INTRO')

let FakeData = [
  {
    'student_id': '0416008',
    'semester': '106-2',
    'sname': '王冠升',
    'research_title': '虛擬貨幣交易機器人',
    'tname': '彭文志',
    'agree': '1',
    'first_second': '1',
    'phone': 'sds',
    'email': 'danny021406.cs04@nctu.edu.tw'
  },
  {
    'student_id': '0416008',
    'sname': '王冠升',
    'research_title': '0416008',
    'semester': '106-2',
    'tname': '彭文志',
    'agree': '2',
    'first_second': '1',
    'phone': 'sds',
    'email': 'danny021406.cs04@nctu.edu.tw'
  },
  {
    'student_id': '0416008',
    'sname': '王冠升',
    'research_title': '04160ff08',
    'semester': '106-2',
    'tname': '彭文志',
    'agree': '3',
    'first_second': '1',
    'phone': 'sds',
    'email': 'danny021406.cs04@nctu.edu.tw'
  }
]

export const fetchProjects = (page = 1) => dispatch => {
  axios.get('/students/projectPage')
    .then(res => dispatch(storeProjects(res.data)))
    .catch(error => {
      console.log(error)
      dispatch(storeProjects(FakeData))
    })
}

export const deleteProject = (payload) => dispatch => {
  axios.post('/students/projectDelete', payload)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      window.confirm('刪除失敗，請檢察網路連線')
      console.log(err)
    })
}

export const editProject = (payload) => dispatch => {
  axios.post('/students/editProject', payload)
    .then(res => {
      dispatch(storeProjectsIntro(payload.new_intro, payload.new_title, payload.semester))
    })
    .catch(err => {
      window.alert('儲存失敗，請檢察網路連線')
      console.log(err)
    })
}

export const storeProjectsImage = (url, researchTitle, semester) => dispatch => {
  let object = { url, researchTitle, semester }
  dispatch(storeProjectImage(object))
}

export const storeProjectsFile = (url, researchTitle, semester) => dispatch => {
  let object = { url, researchTitle, semester }
  dispatch(storeProjectFile(object))
}

export const storeProjectsIntro = (intro, researchTitle, semester) => dispatch => {
  let object = { intro, researchTitle, semester }
  dispatch(storeProjectIntro(object))
}
