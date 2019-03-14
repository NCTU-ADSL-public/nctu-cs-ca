import React from 'react'
import { connect } from 'react-redux'
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
import Grow from '@material-ui/core/Grow'
import axios from 'axios/index'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { getSemester } from '../../../../../Utilities'

const limitcount = 7

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    marginBottom: '10px',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  tooltip: {
    fontSize: '12px'
  },
  flex: {
    flex: 1
  },
  appBar: {
    backgroundColor: '#01579B',
    color: '#FFF'
  }
})

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

class SendProjectAgree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openDialog: false,
      openSnackbar: false,
      expanded: null,
      msg: '',
      title: '',
      members: [
        {
          id: this.props.studentIdcard.student_id + '（自己）',
          phone: '',
          email: ''
        }
      ],
      memberNumber: [1]
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
    this.handleRemoveMember = this.handleRemoveMember.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handdlePanelChange = this.handdlePanelChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getApplyFailReason = this.getApplyFailReason.bind(this)
  }

  handleDialogOpen () {
    this.setState({ openDialog: true })
  }

  handleDialogClose () {
    this.setState({ openDialog: false })
  }

  handleSnackbarOpen (msg) {
    this.setState({ openSnackbar: true, msg: msg })
  }

  handleSnackbarClose () {
    this.setState({ openSnackbar: false })
  }

  handleSubmit () {
    let _this = this
    let phones = []
    let emails = []
    let participants = []

    if (!this.state.title) {
      window.alert('請填寫研究主題')
      return
    }

    // 把成員資料放進payload的欄位
    this.state.members.forEach((member, index) => {
      if (!member.id || !member.phone || !member.email) {
        window.alert('請填寫完整資訊')
        return
      }
      if (index === 0) { // 是自己
        participants.push(this.props.studentIdcard.student_id)
      } else {
        participants.push(member.id)
      }
      phones.push(member.phone)
      emails.push(member.email)
    })

    let stateString = []
    axios.post('/students/project/ShowStudentResearchStatus', {
      participants: participants
    })
      .then(res => {
        res.data.forEach(data => {
          if (data.status !== '1' && data.status !== '2' && data.status !== '3') {
            window.alert(`${data.student_id} 因 ${this.getApplyFailReason(data.status)} 申請失敗`)
            return
          }
          if (data.status === '2') {
            let r = window.confirm('注意!如果您確定送出表單且教授也同意了，' + data.student_id + '同學將會修改專題二（意同於更改專題）請按確定以繼續')
            if (!r) return
          }

          stateString.push(data.status)
        })

        let r = window.confirm('注意！如果您確定送出表單且教授也同意了，將代表您加簽 專題（一）課程，確定要送出表單嗎?')
        if (r) {
          axios.post('/students/project_apply', {
            semester: getSemester(),
            student_num: participants.length,
            tname: _this.props.profile.tname,
            teacher_id: _this.props.profile.teacher_id,
            teacher_email: _this.props.profile.email,
            first_second: stateString,
            research_title: _this.state.title,
            participants: participants,
            phones: phones,
            email: emails
          })
            .then(res => {
              if (res.data.signal === 1) {
                window.alert('申請成功，等候教授回覆')
                _this.handleClose()
              } else {
                window.alert('申請失敗，請重新送出，如成員中有審核中的專題將不能申請。')
              }
            })
            .catch(err => {
              // window.location.replace("/logout ");
              window.alert('送出失敗，請檢查連線是否穩定。')
              console.log(err)
            })
        }
      })
      .catch(err => {
        window.alert('送出失敗，請檢查連線是否穩定。')
        console.log(err)
      })
  }

  handleAddMember () {
    let newNumber = this.state.memberNumber.length + 1
    if (newNumber > limitcount - this.props.profile.scount) {
      this.handleSnackbarOpen('專題成員不能超過該教授上限！')
      return
    } else if (newNumber > 4) {
      this.handleSnackbarOpen('專題成員不能超過4位！')
      return
    }
    this.setState({
      memberNumber: [...this.state.memberNumber, newNumber],
      members: [...this.state.members, { id: '', phone: '', email: '' }]
    })
  }

  handleRemoveMember () {
    let newNumberArray = [...this.state.memberNumber]
    let newMembers = [...this.state.members]
    newNumberArray.splice(newNumberArray.length - 1, 1)
    newMembers.splice(newMembers.length - 1, 1)
    if (newNumberArray.length < 1) {
      this.handleSnackbarOpen('專題成員不能少於一人！')
      return
    }
    this.setState({
      memberNumber: newNumberArray,
      members: newMembers
    })
  }

  handdlePanelChange (event, expanded, panel) {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  handleTitleChange (event) {
    this.setState({ title: event.target.value })
  }

  handleInputChange (value, property, index) {
    let newMembers = [...this.state.members]
    newMembers[index][property] = value
    this.setState({ members: newMembers })
  }

  getApplyFailReason (str) {
    switch (str) {
      case '1': return '專題一'
      case '2': return '專題二'
      case '3': return '基礎程式設計成績待審核'
      case '4': return '重複提交(當學期只能有一個專題/專題申請表)'
      case '5': return '已修過專1專2'
      default : return ''
    }
  }

  render () {
    const { expanded, members } = this.state
    const { classes, fullScreen } = this.props
    return (
      <div>
        {
          this.props.rwd
            ? <MenuItem disabled={this.props.profile.scount >= limitcount} onClick={this.handleDialogOpen}>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText inset primary={'專題申請/專題變更'} />
            </MenuItem>
            : <Tooltip title='寄送專題申請！' placement='top' classes={{ tooltip: classes.tooltip }}>
              <IconButton
                onClick={this.handleDialogOpen}
                aria-expanded={this.state.expanded}
                aria-label='Show more'
                disabled={this.props.profile.scount >= limitcount}
              >
                <Face />
              </IconButton>
            </Tooltip>
        }
        <Dialog
          open={this.state.openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          fullWidth
          fullScreen={fullScreen}
        >
          <DialogTitle id='alert-dialog-slide-title' disableTypography>
            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                  寄送專題申請
                </Typography>
                <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleDialogClose} className='pull-right'>
                  取消
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>

          <DialogContent className='dialog-content-height' style={{ marginTop: '50px' }}>
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

            {/* for PC */}
            <div className='hidden-xs' style={{ marginTop: '20px' }}>
              {
                this.state.memberNumber.map(t => (
                  <Grow in key={t}>
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
                          disabled={t === 1}
                          value={members[t - 1].id}
                          onChange={(e) => this.handleInputChange(e.target.value, 'id', t - 1)}
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
                          value={members[t - 1].phone}
                          onChange={(e) => this.handleInputChange(e.target.value, 'phone', t - 1)}
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
                          value={members[t - 1].email}
                          onChange={(e) => this.handleInputChange(e.target.value, 'email', t - 1)}
                        />
                      </div>
                    </div>
                  </Grow>
                ))
              }
            </div>

            {/* for mobile */}
            <div className='visible-xs' style={{ marginTop: '20px' }}>
              {
                this.state.memberNumber.map(t => (
                  <Grow in key={t}>
                    <ExpansionPanel
                      expanded={expanded === `成員 ${t}`}
                      onChange={(event, expanded) => this.handdlePanelChange(event, expanded, `成員 ${t}`)}
                      key={t}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        成員 {t}: {this.state.members[t - 1].id}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <div className='row'>
                            <Input
                              placeholder='學號'
                              className='project-member-input-rwd'
                              fullWidth
                              disabled={t === 1}
                              startAdornment={
                                <InputAdornment position='start'>
                                  <MemberIcon />
                                </InputAdornment>
                              }
                              value={members[t - 1].id}
                              onChange={(e) => this.handleInputChange(e.target.value, 'id', t - 1)}
                            />
                          </div>
                          <div className='row'>
                            <Input
                              placeholder='電話'
                              className='project-member-input-rwd'
                              fullWidth
                              startAdornment={
                                <InputAdornment position='start'>
                                  <PhoneIcon />
                                </InputAdornment>
                              }
                              value={members[t - 1].phone}
                              onChange={(e) => this.handleInputChange(e.target.value, 'phone', t - 1)}
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
                              value={members[t - 1].email}
                              onChange={(e) => this.handleInputChange(e.target.value, 'email', t - 1)}
                            />
                          </div>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grow>
                ))
              }
            </div>

            <div className='row'>
              {/* for PC */}
              <div className='hidden-xs hidden-sm bottom-icon pull-right'>
                <Button variant='fab' mini color='primary' aria-label='add' style={{ margin: '5px' }} onClick={this.handleRemoveMember}>
                  <Remove />
                </Button>
                <Button variant='fab' mini color='primary' aria-label='remove' style={{ margin: '5px' }} onClick={this.handleAddMember}>
                  <AddIcon />
                </Button>
              </div>

              {/* for mobile */}
              <div className='visible-xs visible-sm pull-right'>
                <Button variant='fab' mini color='primary' aria-label='add' style={{ margin: '5px' }} onClick={this.handleRemoveMember}>
                  <Remove />
                </Button>
                <Button variant='fab' mini color='primary' aria-label='remove' style={{ margin: '5px' }} onClick={this.handleAddMember}>
                  <AddIcon />
                </Button>
              </div>
            </div>

            <Snackbar
              open={this.state.openSnackbar}
              onClose={this.handleSnackbarClose}
              TransitionComponent={Transition}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id='message-id'>{this.state.msg}</span>}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleSubmit} className={classes.appBar} color='primary'>
              送出
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  researchStatus: state.Student.Professor.research_status
})

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(SendProjectAgree)))
