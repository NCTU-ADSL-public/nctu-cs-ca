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
import PermIcon from '@material-ui/icons/PermIdentity'
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
import TextField from '@material-ui/core/TextField'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { getSemester } from '../../../../../Utilities'
import { sendProjectAgree } from '../../../../../Redux/Students/Actions/Professor'

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
          email: '',
          first_second: 0
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

    if (!this.state.title) {
      window.alert('請填寫研究主題')
      return
    }

    let payload = {
      members: this.state.members,
      student_id: this.props.studentIdcard.student_id,
      semester: getSemester(),
      tname: _this.props.profile.tname,
      teacher_id: _this.props.profile.teacher_id,
      teacher_email: _this.props.profile.email,
      research_title: _this.state.title
    }

    this.props.sendProjectAgree(payload)
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
      members: [...this.state.members, { id: '', phone: '', email: '', first_second: 0 }]
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
                      <div className='col-sm-3 col-md-12'>
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
                      <div className='col-sm-3 col-md-4'>
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
                      <div className='col-sm-6 col-md-4'>
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
                      <div className='col-sm-6 col-md-4'>
                        <TextField
                          // className='project-member-input'
                          style={{margin: '20px 10px 0 1px', width: '100%'}}
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>
                              <PermIcon />
                            </InputAdornment>
                          }}
                          select
                          value={members[t - 1].first_second}
                          onChange={(e) => this.handleInputChange(e.target.value, 'first_second', t - 1)}
                        >
                          <MenuItem value={0} style={{width: '100%'}}>請選擇專題(ㄧ)或(二)</MenuItem>
                          <MenuItem value={1} style={{width: '100%'}}>專題（ㄧ）</MenuItem>
                          <MenuItem value={2} style={{width: '100%'}}>專題（二）</MenuItem>
                        </TextField>
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
                          <div className='row'>
                            <TextField
                              placeholder='專題一 or 專題二'
                              className='project-member-input-rwd'
                              style={{margin: '10px 0 0 15px', width: '100%'}}
                              startAdornment={
                                <InputAdornment position='start'>
                                  <PermIcon />
                                </InputAdornment>
                              }
                              InputProps={{
                                startAdornment: <InputAdornment position='start'>
                                  <PermIcon />
                                </InputAdornment>
                              }}
                              select
                              value={members[t - 1].first_second}
                              onChange={(e) => this.handleInputChange(e.target.value, 'first_second', t - 1)}
                            >
                              <MenuItem value={0} style={{width: '100%'}}>請選擇專題(ㄧ)或(二)</MenuItem>
                              <MenuItem value={1} style={{width: '100%'}}>專題（ㄧ）</MenuItem>
                              <MenuItem value={2} style={{width: '100%'}}>專題（二）</MenuItem>
                            </TextField>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendProjectAgree: (payload) => dispatch(sendProjectAgree(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(SendProjectAgree)))
