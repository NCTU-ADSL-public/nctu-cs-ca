
import { createAction } from 'redux-actions'
import axios from 'axios'
// import FakeData from '../../../../Resources/FakeData'

export const storeProjects = createAction('STORE_PROJECTS')
export const storeProjectImage = createAction('STORE_PROJECT_IMAGE')
export const storeProjectFile = createAction('STORE_PROJECT_FILE')
export const storeProjectIntro = createAction('STORE_PROJECT_INTRO')

export const fetchProjects = (page = 1) => dispatch => {
  axios.get('/students/research/list')
    .then(res => dispatch(storeProjects(res.data)))
    .catch(error => {
      console.log(error)
      // dispatch(storeProjects(FakeData.Project))
    })
}

export const deleteProject = (payload) => dispatch => {
  axios.post('/students/research/delete', payload)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      window.confirm('刪除失敗，請檢察網路連線')
      console.log(err)
    })
}

export const editProject = (payload, handleClose) => dispatch => {
  axios.post('/students/research/edit', payload)
    .then(res => {
      dispatch(storeProjectsIntro(payload.new_intro, payload.new_title, payload.semester))
      handleClose()
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
export const changeProjectProfessor = (payload) => dispatch => {
  axios.post('/students/research/setReplace', payload)
    .then(res => {
    })
    .catch(err => {
      window.alert('儲存失敗，請檢察網路連線')
      console.log(err)
    })
}
