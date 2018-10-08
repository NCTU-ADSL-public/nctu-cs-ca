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
  Tooltip
} from '@material-ui/core'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'
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
  to:{
    display: 'inline-block',
    width:100,
    height:10,
    backgroundColor:'#eee'
  },
  action:{
    position:'relative',
    right:10
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

const Status = (props)=>{
  const color = ['#ccc','#00bcd4','#f50057']
  const message = ['尚未決定','已同意','不同意']
  return (
    <svg height="16" width="50">
      <Tooltip title={`系主任${message[props.agreeT]}`} placement='top'>
        <circle cx="8" cy="8" r="8" fill={color[props.agreeT]} /> 
      </Tooltip>
      <Tooltip title={`助理${message[props.agreeA]}`} placement='top'>
        <circle cx="36" cy="8" r="8" fill={color[props.agreeA]} /> 
      </Tooltip>
    </svg> 
  )
}

class Verify extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      formList: FakeData.FormList.map((e,i)=>({...e,id:i})),
      open: false,
      message: 0
    }
    this.handleAgree = this.handleAgree.bind(this)
    this.handleDisagree = this.handleDisagree.bind(this)
    this.handleReset = this.handleReset.bind(this)
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
    let {year,semester,sid,nameA,codeA,nameB,codeB,type} = this.state.formList[id]
    axios.post('/assistants/AddToOffset', {
      year: year,
      semester : semester,
      sid: sid,
      nameA: nameA,
      codeA: codeA,
      nameB: nameB,
      codeB: codeB,
      type: type,
      offset_type: 1
    }).then(res => {
      updatedList[id].agreeByA = 1
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
    let {year,semester,sid,nameA,codeA,nameB,codeB,type} = this.state.formList[id]
    console.log(year,semester)
    axios.post('/assistants/AddToOffset', {
      year: year,
      semester : semester,
      sid: sid,
      nameA: nameA,
      codeA: codeA,
      nameB: nameB,
      codeB: codeB,
      type: type,
      offset_type: 2
    }).then(res => {
      updatedList[id].agreeByA = 2
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
    let {year,semester,sid,nameA,codeA,nameB,codeB,type} = this.state.formList[id]
    console.log(year,semester)
    axios.post('/assistants/AddToOffset', {
      year: year,
      semester : semester,
      sid: sid,
      nameA: nameA,
      codeA: codeA,
      nameB: nameB,
      codeB: codeB,
      type: type,
      offset_type: 0
    }).then(res => {
      updatedList[id].agreeByA = 0
      this.setState({formList:updatedList,open:true,message:0})
    }).catch(err => {
      this.setState({open:true,message:1})
    })
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
        {
          this.state.formList.map(
            (apply,index)=>(
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={classes.subtitle}>
                      <span className={classes.action}>
                        <Status agreeT={apply.agreeByT}  agreeA={apply.agreeByA}/>
                      </span>
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
                    <Button onClick={()=>this.handleReset(apply.id)}>
                      <span className={classes.font3}>重置</span>
                    </Button>
                    <Button onClick={()=>this.handleDisagree(apply.id)}>
                      <span className={classes.font2}>不同意</span>
                    </Button>
                    <Button color="primary" onClick={()=>this.handleAgree(apply.id)}>
                      <span className={classes.font2}>同意抵免</span>
                    </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
            )
          )
        }
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