import React from 'react'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  // ExpansionPanelActions,
  Button,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Input,
  Avatar,
  Popover,
  CircularProgress
} from '@material-ui/core'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
import OpenInNew from '@material-ui/icons/OpenInNew'
import ApplyIcon from '@material-ui/icons/Assignment'
import AlarmIcon from '@material-ui/icons/Alarm'
import OKIcon from '@material-ui/icons/Done'
import WaitIcon from '@material-ui/icons/AccessTime'
import FaceIcon from '@material-ui/icons/Face'
import TrashIcon from '@material-ui/icons/Delete'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'
import ReturnIcon from '@material-ui/icons/Replay'
import HistoryIcon from '@material-ui/icons/History'
import TIcon from '@material-ui/icons/TurnedInNot'
// import SwitchIcon from '@material-ui/icons/Flag'
import Check from '@material-ui/icons/CheckBox'
import Send from '@material-ui/icons/Send'
import Reset from '@material-ui/icons/Restore'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import FakeData from '../../../Resources/FakeData'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { CSVLink } from 'react-csv'
import Arrow from './Arrow'
import { theme, styles } from './styles'
import {type, typeName, statusName, creditName } from './macro'

class Verify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
/******start for test*****
      formList: FakeData.FormList.map((e, i) => ({...e, id: i})),
      teacherList: FakeData.TeacherList.sort((a, b) => b.status - a.status),
      formListOld:FakeData.FormList.map((e, i) => ({...e, id: i})),
*********end for test***************/
      formList:[],
      teacherList: [],
      formListOld:[],
      isOld: false,
      open: false,
      message: 0,
      index: 0,
      select: [],
      selectAll: false,
      type: [0, 1, 2, 3],
      transferTo: '',
      return: '',
      anchorEl: null,
      fetching: true
    }
  }
  componentDidMount () {
    // get TeacherList for TransferTo
    axios.get('/assistants/advisee/teacherList').then(res => {
      this.setState({teacherList: res.data.sort((a, b) => b.status - a.status).map(t => ({id: t.id, name: t.name, status: t.status}))})
    })
    // get all verify items
    axios.get('/assistants/offsetApply/Show').then(res => {
      this.setState({formList: res.data.map((e, i) => ({...e, id: i})), fetching: false})
    }).catch(err => {
      console.log(err)
    })
    axios.get('/assistants/offsetApply/Show?old=true').then(res => {
      this.setState({formListOld: res.data.map((e, i) => ({...e, id: i}))})
    }).catch(err => {
      console.log(err)
    })
  }
  handleChange = (event) => {
    this.setState({ transferTo: event.target.value})
  }
  handleAgree = (id) => {
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 1
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, date, email} = this.state.formList[id]
    axios.post('/assistants/offsetApply/setAgree', {
      courses: [
        {
          sid: sid,
          timestamp: date,
          reason: null,
          email: email
        }
      ],
      status: 2,
      transferTo: this.state.transferTo
    }).then(res => {
      if (res.data.signal === 1) {
        updatedList[id].status = 2
        this.setState({formList: updatedList, open: true, message: 0, transferTo: '', select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleDisagree = (id) =>{
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 2
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, date, email} = this.state.formList[id]
    axios.post('/assistants/offsetApply/setAgree', {
      courses: [
        {
          sid: sid,
          timestamp: date,
          reason: null,
          email: email
        }
      ],
      status: 3,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        updatedList[id].status = 3
        this.setState({formList: updatedList, open: true, message: 0, select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleReset = (id) => {
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 0
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid, date, email} = this.state.formList[id]
    axios.post('/assistants/offsetApply/setAgree', {
      courses: [
        {
          sid: sid,
          timestamp: date,
          reason: null,
          email: email
        }
      ],
      status: 0,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        updatedList[id].status = 0
        this.setState({formList: updatedList, open: true, message: 0, select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleSelect = (e, id) => {
    let updatedArray = this.state.select
    if (this.state.select.includes(id)) {
      updatedArray = updatedArray.filter(e => e !== id)
      this.setState({select: updatedArray, selectAll: false})
    } else {
      updatedArray.push(id)
      let isAll = this.state.formList.filter(e => (type[this.state.index].includes(e.status) && this.state.type.includes(e.type))).every(e => this.state.select.includes(e.id))
      this.setState({
        select: updatedArray,
        selectAll: isAll
      })
    }
    e.stopPropagation()
  }
  handleOk = () => {
    let updatedList = this.state.formList
    axios.post('/assistants/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null,
            email: this.state.formList[e].email
          })
        }
      ),
      status: 2,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        this.state.select.map(
          e => updatedList[e].status = 2
        )
        this.setState({formList: updatedList, open: true, message: 0, select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleWithdraw = () => {
    let updatedList = this.state.formList
    axios.post('/assistants/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null,
            email: this.state.formList[e].email
          })
        }
      ),
      status: 3,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        this.state.select.map(
          e => updatedList[e].status = 3
        )
        this.setState({formList: updatedList, open: true, message: 0, select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleSend = () => {
    let updatedList = this.state.formList
    let status = this.state.teacherList.filter(e => e.id === this.state.transferTo)[0].status === 1 ? 1 : 5
    axios.post('/assistants/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null,
            email: this.state.formList[e].email
          })
        }
      ),
      status: status,
      transferTo: this.state.transferTo
    }).then(res => {
      if (res.data.signal === 1) {
        this.state.select.map(
          e => updatedList[e].status = status
        )
        this.setState({formList: updatedList, open: true, message: 0, select: [], transferTo: ''})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleAllReset = () => {
    let updatedList = this.state.formList
    axios.post('/assistants/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null,
            email: this.state.formList[e].email
          })
        }
      ),
      status: 0,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        this.state.select.map(
          e => updatedList[e].status = 0
        )
        this.setState({formList: updatedList, open: true, message: 0, select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleReturn = () => {
    let updatedList = this.state.formList
    axios.post('/assistants/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: this.state.return,
            email: this.state.formList[e].email
          })
        }
      ),
      status: 6,
      transferTo: ''
    }).then(res => {
      if (res.data.signal === 1) {
        this.state.select.map(
          e => updatedList[e].status = 6
        )
        this.setState({formList: updatedList, open: true, message: 0, return: '', select: []})
      } else {
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleSwitch = (i) => {
    if (this.state.type.length === 4) {
      let tmp = []
      tmp.push(i)
      this.setState({selectAll: false, select: [], type: tmp})
    } else if (this.state.type.includes(i)) {
      if (this.state.type.length === 1) {
        this.setState({selectAll: false, select: [], type: [0, 1, 2, 3]})
      } else {
        let tmp = this.state.type
        tmp = tmp.filter(e => e !== i)
        this.setState({selectAll: false, select: [], type: tmp})
      }
    } else {
      let tmp = this.state.type
      tmp.push(i)
      this.setState({selectAll: false, select: [], type: tmp})
    }
  }
  handleReason =(e) =>
   {
    this.setState({return: e.target.value})
  }
  selectAll = () => {
    let updatedArray = this.state.select
    if (!this.state.selectAll) {
      updatedArray = this.state.formList.filter(e => (type[this.state.index].includes(e.status) && this.state.type.includes(e.type))).map(e => e.id)
      this.setState({select: updatedArray, selectAll: true})
    } else {
      this.setState({select: [], selectAll: false, transferTo: ''})
    }
  }
  downCSV = (i) => {
    switch (i) {
      case 2:
        return (this.state.formList.filter(e => (e.type === 2))
        .map(e => {
          let date = e.date.split('-'), year, semester
          if (parseInt(date[1], 10) < 8) {
            year = parseInt(date[0], 10) - 1912
            semester = '下學期'
          } else {
            year = parseInt(date[0], 10) - 1911
            semester = '上學期'
          }
          return ({
            type: '學分抵免',
            sid: e.sid,
            name: e.name,
            info: e.info,
            nameA: e.nameA,
            department: e.department,
            creditA: e.creditA,
            codeB: e.codeB,
            nameB: e.nameB,
            creditB: e.creditB,
            typeB: e.typeB,
            year: year,
            semester: semester,
            status: statusName[e.status]
          })
        }))
      case 3:
        return (this.state.formList.filter(e => (e.type === 3))
        .map(e => {
          let date = e.date.split('-'), year, semester
          if (parseInt(date[1], 10) < 8) {
            year = parseInt(date[0], 10) - 1912
            semester = '下學期'
          } else {
            year = parseInt(date[0], 10) - 1911
            semester = '上學期'
          }
          return ({
            type: '課程免修',
            sid: e.sid,
            name: e.name,
            info: e.info,
            nameA: e.nameA,
            department: e.department,
            creditA: e.creditA,
            codeB: e.codeB,
            nameB: e.nameB,
            creditB: e.creditB,
            typeB: e.typeB,
            year: year,
            semester: semester,
            status: statusName[e.status]
          })
        }))
      case 0:
        return this.state.formList.filter(e => e.type === 0)
      .map(e => {
        let date = e.date.split('-'), year, semester
        if (parseInt(date[1], 10) < 8) {
          year = parseInt(date[0], 10) - 1912
          semester = '下學期'
        } else {
          year = parseInt(date[0], 10) - 1911
          semester = '上學期'
        }
        return ({
          type: '本系必修課程抵免',
          sid: e.sid,
          name: e.name,
          info: e.info,
          nameA: e.nameA,
          department: e.department,
          creditA: e.creditA,
          codeB: e.codeB,
          nameB: e.nameB,
          year: year,
          semester: semester,
          status: statusName[e.status]
        })
      })
      case 1:
        return this.state.formList.filter(e => e.type === 1)
      .map(e => {
        let date = e.date.split('-'), year, semester
        if (parseInt(date[1], 10) < 8) {
          year = parseInt(date[0], 10) - 1912
          semester = '下學期'
        } else {
          year = parseInt(date[0], 10) - 1911
          semester = '上學期'
        }
        return ({
          type: '英授專業課程抵免',
          sid: e.sid,
          name: e.name,
          info: e.info,
          codeA: e.codeA,
          nameA: e.nameA,
          department: e.department,
          teacher: e.teacher,
          year: year,
          semester: semester,
          status: statusName[e.status]
        })
      })
      default:
        break
    }
  }
  snackbarOpen = () => {
    this.setState({open: true})
  }
  snackbarClose = () => {
    this.setState({open: false})
  }
  render () {
    const {classes} = this.props
    // const semester = ['上', '下', '暑']
    let Data = this.state.isOld ? this.state.formListOld : this.state.formList
    return (
      <div className={classes.root}>
        {/* {
          this.state.isOld && <span className={classes.state}>{`目前顯示為歷史資料，欲至本學期抵免請點擊左下按鈕`}</span>
        } */}
        <MuiThemeProvider theme={theme}>
          <div className={classes.side}>
            {/* { this.state.formList.filter(e => e.status===0).length > 0 && */}
            <Tooltip title={'申請中'} placement='right'>
              <IconButton className={classes.sideIcon}
                onClick={() => this.setState({
                  index: 0,
                  select: [],
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 0) ? this.state.isOld ? 'secondary':'primary' : 'default'}
            >
                <ApplyIcon />
              </IconButton>
            </Tooltip>
            {/* this.state.formList.filter(e => e.status===1).length > 0 && */}
            <Tooltip title={'等待主任同意'} placement='right'>
              <IconButton className={classes.sideIcon}
                onClick={() => this.setState({
                  index: 1,
                  select: [],
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 1) ? this.state.isOld ? 'secondary':'primary' : 'default'}
            >
                <WaitIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'等待授課老師同意'} placement='right'>
              <IconButton className={classes.sideIcon}
                onClick={() => this.setState({
                  index: 2,
                  select: [],
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 2) ? this.state.isOld ? 'secondary':'primary' : 'default'}
            >
                <AlarmIcon />
              </IconButton>
            </Tooltip>
            {/* { this.state.formList.filter(e => e.status===2).length > 0 && */}
            <Tooltip title={'已同意'} placement='right'>
              <IconButton className={classes.sideIcon}
                onClick={() => this.setState({
                  index: 3,
                  select: [],
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 3) ? this.state.isOld ? 'secondary':'primary' : 'default'}
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
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 4) ?this.state.isOld ? 'secondary': 'primary' : 'default'}
            >
                <ReturnIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'抵免失敗'} placement='right'>
              <IconButton className={classes.sideIcon}
                onClick={() => this.setState({
                  index: 5,
                  select: [],
                  selectAll: false,
                  isRecord: false
                })}
                color={(this.state.index === 5) ?this.state.isOld ? 'secondary': 'primary' : 'default'}
            >
                <TrashIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'歷史資料'} placement='right'>
              <IconButton className={classes.sideIconBottom}
                onClick={() => {
                  this.setState({
                    isOld: !this.state.isOld,
                    select: [],
                    selectAll: false,
                    isRecord: false
                  })
                }}
                color={(this.state.isOld) ? 'secondary' : 'default'}
            >
                <HistoryIcon />
              </IconButton>
            </Tooltip>
          </div>
        </MuiThemeProvider>
        <div className={classes.options}>
          <Tooltip title={this.state.selectAll ? '取消全選' : '全選'} placement='top'>
            <IconButton className={classes.sideIcon}
              onClick={this.selectAll}
              >
              {this.state.selectAll ? <Check /> : <CheckNone />}
            </IconButton>
          </Tooltip>
          {(this.state.select.length !== 0 || this.state.selectAll === true) && (
              (this.state.index === 0 &&
            (<React.Fragment>
              <Tooltip title={'同意已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                  onClick={this.handleOk}
                >
                  <OKIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={'不同意已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                  onClick={this.handleWithdraw}
                >
                  <TrashIcon />
                </IconButton>
              </Tooltip>
              <Input
                placeholder='退回原因'
                value={this.state.return}
                onChange={this.handleReason}
              />
              <Tooltip title={'退回已選取抵免單'} placement='top'>
                <span>
                  <IconButton className={classes.sideIcon}
                    onClick={this.handleReturn}
                    disabled={this.state.return === ''}
                >
                    <ReturnIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <FormControl>
                {/* <InputLabel htmlFor='select-multiple'>審核人</InputLabel> */}
                <Select
                  value={this.state.transferTo}
                  input={<Input id='select-multiple' />}
                  onChange={this.handleChange}
                  renderValue={selected => (
                    <div className={classes.chips}>{
                      <Chip avatar={
                        <Avatar>
                          <FaceIcon />
                        </Avatar>
                            }
                        label={this.state.teacherList.filter(e => e.id === selected)[0].name}
                        className={classes.chip} />
                    }
                    </div>
                )}
              >
                  {
                this.state.teacherList.map(
                  t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                )
              }
                </Select>
              </FormControl>
              <MuiThemeProvider theme={theme}>
                <Tooltip title={'送出已選取抵免單'} placement='top'>
                  <span>
                    <IconButton className={classes.sideIcon}
                      onClick={this.handleSend}
                      disabled={this.state.transferTo === ''}
                >
                      <Send />
                    </IconButton>
                  </span>
                </Tooltip>
              </MuiThemeProvider>
            </React.Fragment>)) ||
            (this.state.index === 1 &&
              (
                <React.Fragment>
                  <Tooltip title={'重置已選取抵免單'} placement='top'>
                    <IconButton className={classes.sideIcon}
                      onClick={this.handleAllReset}
                    >
                      <Reset />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>)) ||
            (this.state.index === 2 &&
              (
                <React.Fragment>
                  <Tooltip title={'重置已選取抵免單'} placement='top'>
                    <IconButton className={classes.sideIcon}
                      onClick={this.handleAllReset}
                    >
                      <Reset />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>)) ||
            (this.state.index === 3 && (
              <React.Fragment>
                <Tooltip title={'重置已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon}
                    onClick={this.handleAllReset}
                  >
                    <Reset />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip> */}
              </React.Fragment>)) ||
            (this.state.index === 4 && (
              <React.Fragment>
                <Tooltip title={'重置已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon}
                    onClick={this.handleAllReset}
                  >
                    <Reset />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip> */}
              </React.Fragment>)) ||
            (this.state.index === 5 && (
              <React.Fragment>
                <Tooltip title={'重置已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon}
                    onClick={this.handleAllReset}
                  >
                    <Reset />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title={'刪除已選取抵免單'} placement='top'>
                  <IconButton className={classes.sideIcon} style={{cursor: 'not-allowed'}}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip> */}
              </React.Fragment>)) || (this.state.index === 6 && "")
              )
            }
          <div className={classes.sideIcon2}>
            {/* <Tooltip title={this.state.isRecord ? '取消選取' : '選取曾有過抵免紀錄的抵免單'} placement='top'>
                <IconButton
                  onClick={() => this.setState({selectAll: false, select: [], isRecord: !this.state.isRecord})}
                  color={(this.state.isRecord) ? 'primary' : 'default'}
                >
                  <FilterIcon />
                </IconButton>
              </Tooltip> */}
            {
                typeName.map((e, i) =>
                  <Tooltip title={e[0]} key={i} placement='top'>
                    <div
                      onClick={() => this.handleSwitch(i)}
                      style={{
                        background: (this.state.type.includes(i)) ? e[1] : '#ccc',
                        display: 'inline-block',
                        width: 22,
                        height: 22,
                        marginLeft: 8,
                        marginTop: 11,
                        color: '#f5f5f5',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >{e[2]}</div>
                  </Tooltip>
                )
              }
            <Button size='small' onClick={(e) => this.setState({anchorEl: e.currentTarget})}>
              <CloudDownloadIcon />
            </Button>
            <Popover
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={() => this.setState({anchorEl: null})}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              >
              <CSVLink
                filename={'本系必修課程抵免.csv'}
                data={this.downCSV(0)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '修課資料|課程名稱', key: 'nameA' },
                    { label: '修課資料|開課系所', key: 'department' },
                    { label: '修課資料|學分數', key: 'creditA' },
                    { label: '抵免科目資料|永久課號', key: 'codeB' },
                    { label: '抵免科目資料|課程名稱', key: 'nameB' },
                    { label: '申請學年度', key: 'year' },
                    { label: '申請學期', key: 'semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    本系必修課程抵免
                    </MenuItem>
              </CSVLink>
              <CSVLink
                filename={'英授專業課程抵免.csv'}
                data={this.downCSV(1)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '永久課號', key: 'codeA' },
                    { label: '課程名稱', key: 'nameA' },
                    { label: '開課系所', key: 'department' },
                    { label: '授課老師', key: 'teacher' },
                    { label: '申請學年度', key: 'year' },
                    { label: '申請學期', key: 'semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    英授專業課程抵免
                    </MenuItem>
              </CSVLink>
              <CSVLink
                filename={'學分抵免.csv'}
                data={this.downCSV(2)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '修課資料|科目名稱', key: 'nameA' },
                    { label: '修課資料|開課系所', key: 'department' },
                    { label: '修課資料|學分數', key: 'creditA' },
                    { label: '抵免科目資料|永久課號', key: 'codeB' },
                    { label: '抵免科目資料|科目名稱', key: 'nameB' },
                    { label: '抵免科目資料|學分', key: 'creditB' },
                    { label: '抵免科目資料|選別', key: 'typeB' },
                    { label: '申請學年度', key: 'year' },
                    { label: '申請學期', key: 'semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    學分抵免
                    </MenuItem>
              </CSVLink>
              <CSVLink
                filename={'課程免修.csv'}
                data={this.downCSV(3)} headers={[
                    { label: '抵免申請項目', key: 'type' },
                    { label: '學號', key: 'sid' },
                    { label: '申請者', key: 'name' },
                    { label: '系所/年級/班別', key: 'info' },
                    { label: '修課資料|科目名稱', key: 'nameA' },
                    { label: '修課資料|開課系所', key: 'department' },
                    { label: '修課資料|學分數', key: 'creditA' },
                    { label: '抵免科目資料|永久課號', key: 'codeB' },
                    { label: '抵免科目資料|科目名稱', key: 'nameB' },
                    { label: '抵免科目資料|學分', key: 'creditB' },
                    { label: '抵免科目資料|選別', key: 'typeB' },
                    { label: '申請學年度', key: 'year' },
                    { label: '申請學期', key: 'semester' },
                    { label: '申請狀態', key: 'status' }]}>
                <MenuItem >
                    課程免修
                    </MenuItem>
              </CSVLink>
            </Popover>
          </div>
        </div>

        <div className={classes.Panels}>
          {
            this.state.fetching
            ? (<MuiThemeProvider theme={theme}>
              <CircularProgress className={classes.loading} color={this.state.isOld? 'secondary':'primary'}/>
            </MuiThemeProvider>)
            : 
            (Data.filter(apply => (type[this.state.index].includes(apply.status)) && (this.state.type.includes(apply.type))).length > 0
              ? Data.filter(
                  apply => type[this.state.index].includes(apply.status) && (this.state.type.includes(apply.type))
                )
                .map(
                  (apply, index) => (
                    <ExpansionPanel key={index} defaultExpanded className={this.state.select.includes(apply.id) ? classes.selected : ''}>

                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <span className={classes.subtitle}>

                          <span className={classes.action}>
                            <svg height='22' width='22' style={{verticalAlign: 'text-top'}} onClick={(e) => this.handleSelect(e, apply.id)}>
                              <Tooltip title={this.state.select.includes(apply.id) ? `點擊已取消勾選` : `點擊以選取此抵免單`} placement='top'>
                                <circle cx='11' cy='11' r='11' fill={this.state.select.includes(apply.id) ? '#3f51b5' : '#ccc'} />
                              </Tooltip>
                            </svg>
                          </span>
                          {/* {`${apply.year}${semester[apply.semester - 1]}`} */}
                          <div
                            style={{
                              background: typeName[apply.type][1],
                              display: 'inline-block',
                              width: 22,
                              height: 22,
                              marginLeft: 8,
                              marginTop: 11,
                              color: '#f5f5f5',
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}
                          >{typeName[apply.type][2]}</div>
                          <span>
                            <Tooltip title={
                              <React.Fragment>
                                {
                                  <div>開課學校:&nbsp;{apply.school}</div>}
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
                              apply.type !== 1 &&
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
                          {apply.previous && 
                          <Chip
                            style={{background: '#e26e6e', color: '#fff', fontSize: 14, fontWeight: 400}}
                            label={<span onClick={(e) => e.stopPropagation()}>重送的抵免單</span>} />}
                          {apply.status === 5 && <Chip
                            style={{background: '#dc3545', color: '#fff', fontSize: 14, fontWeight: 400, marginLeft: 5}}
                            label={
                              <span onClick={(e) => e.stopPropagation()}>特殊案例需交由原授課教授審核</span>
                            } />}
                        </span>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Table>
                          <TableBody >
                            <TableRow className={classes.header}>
                              <TableCell className={classes.font3}>學號</TableCell>
                              <TableCell className={classes.font3}>姓名</TableCell>
                              <TableCell className={classes.font3}>電話</TableCell>
                              <TableCell className={classes.font3}>班別</TableCell>
                              {/* {apply.type !== 3 &&<TableCell className={classes.font3}>預抵免課程</TableCell>} */}

                            </TableRow>
                            <TableRow >
                              <TableCell className={classes.font}>{apply.sid}</TableCell>
                              <TableCell className={classes.font}>{apply.name}</TableCell>
                              <TableCell className={classes.font}>{apply.phone}</TableCell>
                              <TableCell className={classes.font}>{apply.info}</TableCell>
                              {/* {apply.type !== 3 && <TableCell className={classes.font}>{`${apply.nameB}(${apply.codeB})`}</TableCell>} */}

                            </TableRow>
                            <TableRow className={classes.header}>
                              <TableCell className={classes.font3}>已(欲)修習課程</TableCell>
                              <TableCell className={classes.font3}>開課系所</TableCell>
                              <TableCell className={classes.font3}>成績</TableCell>
                              <TableCell className={classes.font3}>課程綱要</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.font}>{`${apply.year}-${apply.semester} ${apply.nameA}${apply.type !== 3 ? ` (${apply.codeA})` : ''}`}</TableCell>
                              <TableCell className={classes.font}>{apply.department}</TableCell>
                              <TableCell className={classes.font}>{(apply.type === 0 || apply.type === 1) ? <span style={{color: '#888'}}><i>此抵免不需要成績</i></span> : apply.score}</TableCell>
                              <TableCell className={classes.font6} ><a target='_blank' rel='noopener noreferrer' href={apply.file}>課程綱要下載</a></TableCell>
                            </TableRow>
                            <TableRow className={classes.header}>
                              <TableCell className={classes.font3}>申請日期</TableCell>

                              <TableCell className={classes.font3} colSpan={3}>申請原因</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.font} >{apply.date.split(' ')[0].split('-').join('/')}</TableCell>
                              <TableCell className={classes.font} colSpan={3} >
                                {apply.type === 0 && <Chip style={{ verticalAlign: 'inherit'}} avatar={
                                  <Avatar>
                                    <TIcon />
                                  </Avatar>
                            }label={apply.reason_type} />
                             }
                                {apply.reason}
                              </TableCell>
                            </TableRow>
                            {
                              ((apply.status === 6) || (apply.status === 0 && apply.reject_reason !== null)) && (
                              <TableRow>
                                <TableCell className={classes.font3} >退回原因</TableCell>
                                <TableCell className={classes.font} colSpan={3} >{(apply.reject_reason === '' || apply.reject_reason === undefined) ? '-' : apply.reject_reason}</TableCell>
                              </TableRow>
                            )
                            }

                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
                      <div style={{ position: 'relative', top: -20, fontSize: '30px', fontWeight: 'bold' }} >
                        <OpenInNew style={{
                          fontSize: '20px',
                          marginLeft: '20px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          verticalAlign: 'middle'}}
                          onClick={() => window.open(`/assistants/head/c/${apply.sid}/${creditName[apply.type]}/${apply.date}`)}
                        />
                      </div>
                      {/* <ExpansionPanelActions>
                        {this.state.index === 0 && (
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
                        {this.state.index === 3 && (
                          <React.Fragment>
                            <Button onClick={() => this.handleReset(apply.id)}>
                              <span className={classes.font3}>重置</span>
                            </Button>
                            <Button style={{cursor: 'not-allowed'}}>
                              <span className={classes.font4}>刪除</span>
                            </Button>
                          </React.Fragment>
                        )}
                      </ExpansionPanelActions> */}
                    </ExpansionPanel>
                  )
                )
              : <div>目前尚無資料</div>)
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
          action={
            <IconButton
              color='inherit'
              onClick={this.snackbarClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(Verify)
