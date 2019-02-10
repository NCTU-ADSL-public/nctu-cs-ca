import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Button,
  IconButton,
  Snackbar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Chip,
} from '@material-ui/core'
import {connect } from 'react-redux'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
import ApplyIcon from '@material-ui/icons/Assignment'
import OKIcon from '@material-ui/icons/Done'
import TrashIcon from '@material-ui/icons/Delete'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'
// import FilterIcon from '@material-ui/icons/FilterList'
import SwitchIcon from '@material-ui/icons/Flag'
import Check from '@material-ui/icons/CheckBox'
import Send from '@material-ui/icons/Send'
import Reset from '@material-ui/icons/Restore'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
//import FakeData from '../../../Resources/FakeData'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const type = [[0], [1, 5], [2], [3],[4]]
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(104, 187, 102)'
    }
  }
})

const styles = () => ({
  root: {
    margin: '100px auto',
    marginBottom: 50,
    width: '90%'
  },
  subtitle: {
    fontSize: '1.2em'
  },
  progress: {
    margin: '0 10px'
  },
  btn: {
    fontSize: 15,
    minWidth: 150,
    textAlign: 'center'
  },
  input: {
    fontSize: 17
  },
  font: {
    fontSize: 15,
    fontWeight: 400,
    textAlign: 'center'
  },
  font2: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center'
  },
  font3: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 15,
    fontWeight: 400,
    textAlign: 'center'
  },
  font4: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center'
  },
  font5: {
    fontSize: 16,
    fontWeight: 400
    // textAlign: 'center'
  },
  font6: {
    fontSize: 16,
    fontWeight: 400,
    cursor: 'pointer',
    textAlign: 'center'
  },
  to: {
    display: 'inline-block',
    width: 100,
    height: 10,
    backgroundColor: '#eee'
  },
  action: {
    position: 'relative',
    right: 10
  },
  side: {
    position: 'fixed',
    top: 110,
    left: 5,
    width: 50
  },
  sideIcon2: {
    position: 'absolute',
    top: 60,
    left: 'calc(100vw - 140px)'
  },
  Panels: {
    width: 'calc(100vw - 80px)',
    position: 'absolute',
    top: 110,
    left: 60,
    paddingBottom: 50
  },
  selected: {
    backgroundColor: '#c2dbff'
  },
  options: {
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 0,
    marginLeft: 58,
    paddingTop: 60,
    left: 0,
    position: 'fixed'
    // borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  },
  state: {
    position: 'fixed',
    left: 6,
    bottom: 6,
    color: '#eee',
    zIndex: 1080
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    fontWeight: 'normal',
    marginRight: '1em'
  }
})

const Arrow = () => (
  <svg height='8' width='130'>
    <circle cx='2' cy='4' r='2' fill='rgb(200,200,200)' />
    <circle cx='8' cy='4' r='2' fill='rgb(195,195,195)' />
    <circle cx='14' cy='4' r='2' fill='rgb(190,190,190)' />
    <circle cx='20' cy='4' r='2' fill='rgb(185,185,185)' />
    <circle cx='26' cy='4' r='2' fill='rgb(180,180,180)' />
    <circle cx='32' cy='4' r='2' fill='rgb(175,175,175)' />
    <circle cx='38' cy='4' r='2' fill='rgb(170,170,170)' />
    <circle cx='44' cy='4' r='2' fill='rgb(165,165,165)' />
    <circle cx='50' cy='4' r='2' fill='rgb(160,160,160)' />
    <circle cx='56' cy='4' r='2' fill='rgb(155,155,155)' />
    <circle cx='62' cy='4' r='2' fill='rgb(150,150,150)' />
    <circle cx='68' cy='4' r='2' fill='rgb(145,145,145)' />
    <circle cx='74' cy='4' r='2' fill='rgb(140,140,140)' />
    <circle cx='80' cy='4' r='2' fill='rgb(135,135,135)' />
    <circle cx='86' cy='4' r='2' fill='rgb(130,130,130)' />
    <circle cx='92' cy='4' r='2' fill='rgb(125,125,125)' />
    <circle cx='98' cy='4' r='2' fill='rgb(120,120,120)' />
    <circle cx='104' cy='4' r='2' fill='rgb(115,115,115)' />
    <circle cx='110' cy='4' r='2' fill='rgb(110,110,110)' />
    <circle cx='116' cy='4' r='2' fill='rgb(105,105,105)' />
    <polygon points='121,0 121,8 129,4' style={{fill: 'rgb(100,100,100)'}} />
  </svg>
)
const getListURL  = '/teachers/get'
const chStURL = '/assistants/ShowUserOffsetApplyForm'
class Verify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
// for test
      //formList: FakeData.FormList.map((e,i)=>({...e,id:i})),
// end for test
      formList:[],
      open: false,
      message: 0,
      index: 1,
      select: [],
      selectAll: false,
      isRecord: false,
      isEnglish: false,
    }
    this.handleAgree = this.handleAgree.bind(this)
    this.handleDisagree = this.handleDisagree.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handleAllReset = this.handleAllReset.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.snackbarOpen = this.snackbarOpen.bind(this)
    this.snackbarClose = this.snackbarClose.bind(this)
  }
  componentDidMount () {
    // get all verify items
    axios.get(getListURL,{
      params: {
        id: this.props.tid
      }
    }).then(res => {
      this.setState({formList: res.data.map((e, i) => ({...e, id: i}))})
    }).catch(err => {
      console.log(err)
    })
  }

  handleAgree (id) {
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 1
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, nameA, codeA} = this.state.formList[id]
    axios.post(chStURL, {
      courses: [
        {
          sid: sid,
          cosname: nameA,
          coscode: codeA
        }
      ],
      status: 2
    }).then(res => {
      updatedList[id].status = 2
      this.setState({formList: updatedList, open: true, message: 0})
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleDisagree (id) {
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 2
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, nameA, codeA} = this.state.formList[id]
    axios.post(chStURL, {
      courses: [
        {
          sid: sid,
          cosname: nameA,
          coscode: codeA
        }
      ],
      status: 4
    }).then(res => {
      updatedList[id].status = 4
      this.setState({formList: updatedList, open: true, message: 0})
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleReset (id) {
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 0
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, nameA, codeA} = this.state.formList[id]
    axios.post(chStURL, {
      courses: [
        {
          sid: sid,
          cosname: nameA,
          coscode: codeA
        }
      ],
      status: 1
    }).then(res => {
      updatedList[id].status = 1
      this.setState({formList: updatedList, open: true, message: 0})
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleSelect (e, id) {
    let updatedArray = this.state.select
    if (this.state.select.includes(id)) {
      updatedArray = updatedArray.filter(e => e !== id)
      this.setState({select: updatedArray, selectAll: false})
    } else {
      updatedArray.push(id)
      let isAll = this.state.formList.filter(e => e.status === this.state.index).every(e => this.state.select.includes(e.id))
      this.setState({
        select: updatedArray,
        selectAll: isAll
      })
    }
    e.stopPropagation()
  }
  handleSend (st) {
    let updatedList = this.state.formList
    axios.post(chStURL, {
      courses: this.state.select.map(
        e => {
          updatedList[e].status = st
          return ({
            sid: this.state.formList[e].sid,
            cosname: this.state.formList[e].nameA,
            coscode: this.state.formList[e].codeA
          })
        }
      ),
      status: st
    }).then(res => {
      this.setState({formList: updatedList, open: true, message: 0})
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleAllReset () {
    let updatedList = this.state.formList
    axios.post(chStURL, {
      courses: this.state.select.map(
        e => {
          updatedList[e].status = 1
          return ({
            sid: this.state.formList[e].sid,
            cosname: this.state.formList[e].nameA,
            coscode: this.state.formList[e].codeA
          })
        }
      ),
      status: 1
    }).then(res => {
      this.setState({formList: updatedList, open: true, message: 0})
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  selectAll () {
    let updatedArray = this.state.select
    if (!this.state.selectAll) {
      updatedArray = this.state.formList.filter(e => ((type[this.state.index].includes(e.status)) && (e.isEnglish === this.state.isEnglish) && (!this.state.isRecord || e.previous))).map(e => e.id)
      this.setState({select: updatedArray, selectAll: true})
    } else {
      this.setState({select: [], selectAll: false})
    }
  }
  snackbarOpen () {
    this.setState({open: true})
  }
  snackbarClose () {
    this.setState({open: false})
  }
  render () {
    const {classes} = this.props
    const semester = ['上', '下', '暑']
    return (
      <div className={classes.root}>
        <span className={classes.state}>{`目前顯示：${['尚未處理', '等待中', '已通過', '已退回'][this.state.index]}${this.state.isRecord ? '且曾有審核通過紀錄' : ''}的${this.state.isEnglish ? '英授' : '一般'}抵免單`}</span>
        <MuiThemeProvider theme={theme}>
        <div className={classes.side}>
          {/* { this.state.formList.filter(e => e.status===0).length > 0 && */}
          {/* this.state.formList.filter(e => e.status===1).length > 0 && */}
          <Tooltip title={'申請中'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={() => this.setState({
                index: 1,
                select: [],
                selectAll: this.state.formList.filter(e => e.status === 1).every(e => this.state.select.includes(e.id)) && this.state.formList.filter(e => e.status === 1).length > 0,
                isRecord: false
              })}
              color={(this.state.index === 1) ? 'primary' : 'default'}
            >
              <ApplyIcon />
            </IconButton>
          </Tooltip>
          {/* { this.state.formList.filter(e => e.status===2).length > 0 && */}
          <Tooltip title={'已同意'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={() => this.setState({
                index: 2,
                select: [],
                selectAll: this.state.formList.filter(e => e.status === 2).every(e => this.state.select.includes(e.id)) && this.state.formList.filter(e => e.status === 2).length > 0,
                isRecord: false
              })}
              color={(this.state.index === 2) ? 'primary' : 'default'}
            >
              <OKIcon />
            </IconButton>
          </Tooltip>
          {/* { this.state.formList.filter(e => e.status===3).length > 0 && */}
          <Tooltip title={'已退回'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={() => this.setState({
                index: 4,
                select: [],
                selectAll: this.state.formList.filter(e => e.status === 3).every(e => this.state.select.includes(e.id)) && this.state.formList.filter(e => e.status === 3).length > 0,
                isRecord: false
              })}
              color={(this.state.index === 4) ? 'primary' : 'default'}
            >
              <TrashIcon />
            </IconButton>
          </Tooltip>
        </div>
        </MuiThemeProvider>
        {
          [1, 3].includes(this.state.index) &&
          <div className={classes.options}>
            <Tooltip title={this.state.selectAll ? '取消全選' : '全選'} placement='top'>
              <IconButton className={classes.sideIcon}
                onClick={this.selectAll}
              >
                {this.state.selectAll ? <Check /> : <CheckNone />}
              </IconButton>
            </Tooltip>
            {(this.state.select.length !== 0 || this.state.selectAll === true) && (
              (this.state.index === 1 &&
            (<React.Fragment>
              <Tooltip title={'退回已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                  onClick={()=>this.handleSend(4)}
                >
                  <TrashIcon />
                </IconButton>
              </Tooltip>
              <MuiThemeProvider theme={theme}>
              <Tooltip title={'同意已選取抵免單'} placement='top'>
                <span>
                <IconButton className={classes.sideIcon}
                  onClick={()=>this.handleSend(2)}
                >
                  <Send />
                </IconButton>
                </span>
              </Tooltip>
              </MuiThemeProvider>
            </React.Fragment>))  ||
            (this.state.index === 4 && (
              <React.Fragment>
                <Tooltip title={'重置已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon}
                    onClick={this.handleAllReset}
                  >
                    <Reset />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'刪除已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>))
            )}
            <MuiThemeProvider theme={theme}>
            <div className={classes.sideIcon2}>
              {/* <Tooltip title={this.state.isRecord ? '取消選取' : '選取曾有過抵免紀錄的抵免單'} placement='top'>
                <IconButton
                  onClick={() => this.setState({selectAll: false, select: [], isRecord: !this.state.isRecord})}
                  color={(this.state.isRecord) ? 'primary' : 'default'}
                >
                  <FilterIcon />
                </IconButton>
              </Tooltip> */}
              <Tooltip title={this.state.isEnglish ? '切換為一般抵免' : '切換為英授抵免'} placement='top'>
                <IconButton
                  onClick={() => this.setState({selectAll: false, select: [], isRecord: false, isEnglish: !this.state.isEnglish})}
                  color={(this.state.isEnglish) ? 'secondary' : 'primary'}
                >
                  <SwitchIcon />
                </IconButton>
              </Tooltip>
            </div>
            </MuiThemeProvider>
          </div>
        }
        <div className={classes.Panels}>
          {
            this.state.formList.filter(apply => (apply.status === this.state.index ) && (!this.state.isRecord || apply.previous) && (this.state.isEnglish === apply.isEnglish)).length > 0
              ? this.state.formList
                .filter(
                  apply => type[this.state.index].includes(apply.status) && (!this.state.isRecord || apply.previous) && (this.state.isEnglish === apply.isEnglish)
                )
                .map(
                  (apply, index) => (
                    <ExpansionPanel key={index} defaultExpanded className={this.state.select.includes(apply.id) ? classes.selected : ''}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <span className={classes.subtitle}>
                          {[0, 1, 3].includes(this.state.index) &&
                      (<span className={classes.action}>
                        <svg height='22' width='22' style={{verticalAlign: 'text-top'}} onClick={(e) => this.handleSelect(e, apply.id)}>
                          <Tooltip title={this.state.select.includes(apply.id) ? `點擊已取消勾選` : `點擊以選取此抵免單`} placement='top'>
                            <circle cx='11' cy='11' r='11' fill={this.state.select.includes(apply.id) ? '#3f51b5' : '#ccc'} />
                          </Tooltip>
                        </svg>
                      </span>)}
                          {`${apply.year}${semester[apply.semester - 1]}`}
                          <span>
                            <Tooltip title={
                              <React.Fragment>
                                <div>開課系所:&nbsp;{apply.department}</div>
                                <div>永久課號:&nbsp;{apply.codeA}</div>
                                <div>學分:&nbsp;{apply.creditA}</div>
                              </React.Fragment>
                            } placement='top'>
                              <Button color='primary' onClick={(e) => e.stopPropagation()} className={classes.btn}>
                                {apply.nameA}
                              </Button>
                            </Tooltip>
                            {
                              apply.codeB  &&
                              <React.Fragment>
                                <span className={classes.progress}> <Arrow /></span>
                                <Tooltip title={
                                  <React.Fragment>
                                    <div>永久課號:&nbsp;{apply.codeB}</div>
                                    <div>學分:&nbsp;{apply.creditB}</div>
                                  </React.Fragment>
                                } placement='top'>
                                  <Button color='primary' onClick={(e) => e.stopPropagation()}className={classes.btn}>
                                    {apply.nameB}
                                  </Button>
                                </Tooltip>
                              </React.Fragment>
                            }
                          </span>
                          {/* <Chip
                            style={apply.previous ? {background: '#28a745', color: '#fff', fontSize: 14, fontWeight: 400}
                              : {background: '#6c757d', color: '#fff', fontSize: 14, fontWeight: 400}}
                            label={
                              apply.previous
                                ? <span onClick={(e) => e.stopPropagation()}>以前已同意過此抵免規則</span>
                                : <span onClick={(e) => e.stopPropagation()}>以前未有過此抵免規則</span>
                            } /> */}
                          {apply.status === 5 && <Chip
                            style={{background: '#dc3545', color: '#fff', fontSize: 14, fontWeight: 400, marginLeft: 5}}
                            label={
                              <span onClick={(e) => e.stopPropagation()}>特殊案例需交由原授課教授審核</span>
                            } />}
                        </span>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.font}>學號</TableCell>
                              <TableCell className={classes.font}>姓名</TableCell>
                              <TableCell className={classes.font}>電話</TableCell>
                              <TableCell className={classes.font}>已修習課程</TableCell>
                              <TableCell className={classes.font}>開課系所</TableCell>
                              {apply.codeB &&<TableCell className={classes.font}>預抵免課程</TableCell>}
                            </TableRow>
                          </TableHead>
                          <TableBody >
                            <TableRow>
                              <TableCell className={classes.font}>{apply.sid}</TableCell>
                              <TableCell className={classes.font}>{apply.name}</TableCell>
                              <TableCell className={classes.font}>{apply.phone}</TableCell>
                              <TableCell className={classes.font}>{`${apply.nameA}(${apply.codeA})`}</TableCell>
                              <TableCell className={classes.font}>{apply.department}</TableCell>
                              {apply.codeB && <TableCell className={classes.font}>{`${apply.nameB}(${apply.codeB})`}</TableCell>}
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.font3}>申請日期</TableCell>
                              <TableCell className={classes.font5} >{apply.date.split(' ')[0].split('-').join('/')}</TableCell>
                              <TableCell className={classes.font3}>申請原因</TableCell>
                              <TableCell className={classes.font5} colSpan={2} >{apply.reason}</TableCell>
                              <TableCell className={classes.font6} ><a target='_blank' rel='noopener noreferrer' href={apply.file}>檔案下載</a></TableCell>
                              
                            </TableRow>
                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
                      <ExpansionPanelActions>
                        {this.state.index === 1 && (
                          <React.Fragment>
                            <Button onClick={() => this.handleDisagree(apply.id)}>
                              <span className={classes.font2}>不同意</span>
                            </Button>
                            <Button color='primary' onClick={() => this.handleAgree(apply.id)}>
                              <span className={classes.font2}>同意抵免</span>
                            </Button>
                          </React.Fragment>
                        )}
                        {this.state.index === 2 && (
                          <React.Fragment>
                            <Button onClick={() => this.handleReset(apply.id)}>
                              <span className={classes.font2}>重置</span>
                            </Button>
                          </React.Fragment>
                        )}
                        {this.state.index === 4 && (
                          <React.Fragment>
                            <Button onClick={() => this.handleReset(apply.id)}>
                              <span className={classes.font3}>重置</span>
                            </Button>
                            <Button style={{cursor: 'not-allowed'}}>
                              <span className={classes.font4}>刪除</span>
                            </Button>
                          </React.Fragment>
                        )}
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  )
                )
              : <div>目前尚無資料</div>
          }
        </div>
        {/* snackBar */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.snackbarClose}
          message={<span className={classes.font2}>{['修改成功！', '傳送失敗，請再次嘗試'][this.state.message]}</span>}
          action={[
            <IconButton
              color='inherit'
              onClick={this.snackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  tid: state.Teacher.User.idCard.teacher_id
})

export default connect(mapState)(withStyles(styles)(Verify))
