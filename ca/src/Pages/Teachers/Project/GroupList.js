import React from 'react'

import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
// resource
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'

// component
import InfoCard from '../Shared/InfoCard'
import Loading from '../../../Components/Loading'
import ChangeTitleDialog from '../Group/ChangeTitleDialog'
import ScoreDialog from '../Group/ScoreDialog'
import ChangeTeacherConfirm from '../Group/ChangeTeacherConfirm'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { Dialog } from 'material-ui'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// REDUX
import { fetchResearchList1, fetchResearchList2 } from '../../../Redux/Teachers/Actions/Research/index'
import { connect } from 'react-redux'

class GroupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      message: '系統正在讀取資料中，請耐心等候。',
      chipOpen: new Map(),
      semVal: getSemester(),
      yearVal: getYear(),
      yearList: ['107'],
    }
  }

  fetchData (year) {
   this.setState({loading: true})
    let tid = this.props.idCard.teacher_id
    if( tid === '001' ){
      // NOT A VALID TID
      setTimeout(
        () => {
          console.log('----- fetchData AGAIN!!!! ----')
          this.fetchData(year)
        }, 4000)
      return
    }
    this.props.FetchResearchList1(tid, year)
    this.props.FetchResearchList2(tid, year)
    this.setState({loading: false})
    console.log('----- this.props.research1.groups ----')
    console.log(this.props.research1.groups)
    console.log('----- this.props.research2.groups ----')
    console.log(this.props.research2.groups)
  }

  componentDidMount () {
    this.fetchData(this.state.yearVal)
    this.makeYearList()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      this.fetchData(this.state.yearVal)
    }
  }

  delay (t) {
    return new Promise((res, rej) => {
      setTimeout(() => (res(1)), t)
    })
  }

  triggerUpdate = () => {
    this.delay(1000).then((v) => (
      this.fetchData(this.state.yearVal)
    )).catch((e) => (
      console.log('trigger update error' + e)
    ))
  }

  handleChip = (i) => {
    let chipOpen = this.state.chipOpen
    chipOpen.set(i, false)
    this.setState({chipOpen})
  }

  handleRequestClose = () => {
    this.setState({
      chipOpen: new Map(),
    })
  }

  handleDropDownChange = (event, index, yearVal) => {
    this.setState({yearVal})
    this.fetchData(yearVal)
  }

  makeYearList = () => {
    let yearList = []
    let y = getYear()
    yearList.push(y)
    while(y !== '106'){
      let ty = parseInt(y) - 1
      y = ty.toString()
      yearList.push(y)
    }
    this.setState({yearList})
  }

  render () {
    const csNum = this.props.research1.cs_number + this.props.research2.cs_number
    const otherNum = this.props.research1.other_number + this.props.research2.other_number
    const groups1 = this.props.research1.groups
    const groups2 = this.props.research2.groups

    return (
        <div>
          <div className='subTitle'>
            <div className='subTitle-item'>選擇年度: </div>
            <div className='subTitle-item subTitle-item-mui'>
              <MuiThemeProvider>
                <DropDownMenu
                  value={this.state.yearVal}
                  onChange={this.handleDropDownChange}
                  style={{width: 150, fontFamily: 'Noto Sans CJK TC'}}
                  autoWidth={false}
                >
                  {
                    this.state.yearList.map( item =>
                      <MenuItem value={item} primaryText={item} />
                    )
                  }
                </DropDownMenu>
              </MuiThemeProvider>
            </div>
            <div className='subTitle-item'>
              已收
              &nbsp;&nbsp;<span style={{color: 'red'}}>本系學生: {csNum}人</span>
              &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {otherNum}人
            </div>
          </div>
          <div className='subTitle-sem'>
            上學期
          </div>
          <div className='groups'>
            <Loading
              size={50}
              left={40}
              top={20}
              isLoading={this.state.loading} />
            {!this.state.loading && groups1.length !== undefined
              ? groups1.map((item, i) => {
                if(item.year[4] === '1')
                  return (
                    <GroupButton
                      key={i}
                      keyId={i}
                      item={item}
                      idCard={this.props.idCard}
                      groupClick={this.props.handleGroupClick}
                      parentFunction={this.triggerUpdate}
                      chipOpen={this.state.chipOpen}
                      handleChip={this.handleChip}
                      sem={1}
                      year={this.state.yearVal}
                      handleRequestClose={this.handleRequestClose}
                    />
                  )
              })
              : ''
            }
          </div>
          <div className='subTitle-sem subTitle-sem-orange'>
            下學期
          </div>
          <div className='groups'>
            <Loading
              size={50}
              left={40}
              top={20}
              isLoading={this.state.loading} />
            {!this.state.loading && groups2.length !== undefined
              ? groups2.map((item, i) => {
                if(item.year[4] === '2')
                  return (
                    <GroupButton
                      key={i}
                      keyId={i}
                      item={item}
                      idCard={this.props.idCard}
                      groupClick={this.props.handleGroupClick}
                      parentFunction={this.triggerUpdate}
                      chipOpen={this.state.chipOpen}
                      handleChip={this.handleChip}
                      sem={2}
                      year={this.state.yearVal}
                      handleRequestClose={this.handleRequestClose}
                    />
                  )
              })
              : ''
            }
          </div>
        </div>
    )
  }
}

const GroupButton = (props) => (
  <div className={props.sem === 1 ? 'groupBtn' : 'groupBtn-orange' } key={props.keyId}>
    <div>
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
                        sem = {props.item.sem}
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
    </div>
  </div>
)

const getYear = () => {
  const Today = new Date()
  return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
}

const getSemester = () => {
  const Today = new Date()
  return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0))) + '-' + ((Today.getMonth() + 1) >= 8 ? '1' : '2')
}

const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard,
  research1: state.Teacher.Research.research1,
  research2: state.Teacher.Research.research2
})
const mapDispatchToProps = (dispatch) => ({
  FetchResearchList1: (tid, year) => dispatch(fetchResearchList1(tid, year)),
  FetchResearchList2: (tid, year) => dispatch(fetchResearchList2(tid, year))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)