import React from 'react'
import axios from 'axios'

import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
// resource
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'
import firebase from 'firebase'
import FakeData from '../../../Resources/FakeData'

// component
import InfoCard from '../Shared/InfoCard'
import Loading from '../../../Components/Loading'
import ChangeTitleDialog from './ChangeTitleDialog'
import ScoreDialog from './ScoreDialog'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { Dialog } from 'material-ui'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// css
import './GroupList.css'

// FIRE BASE
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
/*
const styles = {
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#6e8086',
    margin: '32px 0 0 70px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#bfbfbf',
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
    border: '1px #dfdfdf solid',
    boxShadow: 'rgba(51, 51, 102, 0.3) 2px 1px 20px -2px'
  },
  pic: {
    width: '200px',
    height: '200px'
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
*/

class GroupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      index: 0,
      cs_number: 0,
      other_number: 0,
      chipOpen: new Map(),
      groupList: [
        {
          research_title: 'epth estimation from Single image',
          participants: [
            {
              student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 ',
              score: ''
            },
            {
              student_id: '0399777',
              sname: '李小霖',
              detail: '資工系 網多組3 ',
              score: ''
            },
            {
              student_id: '0391234',
              sname: '郭梁兒',
              detail: '資工系 網多組3 '
            },
            {
              student_id: '0399666',
              sname: '耿平',
              detail: '資工系 網多組3 ',
              score: ''
            },
            {
              student_id: '0391555',
              sname: '余阿杰',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        {
          research_title: '虛擬貨幣交易機器人',
          participants: [
            {
              student_id: '0399998',
              sname: '陳干頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        {
          research_title: 'IOT智慧家庭監控應用',
          participants: [
            {
              student_id: '0399997',
              sname: '陳平頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
        {
          research_title: 'Android 系統記乾憶體管理改進',
          participants: [
            {
              student_id: '0399987',
              sname: '陳頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        }
      ],
      initItem: [
        {
          'student_id': '0316000',
          'sname': '吳泓寬',
          'program': '網多',
          'graduate': '0',
          'graduate_submit': '0',
          'email': 'student@gmail.com',
          'failed': true,
          'score': FakeData.StudentScore,
        },
      ],
      semVal: this.getSemester(),
    }
  }

  getSemester () {
    let Today = new Date()
    return ((Today.getFullYear()-1912)+ Number(((Today.getMonth()+1)>=8?1:0))) + '-' + ((Today.getMonth()+1)>=8?'1':'2')
  }

  fetchData (sem) {
    this.setState({loading: false})
    console.log('idCard: ' + this.props.idCard.tname)
    console.log('sem: ' + sem)
    let _this = this
    axios.post('/professors/students/projects', {
      teacherId: this.props.idCard.teacher_id,
      sem: sem
    }).then(res => {
      this.setState({
        cs_number: res.data.cs_number,
        other_number: res.data.other_number,
        groupList: []
        // groupList: res.data.groups
      })

      // year research_title
      let data = res.data.groups
      let dataList = []
      console.log(data)
      data.forEach( item => {
        let directory = item.year + '/' + this.props.idCard.tname + '/' + item.research_title + '/image/image.jpg'
        let pathReference = storageRef.child(directory)
        pathReference.getDownloadURL().then(url => {
          let data_ = {...item, image: url}
          directory = item.year + '/' + _this.props.idCard.tname + '/' + item.research_title + '/file/file.pdf'
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
          let data_ = {...item}
          directory = item.year + '/' + _this.props.idCard.tname + '/' + item.research_title + '/file/file.pdf'
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
      })

      console.log('DATA:', data)
      console.log('DATA LIST:', dataList)

    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.fetchData(this.state.semVal)
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      await this.setState({
        groupList: []
      })
      this.fetchData()
    }
  }

  delay (t) {
    return new Promise((res, rej) => {
      setTimeout(() => (res(1)), t)
    })
  }

  triggerUpdate = () => {
    this.delay(1000).then((v) => (
      this.fetchData(this.state.semVal)
    )).catch((e) => (
      console.log('trigger update error' + e)
    ))
  }

  handleChip = (i) => {
    let chipOpen = this.state.chipOpen
    chipOpen.set(i, true)
    this.setState({chipOpen})
  }

  handleRequestClose = () => {
    this.setState({
      chipOpen: new Map(),
    })
  }

  handleDropDownChange = (event, index, semVal) => {
    this.setState({semVal})
    this.fetchData(semVal)
  }

  render () {
    const csNum = this.state.cs_number
    const otherNum = this.state.other_number

    return (
      <Grid style={{minHeight: 500}}>
        <div>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <div className='mainTitle'>學生專題列表 </div>
            </Col>
            <Col xs={12} md={8} lg={8}>
              <div className='subTitle'>
                <div className='subTitle-item'> <b>選擇學期: </b> </div>
                <div className='subTitle-item subTitle-item-mui'>
                  <MuiThemeProvider>
                    <DropDownMenu
                      value={this.state.semVal}
                      onChange={this.handleDropDownChange}
                      style={{width: 150, fontFamily: 'Noto Sans CJK TC', fontWeight: 'bold'}}
                      autoWidth={false}
                    >
                      <MenuItem value={'107-1'} primaryText='107-1' />
                      <MenuItem value={'106-2'} primaryText='106-2' />
                    </DropDownMenu>
                  </MuiThemeProvider>
                </div>
                <div className='subTitle-item'>
                  已收
                  &nbsp;&nbsp;<span style={{color: 'red', fontWeight: 'bold'}}>本系學生: {csNum}人</span>
                  &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {otherNum}人
                </div>
              </div>
            </Col>
          </Row>
          <Row className='groups'>
            <Loading
            size={100}
            left={40}
            top={100}
            isLoading={this.state.loading} />
            {this.state.groupList.length !== 0
              ? this.state.groupList.map((item, i) => (
                <GroupButton
                  key={i}
                  keyId={i}
                  item={item}
                  idCard={this.props.idCard}
                  groupClick={this.props.handleGroupClick}
                  parentFunction={this.triggerUpdate}
                  chipOpen={this.state.chipOpen}
                  handleChip={this.handleChip}
                  handleRequestClose={this.handleRequestClose}
                />
              ))
              : '(無專題生資料!)'
            }
          </Row>
        </div>
      </Grid>
    )
  }
}

export default GroupList

const GroupButton = (props) => (
  <Grid className='groupBtn' key={props.keyId}>
    <Row>
      <Col xsHidden md={3} lg={3}>
        <Image className='group-pic' src={props.item.image === undefined ? pic : props.item.image} circle/>
      </Col>
      <Col xs={12} md={9} lg={9}>
        <div className='groupYear'>年度 : {props.item.year}</div>
        <div className='block'>
          <div className='groupModify'>
            <ChangeTitleDialog
              title={props.item.research_title}
              firstSecond={props.item.first_second}
              year={props.item.year}
              idCard={props.idCard}
              parentFunction={props.parentFunction}
            />
          </div>
          <div className='groupModify'>
            <ScoreDialog
              title={props.item.research_title}
              participants={props.item.participants}
              firstSecond={props.item.first_second}
              idCard={props.idCard}
              year={props.item.year}
              parentFunction={props.parentFunction}
            />
          </div>
        </div>
        <div>
          <div className='groupTitle'>{props.item.research_title}</div>
        </div>
        <div>
          <MuiThemeProvider>
            <div className='chipWrapper'>
              {props.item.participants.map((p, i) => (
                <div key={i}>

                  <Chip className='group-chip'
                        key={i}
                        onClick={() => props.handleChip(props.key + p.student_id)}>
                    <Avatar src={defaultPic}/> {p.student_id} {p.sname}
                    <span style={{color: 'red'}}>  {p.score}</span>
                  </Chip>

                  <MuiThemeProvider>
                    <Dialog
                      key={i}
                      modal={false}
                      open={props.chipOpen.size === 0 ? false : props.chipOpen.get(props.key + p.student_id)}
                      onRequestClose={() => props.handleRequestClose()}
                      autoScrollBodyContent
                      contentStyle={{maxWidth: 'none', width: '90%', position: 'absolute', top: 0, left: '5%'}}
                    >
                      <InfoCard
                        key={i}
                        student={p}
                        sender={props.idCard.tname}
                        sender_email={props.idCard.email}
                      />
                    </Dialog>
                  </MuiThemeProvider>

                </div>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
        <div><Button bsStyle='link' onClick={() => props.groupClick(props.item)}>Learn more...</Button></div>
      </Col>
    </Row>
  </Grid>
)
