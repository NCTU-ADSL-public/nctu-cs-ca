import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  //ExpansionPanelActions,
  Button,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Input,
  CircularProgress 
} from '@material-ui/core'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
import ApplyIcon from '@material-ui/icons/Assignment'
// import AlarmIcon from '@material-ui/icons/Alarm'
import OKIcon from '@material-ui/icons/Done'
// import WaitIcon from '@material-ui/icons/AccessTime'
// import FaceIcon from '@material-ui/icons/Face'
import TrashIcon from '@material-ui/icons/Delete'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'
import ReturnIcon from '@material-ui/icons/Replay'
// import SwitchIcon from '@material-ui/icons/Flag'
import Check from '@material-ui/icons/CheckBox'
// import Send from '@material-ui/icons/Send'
// import Reset from '@material-ui/icons/Restore'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import FakeData from '../../../Resources/FakeData'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Arrow from '../../../Components/Arrow'


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
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    "&:not(:first-child)":{
      borderLeft: 'white solid 1px'
    }
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
    fontSize: 15,
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
    left: 'calc(100vw - 220px)'
  },
  Panels: {
    width: 'calc(100vw - 80px)',
    position: 'absolute',
    top: 110,
    left: 60,
    paddingBottom: 50
  },
  selected: {
    backgroundColor: '#b2e4a57d'
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
  },
  header:{
    backgroundColor: 'rgba(143, 195, 131, 0.23)',
    padding: '2px  0'
  },
  loading:{
    position: 'relative',
    left: '45%'
  }
})

const type = [[1,5], [1], [5],[2],[6], [3, 4]]
const typeName = [['本系必修課程抵免','#8ed875','必'],['英授專業課程抵免','#3498DB','英'],['學分抵免','#2C3E50','抵'],['課程免修','#E74C3C','免']]
class Verify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
// for test
      // formList: FakeData.FormList.map((e,i)=>({...e,id:i})),
// end for test
      formList:[],
      open: false,
      message: 0,
      index: 0,
      select: [],
      selectAll: false,
      type: [0,1,2,3],
      return: '',
      fetching: true
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.snackbarOpen = this.snackbarOpen.bind(this)
    this.snackbarClose = this.snackbarClose.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleReason = this.handleReason.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
  }
  componentDidMount () {
    // get all verify items
    axios.get('/professors/offsetApply/formList').then(res => {
      this.setState({formList: res.data.map((e, i) => ({...e, id: i})), fetching: false})
    }).catch(err => {
      console.log(err)
    })
  }

  handleSelect (e, id) {
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
  handleOk () {
    let updatedList = this.state.formList
    axios.post('/professors/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null
          })
        }
      ),
      status: 2,
    }).then(res => {
      if(res.data.signal === 1){
        this.state.select.map(
          e => updatedList[e].status = 2
        )
        this.setState({formList: updatedList, open: true, message: 0,select: []})
      }
      else{
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleWithdraw () {
    let updatedList = this.state.formList
    axios.post('/professors/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: null
          })
        }
      ),
      status: 4
    }).then(res => {
      if(res.data.signal === 1){
        this.state.select.map(
          e => updatedList[e].status = 4
        )
        this.setState({formList: updatedList, open: true, message: 0,select: []})
      }
      else{
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  
  handleReturn(){
    let updatedList = this.state.formList
    axios.post('/professors/offsetApply/setAgree', {
      courses: this.state.select.map(
        e => {
          updatedList[e].status = 0
          return ({
            sid: this.state.formList[e].sid,
            timestamp: this.state.formList[e].date,
            reason: this.state.return
          })
        }
      ),
      status: 0
    }).then(res => {
      if(res.data.signal === 1){
        this.state.select.map(
          e => updatedList[e].status = 0
        )
        this.setState({formList: updatedList, open: true, message: 0, return: '',select: []})
      }
      else{
        this.setState({open: true, message: 1})
      }
    }).catch(err => {
      this.setState({open: true, message: 1})
    })
  }
  handleSwitch(i){
    if(this.state.type.length === 4){
      let tmp = []
      tmp.push(i)
      this.setState({selectAll: false, select: [],type: tmp})
    }
    else if(this.state.type.includes(i)){
      if(this.state.type.length === 1){
        this.setState({selectAll: false, select: [],type: [0,1,2,3]})
      }
      else{
        let tmp = this.state.type
        tmp = tmp.filter(e => e!==i)
        this.setState({selectAll: false, select: [],type: tmp})
      } 
    }
    else{
      let tmp = this.state.type
      tmp.push(i)
      this.setState({selectAll: false, select: [],type: tmp})
    }
  }
  handleReason(e){
    this.setState({return: e.target.value})
  }
  selectAll () {
    let updatedArray = this.state.select
    if (!this.state.selectAll) {
      updatedArray = this.state.formList.filter(e => (type[this.state.index].includes(e.status) && this.state.type.includes(e.type)) ).map(e => e.id)
      this.setState({select: updatedArray, selectAll: true})
    } else {
      this.setState({select: [], selectAll: false, transferTo:''})
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
    // const semester = ['上', '下', '暑']
    return (
      <div className={classes.root}>
        {/* <span className={classes.state}>{`目前顯示：${['申請中', '等待主任同意', '等待授課老師同意', '已同意'][this.state.index]}的${typeName[this.state.type][0]}抵免單`}</span> */}
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
              color={(this.state.index === 0) ? 'primary' : 'default'}
            >
              <ApplyIcon />
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
              placeholder="退回原因"
              value = {this.state.return}
              onChange = {this.handleReason}
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
            </React.Fragment>))
              )
            }
            <div className={classes.sideIcon2}>
              {
                typeName.map((e,i)=>
                  <Tooltip title={e[0]} key={i} placement='top'>
                    <div
                    onClick={()=>this.handleSwitch(i)}
                    style= {{
                      background: (this.state.type.includes(i))? e[1]:'#ccc',
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
            </div>
          </div>

        <div className={classes.Panels}>
          {
            this.state.fetching ?
            (<MuiThemeProvider theme={theme}>
              <CircularProgress className={classes.loading}/>
            </MuiThemeProvider>)
            : (this.state.formList.filter(apply => (type[this.state.index].includes(apply.status)) && (this.state.type.includes(apply.type))).length > 0
              ? this.state.formList
                .filter(
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
                            style= {{
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
                              apply.type !== 1  &&
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
                          {/* {apply.status === 5 && <Chip
                            style={{background: '#dc3545', color: '#fff', fontSize: 14, fontWeight: 400, marginLeft: 5}}
                            label={
                              <span onClick={(e) => e.stopPropagation()}>特殊案例需交由原授課教授審核</span>
                            } />} */}
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
                              {/* {apply.type !== 3 &&<TableCell className={classes.font3}>預抵免課程</TableCell>}
                              */}
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
                              <TableCell className={classes.font}>{`${apply.nameA}(${apply.codeA})`}</TableCell>
                              <TableCell className={classes.font}>{apply.department}</TableCell>
                              <TableCell className={classes.font}>{(apply.type === 0 || apply.type === 1) ? <span style={{color: '#888'}}><i>此抵免不需要成績</i></span>: apply.score}</TableCell>
                              <TableCell className={classes.font6} ><a target='_blank' rel='noopener noreferrer' href={apply.file}>課程綱要下載</a></TableCell>
                            </TableRow>
                            <TableRow className={classes.header}>
                              <TableCell className={classes.font3}>申請日期</TableCell>
                              
                              <TableCell className={classes.font3} colSpan={3}>申請原因</TableCell>    
                            </TableRow>
                            <TableRow>
                            <TableCell className={classes.font} >{apply.date.split(' ')[0].split('-').join('/')}</TableCell>
                            <TableCell className={classes.font} colSpan={3} >{apply.reason}</TableCell>
                            </TableRow>
                            {
                              (apply.status === 6) && (
                            <TableRow>
                            <TableCell className={classes.font3} >退回原因</TableCell>
                            <TableCell className={classes.font} colSpan={3} >{(apply.reject_reason === '' || apply.reject_reason === undefined) ? '-':apply.reject_reason}</TableCell>
                            </TableRow>
                            )
                            }
                            
                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
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
