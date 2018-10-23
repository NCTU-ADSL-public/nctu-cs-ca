import { createAction } from 'redux-actions'
import axios from 'axios'

export const storeProjects = createAction('STORE_PROJECTS')
export const storeProjectImage = createAction('STORE_PROJECT_IMAGE')
export const storeProjectFile = createAction('STORE_PROJECT_FILE')
export const updateproject = createAction('UPDATE_PROJECT')

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
    .then(res => {
      dispatch(storeProjects(res.data))
    })
    .catch(error => {
      console.log(error)
      dispatch(storeProjects(FakeData))
    })
}
export const updateProject = (intro, researchTitle, semester) => dispatch => {
  let object = { intro, researchTitle, semester }
  dispatch(updateproject(object))
}

export const storeProjectsImage = (url, researchTitle, semester) => dispatch => {
  let object = { url, researchTitle, semester }
  dispatch(storeProjectImage(object))
}

export const storeProjectsFile = (url, researchTitle, semester) => dispatch => {
  let object = { url, researchTitle, semester }
  dispatch(storeProjectFile(object))
}
