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
import ChangeTeacherConfirm from './ChangeTeacherConfirm'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { Dialog } from 'material-ui'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// REDUX
import { fetchResearchList } from '../../../Redux/Teachers/Actions/Research/index'

// css
import './GroupList.css'
import { connect } from 'react-redux'

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


class GroupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      message: '系統正在讀取資料中，請耐心等候。',
      chipOpen: new Map(),
      semVal: getSemester(),
      semList: ['107-2'],
    }
  }

  fetchData (sem) {
    this.setState({loading: true})
    let tid = this.props.idCard.teacher_id
    if( tid === '001' ){
      // NOT A VALID TID
      setTimeout(
        () => {
          console.log('----- fetchData AGAIN!!!! ----')
          this.fetchData(sem)
        }, 1500)
      return
    }
    this.props.FetchResearchList(tid, sem)
    this.setState({loading: false})
  }

  componentDidMount () {
    this.fetchData(this.state.semVal)
    this.makeSemList()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      this.fetchData(this.state.semVal)
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

  makeSemList = () => {
    let semList = []
    let tmp = getSemester()
    semList.push(tmp)
    while(tmp !== '106-2'){
      if(tmp[4] === '1'){
        let yy = parseInt(tmp.substring(0, 3), 10) - 1
        tmp = yy.toString() + '-2'
      }else if(tmp[4] === '2'){
        tmp = tmp.substring(0, 4) + '1'
      }else break
      semList.push(tmp)
    }
    this.setState({semList})
  }

  render () {
    const csNum = this.props.research.cs_number
    const otherNum = this.props.research.other_number
    const groups = this.props.research.groups

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
                      {
                        this.state.semList.map( item =>
                          <MenuItem value={item} primaryText={item} />
                        )
                      }
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
            {this.state.loading && <div style={{fontSize: 28, color: 'red'}}>{this.state.message}</div>}
            <Loading
            size={100}
            left={40}
            top={100}
            isLoading={this.state.loading} />
            {!this.state.loading && groups.length !== undefined
              ? groups.map((item, i) => (
                <GroupButton
                  key={i}
                  keyId={i}
                  item={item}
                  idCard={this.props.idCard}
                  groupClick={this.props.handleGroupClick}
                  parentFunction={this.triggerUpdate}
                  chipOpen={this.state.chipOpen}
                  handleChip={this.handleChip}
                  sem={this.state.semVal}
                  handleRequestClose={this.handleRequestClose}
                />
              ))
              : ''
            }
          </Row>
        </div>
      </Grid>
    )
  }
}

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
                        onClick={() => props.handleChip(props.key + p.student_id, p.replace_pro)}
                        backgroundColor={p.replace_pro===1?'red':''}>
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
                      {p.replace_pro===1?
                        <ChangeTeacherConfirm
                          research = {props.item}
                          sem = {props.sem}
                          student_id={p.student_id}/>
                        :<InfoCard
                        key={i}
                        student={p}
                        sender={props.idCard.tname}
                        sender_email={props.idCard.email}
                      />}
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

const getSemester = () => {
  const Today = new Date()
  return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0))) + '-' + ((Today.getMonth() + 1) >= 8 ? '1' : '2')
}

const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard,
  research: state.Teacher.Research.research
})
const mapDispatchToProps = (dispatch) => ({
  FetchResearchList: () => dispatch(fetchResearchList())
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)