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
  Chip
} from '@material-ui/core'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
import ApplyIcon from '@material-ui/icons/Assignment'
import OKIcon from '@material-ui/icons/Done'
import WaitIcon from '@material-ui/icons/AccessTime'
import TrashIcon from '@material-ui/icons/Delete'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'
import Check from '@material-ui/icons/CheckBox'
import Send from '@material-ui/icons/Send'
import Reset from '@material-ui/icons/Restore'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FakeData from '../../../Resources/FakeData'

const styles = ()=>({
  root: {
    margin: '100px auto',
    marginBottom: 50,
    width: '90%'
  },
  subtitle:{
    fontSize: '1.2em',
  },
  progress:{
    margin: '0 10px'
  },
  btn:{
    fontSize:15,
    minWidth:150,
    textAlign:'center'
  },
  input : {
    fontSize: 17
  },
  font:{
    fontSize:16,
    fontWeight:400,
    textAlign: 'center'
  },
  font2:{
    fontSize:14,
    fontWeight:400,
    textAlign: 'center'
  },
  font3:{
    color: '#777',
    fontSize:14,
    fontWeight:400,
    textAlign: 'center'
  },
  font4:{
    color: '#f44336',
    fontSize:14,
    fontWeight:400,
    textAlign: 'center'
  },
  to:{
    display: 'inline-block',
    width:100,
    height:10,
    backgroundColor:'#eee'
  },
  action:{
    position:'relative',
    right:10
  },
  side:{
    position: 'fixed',
    top:110,
    left: 5,
    width: 50
  },
  sideIcon:{
  },
  Panels:{
    width: 'calc(100vw - 80px)',
    position: 'absolute',
    top:110,
    left: 60,
    paddingBottom: 50
  },
  selected:{
    backgroundColor: '#c2dbff'
  },
  options:{
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 0,
    marginLeft: 58,
    paddingTop: 60,
    left: 0,
    position: 'fixed',
    //borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  }
})

const Arrow = ()=>(
<svg height="8" width="130">
  <circle cx="2" cy="4" r="2" fill="rgb(200,200,200)"/>
  <circle cx="8" cy="4" r="2" fill="rgb(195,195,195)"/>
  <circle cx="14" cy="4" r="2" fill="rgb(190,190,190)"/>
  <circle cx="20" cy="4" r="2" fill="rgb(185,185,185)"/>
  <circle cx="26" cy="4" r="2" fill="rgb(180,180,180)"/>
  <circle cx="32" cy="4" r="2" fill="rgb(175,175,175)"/>
  <circle cx="38" cy="4" r="2" fill="rgb(170,170,170)"/>
  <circle cx="44" cy="4" r="2" fill="rgb(165,165,165)"/>
  <circle cx="50" cy="4" r="2" fill="rgb(160,160,160)"/>
  <circle cx="56" cy="4" r="2" fill="rgb(155,155,155)"/>
  <circle cx="62" cy="4" r="2" fill="rgb(150,150,150)"/>
  <circle cx="68" cy="4" r="2" fill="rgb(145,145,145)"/>
  <circle cx="74" cy="4" r="2" fill="rgb(140,140,140)"/>
  <circle cx="80" cy="4" r="2" fill="rgb(135,135,135)"/>
  <circle cx="86" cy="4" r="2" fill="rgb(130,130,130)"/>
  <circle cx="92" cy="4" r="2" fill="rgb(125,125,125)"/>
  <circle cx="98" cy="4" r="2" fill="rgb(120,120,120)"/>
  <circle cx="104" cy="4" r="2" fill="rgb(115,115,115)"/>
  <circle cx="110" cy="4" r="2" fill="rgb(110,110,110)"/>
  <circle cx="116" cy="4" r="2" fill="rgb(105,105,105)"/>
  <polygon points="121,0 121,8 129,4" style={{fill:'rgb(100,100,100)'}}/>
</svg> 
)

class Verify extends React.Component{
  constructor(props){
    super(props)
    this.state = {
// for test 
// formList: FakeData.FormList.map((e,i)=>({...e,id:i})),
      formList:[],
      open: false,
      message: 0,
      index: 0,
      select:[],
      selectAll: false
    }
    this.handleAgree = this.handleAgree.bind(this)
    this.handleDisagree = this.handleDisagree.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)
    this.handleAllReset = this.handleAllReset.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.snackbarOpen = this.snackbarOpen.bind(this)
    this.snackbarClose = this.snackbarClose.bind(this)
  }
  componentDidMount(){
    axios.get('/assistants/ShowUserOffsetApplyForm').then(res =>{
      this.setState({formList: res.data.map((e,i)=>({...e,id:i}))})
    }).catch(err => {
      console.log(err)
    })
  }
  handleAgree(id){
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 1
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid,nameA,codeA} = this.state.formList[id]
    axios.post('/assistants/AddToOffset', {
      sid: sid,
      cosname: nameA,
      coscode: codeA,
      status: 1
    }).then(res => {
      updatedList[id].status = 1
      this.setState({formList:updatedList,open:true,message:0})
    }).catch(err => {
      this.setState({open:true,message:1})
    })
  }
  handleDisagree(id){
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 2
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {year,semester,sid,nameA,codeA} = this.state.formList[id]
    console.log(year,semester)
    axios.post('/assistants/AddToOffset', {
      sid: sid,
      cosname: nameA,
      coscode: codeA,
      status: 3
    }).then(res => {
      updatedList[id].status = 3
      this.setState({formList:updatedList,open:true,message:0})
    }).catch(err => {
      this.setState({open:true,message:1})
    })
  }
  handleReset(id){
    // let updatedList = this.state.formList
    // updatedList[id].agreeByA = 0
    // this.setState({formList:updatedList})
    let updatedList = this.state.formList
    let {sid,nameA,codeA} = this.state.formList[id]
    axios.post('/assistants/AddToOffset', {
      sid: sid,
      cosname: nameA,
      coscode: codeA,
      status: 0
    }).then(res => {
      updatedList[id].status = 0
      this.setState({formList:updatedList,open:true,message:0})
    }).catch(err => {
      this.setState({open:true,message:1})
    })
  }
  handleSelect(e,id){
    let updatedArray = this.state.select
    if(this.state.select.includes(id)){
      updatedArray = updatedArray.filter(e => e !== id)
      this.setState({select: updatedArray,selectAll:false})
    }
    else{
      updatedArray.push(id)
      let isAll = this.state.formList.filter(e => e.status === this.state.index).every(e => this.state.select.includes(e.id))
      console.log(isAll)
      this.setState({
        select: updatedArray,
        selectAll: isAll
      })
    }
    e.stopPropagation()
  }
  handleWithdraw(){
    this.state.select.forEach(
      e=>this.handleDisagree(e)
    )
  }
  handleSend(){
    this.state.select.forEach(
      e => this.handleAgree(e)
    )
  }
  handleAllReset(){
    this.state.select.forEach(
      e=>this.handleReset(e)
    )
  }
  selectAll(){
    let updatedArray  = this.state.select
    if(!this.state.selectAll){
      updatedArray = this.state.formList.filter(e => e.status === this.state.index).map(e => e.id)
      this.setState({select: updatedArray,selectAll:true})
    }
    else{
      this.setState({select: [],selectAll:false})
    }
  }
  snackbarOpen(){
    this.setState({open:true})
  }
  snackbarClose(){
    this.setState({open:false})
  }
  render(){
    const {classes} = this.props
    const semester = ['上','下','暑']
    return(
      <div className={classes.root}>
        <div className={classes.side}>
          {/* { this.state.formList.filter(e => e.status===0).length > 0 && */}
          <Tooltip title={'申請中'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={()=>this.setState({
                index:0,select:[],
                selectAll:this.state.formList.filter(e => e.status === 0).every(e => this.state.select.includes(e.id)) && this.state.formList.filter(e => e.status === 0).length > 0
              })}
              color={(this.state.index === 0)?'primary':'default'}
            >
              <ApplyIcon/>
            </IconButton>
          </Tooltip>
          {/* this.state.formList.filter(e => e.status===1).length > 0 && */}
          <Tooltip title={'等待主任同意'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={()=>this.setState({
                index:1,
                select:[],
                selectAll:this.state.formList.filter(e => e.status === 1).every(e => this.state.select.includes(e.id))  && this.state.formList.filter(e => e.status === 1).length > 0
              })}
              color={(this.state.index === 1)?'primary':'default'}
            >
              <WaitIcon/>
            </IconButton>
          </Tooltip>
          {/* { this.state.formList.filter(e => e.status===2).length > 0 && */}
          <Tooltip title={'成功抵免'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={()=>this.setState({
                index:2,
                select:[],
                selectAll:this.state.formList.filter(e => e.status === 2).every(e => this.state.select.includes(e.id))  && this.state.formList.filter(e => e.status === 2).length > 0
                })}
              color={(this.state.index === 2)?'primary':'default'}
            >
              <OKIcon/>
            </IconButton>
          </Tooltip>
          {/* { this.state.formList.filter(e => e.status===3).length > 0 && */}
          <Tooltip title={'已退回'} placement='right'>
            <IconButton className={classes.sideIcon}
              onClick={()=>this.setState({
                index:3,
                select:[],
                selectAll:this.state.formList.filter(e => e.status === 3).every(e => this.state.select.includes(e.id))  && this.state.formList.filter(e => e.status === 3).length > 0
                })}
              color={(this.state.index === 3)?'primary':'default'}
            >
              <TrashIcon/>
            </IconButton>
          </Tooltip>
        </div>
        {
        [0,1,3].includes(this.state.index) &&
        <div className={classes.options}>
          <Tooltip title={this.state.selectAll ? '取消全選':'全選'} placement='top'>
            <IconButton className={classes.sideIcon}
              onClick={this.selectAll}
            >
              {this.state.selectAll?<Check/>:<CheckNone/>}
            </IconButton>
          </Tooltip>
          
          {(this.state.select.length !== 0 || this.state.selectAll === true) && (
            this.state.index === 0 &&
            (<React.Fragment>
              <Tooltip title={'退回已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                onClick={this.handleWithdraw}
                >
                  <TrashIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title={'送出已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                onClick={this.handleSend}
                >
                  <Send/>
                </IconButton>
              </Tooltip>
            </React.Fragment>)
            || this.state.index === 1 && 
              (
              <React.Fragment>
              <Tooltip title={'重置已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                onClick={this.handleAllReset}
                >
                  <Reset/>
                </IconButton>
              </Tooltip>
            </React.Fragment>)
            || this.state.index === 3 &&(
              <React.Fragment>
              <Tooltip title={'重置已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon}
                onClick={this.handleAllReset}
                >
                  <Reset/>
                </IconButton>
              </Tooltip>
              <Tooltip title={'刪除已選取抵免單'} placement='top'>
                <IconButton className={classes.sideIcon} style={{cursor:'not-allowed'}}
                >
                  <TrashIcon/>
                </IconButton>
              </Tooltip>
            </React.Fragment>)
          )}
        </div>
        }
        <div className={classes.Panels}>
        {
          this.state.formList.filter(apply => apply.status === this.state.index).length > 0 ?
          this.state.formList
          .filter(
            apply => apply.status === this.state.index
          )
          .map(
            (apply,index)=>(
                <ExpansionPanel key={index} defaultExpanded className={this.state.select.includes(apply.id) ? classes.selected: ''}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={classes.subtitle}>
                      {[0,1,3].includes(this.state.index) && 
                      (<span className={classes.action}>
                        <svg height="22" width="22" style={{verticalAlign:'text-top'}} onClick={(e)=>this.handleSelect(e,apply.id)}>
                          <Tooltip title={this.state.select.includes(apply.id)?`點擊已取消勾選`:`點擊以選取此抵免單`} placement='top'>
                            <circle cx="11" cy="11" r="11" fill={this.state.select.includes(apply.id) ? '#3f51b5':'#ccc'} /> 
                          </Tooltip>
                        </svg> 
                      </span>)}
                      {`${apply.year}${semester[apply.semester-1]}`}
                      <span>
                      <Tooltip title={
                        <React.Fragment>
                          <div>開課系所:&nbsp;{apply.department}</div>
                          <div>永久課號:&nbsp;{apply.codeA}</div>
                          <div>學分:&nbsp;{apply.creditA}</div>
                        </React.Fragment>
                      } placement='top'>
                        <Button color="primary" onClick={(e)=>e.stopPropagation()} className={classes.btn}>
                          {apply.nameA}
                        </Button>
                      </Tooltip>
                      <span className={classes.progress}><Arrow/></span>
                      <Tooltip title={
                        <React.Fragment>
                          <div>永久課號:&nbsp;{apply.codeB}</div>
                          <div>學分:&nbsp;{apply.creditB}</div>
                        </React.Fragment>
                      } placement='top'>
                        <Button color="primary" onClick={(e)=>e.stopPropagation()}className={classes.btn}>
                          {apply.nameB}
                        </Button>
                      </Tooltip>
                      </span>   
                      <Chip 
                      style={apply.previous ? {background:'#28a745',color:'#fff',fontSize: 14,fontWeight: 400}
                      :{background:'#6c757d',color:'#fff',fontSize: 14,fontWeight: 400}}
                      label={ 
                        apply.previous ? 
                        <span onClick={(e)=>e.stopPropagation()}>以前已同意過此抵免規則</span>
                        :<span onClick={(e)=>e.stopPropagation()}>以前未有過此抵免規則</span>
                      }/>
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
                          <TableCell className={classes.font}>預抵免課程</TableCell>
                          <TableCell className={classes.font}>申請原因</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        <TableRow>
                          <TableCell className={classes.font}>{apply.sid}</TableCell>
                          <TableCell className={classes.font}>{apply.name}</TableCell>
                          <TableCell className={classes.font}>{apply.phone}</TableCell>
                          <TableCell className={classes.font}>{`${apply.nameA}(${apply.codeA})`}</TableCell>
                          <TableCell className={classes.font}>{apply.department}</TableCell>
                          <TableCell className={classes.font}>{`${apply.nameB}(${apply.codeB})`}</TableCell>
                          <TableCell className={classes.font}>{apply.reason}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                  <ExpansionPanelActions>
                  {this.state.index === 0 && (
                    <React.Fragment>
                      <Button onClick={()=>this.handleDisagree(apply.id)}>
                        <span className={classes.font2}>不同意</span>
                      </Button>
                      <Button color="primary" onClick={()=>this.handleAgree(apply.id)}>
                        <span className={classes.font2}>同意抵免</span>
                      </Button>
                    </React.Fragment>
                    )}
                    {this.state.index === 2 && (
                      <React.Fragment>
                        <Button onClick={()=>this.handleReset(apply.id)}>
                          <span className={classes.font2}>重置</span>
                        </Button>
                      </React.Fragment>
                    )}
                    {this.state.index === 3 && (
                    <React.Fragment>
                    <Button onClick={()=>this.handleReset(apply.id)}>
                      <span className={classes.font3}>重置</span>
                    </Button>
                    <Button style={{cursor:'not-allowed'}}>
                      <span className={classes.font4}>刪除</span>
                    </Button>
                    </React.Fragment>
                    )}
                  </ExpansionPanelActions>
                </ExpansionPanel>
            )
          ):
          <div>目前尚無資料</div>
        }
        </div>
        {/* snackBar */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.snackbarClose}
          message={<span className={classes.font2}>{['修改成功！','傳送失敗，請再次嘗試'][this.state.message]}</span>}
          action={[
            <IconButton
            color="inherit"
              onClick={this.snackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Verify)