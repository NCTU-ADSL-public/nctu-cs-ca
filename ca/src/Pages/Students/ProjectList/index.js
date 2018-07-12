import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import img from './1.jpg'
import rejection from './rejection.jpg'
import Review from './2.jpg'
import Project from './ProjectHome'
import firebase from 'firebase'
import SwipeableViews from 'react-swipeable-views'
import scrollToComponent from 'react-scroll-to-component'
import axios from 'axios'
import './style.css'

let config = {
  apiKey: 'AIzaSyC64Eitf77FqUAMjjPaG1_rk3Sr6pyttoo',
  authDomain: 'code-86ba4.firebaseapp.com',
  databaseURL: 'https://code-86ba4.firebaseio.com',
  projectId: 'code-86ba4',
  storageBucket: 'code-86ba4.appspot.com',
  messagingSenderId: '354539568437'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
let storageRef = firebase.storage().ref()

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 1000,
    opacity: 1,
    overflowY: 'auto'
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
}

class GridListExampleSingleLine extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projectList: this.props.project,
      newprojectList: [],
      projectList_status: this.props.project_status,
      newprojectList_status: [],
      project: '',
      index: 0
    }
    this.onClick = this.onClick.bind(this)
    this.fetchImage = this.fetchImage.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.deletedata = this.deletedata.bind(this)
  }

  handleChangeIndex (index) {
    this.setState({
      index
    })
  }

  async componentWillMount () {
    await this.onClickBack()
    await this.fetchImage()
  }

  onClick (project, t) {
    console.log(project)
    if (t === '1') {
      this.setState({project: this.state.newprojectList.filter(t => t.research_title === project.real_title)[0], index: 1})
    } else {
      this.deletedata('/students/formDelete', project)
    }
  }

  deletedata (url, data) {
    let _this = this
    if (window.confirm('按確定已刪除資料，請先知會過您的隊友再刪除。')) {
      axios.post('/students/formDelete', {
        research_title: data.real_title,
        tname: data.tname,
        first_second: data.first_second,
        semester: data.semester
      })
        .then(res => {
          _this.setState({
            newprojectList: this.state.newprojectList.filter(t => t.research_title !== data.research_title)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onClickBack () {
    let _this = this
    setTimeout(function () {
      axios.post('/students/projectPage', {
        id: _this.props.studentProfile.student_id
      })
        .then(res => {
          let newProjectList = []
          for (let i = 0; i < res.data.length; i++) {
            let newProject = _this.state.newprojectList.filter(t => t.research_title === res.data[i].research_title)[0]
            newProject.intro = res.data[i].intro
            newProjectList.push(newProject)
          }
          _this.setState({index: 0, newprojectList: newProjectList})
        })
        .catch(err => {
          console.log(err)
        })
    }, 1000)
  }

  fetchImage () {
    let newProjectList = []
    let _this = this
    for (let i = 0; i < this.state.projectList.length; i++) {
      let newProject
      newProject = _this.state.projectList[i]
      let directory = this.state.projectList[i].semester + '/' + this.state.projectList[i].tname + '/' + this.state.projectList[i].research_title + '/image/image.jpg'
      let pathReference = storageRef.child(directory)
      pathReference.getDownloadURL().then(url => {
        newProject = {...newProject, image: url, real_title: newProject.research_title, agree: '1'}

        directory = _this.state.projectList[i].semester + '/' + _this.state.projectList[i].tname + '/' + _this.state.projectList[i].research_title + '/file/file.pdf'
        pathReference = storageRef.child(directory)
        pathReference.getDownloadURL().then(url => {
          newProject = {...newProject, file: url, real_title: newProject.research_title, agree: '1'}
          newProjectList.push(newProject)
          _this.setState({
            newprojectList: newProjectList
          })
        }).catch(function (error) {
          newProject = {...newProject, file: '', real_title: newProject.research_title, agree: '1'}
          newProjectList.push(newProject)
          _this.setState({
            newprojectList: newProjectList
          })
          console.log(newProject)
          console.log(error)
        })
      }).catch(function (error) {
        newProject = {...newProject, image: 'undefined', real_title: newProject.research_title, agree: '1'}
        directory = _this.state.projectList[i].semester + '/' + _this.state.projectList[i].tname + '/' + _this.state.projectList[i].research_title + '/file/file.pdf'
        pathReference = storageRef.child(directory)
        pathReference.getDownloadURL().then(url => {
          newProject = {...newProject, file: url, real_title: newProject.research_title, agree: '1'}
          newProjectList.push(newProject)
          _this.setState({
            newprojectList: newProjectList
          })
        }).catch(function (error) {
          newProject = {...newProject, file: '', real_title: newProject.research_title, agree: '1'}
          newProjectList.push(newProject)
          _this.setState({
            newprojectList: newProjectList
          })
          console.log(newProject)
          console.log(error)
        })
        console.log(newProject)
        console.log(error)
      })

      if (i === this.state.projectList.length - 1) {

        for (let j = 0; j < this.state.projectList_status.length; j++) {
          let newProject
          newProject = _this.state.projectList_status[j]
          if (this.state.projectList_status[j].agree === '3') {
            newProject = {...newProject, image: rejection, research_title: newProject.research_title + '   (已被教授拒絕，點擊已刪除資料)', real_title: newProject.research_title}
            newProjectList.push(newProject)
            _this.setState({
              newprojectList: newProjectList
            })
          } else if (this.state.projectList_status[j].agree === '2' || this.state.projectList_status[j].agree === '0') {
            newProject = {...newProject, image: Review, research_title: newProject.research_title + '   (審核中，點擊已刪除資料)', real_title: newProject.research_title}
            newProjectList.push(newProject)
            _this.setState({
              newprojectList: newProjectList
            })
          } else {
            let directory = (Number(this.props.studentProfile.student_id[0]) * 10 + Number(this.props.studentProfile.student_id[1]) + 102).toString() + '/' + this.state.projectList[i].tname + '/' + this.state.projectList[i].research_title + '/image/image.jpg'
            let pathReference = storageRef.child(directory)
            pathReference.getDownloadURL().then(url => {
              newProject = {...newProject, image: url, real_title: newProject.research_title, agree: '1'}
              newProjectList.push(newProject)
              _this.setState({
                newprojectList: newProjectList
              })
            }).catch(function (error) {
              newProject = {...newProject, image: 'undefined', real_title: newProject.research_title, agree: '1'}
              newProjectList.push(newProject)
              _this.setState({
                newprojectList: newProjectList
              })
              console.log(newProject)
              console.log(error)
            })
          }
        }
      }
    }
  }

  render () {
    let id = 0
    return (
      <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} >
        <div style={{height: '100vh'}}>
          <div className='divide-horizontal-list '>
            <div className='divide-horizontal-span-list' ref='top'>
              <p >專題列表</p>
            </div>
          </div>
          <div style={styles.root}>
            <GridList style={styles.gridList} cols={2} cellHeight={180} padding={1}>
              {this.state.newprojectList.map((tile) => (
                <GridTile
                  key={id++}
                  cols={1}
                  rows={1}
                  title={tile.research_title}
                  actionIcon={<IconButton><StarBorder color='rgb(0, 188, 212)' /></IconButton>}
                  titleStyle={styles.titleStyle}
                  titleBackground='linear-gradient(to top, rgba(0,0,0,0.7) 70%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
            >
                  <img src={tile.image === 'undefined' ? img : tile.image} onClick={() => this.onClick(tile, tile.agree)} style={{cursor: 'pointer'}} />
                </GridTile>
          ))}
            </GridList>
          </div>
          {this.state.newprojectList_status.length > 0
            ? <div className='event-footer' >
              <GridList style={styles.gridList} cols={5} cellHeight={180} padding={1}>
                {this.state.newprojectList_status.map((tile) => (
                  <GridTile
                    key={id++}
                    cols={1}
                    rows={1}
                    title={tile.research_title}
                    actionIcon={<IconButton><StarBorder color='rgb(0, 188, 212)' /></IconButton>}
                    titleStyle={styles.titleStyle}
                    titleBackground='linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                  >
                    <img src={tile.image === 'undefined' ? img : tile.image} onClick={() => this.onClick(tile, tile.agree)} style={{cursor: 'pointer'}} />
                  </GridTile>
                ))}
              </GridList>
            </div> : ''}
        </div>
        <div>
          {this.state.project === '' ? <div /> : <Project propsFetch={this.fetchImage} propsClick={this.onClickBack} studentProfile={this.props.studentProfile} project={this.state.project} />}
        </div>
      </SwipeableViews>
    )
  }
}

export default GridListExampleSingleLine
