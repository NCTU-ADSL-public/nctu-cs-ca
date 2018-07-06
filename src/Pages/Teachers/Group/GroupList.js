import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image, Glyphicon, Button } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'
import firebase from 'firebase'

import Loading from '../../../Components/Loading'
import ChangeTitleDialog from './ChangeTitleDialog'
import ScoreDialog from './ScoreDialog'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

let config = {
  apiKey: 'AIzaSyAFVgUFaZk23prpVeXTkFvXdUhSXy5xzNU',
  authDomain: 'nctu-csca.firebaseapp.com',
  databaseURL: 'https://nctu-csca.firebaseio.com',
  projectId: 'nctu-csca',
  storageBucket: 'nctu-csca.appspot.com',
  serviceAccount: '../../../../Resources/nctu-csca-firebase-admins.json',
  messagingSenderId: '612862784976'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
  let auth = firebase.auth()
  auth.signInWithEmailAndPassword('nctucsca@gmail.com', 'axc3262757')
}
let storageRef = firebase.storage().ref()

const styles = {
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#666666',
    margin: '32px 0 0 70px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#737373',
    margin: '55px 0 0 70px',
    float: 'left'
  },
  groups: {
    margin: '0 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '6px',
    border: '1px #dfdfdf solid'
  },
  pic: {
    width: '80%'
  },
  groupYear: {
    fontSize: '1.2em',
    fontWeight: '200',
    color: '#575757'
  },
  groupTitle: {
    fontSize: '2em',
    fontWeight: '100',
    color: '#575757'
  },
  groupModify: {
    margin: '10px 10px 5px 0',
    float: 'left'
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  },
  block: {
    display: 'block',
    height: 50
  }
}

class GroupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      index: 0,
      groupListlength: 99,
      total_number: 0,
      groupList: [
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 ',
              score:''
            },
            { student_id: '0399777',
              sname: '李小霖',
              detail: '資工系 網多組3 ',
              score: ''
            },
            { student_id: '0391234',
              sname: '李毛毛',
              detail: '資工系 網多組3 '
            },
            { student_id: '0399777',
              sname: '李小霖',
              detail: '資工系 網多組3 ',
              score: ''
            },
            { student_id: '0391234',
              sname: '李毛毛',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        }
      ]
    }
  }
  fetchData () {
    console.log(this.props.idCard.name)
    let _this = this
    this.setState({
      groupList: []
    })
    axios.get('/professors/students/projects', {
      // name: '彭文志'
      // name: this.props.idCard.name
      id: this.props.idCard.id
    }).then(res => {
      console.log('PROJECT DATA!')
      console.log(res.data)
      this.setState({
        total_number: res.data.total_number,
        groupList: []
        // groupList: res.data.groups
      })
      let data = res.data.groups
      let dataList = []
      for (let i = 0; i < data.length; i++) {
        let directory = data[i].year + '/' + this.props.idCard.name + '/' + data[i].research_title + '/image/image.jpg'
        let pathReference = storageRef.child(directory)
        pathReference.getDownloadURL().then(url => {
          let data_ = {...data[i], image: url}
          directory = data[i].year + '/' + _this.props.idCard.name + '/' + data[i].research_title + '/file/file.pdf'
          pathReference = storageRef.child(directory)
          pathReference.getDownloadURL().then(url => {
            dataList.push({...data_, file: url})
            _this.setState({
              loading: false,
              groupList: [..._this.state.groupList, {...data_, file: url}]
            })
          }).catch(error => {
            console.log(error)
            dataList.push(data_)
            _this.setState({
              loading: false,
              groupList: [..._this.state.groupList, {...data_, file: url}]
            })
          })
        }).catch(error => {
          console.log(error)
          let data_ = {...data[i]}
          directory = data[i].year + '/' + _this.props.idCard.name + '/' + data[i].research_title + '/file/file.pdf'
          pathReference = storageRef.child(directory)
          pathReference.getDownloadURL().then(url => {
            dataList.push({...data_, file: url})
            _this.setState({
              loading: false,
              groupList: [..._this.state.groupList, {...data_, file: url}]
            })
          }).catch(error => {
            console.log(error)
            dataList.push(data_)
            _this.setState({
              loading: false,
              groupList: [..._this.state.groupList, {...data_}]
            })
          })
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  componentDidMount () {
    this.fetchData()
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      console.log(nextProps)
      await this.setState({
        groupList: []
      })
      this.fetchData()
    }
  }

  delay(t){
    return new Promise((res, rej) => {
      setTimeout(() => (res(1)), t)
    })
  }

  triggerUpdate = () => {
    this.delay(1000).then((v) => (
      this.fetchData()
    )).catch((e) => (
      console.log('trigger update error' + e)
    ))
  }

  render () {
    const tn = this.state.total_number
    return (
      <Grid style={{minHeight: 500}}>
        <div>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <div style={styles.mainTitle}> 學生專題列表 </div>
            </Col>
            <Col xs={12} md={8} lg={8}>
              <div style={styles.subTitle}> 本年度已收專題學生: {tn} 人 </div>
            </Col>
          </Row>
          <Row style={styles.groups}>
            <Loading
              size={100}
              left={40}
              top={100}
              isLoading={this.state.loading} />
            {this.state.groupList.length !== 0
              ? this.state.groupList.map((item, i) => (
                <GroupButton
                  key={item.research_title}
                  title={item.research_title}
                  participants={item.participants}
                  year={item.year}
                  firstSecond={item.first_second}
                  item={item}
                  idCard={this.props.idCard}
                  groupClick={this.props.handleGroupClick}
                  parentFunction={this.triggerUpdate}
                />
              ))
              : '(無專題生資料)'
            }
          </Row>
        </div>
      </Grid>
    )
  }
}
export default GroupList

const GroupButton = (props) => (
  <Grid style={styles.groupBtn}>
    <Row>
      <Col xs={3} md={3} lg={3}>
        <Image style={styles.pic} src={props.item.image === undefined ? pic : props.item.image} circle />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <div style={styles.groupYear}>年度 : {props.year}</div>
        <div style={styles.block}>
          <div style={styles.groupModify}>
            <ChangeTitleDialog
              title={props.title}
              firstSecond={props.firstSecond}
              year={props.year}
              idCard={props.idCard}
              parentFunction={props.parentFunction}
            />
          </div>
          <div style={styles.groupModify}>
            <ScoreDialog
              title={props.title}
              participants={props.participants}
              firstSecond={props.firstSecond}
              idCard={props.idCard}
              year={props.year}
              parentFunction={props.parentFunction}
            />
          </div>
        </div>
        <div>
          <div style={styles.groupTitle}>{props.title}</div>
        </div>
        <div>
          <MuiThemeProvider>
            <div style={styles.chipWrapper}>
              {props.participants.map((item, i) => (
                <Chip style={styles.chip} key={i} >
                  <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                  <span style={{color: 'red'}}>  {item.score}</span>
                </Chip>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
        <div> <Button bsStyle='link' onClick={()=>props.groupClick(props.item)}>Learn more...</Button> </div>
      </Col>
    </Row>
  </Grid>
)
