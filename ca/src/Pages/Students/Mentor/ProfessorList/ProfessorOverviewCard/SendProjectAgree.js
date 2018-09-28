import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Face from '@material-ui/icons/Face'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import MemberIcon from '@material-ui/icons/Accessibility'
import EmailIcon from '@material-ui/icons/Email'
import TocIcon from '@material-ui/icons/Toc'
import Snackbar from '@material-ui/core/Snackbar'
import InputAdornment from '@material-ui/core/InputAdornment'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Grow from '@material-ui/core/Grow'
import axios from 'axios/index'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import { connect } from 'react-redux'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

const limitcount = 7

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginBottom: '10px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  tooltip: {
    fontSize: '12px'
  },
  flex: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#01579B',
    color: '#FFF'
  }
})

class SendProjectAgree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      opensnackbar: false,
      msg: '',
      menberNumber: [1],
      expanded: null,
      projectNumber: '',
      title: '',
      input: [{id: this.props.studentIdcard.student_id + '（自己）', phone: '', email: ''}]
    }
    this.handleaddmenber = this.handleaddmenber.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpenSnackbar = this.handleClickOpenSnackbar.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    this.handleremovemenber = this.handleremovemenber.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handlepanelChange = this.handlepanelChange.bind(this)
    this.handleinputChange = this.handleinputChange.bind(this)
    this.getString = this.getString.bind(this)
  }


  handleSend () {
    let _this = this
    let phones = []
    let emails = []
    let participants = []

    if(this.state.title === ''){
      alert('請填寫研究主題')
      return
    }

    for(let i=0 ; i<this.state.input.length; ++i){
      if(this.state.input[i].id === ''){
        alert('請填寫完整資訊')
        return
      }
      else if(this.state.input[i].phone === ''){
        alert('請填寫完整資訊')
        return
      }
      else if(this.state.input[i].email === ''){
        alert('請填寫完整資訊')
        return
      }
      if(i===0)
        participants.push(this.props.studentIdcard.student_id)
      else
        participants.push(this.state.input[i].id)
      phones.push(this.state.input[i].phone)
      emails.push(this.state.input[i].email)
    }


    let stateString = []
    axios.post('/students/project/ShowStudentResearchStatus', {
      participants:participants
    })
      .then(res => {
        for(let i = 0; i<res.data.length; i++){
          if(res.data[i].status !== '1' && res.data[i].status !== '2' && res.data[i].status !== '3'){
            alert(res.data[i].student_id + " 因 " + this.getString(res.data[i].status) + " 申請失敗")
            return
          }
          if(res.data[i].status === '2'){
            let r = window.confirm('注意!如果您確定送出表單且教授也同意了，' + res.data[i].student_id + '同學將會修改專題二（意同於更改專題）請按確定以繼續')
            if(!r)return
          }

          stateString.push(res.data[i].status)
        }

        let r = window.confirm('注意！如果您確定送出表單且教授也同意了，將代表您加簽 專題（一）課程，確定要送出表單嗎?')
        let Today = new Date()
        let semester = ((Today.getFullYear()-1912)+ Number(((Today.getMonth()+1)>=8?1:0))) + '-' + ((Today.getMonth()+1)>=8?'1':'2')
        if(r){
          axios.post('/students/project_apply', {
            semester:semester,
            student_num:participants.length,
            tname:_this.props.profile.tname,
            teacher_id:_this.props.profile.teacher_id,
            teacher_email:_this.props.profile.email,
            first_second :stateString,
            research_title:_this.state.title,
            participants:participants,
            phones: phones,
            email: emails,
          })
            .then(res => {
              if(res.data.signal === 1){
                alert('申請成功，等候教授回覆')
                _this.handleClose()
              }
              else{
                alert('申請失敗，請重新送出，如有成員中有審核中的專題將不能申請。')
              }
            })
            .catch(err => {
              //window.location.replace("/logout ");
              alert('送出失敗，請檢查連線是否穩定。')
              console.log(err)
            })
        }
      })
      .catch(err => {
        alert('送出失敗，請檢查連線是否穩定。')
        console.log(err)
      })


  }

  handleaddmenber () {
    let newnumber = this.state.menberNumber.length + 1
    if (newnumber > limitcount - this.props.profile.scount) {
      this.handleClickOpenSnackbar('專題成員不能超過該教授上限！')
      return
    }
    this.setState({
      menberNumber: [...this.state.menberNumber, newnumber],
      input: [...this.state.input, {id:'', phone:'', email:''}]
    })
  }

  handleremovemenber () {
    let newnumberarray = [...this.state.menberNumber]
    let newinput = [...this.state.input]
    newnumberarray.splice(newnumberarray.length - 1, 1)
    newinput.splice(newinput.length - 1, 1)
    if (newnumberarray.length < 1) {
      this.handleClickOpenSnackbar('專題成員不能少於一人！')
      return
    }
    this.setState({
      menberNumber: newnumberarray,
      input: newinput
    })
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  handleTitleChange (event) {
    this.setState({ title: event.target.value })
  }

  handleClickOpenSnackbar (msg) {
    this.setState({ opensnackbar: true, msg: msg})
  }

  handleCloseSnackbar () {
    this.setState({ opensnackbar: false })
  }

  handlepanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  handleinputChange (event, str, index) {
    let newinput = [...this.state.input]
    newinput[index][str] = event.target.value
    this.setState({ input: newinput })
  }

  getString (str) {
    if(str === '1'){
      return '專題一'
    }
    if(str === '2'){
      return '專題二'
    }
    if(str === '3'){
      return '基礎程式設計成績待審核'
    }
    if(str === '4'){
      return '重複提交(當學期只能有一個專題/專題申請表)'
    }
    if(str === '5'){
      return '已修過專1專2'
    }
  }

  render () {
    const { expanded } = this.state
    const { input } = this.state
    const { classes, fullScreen } = this.props
    return (
      <div>
        {this.props.rwd
          ? <MenuItem
            disabled={this.props.profile.scount>=limitcount} onClick={this.handleClickOpen}>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText inset primary={`專題申請/專題變更`} />
          </MenuItem>
          : <Tooltip title='寄送專題申請！' placement='top' classes={{tooltip:classes.tooltip}}>
            <IconButton
              onClick={this.handleClickOpen}
              aria-expanded={this.state.expanded}
              aria-label='Show more'
              disabled={this.props.profile.scount>=limitcount}
            >
              <Face />
            </IconButton>
          </Tooltip>
        }
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          fullWidth
          fullScreen={fullScreen}
        >
          <DialogTitle id='alert-dialog-slide-title' disableTypography>
            <AppBar className={classes.appBar} >
            <Toolbar >
              <Typography variant="title" color="inherit" className={classes.flex} style={{fontSize: '15px'}} >
                寄送專題申請
              </Typography>
              <Button style={{fontSize: '12px'}} color="inherit" onClick={this.handleClose} className='pull-right'>
                取消
              </Button>
            </Toolbar>
          </AppBar>
          </DialogTitle>
          <DialogContent className='dialog-content-height' style={{marginTop: '50px'}}>
            <Input
              placeholder='主題(可填寫尚未決定)'
              fullWidth
              value={this.state.title}
              startAdornment={
                <InputAdornment position='start'>
                  <TocIcon />
                </InputAdornment>
              }
              onChange={this.handleTitleChange}
            />
            <div className='hidden-xs' style={{marginTop: '20px'}}>
              {this.state.menberNumber.map(t =>
                <Grow in  key={t}>
                <div className='row'>
                  <div className='col-sm-3 col-md-4 col-lg-4'>
                  <Input
                    placeholder='學號'
                    className='project-member-input'
                    startAdornment={
                      <InputAdornment position='start'>
                        <MemberIcon />
                      </InputAdornment>
                    }
                    disabled={t===1}
                    value={input[t-1].id}
                    onChange={(event)=>this.handleinputChange(event, 'id', t-1)}
                  />
                  </div>
                  <div className='col-sm-3 col-md-4 col-lg-4'>
                  <Input
                    placeholder='電話'
                    className='project-member-input'
                    startAdornment={
                      <InputAdornment position='start'>
                        <PhoneIcon />
                      </InputAdornment>
                    }
                    value={input[t-1].phone}
                    onChange={(event)=>this.handleinputChange(event, 'phone', t-1)}
                  />
                  </div>
                  <div className='col-sm-6 col-md-4 col-lg-4'>
                  <Input
                    placeholder='Email'
                    className='project-member-input'
                    startAdornment={
                      <InputAdornment position='start'>
                        <EmailIcon />
                      </InputAdornment>
                    }
                    value={input[t-1].email}
                    onChange={(event)=>this.handleinputChange(event, 'email', t-1)}
                  />
                  </div>
                </div>
                </Grow>
              )}
            </div>
            <div className='visible-xs ' style={{marginTop: '20px'}}>
              {this.state.menberNumber.map(t =>
                <Grow in>
                <ExpansionPanel  expanded={expanded === `成員 ${t}`} onChange={this.handlepanelChange(`成員 ${t}`)} key={t}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  成員 {t}: {this.state.input[t-1].id}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div >
                    <div className='row'>
                      <Input
                        placeholder='學號'
                        className='project-member-input-rwd'
                        fullWidth
                        disabled={t===1}
                        startAdornment={
                          <InputAdornment position='start'>
                            <MemberIcon />
                          </InputAdornment>
                        }
                        value={input[t-1].id}
                        onChange={(event)=>this.handleinputChange(event, 'id', t-1)}
                      />
                    </div>
                    <div className='row'>
                      <Input
                        placeholder='電話'
                        className='project-member-input-rwd '
                        fullWidth
                        startAdornment={
                          <InputAdornment position='start'>
                            <PhoneIcon />
                          </InputAdornment>
                        }
                        value={input[t-1].phone}
                        onChange={(event)=>this.handleinputChange(event, 'phone', t-1)}
                      />
                    </div>
                    <div className='row'>
                      <Input
                        placeholder='Email'
                        className='project-member-input-rwd'
                        fullWidth
                        startAdornment={
                          <InputAdornment position='start'>
                            <EmailIcon />
                          </InputAdornment>
                        }
                        value={input[t-1].email}
                        onChange={(event)=>this.handleinputChange(event, 'email', t-1)}
                      />
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
                </Grow>)}
            </div>
            <div className='row'>
              <div className='visible-xs visible-sm pull-right'>
                <Button variant='fab' mini color='primary' aria-label='add' style={{margin: '5px'}} onClick={this.handleremovemenber}>
                  <Remove />
                </Button>
                <Button variant='fab' mini color='primary' aria-label='remove' style={{margin: '5px'}} onClick={this.handleaddmenber}>
                  <AddIcon />
                </Button>
              </div>
              <div className='hidden-xs hidden-sm bottom-icon pull-right'>
                <Button variant='fab' mini color='primary' aria-label='add' style={{margin: '5px'}} onClick={this.handleremovemenber}>
                  <Remove />
                </Button>
                <Button variant='fab' mini color='primary' aria-label='remove' style={{margin: '5px'}} onClick={this.handleaddmenber}>
                  <AddIcon />
                </Button>
              </div>
            </div>
            <Snackbar
              open={this.state.opensnackbar}
              onClose={this.handleCloseSnackbar}
              TransitionComponent={TransitionUp}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id='message-id'>{this.state.msg}</span>}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSend} className={classes.appBar} color='primary'>
              送出
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

function TransitionUp (props) {
  return <Slide {...props} direction='up' />
}

const mapStateToProps = (state) => {
  return {
    researchStatus: state.Student.Professor.research_status
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(SendProjectAgree)))
