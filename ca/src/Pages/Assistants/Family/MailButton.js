import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { 
  Button,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom
} from '@material-ui/core'

import axios from 'axios'
import CKEditor from 'react-ckeditor-component'
import Email from '@material-ui/icons/Email'

const styles = () =>({
  dialog:{
    width:'90%',
  },
  body:{
    fontFamily: 'Noto Sans CJK TC',
    color:'#454545',
  },
  title:{
    fontFamily: 'Noto Sans CJK TC',
    color:'#565656'
  },
  btn:{
    position:'absolute',
    right:20,
    top: 20
  }
})

const Transition = (props) =>(
  <Zoom direction="in" {...props} />
)

// component format 
// <MailButton
//  sender={} receiver={} sender_email={} receiver_email={}
// />

class MailButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      value: 'Property Value',
      titlevalue: '',
      ckeditorContent:''
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangetitle = this.handleChangetitle.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  handleOpen(){
    this.setState({open: true});
  }
  handleClose(){
    this.setState({ckeditorContent:'',open: false});
  }
  handleChangetitle(event){
    this.setState({
      titlevalue: event.target.value,
    })
  }
  handleSend(){
    let _this = this
    let dt = new Date()
    //let time = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + '  ' + dt.getHours() + ':' + dt.getMinutes()
    axios.post('/mail/sendmail', {
      title:_this.state.titlevalue,
      sender_id:_this.props.sender,
      sender_email:_this.props.sender_email,
      receiver_id:_this.props.receiver,
      receiver_email:_this.props.receiver_email,
      content:_this.state.ckeditorContent
    })
      .then(res => {
        
      })
      .catch(err => {
        console.log(err)
      })
    this.handleClose()
  }
  onChange(event){
    this.setState({
      ckeditorContent: event.editor.getData()
    })
  }

  render() {
    const {classes} = this.props
    return (
      <span>
        <Button variant="fab" color={this.props.warning ? 'secondary':'primary'} mini onClick={this.handleOpen} className={classes.btn}>
          <Email/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
        >
          <DialogTitle>

            <Input
              placeholder="主旨"
              value={this.state.titlevalue}
              onChange={this.handleChangetitle}
              fullWidth={true}
            />
          </DialogTitle>
          <DialogContent>
            <CKEditor activeClass='p10' content={this.state.ckeditorContent} events={{'change': this.onChange}} />
          </DialogContent>         
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>,
            <Button onClick={this.handleSend}>Send</Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default withStyles(styles)(MailButton)